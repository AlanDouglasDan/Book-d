import { apiCall } from "../index";

export const updateUser = (data): Promise<any[]> =>
  apiCall({ method: "put", url: "/user", data });
