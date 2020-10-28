const ENDPOINT ='http://localhost:8085/configurationUI';

export const newConfigurationUI = (configurationUI, setError) =>{ //login

if(configurationUI != null){
  fetch(`${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(configurationUI),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
            if(response.status === 201){
              setError("success");
            console.log("exito UI")}
            else{setError(response.status)}
    })
  }

}
