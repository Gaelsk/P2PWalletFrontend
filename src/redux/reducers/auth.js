import {
  SET_AUTHENTICATED,
  SET_AUTH_LOADING,
  SET_AUTH_USER,
  SET_UNAUTHENTICATED,
  SET_USER_BALANCE,
} from "../types";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case SET_UNAUTHENTICATED:
      return {
        initialState,
      };

    case SET_AUTH_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_USER_BALANCE:
      return {
        ...state,
        user: {
          ...state.user,
          wallet: {
            ...state.user.wallet,
            balance: payload,
          },
        },
      };
    default:
      return state;
  }
};

export default authReducer;
