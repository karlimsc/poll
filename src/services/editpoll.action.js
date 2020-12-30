import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8083/poll/';

export const editPoll = (url,data, onSuccess, onError) => {
  return axios({
      method:'put',
      url: url,
      data: data,
      headers: {
          'content-type': `application/json`}})
          .then((response) => {
              try {
                  onSuccess(response)
              } catch (e) {
                    onError(e);
              }
          }).catch((response) => {
              if (response.status !== 200) {
              console.log("error", response.status);
              }
              onError(response)
          });
}
