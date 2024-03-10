import { AxiosRequestConfig } from "axios";
import { Store } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import http from "http/index";

export default {
  setup: (store: Store<RootState>): void => {
    const addAuthorizationToken = async (config: any) => {
      const {
        auth: { accessToken },
      } = store.getState();

      if (accessToken) {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return config;
    };

    http.interceptors.request.use(addAuthorizationToken);
  },
};
