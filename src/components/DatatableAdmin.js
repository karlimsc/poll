import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  //Delete: forwardRef((props, ref) => <FileCopyIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const id_client= sessionStorage.getItem("id");
const api = axios.create({
  baseURL: `http://localhost:8084`
})

const jwt =sessionStorage.getItem("jwt");

function validateEmail(email){
  const re = /^\S+@\S+\.\S+$/;
  return re.test(String(email).toLowerCase());
}

function DataTableAdmin() {

  var columns = [
    {title: "id", field: "id_auth", hidden: true},
    {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.name} />  },
    {title: "Name", field: "name"},
    {title: "Email", field: "email"},
    {title: "Code", field: "password"},
    {title: "Rif", field: "rif"},
    {title: "Address", field: "address"},
    {title: "Status", field: "status"}
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    console.log(window.sessionStorage.getItem('jwt'));
        let config = {
         headers: {
           'Authorization': 'Bearer ' + jwt
       }
     }
    axios.get('http://localhost:8084/clients',
      config).then(res => {
            setData(res.data);
            console.log(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  let handleRowUpdate  = (newData, oldData, resolve, reject) => {
    //validation
    let errorList = [];

    if(newData.name === ""){
      errorList.push("Please enter first name")
    }
    if(newData.email === "" || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }
    if(newData.status === ""){
      errorList.push("Please enter status")
    }

    if(errorList.length < 1){

      let config = {
       headers: {
         'Authorization': 'Bearer ' + jwt
         }
       }
            axios.put("http://localhost:8084/client/update/"+id_client, newData ,
              config)
            .then(res => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve()
              setIserror(false)
              setErrorMessages([])
            })
            .catch(error => {
              setErrorMessages(["Update failed! Server error"])
              setIserror(true)
              reject()
            })
          }else{
            setErrorMessages(errorList)
            setIserror(true)
            reject()
          }
  }

  let handleRowAdd = (newData, resolve, reject) => {
    console.log("entra en add", newData)
    let errorList = []
    if(newData.name === undefined){
      errorList.push("Please enter name")
    }
    if(newData.status === undefined){
      errorList.push("Please enter status")
    }
    if(newData.password === undefined){
        errorList.push("Please enter code")
    }
    if(newData.rif === undefined){
        errorList.push("Please enter rif")
    }
    if(newData.status === undefined){
        errorList.push("Please enter status")
    }
    if(newData.email === undefined || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }
    if(errorList.length < 1){
     api.post("/client", newData)
     .then(res => {
       let dataToAdd = [...data];
       dataToAdd.push(newData);
       setData(dataToAdd);
       resolve()
       setErrorMessages([])
       setIserror(false)
     })
     .catch(error => {
       setErrorMessages(["Cannot add data. Server error!"])
       setIserror(true)
       reject()
     })
   }else{
     setErrorMessages(errorList)
     setIserror(true)
     reject()
   }
  }

  return (
      <div style={{paddingTop:"3%"}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
          <div>
            {iserror &&
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }
          </div>
            <MaterialTable
              title="Clients"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                   handleRowUpdate(newData, oldData, resolve, reject);
                }),
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    handleRowAdd(newData, resolve, reject);
                  })
              }}

            />
          </Grid>
        </Grid>

      </div>
  );
}

export default DataTableAdmin;