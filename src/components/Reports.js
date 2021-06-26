import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from './Header.js'
import Menu from './Menu.js'
import { Bar } from 'react-chartjs-2'
import { getResultsByIdPoll } from '../services/getResultsByIdPoll.action.js';
import {IP} from './Connection.js';

const id_client= sessionStorage.getItem("id");
const api = axios.create({
  baseURL: `${IP}:8083`
})


export default function BarChart () {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/poll/client/v2/"+id_client)
        .then(res => {
          console.log(res.data);
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

const handleResults = (response) => {
let answers = response.answers;
let votes= response.result;
let answer = [];
  for(var i= 0; i < answers.length; i++) {
    answer.push(answers[i].answer);
  }
  setResult(votes);
  setAnswer(answer);
}


const onPollChange = (e) => {
  let id_poll= e.target.value;

  getResultsByIdPoll(id_poll,
             (response) => {
               if(response)
                 handleResults(response);
             },
             (error) => {setError(error)})
             console.log(error);

};


  return (
    <div className="color-background">
      <Header/>
{console.log(answer)}
      <div className="columns">
        <div className="column is-2">
            <Menu/>
        </div>
        <div  className="column is-9 dashboard" style={{paddingTop:"3%"}}>

          <form className="configuration-form">
              <div className="form-title"> Reports</div>
          <div className="columns margin-top">
          <div className="column is-2 margin-top">
          </div>

          <div className="column is-8 margin-top">
            <div className="field">
                  <div className="control">
                    <div className="select ancho">
                      <select className="ancho" onChange={onPollChange}>
                        <option>Choose a poll</option>
                        {(data.length > 0) ?
                         data.map((poll, index) => {
                           return (
                            <option key={index} value={poll.id_poll}>{poll.name}</option>
                           );
                         })
                         :<option>"Ha ocurrido un error"</option>
                        }
                      </select>
                    </div>
                  </div>
                </div>

            <Bar
              data={{
                labels: answer,
                datasets: [{
                  label: '# of Votes',
                  data: result,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
              }}
              height={20}
              width={40}
              option={{maintainAspectRatio: false}}
              />
        </div>

          </div> {/* columns */}

        </form>
    </div>
    </div>
  </div>

  )
}
