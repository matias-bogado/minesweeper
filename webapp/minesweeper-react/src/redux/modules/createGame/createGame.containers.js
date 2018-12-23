import { createGameReset as reset, createGame as create } from './createGame.actions';
import { CreateGameResponse, CreateGamePayload } from '../../../services/NodeApiProvider';

export const mapStateToProps = state => {
  return {
    createGameData: state.createGame.data,
    createGameError: state.createGame.error,
    createGameIsLoading: state.createGame.isLoading,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    createGame(payload: CreateGamePayload) {
      dispatch(create(payload));
    },
    createGameReset() {
      dispatch(reset());
    },
  };
};

export type CreateGameMapStateToProps = {
  createGameData: CreateGameResponse | null,
  createGameError: any,
  createGameIsLoading: boolean,
}

export type CreateGameMapDispatchToProps = {
  createGame: (payload: CreateGamePayload) => void,
  createGameReset: () => void,
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
