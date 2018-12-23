import { currentGameReset as reset, getCurrentGame as getData } from './currentGame.actions';
import type { GetGamePayload, GetGameResponse } from '../../../services/NodeApiProvider';

export const mapStateToProps = state => {
  return {
    currentGameData: state.currentGame.data,
    currentGameError: state.currentGame.error,
    currentGameIsLoading: state.currentGame.isLoading,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getCurrentGame(payload: GetGamePayload) {
      dispatch(getData(payload));
    },
    currentGameReset() {
      dispatch(reset());
    },
  };
};

export type CurrentGameMapStateToProps = {
  currentGameData: GetGameResponse | null,
  currentGameError: any,
  currentGameIsLoading: boolean,
}

export type CurrentGameMapDispatchToProps = {
  getCurrentGame: (payload: GetGamePayload) => void,
  currentGameReset: () => void,
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
