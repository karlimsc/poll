import axios from "axios";
import {IP} from '../components/Connection.js';


axios.defaults.baseURL = IP+':8081';

export const newAuthority = (url,data, onSuccess, onError) => {
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
              if (response.status !== 201) {
              console.log("error", response.status);
              }
              onError(response)
          });
}
