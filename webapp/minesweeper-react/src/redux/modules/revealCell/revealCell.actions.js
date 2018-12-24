// @flow
import { createAction } from 'redux-actions';
import {
  REVEAL_CELL_ERROR,
  REVEAL_CELL_LOADING,
  REVEAL_CELL_RESET,
  REVEAL_CELL_SUCCESS,
} from './revealCell.constants';
import { instance as nodeApiProvider } from '../../../services/NodeApiProvider';
import type { RevealCellPayload } from "../../../services/NodeApiProvider";
import {currentGameSet} from "../currentGame/currentGame.actions";

export const revealCellError = createAction(REVEAL_CELL_ERROR);

export const revealCellLoading = createAction(REVEAL_CELL_LOADING);

export const revealCellSuccess = createAction(REVEAL_CELL_SUCCESS);

export const revealCellReset = createAction(REVEAL_CELL_RESET);

export const revealCell = (payload: RevealCellPayload) => {
  return async (dispatch: Function) => {
    try {
      dispatch(revealCellLoading());

      const response = await nodeApiProvider.revealCell(payload);

      dispatch(revealCellSuccess(response));
      dispatch(currentGameSet(response));
    } catch (error) {
      dispatch(revealCellError(error));
    }
  };
};
