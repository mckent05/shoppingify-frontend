import {
  handleLoading,
  userSignUp,
  userSignIn,
  userSignOut,
} from "./sessionSlice";
import { clearSession, getToken, baseURL } from "../utils/session";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotification } from "../Notification";

export const handleSignIn = createAsyncThunk(
  "user/login",
  async (user, { dispatch }) => {
    const { username, password } = user;
    const loginDetails = { user: { username, password } };
    dispatch(handleLoading(true));
    const postDetails = await fetch(`${baseURL}/users/sign_in`, {
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await postDetails.json();
    const token = postDetails.headers.get("Authorization");
    if (token) {
      localStorage.setItem("user-token", JSON.stringify(token));
      localStorage.setItem("session", true);
      dispatch(userSignIn());
      dispatch(updateNotification(response.message, response.status));
    } else {
      dispatch(updateNotification(response.message, response.status));
    }
    dispatch(handleLoading(false));
  }
);

export const handleSignUp = createAsyncThunk(
  "user/register",
  async (user, { dispatch }) => {
    const { username, password, email } = user;
    const registerDetails = { user: { username, email, password } };
    dispatch(handleLoading(true));
    const postDetails = await fetch(`${baseURL}/users`, {
      method: "POST",
      body: JSON.stringify(registerDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const serverResponse = await postDetails.json();
    if (serverResponse.status === 200) {
      dispatch(userSignUp(true));
    } else {
      dispatch(userSignUp(false));
    }
    dispatch(updateNotification(serverResponse.message, serverResponse.status));
    dispatch(handleLoading(false));
  }
);

export const handleSignOut = createAsyncThunk(
  "user/sign_out",
  async (_, { dispatch }) => {
    const userToken = getToken();
    dispatch(handleLoading(true));
    const details = await fetch(`${baseURL}/users/sign_out`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    });
    const response = await details.json();
    dispatch(userSignOut());
    dispatch(updateNotification(response.message, response.status));
    clearSession();
    dispatch(handleLoading(false));
  }
);
