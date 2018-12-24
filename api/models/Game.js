/**
 * Game.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const getRandomCoordinate = (from, to, blackList = []) => {
  const result = Math.floor((Math.random() * (to - from) + 1));

  if (blackList.indexOf(result) !== -1) {
    return getRandomCoordinate(from, to, blackList);
  }

  return result;
};

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    numberOfRows: { type: 'number', required: true, isInteger: true, min: 5, max: 50 },
    numberOfColumns: { type: 'number', required: true, isInteger: true, min: 5, max: 50 },
    numberOfMines: { type: 'number', required: true, isInteger: true, min: 10, max: 100 },
    ownerEmail: { type: 'string', required: true, isEmail: true },
    status: { type: 'string', defaultsTo: 'IN_PROGRESS', isIn: ['IN_PROGRESS', 'WON', 'LOST'] },
    cells: { type: 'json' },
    mines: { type: 'json' }
  },

  beforeCreate: function (valuesToSet, next) {
    try {
      const { numberOfRows, numberOfColumns, numberOfMines } = valuesToSet;

      // Get mines coordinates
      const mines = {};
      const from = 1;

      if (numberOfMines > numberOfColumns * numberOfRows) {
        next(new Error('Number of mines can\'t exceed the actual minesweeper board size.'))
      }

      for (let i = from; i <= numberOfMines; i += 1) {
        const mineX = getRandomCoordinate(1, numberOfColumns);
        const mineY = getRandomCoordinate(1, numberOfRows);

        mines[`x${mineX}y${mineY}`] = true;
      }

      //Generate all positions
      let cells = {};
      for (let x = from; x <= numberOfColumns; x += 1) {
        for (let y = from; y <= numberOfRows; y += 1) {
          const adjacentCells = [
            `x${x-1}y${y-1}`,
            `x${x-1}y${y}`,
            `x${x-1}y${y+1}`,
            `x${x}y${y-1}`,
            `x${x}y${y+1}`,
            `x${x+1}y${y-1}`,
            `x${x+1}y${y}`,
            `x${x+1}y${y+1}`
          ];
          let numberOfAdjacentMines = 0;

          adjacentCells.forEach((adjacentCellXY) => {
            if (mines[adjacentCellXY]) {
              numberOfAdjacentMines += 1;
            }
          });

          cells[`x${x}y${y}`] = {
            x,
            y,
            hasMine: mines[`x${x}y${y}`] || false,
            isFlagged: false,
            isVisible: false,
            numberOfAdjacentMines
          }
        }
      }

      valuesToSet.cells = cells;
      valuesToSet.mines = Object.keys(mines);
      valuesToSet.status = 'IN_PROGRESS';

      next();
    } catch (e) {
      next(e);
    }
  },

  getGameById: async function (opts) {
    const { id, throwError } = opts;
    const game = await Game.findOne({ id });

    if (!game && throwError) {
      throw new Error('Invalid game id');
    }

    return game;
  },

  toggleCellFlag: async function (opts) {
    const { gameId, cellX, cellY } = opts;

    const game = await Game.getGameById({ id: gameId, throwError: true });

    if (game.status !== 'IN_PROGRESS') {
      throw new Error('Game has already ended');
    }

    const cell = game.cells[`x${cellX}y${cellY}`];

    if (!cell) {
      throw new Error('Invalid game cell position');
    }

    cell.isFlagged = !cell.isFlagged;

    const updatedGame = await Game.update({ id: gameId })
      .set({
        status: game.status,
        cells: game.cells
      })
      .fetch();

    return updatedGame[0];
  },

  revealCell: async function (opts) {
    const { gameId, cellX, cellY } = opts;
    const game = await Game.getGameById({ id: gameId, throwError: true });

    if (game.status !== 'IN_PROGRESS') {
      throw new Error('Game has already ended');
    }

    const cell = game.cells[`x${cellX}y${cellY}`];

    if (!cell) {
      throw new Error('Invalid game cell position');
    }

    if (cell.isVisible) {
      throw new Error('Cell is already visible');
    }

    cell.isVisible = true;

    if (cell.hasMine) {
      game.status = 'LOST';
    } else {
      if (!cell.numberOfAdjacentMines) {
        revealCellNeighborhood(cell.x, cell.y, game.cells);
      }

      if (hasWonGame(game)) {
        game.status = 'WON';
      }
    }

    const updatedGame = await Game.update({ id: gameId })
      .set({
        status: game.status,
        cells: game.cells
      })
      .fetch();

    return updatedGame[0];
  }
};

const revealCellNeighborhood = (cellX, cellY, cells) => {
  revealGivenCell(cellX - 1, cellY - 1, cells);
  revealGivenCell(cellX - 1, cellY, cells);
  revealGivenCell(cellX - 1, cellY + 1, cells);

  revealGivenCell(cellX, cellY - 1, cells);
  revealGivenCell(cellX, cellY + 1, cells);

  revealGivenCell(cellX + 1, cellY, cells);
  revealGivenCell(cellX + 1, cellY - 1, cells);
  revealGivenCell(cellX + 1, cellY + 1, cells);
};

const revealGivenCell = (cellX, cellY, cells) => {
  const cell = cells[`x${cellX}y${cellY}`];

  if (!cell || (cell && (cell.isVisible || cell.hasMine))) {
    return;
  }

  cell.isVisible = true;

  if (!cell.numberOfAdjacentMines) {
    revealCellNeighborhood(cellX, cellY, cells);
  }
};

const hasWonGame = (game) => {
  const { mines, cells } = game;
  const cellKeys = Object.keys(cells);
  const cellWithMineKeys = Object.keys(mines);

  const visibleCells = cellKeys.filter(key => {
    const cell = cells[key];

    return cell.isVisible;
  });

  return visibleCells.length === (cellKeys.length - cellWithMineKeys.length);
};

