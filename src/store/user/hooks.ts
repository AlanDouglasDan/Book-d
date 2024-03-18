import { shallowEqual, useSelector } from "react-redux";

import { useActionCreator } from "hooks";
import { RootState } from "store/types";
import { UserHookReturn } from "./types";
import { setError, updateUser } from "./actions";

export const useUser = (): UserHookReturn => {
  const userState = useSelector(
    (state: RootState) => state.user,
    shallowEqual
  );

  return {
    ...userState,
    setError: useActionCreator(setError),
    updateUser: useActionCreator(updateUser),
  };
};
