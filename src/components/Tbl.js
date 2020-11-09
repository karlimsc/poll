import React, { Component } from 'react'

import DataTableComp from './DatatableComp.js';

class Tbl extends Component {
    constructor(props) {
            super(props);

            const dataSet = [
             {
              id: 1,
              name: "Tiger Nixon",
              position: "System Architect",
              office: "Edinburgh",
              ext: 5421,
              date: "2011/04/25",
              salary: "$320,800",
           },
         {
              id: 2,
              name: "Garrett Winters",
              position: "Accountant",
              office: "Tokyo",
              ext: 8422,
              date: "2011/07/25",
              salary: "$170,750",
         },
        {
             id: 3,
             name: "Ashton Cox",
             position: "Junior Technical Author",
             office: "San Francisco",
             ext: 1562,
             date: "2009/01/12",
             salary: "$86,000",
         },
      ];
this.state = {
    data: dataSet
   };
}
deleteRow = (id) => {
const filteredData = this.state.data.filter((i) => i.id !== id);
this.setState({data: filteredData});
};

render() {
      return (
          <div>
            <DataTableComp data={this.state.data}
            deleteRow={this.deleteRow}/>
   </div>
       );
    }
}
export default Tbl;
