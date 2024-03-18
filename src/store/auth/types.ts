import { AuthStackNavParams } from "navigation/auth-stack/AuthStackNav";

export interface AuthState {
  loading: boolean;
  error: boolean | string;
  accessToken?: string;
  initialAuthRoute?: keyof AuthStackNavParams;
  current?: any
}

export interface AuthHookReturn extends AuthState {
  setError: (error: boolean | string) => void;
  signUp: (data: SignupData) => any;
  logIn: (data: LoginData) => any;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  businessName: string;
  address: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  userDetails: any;
  token: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}
