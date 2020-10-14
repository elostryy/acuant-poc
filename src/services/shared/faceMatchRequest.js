import axios from 'axios';
import { config } from '../../config';

const client = (() => {
  return axios.create({
    baseURL: config.REACT_APP_FRM_ENDPOINT,
  });
})();

const request = function (options, store) {
  const onSuccess = function (response) {
    console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function (error) {
    return Promise.reject(error.response || error.message);
  };

  let AUTH_TOKEN = btoa(
    `${config.REACT_APP_USER_NAME}:${config.REACT_APP_PASSWORD}`
  );
  options.headers = {
    Authorization: `Basic ${AUTH_TOKEN}`,
    Accept: 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8',
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
