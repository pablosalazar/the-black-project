import axios from 'axios';
import { setErrorMessageApp, setSuccessMessageApp } from './actions';

const setupAxios = (store) => {
  axios.interceptors.request.use(
    (config) => {
      const access_token = localStorage.getItem('access_token');

      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    function (response) {
      if (response.status === 201) {
        store.dispatch(setSuccessMessageApp(response.data.message));
      }
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('access_token');
          window.location.href = '/';
        } else if (error.response.status === 422) {
          return Promise.reject(error);
        } else if (error.response.data) {
          store.dispatch(setErrorMessageApp(error.response.data.error));
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxios;
