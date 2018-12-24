import {
  TOGGLE_FLAG_CELL_SUCCESS,
  TOGGLE_FLAG_CELL_RESET,
  TOGGLE_FLAG_CELL_LOADING,
  TOGGLE_FLAG_CELL_ERROR,
} from './toggleFlagCell.constants';
import makeDefaultServerCallReducer from '../../utilities/makeDefaultServerCallReducer';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export const reducer = makeDefaultServerCallReducer({
  loadingActions: [TOGGLE_FLAG_CELL_LOADING],
  successActions: [TOGGLE_FLAG_CELL_SUCCESS],
  errorActions: [TOGGLE_FLAG_CELL_ERROR],
  resetActions: [TOGGLE_FLAG_CELL_RESET],
  initialState,
});

