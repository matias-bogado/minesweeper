import {
  CREATE_GAME_SUCCESS,
  CREATE_GAME_RESET,
  CREATE_GAME_LOADING,
  CREATE_GAME_ERROR,
} from './createGame.constants';
import makeDefaultServerCallReducer from '../../utilities/makeDefaultServerCallReducer';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export const reducer = makeDefaultServerCallReducer({
  loadingActions: [CREATE_GAME_LOADING],
  successActions: [CREATE_GAME_SUCCESS],
  errorActions: [CREATE_GAME_ERROR],
  resetActions: [CREATE_GAME_RESET],
  initialState,
});

