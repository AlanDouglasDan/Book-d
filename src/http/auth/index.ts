import { LoginData, LoginResponse, SignupData } from "store/auth/types";

import { apiCall } from "../index";

export const signUp = (data: SignupData): Promise<null> =>
  apiCall({ method: "post", url: "/auth/register", data });

export const logIn = (data: LoginData): Promise<LoginResponse> =>
  apiCall({ method: "post", url: "/auth/login", data });
