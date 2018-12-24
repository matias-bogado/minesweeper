import {
  REVEAL_CELL_SUCCESS,
  REVEAL_CELL_RESET,
  REVEAL_CELL_LOADING,
  REVEAL_CELL_ERROR,
} from './revealCell.constants';
import makeDefaultServerCallReducer from '../../utilities/makeDefaultServerCallReducer';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export const reducer = makeDefaultServerCallReducer({
  loadingActions: [REVEAL_CELL_LOADING],
  successActions: [REVEAL_CELL_SUCCESS],
  errorActions: [REVEAL_CELL_ERROR],
  resetActions: [REVEAL_CELL_RESET],
  initialState,
});

