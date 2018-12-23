// @flow
import { createAction } from 'redux-actions';
import {
  CREATE_GAME_ERROR,
  CREATE_GAME_LOADING,
  CREATE_GAME_RESET,
  CREATE_GAME_SUCCESS,
} from './createGame.constants';
import { instance as nodeApiProvider } from '../../../services/NodeApiProvider';
import type { CreateGamePayload } from "../../../services/NodeApiProvider";

export const createGameError = createAction(CREATE_GAME_ERROR);

export const createGameLoading = createAction(CREATE_GAME_LOADING);

export const createGameSuccess = createAction(CREATE_GAME_SUCCESS);

export const createGameReset = createAction(CREATE_GAME_RESET);

export const createGame = (payload: CreateGamePayload) => {
  return async (dispatch: Function) => {
    try {
      dispatch(createGameLoading());

      const response = await nodeApiProvider.createGame(payload);

      dispatch(createGameSuccess(response));
    } catch (error) {
      dispatch(createGameError(error));
    }
  };
};
