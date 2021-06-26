import axios from "axios";
import {IP} from '../components/Connection.js';


export const getPollById = (id_poll,onSuccess, onError) => {
  return axios.get(IP+`:8083/poll/find/`+id_poll)
      .then(res => {
        if(res.status === 200)
            onSuccess(res.data);
        else
        onError(res.error)
      })
}
