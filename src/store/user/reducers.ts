import {
  ActionReducerMapBuilder,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { UserState } from "./types";
import { setError, updateUser } from "./actions";

const initialState: UserState = {
  loading: false,
  error: false,
};

const userStore = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.loading = false;
    });

    builder.addMatcher(isAnyOf(updateUser.pending), (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addMatcher(isAnyOf(updateUser.rejected), (state, { error }) => {
      state.loading = false;
      state.error = error?.message || true;
    });
  },
});

export default userStore.reducer;
