import axios from "axios";
import {IP} from '../components/Connection.js';

axios.defaults.baseURL = IP+':8083';

export const newPoll = (url,data, onSuccess, onError) => {
  return axios({
      method: 'post',
      url: url,
      data: data,
      headers: {
          'content-type': `application/json`}})
          .then((response) => {
              try {
                  onSuccess(response)
              } catch (e) {
                  console.error(e);
              }
          })
          .catch((response) => {
              console.log("error", response);
              onError(response)
          });
}
