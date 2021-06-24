import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom'
import { useHistory } from 'react-router-dom';
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
  Add: () => <Link to='/poll'><AddBox /></Link>,
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <FileCopyIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: (event, rowData) => <Link to={`/pollEdit/${rowData}`}><Edit /></Link>,
  ToggleOnIcon:forwardRef((props, ref) => <ToggleOnIcon {...props} ref={ref} />),
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
  baseURL: `http://155.138.233.164:8083`
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
    api.get("/poll/client/v2/"+id_client)
        .then(res => {
          console.log(res.data);
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

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

let handleDuplicate = (event, rowData) => {
  console.log(rowData)
  api.get("/poll/duplicate/"+rowData.id_poll)
  .then(res => {
    console.log(res.data);
      setData(res.data)
   })
   .catch(error=>{
       console.log(error);
   })

   window.location.reload(false);
}
let handleStatus = (event, rowData) => {

  api.put("/poll/status/"+rowData.id_poll, rowData)
  .then(data => {
    if(data.status === 200){
    window.location.reload(false);}
   else{
     console.log(data.error)
     setErrorMessages(data.error)
     setIserror(true)
   }}).catch(error=>{
       console.log(error);
   })
  window.location.reload(false);
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
              title="Poll List"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    handleRowAdd(newData, resolve, reject);
                  })
              }}
              actions={[
                {
                  icon: ToggleOnIcon,
                  tooltip: 'Change status',
                  onClick: (event, rowData) => handleStatus(event, rowData)
                },
                {
                  icon: FileCopyIcon,
                  tooltip: 'Duplicate poll',
                  onClick: (event, rowData) => handleDuplicate(event, rowData)
                },
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
  </div>
  );
}

export default DataTablePoll;
