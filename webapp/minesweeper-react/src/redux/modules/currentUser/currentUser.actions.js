// @flow
import { createAction } from 'redux-actions';
import { CURRENT_USER_SET_EMAIL } from './currentUser.constants';

export const currentUserSetEmail = createAction(CURRENT_USER_SET_EMAIL);
