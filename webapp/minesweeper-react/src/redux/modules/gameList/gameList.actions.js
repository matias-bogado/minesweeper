// @flow
import { createAction } from 'redux-actions';
import {
  GAME_LIST_ERROR,
  GAME_LIST_LOADING,
  GAME_LIST_RESET,
  GAME_LIST_SUCCESS,
} from './gameList.constants';
import { instance as nodeApiProvider } from '../../../services/NodeApiProvider';
import type {GetGameListPayload} from "../../../services/NodeApiProvider";

export const gameListError = createAction(GAME_LIST_ERROR);

export const gameListLoading = createAction(GAME_LIST_LOADING);

export const gameListSuccess = createAction(GAME_LIST_SUCCESS);

export const gameListReset = createAction(GAME_LIST_RESET);

export const getGameList = () => {
  return async (dispatch: Function) => {
    try {
      dispatch(gameListLoading());

      const response = await nodeApiProvider.getGameList();

      dispatch(gameListSuccess(response));
    } catch (error) {
      dispatch(gameListError(error));
    }
  };
};
