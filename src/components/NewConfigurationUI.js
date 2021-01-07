import React, {useEffect, useState } from "react";
import Header from './Header.js'
import Modal from 'react-bootstrap/Modal'
import ReactColorPicker from '@super-effective/react-color-picker';
import { newConfigurationUI } from '../services/newConfigurationUI.action.js';
import Menu from './Menu.js'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function NewConfigurationUI(props) {
  const [icon, setIcon] = useState(null);
  const [background, setBackground] = useState();
  const [font, setFont] = useState("Arial");
  const [fontColor, setFontcolor] = useState();
  const [fontsize, setFontsize] = useState(8);
  const [mainColor, setMaincolor] = useState();
  const [secondaryColor, setSecondary] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState(false);
  const [ruta, setRuta]  = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [showResp, setShowResp] = useState(false);
  const client= sessionStorage.getItem("id");
  const small = 10; const medium= 12; const large= 14;
  const formData = new FormData();
  const vertical = 'top';
  const horizontal= 'center';


  useEffect(() => {
    if(data)
     newConfigurationUI(formData);
   })

   const changePage= (e) => {
         props.history.push("/");
       };

  const onIconChange =(e) =>  {
    setIcon(e.target.files[0]);
    setRuta(URL.createObjectURL(e.target.files[0]));
   };

 const onBackgroundChange = (updatedColor) => {
    setBackground(updatedColor);
  };

  const onMainColorChange = (updatedColor) => {
     setMaincolor(updatedColor);
   };

  const onSecondaryColorChange = (updatedColor) => {
     setSecondary(updatedColor);
   };

   const onFontColorChange = (updatedColor) => {
      setFontcolor(updatedColor);
    };

    const onFontSizeChange = (e) => {
       if(e.target.value === "small"){
       setFontsize(small)}
       else if(e.target.value === "medium"){
       setFontsize(medium) }
       else if(e.target.value === "large"){
       setFontsize(large) }
     };

     function Alert(props) {
       return <MuiAlert elevation={6} variant="filled" {...props} />;
     }

     const handleCloseSnack = (event, reason) => {
       if (reason === 'clickaway') {
         return;
       }
       setOpenSnack(false);
     };

     const hideModalResp = () => {
       setShowResp(false);
     };

  let handleSubmit = (e) => {
    e.preventDefault();

    console.log(icon, background, font, fontColor, mainColor, secondaryColor)
    formData.append( "icon",icon);
     formData.append("background", background);
     formData.append("font", font);
     formData.append("fontColor", fontColor);
     formData.append("fontSize", fontsize);
     formData.append("mainColor", mainColor);
     formData.append("secondaryColor", secondaryColor);
     formData.append("status", 1);
     formData.append("Client", client);

      if (icon === null) {
          setOpenSnack(true);
      } else
      newConfigurationUI('http://localhost:8085/configurationUI',
                 formData,
                 (response) => {
                     setError(response.status);
                     console.log(response.status);
                 },
                 (error) => {setError(error)})
console.log(error);
        if(error  === 200)
        setShowResp(true);
    };


      return(
<div className="color-background">
<Header/>

      <div className="columns">
      <div className="column is-2">
          <Menu/>
      </div>
      <div  className="column is-9 dashboard" style={{paddingTop:"3%"}}>
      <form className="configuration-form" onSubmit={handleSubmit}  id="form">
        <div className="form-title"> New Configuration UI</div>
          <div className="row">

          <div className="column is-6 margin-top">

          <div className="field">
              <label className="label">Background</label>
                <div className="control">
                  <ReactColorPicker color={background} onChange={onBackgroundChange}/>
                </div>
          </div>

          <div className="field">
             <label className="label">Main Color</label>
             <div className="control">
                 <ReactColorPicker color={mainColor} onChange={onMainColorChange}/>
             </div>
          </div>

          <div className="field">
              <label className="label">Secondary Color</label>
              <div className="control">
                    <ReactColorPicker color={secondaryColor} onChange={onSecondaryColorChange}/>
              </div>
          </div>

          <div className="field">
                <label className="label">Font Color</label>
                <div className="control">
                  <ReactColorPicker color={fontColor} onChange={onFontColorChange}/>
                </div>
              </div>

          </div>

          <div className="column is-6 margin-top">

      <div className="field">
        <label className="label">Icon</label>
        <div className="control">
          <input className="button choose-file"
          style={{width:"100%"}}
          type="file"
          name="icon"
          accept="image/gif, image/jpeg, image/png"
          onChange={onIconChange}
          placeholder="Select Icon"/>
        </div>
        <div className="control">
          <img className="image-upload" src={ruta} alt="" />
        </div>
      </div>



      <div className="field">
            <label className="label">Font</label>
            <div className="control">
              <div className="select ancho">
                <select className="ancho" onChange={(e) => setFont(e.target.value)}>
                  <option>Arial</option>
                    <option>Comic Sans</option>
                </select>
              </div>
            </div>
          </div>

      <div className="field">
        <label className="label">Font Size</label>
        <div className="control">
          <div className="select ancho">
            <select className="ancho" onChange={onFontSizeChange}>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </div>
        </div>
      </div>

          </div>

        <div className="column is-12" style={{display:"grid"}}>
          <button  className="button azul-banner">
          Submit
          </button>
        </div>

        </div>{/* row */}
      </form>

  </div> {/* big container */}
</div>

<Modal
   show={showResp}
   onHide={hideModalResp}
   backdrop="static"
   keyboard={false}
 >
 <Modal.Header closeButton>
 </Modal.Header>
   <Modal.Body>
     <div className="container">
      <p>Configuration UI was created successfully. </p>
   </div>
   </Modal.Body>
   <Modal.Footer>
       <button className="button is-success" onClick={changePage}>ok</button>
   </Modal.Footer>
 </Modal>

<Snackbar className="tab" open={openSnack} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={16000} onClose={handleCloseSnack}>
      <Alert onClose={handleCloseSnack} severity="error">
        There are empty fields!
      </Alert>
</Snackbar>

</div>
      )
    }
