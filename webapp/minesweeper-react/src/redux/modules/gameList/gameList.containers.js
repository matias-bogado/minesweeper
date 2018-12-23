import { gameListReset as reset, getGameList as getData } from './gameList.actions';
import { GetGameListResponse } from '../../../services/NodeApiProvider';
import type {GetGameListPayload} from "../../../services/NodeApiProvider";

export const mapStateToProps = state => {
  return {
    gameListData: state.gameList.data,
    gameListError: state.gameList.error,
    gameListIsLoading: state.gameList.isLoading,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getGameList(payload: GetGameListPayload) {
      dispatch(getData(payload));
    },
    gameListReset() {
      dispatch(reset());
    },
  };
};

export type GameListMapStateToProps = {
  gameListData: GetGameListResponse | null,
  gameListError: any,
  gameListIsLoading: boolean,
}

export type GameListMapDispatchToProps = {
  getGameList: (payload: GetGameListPayload) => void,
  gameListReset: () => void,
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
