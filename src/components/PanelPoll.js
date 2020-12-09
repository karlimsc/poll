import React, { Component} from "react";
import { Redirect } from 'react-router-dom'
import { Link }  from 'react-router-dom'


 export default class PanelPoll extends Component {

  state = { bpi: [] , error: null , redirect: false}


   handleClick = () => {
     this.setState({ redirect:  true})
   }

   renderRedirect = () => {
   if (this.state.redirect) {
     return <Redirect to='/poll' />
   }
 }

  fetchUpcoming() {
    const id = sessionStorage.getItem("id");
    console.log(sessionStorage.getItem("id"))
    if(id){
     fetch(`http://localhost:8083/poll/client/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
         }
    }).then(res => res.json())
    .then(data =>
      this.setState({
        bpi: data,
      })).catch(error => this.setState({ error }));}
  }

  componentDidMount(){
      this.fetchUpcoming();
  }

    render() {
      const { bpi,  error} = this.state;
      const url_polls="/polls";
      const url_poll="/poll"

        return(
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
            Polls
            </p>
          </header>
                   <href className="panel-block bc">
                     <span className="panel-icon">
                       <i className="fas fa-book" aria-hidden="true"></i>
                     </span>
                     <ul>
                     {(bpi && bpi.length > 0) ?

                       bpi.map(bpi =>
                       <li key={bpi.id_poll}>
                         <href>{bpi.name}</href>
                       </li>
                     ):<small>{error}</small>
                   }
                   </ul>
                   </href>

                         <footer className="card-footer">
                          <a href={url_poll} className="card-footer-item">Add</a>
                           <a href={url_polls} className="card-footer-item">List</a>
                         </footer>

                  </div>

                )
              }

            }
