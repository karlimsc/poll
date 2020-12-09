import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

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
  Add: () => <Link to='/poll'><AddBox /></Link>,
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <FileCopyIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: (event, rowData) => <Link to={`/pollEdit/${rowData}`}><Edit /></Link>,
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
  baseURL: `http://localhost:8083`
})


function DataTablePoll(props) {

  var columns = [
    {title: "id", field: "id_poll", hidden: true},
    {title: "Name", field: "name"},
    {title: "Type", field: "type"},
    {title: "Start", field: "start_date"},
    {title: "End", field: "end_date"},
    {title: "Status", field: "status"},

  ]

  const [data, setData] = useState([]);

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    api.get("/poll/client/v2/"+sessionStorage.getItem("id"))
        .then(res => {
          console.log(res.data);
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  let handleRowUpdate = (newData, oldData, resolve, reject) => {
    //validation

    console.log('entra en update');
    console.log(newData.id_poll);
    console.log(oldData);
    let errorList = [];

    if(newData.name === ""){
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
  //  props.history.push("/");
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

let history = useHistory();
  let handleRoute = (event, rowData) => {
    console.log('entro aqui en handleRoute', rowData.id_poll)
    let path = `pollEdit/${rowData.id_poll}`;
        history.push(path);
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
              title="Poll List"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    handleRowAdd(newData, resolve, reject);
                  }),
                onRowDelete: (oldData) =>
                  {alert('oldData',oldData)},
              }}
              actions={[
                {
                  icon: Edit,
                  tooltip: 'Edit poll',
                  onClick: (event, rowData) => handleRoute(event, rowData)
                }
              ]}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default DataTablePoll;
