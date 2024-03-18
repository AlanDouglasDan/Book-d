import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { updateUser as updateUserApi } from "http/user";

const SET_ERROR = "user/SET_ERROR";
const UPDATE_USER = "user/UPDATE_USER";

export const setError = createAction<boolean | string>(SET_ERROR);

export const updateUser = createAsyncThunk<any>(
  UPDATE_USER,
  async (data) => {
    const user = await updateUserApi(data);
    return user;
  }
);
