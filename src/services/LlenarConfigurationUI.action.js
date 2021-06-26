import {IP} from '../components/Connection.js';
const ENDPOINT =IP+':8085/configurationUI/client/';
  const id = sessionStorage.getItem("id");

export default function LlenarConfigurationUI (props){

  fetch(`${ENDPOINT}${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
   }
  })
  .then(response => response.json())
  .then(data => {
            if(data.status === 200){
              const { configurationUI = [] } = data
              console.log(data)
              props.onResults(configurationUI)
            }
            else{props.onResults("error")}
    });
}
