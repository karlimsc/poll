import React, {Component} from "react";

 export default class PanelPoll extends Component {
   state = { bpi: [] , error: null}

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
      const { bpi,  error } = this.state;
      console.log(bpi);
        return (
                  <nav className="panel">
                   <p className="panel-heading">
                  <label> Polls</label>
                   </p>
                   <div className="panel-block">
                       <button className="button is-success">+ Add poll</button>
                   </div>
                   <href className="panel-block">
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
                

                   <div className="panel-block">
                     <button className="button is-link is-outlined is-fullwidth">
                       All polls
                     </button>
                   </div>
                  </nav>

                )
              }
}
