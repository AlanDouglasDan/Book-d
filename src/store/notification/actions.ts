import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getNotifications as getNotificationsApi } from "http/notification";

const SET_ERROR = "notification/SET_ERROR";
const GET_NOTIFICATIONS = "notification/GET_NOTIFICATIONS";

export const setError = createAction<boolean | string>(SET_ERROR);

export const getNotifications = createAsyncThunk<any>(
  GET_NOTIFICATIONS,
  async () => {
    const notifications = await getNotificationsApi();
    return notifications;
  }
);
