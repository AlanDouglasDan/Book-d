import { shallowEqual, useSelector } from "react-redux";

import { useActionCreator } from "hooks";
import { RootState } from "store/types";
import { NotificationHookReturn } from "./types";
import { setError, getNotifications } from "./actions";

export const useNotification = (): NotificationHookReturn => {
  const notificationState = useSelector(
    (state: RootState) => state.notification,
    shallowEqual
  );

  return {
    ...notificationState,
    setError: useActionCreator(setError),
    getNotifications: useActionCreator(getNotifications),
  };
};
