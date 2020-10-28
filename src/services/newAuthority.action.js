const ENDPOINT ='http://localhost:8081/authority';

export const newAuthority = (authority, setError) =>{ //login

if(authority != null){
  fetch(`${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(authority),
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
