import { AxiosResponse } from "axios";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import { store } from "../stores/store";

export const handle400 = (response: AxiosResponse) => {
  const { data, config } = response;

  console.log({data, config});
  if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
    router.navigate('/not-found');
  }

  if (data.errors) {
    const modelStateErrors: string[] = [];
    Object.keys(data.errors).forEach((key) => {
      if (data.errors[key]) {
        modelStateErrors.push(data.errors[key]);
      }
    });

    throw modelStateErrors.flat();
  } else {
    toast.error(data);
  }
};

export const handle401 = () => {
  toast.error('unauthorized');
};

export const handle403 = () => {
  toast.error('forbidden');
};

export const handle404 = () => {
  router.navigate('/not-found');
};

export const handle500 = (response: AxiosResponse) => {
  store.globalStore.setServerError(response.data);
  router.navigate('/server-error');
};