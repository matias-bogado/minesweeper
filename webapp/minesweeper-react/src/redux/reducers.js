// @flow
import { combineReducers } from 'redux';
//import { reducer as gameListReducer } from './modules/gameList/gameList.reducers';

export const makeRootReducer = (asyncReducers: any) => {
  return combineReducers({
    //currentUser: currentUserReducer,
    //gameList: gameListReducer,
    //currentGame: currentGameReducer,
    ...asyncReducers,
  });
};

export default makeRootReducer;
