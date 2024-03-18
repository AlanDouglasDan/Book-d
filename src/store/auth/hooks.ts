import { shallowEqual, useSelector } from "react-redux";

import { useActionCreator } from "hooks";
import { RootState } from "store/types";
import { AuthHookReturn } from "./types";
import { setError, signUp, logIn } from "./actions";

export const useAuth = (): AuthHookReturn => {
  const authState = useSelector((state: RootState) => state.auth, shallowEqual);

  return {
    ...authState,
    setError: useActionCreator(setError),
    signUp: useActionCreator(signUp),
    logIn: useActionCreator(logIn),
  };
};
