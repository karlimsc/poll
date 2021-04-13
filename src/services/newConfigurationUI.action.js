import axios from "axios";

export const newConfigurationUI = (url, data, onSuccess, onError) => {
    return axios({
        method: 'post',
        url: url,
        headers: {
            'content-type': `multipart/form-data; boundary=${data}`},
        data: data})
            .then((response) => {
                try {
                    onSuccess(response)
                } catch (e) {
                    console.error(e);
                }

            })
            .catch((response) => {
                console.log("error", response.status);
                onError(response)
            });
};
