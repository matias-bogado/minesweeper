// @flow
import { CURRENT_USER_SET_EMAIL } from './currentUser.constants';

const initialState = {
  email: ''
};

export const reducer = (state: any = initialState, action: { type: string, payload: any }) => {
  const { payload, type } = action;

  switch(type) {
    case CURRENT_USER_SET_EMAIL:
      return {
        ...state,
        email: payload.email || ''
      };
    default:
      return state;
  }
};

