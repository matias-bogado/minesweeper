// @flow
import { createAction } from 'redux-actions';
import {
  CURRENT_GAME_ERROR,
  CURRENT_GAME_LOADING,
  CURRENT_GAME_RESET,
  CURRENT_GAME_SUCCESS,
} from './currentGame.constants';
import { instance as nodeApiProvider } from '../../../services/NodeApiProvider';
import type { GetGamePayload } from "../../../services/NodeApiProvider";

export const currentGameError = createAction(CURRENT_GAME_ERROR);

export const currentGameLoading = createAction(CURRENT_GAME_LOADING);

export const currentGameSuccess = createAction(CURRENT_GAME_SUCCESS);

export const currentGameReset = createAction(CURRENT_GAME_RESET);

export const getCurrentGame = (payload: GetGamePayload) => {
  return async (dispatch: Function) => {
    try {
      dispatch(currentGameLoading());

      const response = await nodeApiProvider.getGame(payload);

      dispatch(currentGameSuccess(response));
    } catch (error) {
      dispatch(currentGameError(error));
    }
  };
};
