import {
  ActionReducerMapBuilder,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { NotificationState } from "./types";
import { setError, getNotifications } from "./actions";

const initialState: NotificationState = {
  loading: false,
  error: false,
  notifications: undefined,
};

const notificationStore = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<NotificationState>) => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.notifications = payload;
    });

    builder.addMatcher(isAnyOf(getNotifications.pending), (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addMatcher(
      isAnyOf(getNotifications.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message || true;
      }
    );
  },
});

export default notificationStore.reducer;
