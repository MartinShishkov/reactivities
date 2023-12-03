import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { handle400, handle401, handle403, handle404, handle500 } from "./error-handlers";

const sleep = (delayMs: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
};

const handleOnFulfilled = async (response: AxiosResponse<any, any>) => {
  await sleep(2000);
  return response
};

const handleOnRejected = (error: AxiosError) => {
  const { status } = error.response!;

  switch(status) {
    case 400:
      handle400(error.response!);
      break;
    case 401: 
      handle401();
      break;
    case 403: 
      handle403();
      break;
    case 404: 
      handle404();
      break;
    case 500: 
      handle500(error.response!);
      break;
  }

  return Promise.reject(error);
};

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.response.use(handleOnFulfilled, handleOnRejected);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post<void>('activities', activity),
  update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`)
};

const agent = {
  Activities
};

export default agent;