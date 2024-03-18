import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { signUp as signUpApi, logIn as logInApi } from "http/auth";
import { AuthStackNavParams } from "navigation/auth-stack/AuthStackNav";
import { LoginResponse, SignupData, LoginData } from "./types";

const SET_ERROR = "auth/SET_ERROR";
const SIGN_UP = "auth/SIGN_UP";
const LOG_IN = "auth/LOG_IN";
const SET_INITIAL_AUTH_ROUTE = "auth/SET_INITIAL_AUTH_ROUTE";

export const setError = createAction<boolean | string>(SET_ERROR);

export const setInitialAuthRoute = createAction<keyof AuthStackNavParams>(
  SET_INITIAL_AUTH_ROUTE
);

export const signUp = createAsyncThunk<any, SignupData>(
  SIGN_UP,
  async (data) => {
    const res = await signUpApi(data);

    return res;
  }
);

export const logIn = createAsyncThunk<LoginResponse, LoginData>(
  LOG_IN,
  async (data, { dispatch }) => {
    const authSession = await logInApi(data);

    return authSession;
  }
);
