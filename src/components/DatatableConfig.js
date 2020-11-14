import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
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
import FileCopyIcon from '@material-ui/icons/FileCopy';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <FileCopyIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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

const api = axios.create({
  baseURL: `http://localhost:8085`
})
const ENDPOINTCONFIG = `http://localhost:8085`;
const client= { "idClient" : sessionStorage.getItem("id")}

function DataTableConfig() {

  var columns = [
    {title: "id", field: "id_config", hidden: true},
    {title: "Icon", field: "icon"},
    {title: "Background", field: "background"},
    {title: "Main Color", field: "mainColor"},
    {title: "Secondary Color", field: "secondaryColor"},
    {title: "Font", field: "font"},
    {title: "Font Size", field: "fontSize"},
    {title: "Font Color", field: "fontColor"},
    {title: "Status", field: "status"},

  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    api.get("/configurationUI/client/"+sessionStorage.getItem("id"))
        .then(res => {
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  let handleRowUpdate = (newData, oldData) => {
    //validation
console.log('entra en update');
    let errorList = [];

    if(newData.icon === ""){
      errorList.push("Please enter icon")
    }
    if(newData.background === ""){
      errorList.push("Please enter background")
    }
    if(newData.mainColor === ""){
      errorList.push("Please enter main color")
    }
    if(newData.secondaryColor === ""){
      errorList.push("Please enter secondary color")
    }
    if(newData.fontColor === ""){
      errorList.push("Please enter main color")
    }
    if(newData.status === ""){
      errorList.push("Please enter status")
    }

    if(errorList.length < 1){
      const putMethod = {
       method: 'PUT', // Method itself
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
      },
       body: JSON.stringify(newData) // We send data in JSON format
      }
      fetch(`${ENDPOINTCONFIG}${oldData.id_config}`, putMethod)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        setErrorMessages([]);
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
      })
      }else{
      setErrorMessages(errorList)
      setIserror(true)}

  }

  let handleRowAdd = (newData, resolve) => {
    let errorList = []


    if(errorList.length < 1){
      console.log("entro en ADD")
    }else{
      console.log(errorList)
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }
  const handleRowDelete = (oldData, resolve) => {

    console.log("entro aqui en delete")
  }

  return (
    <div className="App table-config" >

      <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
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
              title="Configurations UI"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
            {handleRowUpdate(newData, oldData)},
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                      console.log('entra add');
                    handleRowAdd(newData, resolve);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}

            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default DataTableConfig;
