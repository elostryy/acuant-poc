import axios from 'axios';
import axiosRetry from 'axios-retry';
import { config } from '../../config';
/*
 global window
 */

const client = (() => {
  return axios.create({
    baseURL: config.REACT_APP_ID_ENDPOINT,
  });
})();

axiosRetry(client, { retries: 3 });

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
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
