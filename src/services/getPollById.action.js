import axios from "axios";


export const getPollById = (id_poll,onSuccess, onError) => {
  return axios.get(`http://localhost:8083/poll/find/`+id_poll)
      .then(res => {
        if(res.status === 200)
            onSuccess(res.data);
        else
        onError(res.error)
      })
}
