// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import type {Game, GameCell, GameStatus} from "../../services/NodeApiProvider";
import './Minesweeper.scss';

type Props = {
  game: Game
}

class Minesweeper extends Component<Props> {
  render() {
    return this.props.game ? (
      <div className="minesweeper">
        <div className="minesweeper__board">
          {this.renderRows()}
        </div>
      </div>
    ) : null;
  }

  renderRows() {
    const { numberOfRows } = this.props.game;
    let rows = [];

    for (let y = 1; y <= numberOfRows; y += 1) {
       rows.push(
         <div key={y} className="minesweeper__board-row">
           {this.renderCells(y)}
         </div>
       )
    }

    return rows;
  }

  renderCells(y: number) {
    const { cells, numberOfColumns } = this.props.game;
    let gameCells = [];

    for (let x = 1; x <= numberOfColumns; x += 1) {
      const cellPosition = `x${x}y${y}`;
      gameCells.push(
        <MinesweeperCell
          key={cellPosition}
          cell={cells[cellPosition]}
          onClick={this.handleCellClick}
          invertedBackground={y % 2 === 0}
          gameStatus={this.props.game.status}
        />
      );
    }

    return gameCells;
  }

  handleCellClick = (cell: GameCell) => {
    console.log('cell click', cell)
  }
}

type MinesweeperCellProps = {
  cell: GameCell;
  onClick: (cell: GameCell) => void;
  invertedBackground: boolean;
  gameStatus: GameStatus;
}

const MinesweeperCell = (props: MinesweeperCellProps) => {
  const { cell, onClick, invertedBackground, gameStatus } = props;
  const { hasMine, isVisible, isFlagged, numberOfAdjacentMines } = cell;
  const isReveled =  isVisible || (hasMine && gameStatus === 'LOST');

  return (
    <div onClick={() => onClick(cell)} className={classNames({
      'minesweeper-cell': true,
      'minesweeper-cell--inverted-background': invertedBackground,
      'minesweeper-cell--has-mine': hasMine && isReveled,
      'minesweeper-cell--reveled': isReveled,
      'minesweeper-cell--flagged': isFlagged,
      [`minesweeper-cell--adjacent-mines-${numberOfAdjacentMines}`]: true
    })}>
      {numberOfAdjacentMines && !hasMine && isVisible ?
        <span className="minesweeper-cell__adjacent-mines-number">{numberOfAdjacentMines}</span> :
        null
      }
      {isFlagged && !isVisible ? <span className="minesweeper-cell__flag">🚩</span> : null}
    </div>
  )
}

export default Minesweeper;
