import { shallowEqual, useSelector } from "react-redux";

import { useActionCreator } from "hooks";
import { RootState } from "store/types";
import { BookingHookReturn } from "./types";
import {
  setError,
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "./actions";

export const useBooking = (): BookingHookReturn => {
  const bookingState = useSelector(
    (state: RootState) => state.booking,
    shallowEqual
  );

  return {
    ...bookingState,
    setError: useActionCreator(setError),
    createBooking: useActionCreator(createBooking),
    updateBooking: useActionCreator(updateBooking),
    deleteBooking: useActionCreator(deleteBooking),
    getBookings: useActionCreator(getBookings),
  };
};
