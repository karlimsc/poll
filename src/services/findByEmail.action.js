export const findByEmail= (email) =>{

  const jwt =sessionStorage.getItem("jwt");
  if(email != null){
  fetch(`http://155.138.233.164:8084/client/findByEmail/?email=${email}`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': ' application/json',
                'Authorization': 'Bearer '+jwt},
          }).then(res => res.json())
    .then(data => {
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("id", data.idClient);
    })
    .catch(err => {
        console.log(err);
    });
  }
}
