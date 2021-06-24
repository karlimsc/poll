import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom'

import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
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
import Menu from './Menu.js'

const tableIcons = {
  Add: () => <Link to='/configurationUI'><AddBox /></Link>,
  ToggleOnIcon:forwardRef((props, ref) => <ToggleOnIcon {...props} ref={ref} />),
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
  baseURL: `http://155.138.233.164:8085`
})

function DataTableConfig(props) {

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
    const id_client= sessionStorage.getItem("id");
    console.log(sessionStorage.getItem("id"))
    api.get("/configurationUI/client/"+id_client)
        .then(res => {
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  let handleDuplicate = (event, rowData) => {
    console.log(rowData)
    api.get("/configurationUI/duplicate/"+rowData.id_config)
    .then(res => {
      if(res.status === 200){
      window.location.reload(false);}
     })
     .catch(error=>{
         console.log(error);
     })
  }

  let handleStatus = (event, rowData) => {
    console.log(rowData)
    api.put("/configurationUI/status/"+rowData.id_config, rowData)
    .then(res => {
      if(res.status === 200){
      window.location.reload(false);}
     else{
       console.log(res.error)
       setErrorMessages(res.error)
       setIserror(true)
     }}).catch(error=>{
         console.log(error);
     })
  }

  let handleRowUpdate = (newData, oldData, resolve, reject) => {
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
      api.put("/configurationUI/update/"+oldData.id_config, newData)
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

  let handleRowAdd = (newData, resolve) => {
    props.history.push("/");
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

  return (
    <div className="columns">
      <div className="column is-2">
          <Menu/>
      </div>
      <div  className="column is-9 dashboard" style={{paddingTop:"3%"}}>

      <Grid container spacing={1}>
          <Grid item xs={11}>
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
                new Promise((resolve, reject) => {
                   handleRowUpdate(newData, oldData, resolve, reject);
                }),
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    handleRowAdd(newData, resolve, reject);
                  })
              }}
              actions={[
                {
                  icon: ToggleOnIcon,
                  tooltip: 'Status off',
                  onClick: (event, rowData) => handleStatus(event, rowData)

                },
                {
                  icon: FileCopyIcon,
                  tooltip: 'Duplicate',
                  onClick: (event, rowData) => handleDuplicate(event, rowData)
                }
              ]}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  </div>
  );
}

export default DataTableConfig;
