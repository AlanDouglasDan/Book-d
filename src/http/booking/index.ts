import { apiCall } from "../index";

export const getBookings = (): Promise<any[]> =>
  apiCall({ method: "get", url: "/booking" });

export const createBooking = (data): Promise<any> =>
  apiCall({ method: "post", url: "/booking", data });

export const updateBooking = (data): Promise<any> =>
  apiCall({ method: "put", url: "/booking", data });

export const deleteBooking = (data): Promise<any> =>
  apiCall({ method: "delete", url: "/booking", data });
