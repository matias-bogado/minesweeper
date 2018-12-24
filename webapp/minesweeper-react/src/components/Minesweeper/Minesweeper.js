// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import type {Game, GameCell, GameStatus} from "../../services/NodeApiProvider";
import toggleFlagCell from "../../redux/modules/toggleFlagCell/toggleFlagCell.containers";
import revealCell from "../../redux/modules/revealCell/revealCell.containers";
import type {
  ToggleFlagCellMapDispatchToProps,
  ToggleFlagCellMapStateToProps
} from "../../redux/modules/toggleFlagCell/toggleFlagCell.containers";
import type {
  RevealCellMapDispatchToProps,
  RevealCellMapStateToProps
} from "../../redux/modules/revealCell/revealCell.containers";
import './Minesweeper.scss';

type Props = ToggleFlagCellMapDispatchToProps & ToggleFlagCellMapStateToProps &
  RevealCellMapDispatchToProps & RevealCellMapStateToProps & {
  game: Game
}

class Minesweeper extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

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
          onMouseDown={this.handleCellClick}
          invertedBackground={y % 2 === 0}
          gameStatus={this.props.game.status}
        />
      );
    }

    return gameCells;
  }

  handleCellClick = (event: any, cell: GameCell) => {
    event.preventDefault();

    if (this.props.game.status === 'IN_PROGRESS' && !cell.isVisible) {
      const payload = { gameId: this.props.game.id, cellX: cell.x, cellY: cell.y };

      if (event.button === 0) {
        this.props.revealCell(payload);
      } else if (event.button === 2) {
        this.props.toggleFlagCell(payload);
      }
    }
  }
}

type MinesweeperCellProps = {
  cell: GameCell;
  onMouseDown: (event: any, cell: GameCell) => void;
  invertedBackground: boolean;
  gameStatus: GameStatus;
}

const MinesweeperCell = (props: MinesweeperCellProps) => {
  const { cell, onMouseDown, invertedBackground, gameStatus } = props;
  const { hasMine, isVisible, isFlagged, numberOfAdjacentMines } = cell;
  const isReveled =  isVisible || (hasMine && gameStatus === 'LOST');

  return (
    <div
      onContextMenu={e => e.preventDefault()}
      onMouseDown={(event) => onMouseDown(event, cell)}
      className={classNames({
        'minesweeper-cell': true,
        'minesweeper-cell--inverted-background': invertedBackground,
        'minesweeper-cell--has-mine': hasMine && isReveled,
        'minesweeper-cell--reveled': isReveled,
        'minesweeper-cell--flagged': isFlagged,
        [`minesweeper-cell--adjacent-mines-${numberOfAdjacentMines}`]: true
      })
    }>
      {numberOfAdjacentMines && !hasMine && isVisible ?
        <span className="minesweeper-cell__adjacent-mines-number">{numberOfAdjacentMines}</span> :
        null
      }
      {isFlagged && !isVisible ? <span className="minesweeper-cell__flag">🚩</span> : null}
    </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...revealCell.mapStateToProps(state),
    ...toggleFlagCell.mapStateToProps(state),
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...revealCell.mapDispatchToProps(dispatch),
    ...toggleFlagCell.mapDispatchToProps(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Minesweeper);
