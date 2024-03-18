import {
  ActionReducerMapBuilder,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { AuthState } from "./types";
import { setError, signUp, logIn, setInitialAuthRoute } from "./actions";

const initialState: AuthState = {
  loading: false,
  error: false,
  accessToken: undefined,
  initialAuthRoute: undefined,
  current: undefined,
};

const authStore = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setInitialAuthRoute, (state, { payload }) => {
      state.initialAuthRoute = payload;
    });

    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accessToken = payload.token.access.token;
      state.current = payload.userDetails
    });

    builder.addMatcher(isAnyOf(signUp.fulfilled), (state) => {
      state.loading = true;
    });

    builder.addMatcher(isAnyOf(signUp.pending, logIn.pending), (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addMatcher(
      isAnyOf(signUp.rejected, logIn.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message || true;
      }
    );
  },
});

export default authStore.reducer;
