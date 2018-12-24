// @flow
import Axios, { AxiosResponse, AxiosError } from 'axios';
import { clientStore } from '../redux/clientStore';

class NodeApiProvider {
  axios: Axios;
  host: string = process.env.API_HOST || 'http://localhost:1337';

  constructor() {
    this.axios = Axios.create({});

    this.axios.defaults.baseURL = this.host;
  }

  // TODO: use this method to retrieve current email
  getCurrentUserData() {
    return clientStore.getState().currentUser.data || {};
  }

  getGameList(payload: GetGameListPayload): Promise<GetGameListResponse> {
    const currentUserData = this.getCurrentUserData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        email: currentUserData.email,
      },
    };

    return this.axios.get('/game', requestConfig)
      .then((response: AxiosResponse) => Promise.resolve(response.data || null))
      .catch((error: AxiosError) => Promise.reject(error));

  }

  getGame(payload: GetGamePayload): Promise<GetGameResponse> {
    const currentUserData = this.getCurrentUserData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        email: currentUserData.email,
      },
    };

    return this.axios.get(`/game/${payload.gameId}`, requestConfig)
      .then((response: AxiosResponse) => Promise.resolve(response.data || null))
      .catch((error: AxiosError) => Promise.reject(error));
  }

  createGame(payload: CreateGamePayload): Promise<CreateGameResponse> {
    const currentUserData = this.getCurrentUserData();
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = { ...payload, email: currentUserData.email };

    return this.axios.post('/game', body, requestConfig)
      .then((response: AxiosResponse) => Promise.resolve(response.data || null))
      .catch((error: AxiosError) => Promise.reject(error));
  }

  revealCell(payload: RevealCellPayload): Promise<RevealCellResponse> {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.axios.patch('/game/reveal-cell', payload, requestConfig)
      .then((response: AxiosResponse) => Promise.resolve(response.data || null))
      .catch((error: AxiosError) => Promise.reject(error));
  }

  toggleFlagCell(payload: ToggleFlagCellPayload): Promise<ToggleFlagCellResponse> {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.axios.patch('/game/toggle-cell-flag', payload, requestConfig)
      .then((response: AxiosResponse) => Promise.resolve(response.data || null))
      .catch((error: AxiosError) => Promise.reject(error));
  }
}

export type Game = {
  id: number;
  name: string;
  numberOfColumns: number;
  numberOfMines: number;
  numberOfRows: number;
  ownerEmail: string;
  status: GameStatus;
  cells: {
    [key: string]: GameCell;
  };
  mines: string[];
  createdAt: number;
  updatedAt: number;
};

export type GameCell = {
  hasMine: boolean;
  isFlagged: boolean;
  isVisible: boolean;
  numberOfAdjacentMines: number;
  x: number;
  y: number;
};

export type GameStatus = 'LOST' | 'WON' | 'IN_PROGRESS';

export type GetGameListPayload = {
  email: string
};

export type GetGameListResponse = Game[]

export type GetGamePayload = {
  gameId: number;
};

export type GetGameResponse = Game

export type CreateGamePayload = {

}

export type CreateGameResponse = Game;

export type RevealCellPayload = {
  cellX: number;
  cellY: number;
  gameId: number;
};

export type RevealCellResponse = Game

export type ToggleFlagCellPayload = {
  cellX: number;
  cellY: number;
  gameId: number;
};

export type ToggleFlagCellResponse = Game

export default NodeApiProvider;
export const instance = new NodeApiProvider();
