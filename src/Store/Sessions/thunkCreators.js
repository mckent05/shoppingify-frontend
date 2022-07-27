import { handleLoading, userSignIn, userSignUp, userSignOut } from "./sessionReducer";
import { clearSession, getToken } from "../utils/session"

const baseURL = "http://localhost:3000";

export const handleSignIn = (username, password) => async (dispatch) => {
  const userDetails = { user: { username, password } };
  dispatch(handleLoading(true));
  const postDetails = await fetch(`${baseURL}/users/sign_in`, {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await postDetails.json();
  const token = postDetails.headers.get("Authorization");
  if (token) {
    localStorage.setItem("user-token", JSON.stringify(token));
    localStorage.setItem("session", true);
    dispatch(userSignIn(response.message, response.status));
  } else {
    dispatch(userSignIn(response.message, response.status));
  }
  dispatch(handleLoading(false));
};

export const handleSignUp = (username, email, password) => async (dispatch) => {
  const userDetails = { user: { username, email, password } };
  dispatch(handleLoading(true));
  const postDetails = await fetch(`${baseURL}/users`, {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const serverResponse = await postDetails.json();
  const userToken = postDetails.headers.get("Authorization");
  if (userToken) {
    dispatch(userSignUp(serverResponse.message, true));
  } else {
    dispatch(userSignUp(serverResponse.message, false));
  }
  dispatch(handleLoading(false));
};

export const handleSignOut = () => async (dispatch) => {
  const userToken = getToken()
  dispatch(handleLoading(true))
  const details = await fetch(`${baseURL}/users/sign_out`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken
    },
  });
  const response = await details.json()
  if (response.status === 200 ) {
    dispatch(userSignOut(response.message, response.status))
    clearSession()
  }
  dispatch(handleLoading(false))
}
