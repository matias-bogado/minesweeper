import { revealCellReset as reset, revealCell as create } from './revealCell.actions';
import { RevealCellResponse, RevealCellPayload } from '../../../services/NodeApiProvider';

export const mapStateToProps = state => {
  return {
    revealCellData: state.revealCell.data,
    revealCellError: state.revealCell.error,
    revealCellIsLoading: state.revealCell.isLoading,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    revealCell(payload: RevealCellPayload) {
      dispatch(create(payload));
    },
    revealCellReset() {
      dispatch(reset());
    },
  };
};

export type RevealCellMapStateToProps = {
  revealCellData: RevealCellResponse | null,
  revealCellError: any,
  revealCellIsLoading: boolean,
}

export type RevealCellMapDispatchToProps = {
  revealCell: (payload: RevealCellPayload) => void,
  revealCellReset: () => void,
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
