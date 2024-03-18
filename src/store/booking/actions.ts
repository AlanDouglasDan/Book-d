import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createBooking as createBookingApi,
  updateBooking as updateBookingApi,
  deleteBooking as deleteBookingApi,
  getBookings as getBookingsApi,
} from "http/booking";

const SET_ERROR = "booking/SET_ERROR";
const CREATE_BOOKING = "booking/CREATE_BOOKING";
const UPDATE_BOOKING = "booking/UPDATE_BOOKING";
const DELETE_BOOKING = "booking/DELETE_BOOKING";
const GET_BOOKINGS = "booking/GET_BOOKINGS";

export const setError = createAction<boolean | string>(SET_ERROR);

export const createBooking = createAsyncThunk<any>(
  CREATE_BOOKING,
  async (data) => {
    const res = await createBookingApi(data);

    return res;
  }
);

export const updateBooking = createAsyncThunk<any>(
  UPDATE_BOOKING,
  async (data) => {
    const res = await updateBookingApi(data);

    return res;
  }
);

export const deleteBooking = createAsyncThunk<any>(
  DELETE_BOOKING,
  async (data) => {
    const res = await deleteBookingApi(data);

    return res;
  }
);

export const getBookings = createAsyncThunk<any>(GET_BOOKINGS, async () => {
  const bookings = await getBookingsApi();
  return bookings;
});
