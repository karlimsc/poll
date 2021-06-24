import axios from "axios";


export const getResultsByIdPoll = (id_poll,onSuccess, onError) => {
  return axios.get(`http://155.138.233.164:8087/result/`+id_poll)
      .then(res => {
        if(res.status === 200)
            onSuccess(res.data);
        else
        onError(res.error)
      })
}
