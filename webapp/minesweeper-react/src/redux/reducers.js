// @flow
import { combineReducers } from 'redux';
import { reducer as currentUserReducer } from './modules/currentUser/currentUser.reducers';
import { reducer as gameListReducer } from './modules/gameList/gameList.reducers';
import { reducer as createGameReducer } from './modules/createGame/createGame.reducers';
import { reducer as currentGameReducer } from './modules/currentGame/currentGame.reducers';

export const makeRootReducer = (asyncReducers: any) => {
  return combineReducers({
    createGame: createGameReducer,
    currentUser: currentUserReducer,
    gameList: gameListReducer,
    currentGame: currentGameReducer,
    ...asyncReducers,
  });
};

export default makeRootReducer;
