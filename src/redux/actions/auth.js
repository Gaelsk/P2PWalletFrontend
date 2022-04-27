import { SET_AUTH_LOADING, SET_AUTH_USER, SET_UNAUTHENTICATED, SET_USER_BALANCE } from "../types";
import axios from "axios";
import { API_BASE_URL } from "src/utils/data";

/* export const setAuthHeaders = (authToken, cb) => {
  sessionStorage.setItem("authToken", authToken);
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  if (cb) {
    cb();
  }
}; */

export const setAuthHeaders = (authToken, cb) => {
  sessionStorage.setItem("authToken", authToken);
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
};

const remoteStorageToken = () => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("user");

  delete axios.defaults.headers.common.Authorization;
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
  remoteStorageToken();
};

export const getUserData = () => async (dispatch) => {
  try {
    dispatch({ type: SET_AUTH_LOADING, payload: true });
    const { data } = await axios.get(`${API_BASE_URL}/users/me`);
    if (data.success) {
      dispatch({ type: SET_AUTH_LOADING, payload: false });
      dispatch({ type: SET_AUTH_USER, payload: data.data });
      sessionStorage.setItem("user", JSON.stringify(data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const setUserBalance = (balance) => ({ type: SET_USER_BALANCE, payload: balance });
