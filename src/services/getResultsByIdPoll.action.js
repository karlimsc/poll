import axios from "axios";
import {IP} from '../components/Connection.js';


export const getResultsByIdPoll = (id_poll,onSuccess, onError) => {
  return axios.get(IP+`:8087/result/`+id_poll)
      .then(res => {
        if(res.status === 200)
            onSuccess(res.data);
        else
        onError(res.error)
      })
}
