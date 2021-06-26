import React, {Component} from "react";
import {IP} from './Connection.js';

import DataTableComp from './DatatableComp.js';

export default class ListAllAuthorities extends Component{
  constructor (props) {
    super(props)
    this.state = {
      authority: []
    }
  }
  state = { auth: [] }

  fetchUpcoming(){
    const ENDPOINTAUTH =IP+':8081/authorities';

    fetch(`${ENDPOINTAUTH}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
     }
    })
    .then(response => response.json())
    .then(data => {
              if(data){
                this.setState(this.authority = data)
              }
              else console.log(data.error)
      });
    }

    componentDidMount(){
      this.fetchUpcoming();
    }

    deleteRow = (id) => {
    const filteredData = this.state.authority.filter((i) => i.id !== id);
    this.setState({authority: filteredData});
    };


  render() {
    const  auth  = this.authority;
    console.log(auth);
        return (
            <div>
              <DataTableComp data={this.authority}
              deleteRow={this.deleteRow}/>
     </div>
         )
      }
}
