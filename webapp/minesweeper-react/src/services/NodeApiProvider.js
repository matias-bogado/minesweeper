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
        gameId: payload.gameId
      },
    };

    return this.axios.get('/game', requestConfig)
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
}

export type GetGameListPayload = {
  email: string
};

export type GetGameListResponse = any

export type GetGamePayload = {
  gameId: number;
};

export type GetGameResponse = any

export type CreateGamePayload = {

}

export type CreateGameResponse = any;

export type RevealCellPayload = {
  cellX: number;
  cellY: number;
  gameId: number;
};

export type RevealCellResponse = any

export type ToggleFlagCellPayload = {
  cellX: number;
  cellY: number;
  gameId: number;
};

export type ToggleFlagCellResponse = any

export default NodeApiProvider;
export const instance = new NodeApiProvider();
