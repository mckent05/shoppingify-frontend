import { getToken } from "../utils/session";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSignedUp: false,
  isSignedIn: !!getToken(),
  isSignedOut: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    handleLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    userSignUp: (state, action) => ({
      ...state,
      isSignedUp: action.payload,
    }),
    userSignIn: (state) => ({
      ...state,
      isSignedIn: !!getToken(),
    }),
    userSignOut: (state) => ({
      ...state,
      isSignedIn: true,
      isSignedOut: false,
    }),
  },
});

export const { handleLoading, userSignIn, userSignUp, userSignOut } =
  sessionSlice.actions;

export default sessionSlice.reducer;
