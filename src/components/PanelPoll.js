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
      })).catch(error => this.setState({ error }));
  }

  componentDidMount(){
      this.fetchUpcoming();
  }

    render() {
      const { bpi,  error} = this.state;

        return(
                  <nav className="panel">
                   <p className="panel-heading">
                  <label> Polls</label>
                   </p>
                   <div className="panel-block bc">
                     <Link  to={`/poll`} className="button is-success" >
                      + Add poll1
                      </Link>
                       <button className="button is-success" onClick={this.handleClick}>
                       + Add poll
                       </button>
                   </div>
                   <href className="panel-block bc">
                     <span className="panel-icon">
                       <i className="fas fa-book" aria-hidden="true"></i>
                     </span>
                     <ul>
                     {bpi.map(bpi =>
                       <li key={bpi.id_poll}>
                         <href>{bpi.name}</href>
                       </li>
                     )}
                   </ul>
                   </href>


                   <div className="panel-block bc">
                     <button className="button is-link is-outlined is-fullwidth">
                       All polls
                     </button>
                   </div>
                  </nav>

                )
              }

            }
