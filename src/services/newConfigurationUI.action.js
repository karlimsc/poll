import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8085';

export const newConfigurationUI = (url, data, onSuccess, onError) => {
    return axios({
        method: 'post',
        url: url,
        headers: {
            'content-type': `multipart/form-data; boundary=${data._boundary}`},
        data: data})
            .then((response) => {
                try {
                    onSuccess(response)
                } catch (e) {
                    console.error(e);
                }

            })
            .catch((response) => {
                if (response.status !== 200) {
                console.log("error", response.status);
                }
                onError(response)
            });
};
