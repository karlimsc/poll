import React, {useEffect, useState } from "react";
import axios from 'axios'
import Header from './Header.js'
import ReactColorPicker from '@super-effective/react-color-picker';
import { newConfigurationUI } from '../services/newConfigurationUI.action.js';

export default function NewConfigurationUI(props) {
  const [icon, setIcon] = useState(null);
  const [background, setBackground] = useState('#090000');
  const [font, setFont] = useState("Arial");
  const [fontColor, setFontcolor] = useState('#090000');
  const [fontsize, setFontsize] = useState(8);
  const [mainColor, setMaincolor] = useState('#090000');
  const [secondaryColor, setSecondary] = useState('#090000');
  const [error, setError] = useState("");
  const [data, setData] = useState(false);
  const [ruta, setRuta]  = useState(null);
  const client= sessionStorage.getItem("id");
  const api = axios.create({
    baseURL: `http://localhost:8085`
  })
  const small = 10; const medium= 12; const large= 14;
  const formData = new FormData();


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
      console.log(fontsize);
      console.log(e.target.value)
       if(e.target.value === "small"){
         console.log('entra en if small')
       setFontsize(small)}
       else if(e.target.value === "medium"){
          console.log('entra en if medium')
       setFontsize(medium) }
       else if(e.target.value === "large"){
          console.log('entra en if large')
       setFontsize(large)}

       console.log(fontsize)
     };

  let handleSubmit = (e) => {
    e.preventDefault();

    formData.append( "icon",icon);
     formData.append("background", background);
     formData.append("font", font);
     formData.append("fontColor", fontColor);
     formData.append("fontSize", fontsize);
     formData.append("mainColor", mainColor);
     formData.append("secondaryColor", secondaryColor);
     formData.append("status", 1);
     formData.append("Client", client);

      if (icon === "" || background === "" || font === "") {
          alert("Ingrese los datos correctamente");
      } else
      newConfigurationUI('/configurationUI',
                 formData,
                 (response) => {
                     setError(response.status);
                 },
                 (error) => {setError(error)})
console.log(error);
        if(error  === 200)
        changePage();
    };


      return(
<div className="color-background">
<Header/>

      <div className="container">
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
            <option>small</option>
            <option>medium</option>
            <option>large</option>
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

  </div>{/* big container */}
</div>
      )
    }
