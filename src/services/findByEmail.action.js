import {IP} from '../components/Connection.js';

export const findByEmail= (email) =>{

  const jwt =sessionStorage.getItem("jwt");
  if(email != null){
  fetch(`${IP}/client/findByEmail/?email=${email}`, {
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
