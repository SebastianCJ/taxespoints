import axios from "axios";
import Qs from "qs";
type ApiServiceMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiServiceOptions = {
  body?: { [key: string]: any };
  params?: { [key: string]: any };
  response?: { [key: string]: any };
};
type ApiService = (
  method: ApiServiceMethod
) => <T = any>(path: string, options?: ApiServiceOptions) => Promise<T> | any;

const apiService: ApiService =
  (method) =>
  (path, options = {}) =>
    axios({
      baseURL: "http://localhost:5000",
      url: path,
      method,
      responseType: options.response ? options.response.responseType : "json",
      headers: { "Content-Type": "application/json" },
      params: options.params && options.params,
      data: options.body && JSON.stringify(options.body),
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "indices", encode: false });
      },
    })
      .then((res) => res)
      .catch((error) => {
        return error.response;
      });

export const ApiClient = {
  GET: apiService("GET"),
  POST: apiService("POST"),
  PUT: apiService("PUT"),
  DELETE: apiService("DELETE"),
};

export default ApiClient;
