import axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "core/constants";
import { RequestError } from "./types";
import { accept20x, getErrorMessage } from "./utils";

const http = axios.create({ baseURL: API_URL });

export const apiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { status, data } = await http(config);

    if (!accept20x(status)) {
      throw new Error(data?.message);
    }

    return data.data;
  } catch (error) {
    const message = getErrorMessage(error as RequestError);
    throw new Error(message);
  }
};

export default http;
