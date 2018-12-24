import {
  CURRENT_GAME_SUCCESS,
  CURRENT_GAME_RESET,
  CURRENT_GAME_LOADING,
  CURRENT_GAME_ERROR,
  CURRENT_GAME_SET
} from './currentGame.constants';
import makeDefaultServerCallReducer from '../../utilities/makeDefaultServerCallReducer';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export const reducer = makeDefaultServerCallReducer({
  loadingActions: [CURRENT_GAME_LOADING],
  successActions: [CURRENT_GAME_SUCCESS, CURRENT_GAME_SET],
  errorActions: [CURRENT_GAME_ERROR],
  resetActions: [CURRENT_GAME_RESET],
  initialState,
});

