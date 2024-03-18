import {
  ActionReducerMapBuilder,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { BookingState } from "./types";
import {
  setError,
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "./actions";

const initialState: BookingState = {
  loading: false,
  error: false,
  bookings: undefined,
};

const bookingStore = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<BookingState>) => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(getBookings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.bookings = payload;
    });

    builder.addMatcher(
      isAnyOf(
        createBooking.fulfilled,
        updateBooking.fulfilled,
        deleteBooking.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        createBooking.pending,
        getBookings.pending,
        updateBooking.pending,
        deleteBooking.pending
      ),
      (state) => {
        state.loading = true;
        state.error = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        createBooking.rejected,
        getBookings.rejected,
        updateBooking.rejected,
        deleteBooking.rejected
      ),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message || true;
      }
    );
  },
});

export default bookingStore.reducer;
