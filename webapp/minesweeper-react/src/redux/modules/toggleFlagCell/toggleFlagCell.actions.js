// @flow
import { createAction } from 'redux-actions';
import {
  TOGGLE_FLAG_CELL_ERROR,
  TOGGLE_FLAG_CELL_LOADING,
  TOGGLE_FLAG_CELL_RESET,
  TOGGLE_FLAG_CELL_SUCCESS,
} from './toggleFlagCell.constants';
import { instance as nodeApiProvider } from '../../../services/NodeApiProvider';
import type { ToggleFlagCellPayload } from "../../../services/NodeApiProvider";
import {currentGameSet} from "../currentGame/currentGame.actions";

export const toggleFlagCellError = createAction(TOGGLE_FLAG_CELL_ERROR);

export const toggleFlagCellLoading = createAction(TOGGLE_FLAG_CELL_LOADING);

export const toggleFlagCellSuccess = createAction(TOGGLE_FLAG_CELL_SUCCESS);

export const toggleFlagCellReset = createAction(TOGGLE_FLAG_CELL_RESET);

export const toggleFlagCell = (payload: ToggleFlagCellPayload) => {
  return async (dispatch: Function) => {
    try {
      dispatch(toggleFlagCellLoading());

      const response = await nodeApiProvider.toggleFlagCell(payload);

      dispatch(toggleFlagCellSuccess(response));
      dispatch(currentGameSet(response));
    } catch (error) {
      dispatch(toggleFlagCellError(error));
    }
  };
};
