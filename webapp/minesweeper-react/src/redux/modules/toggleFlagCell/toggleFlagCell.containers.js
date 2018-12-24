import { toggleFlagCellReset as reset, toggleFlagCell as create } from './toggleFlagCell.actions';
import { ToggleFlagCellResponse, ToggleFlagCellPayload } from '../../../services/NodeApiProvider';

export const mapStateToProps = state => {
  return {
    toggleFlagCellData: state.toggleFlagCell.data,
    toggleFlagCellError: state.toggleFlagCell.error,
    toggleFlagCellIsLoading: state.toggleFlagCell.isLoading,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    toggleFlagCell(payload: ToggleFlagCellPayload) {
      dispatch(create(payload));
    },
    toggleFlagCellReset() {
      dispatch(reset());
    },
  };
};

export type ToggleFlagCellMapStateToProps = {
  toggleFlagCellData: ToggleFlagCellResponse | null,
  toggleFlagCellError: any,
  toggleFlagCellIsLoading: boolean,
}

export type ToggleFlagCellMapDispatchToProps = {
  toggleFlagCell: (payload: ToggleFlagCellPayload) => void,
  toggleFlagCellReset: () => void,
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
