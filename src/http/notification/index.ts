import { apiCall } from "../index";

export const getNotifications = (): Promise<any[]> =>
  apiCall({ method: "get", url: "/notifications" });
