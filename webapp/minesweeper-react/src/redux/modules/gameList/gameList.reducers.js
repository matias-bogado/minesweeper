import {
  GAME_LIST_SUCCESS,
  GAME_LIST_RESET,
  GAME_LIST_LOADING,
  GAME_LIST_ERROR,
} from './gameList.constants';
import makeDefaultServerCallReducer from '../../utilities/makeDefaultServerCallReducer';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export const reducer = makeDefaultServerCallReducer({
  loadingActions: [GAME_LIST_LOADING],
  successActions: [GAME_LIST_SUCCESS],
  errorActions: [GAME_LIST_ERROR],
  resetActions: [GAME_LIST_RESET],
  initialState,
});

