// @flow
import { currentUserSetEmail as setEmail } from './currentUser.actions';

export const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    currentUserSetEmail(payload: { email: string }) {
      dispatch(setEmail(payload));
    },
  };
};

export type CurrentUserMapStateToProps = {
  currentUser: {
    email: string;
  }
}

export type CurrentUserMapDispatchToProps = {
  currentUserSetEmail: (payload: { email: string }) => void,
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
