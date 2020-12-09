import React, {useEffect, useState } from "react";
import axios from 'axios'
import Header from './Header.js'
import { newConfigurationUI } from '../services/newConfigurationUI.action.js';

export default function NewConfigurationUI(props) {
  const [icon, setIcon] = useState(null);
  const [background, setBackground] = useState("");
  const [font, setFont] = useState("");
  const [fontColor, setFontcolor] = useState("");
  const [fontsize, setFontsize] = useState(0);
  const [mainColor, setMaincolor] = useState("");
  const [secondaryColor, setSecondary] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(false);
  const client= sessionStorage.getItem("id");
  const api = axios.create({
    baseURL: `http://localhost:8085`
  })
  const formData = new FormData();

  useEffect(() => {
    if(data)
     newConfigurationUI(formData);
   })
   const changePage= (e) => {
         props.history.push("/");
       };

const changeIcon =(e) =>  {
   setIcon(e.target.files[0]);
   console.log(e.target.files[0]);
   const formData = new FormData();
   formData.append(
        "icon",
        e.target.files[0],
        e.target.files[0].name );
        console.log(formData);
 };

  let handleSubmit = (e) => {
    e.preventDefault();


    formData.append(
         "icon",
         icon);
     formData.append("background", background);
     formData.append("font", font);
     formData.append("fontColor", fontColor);
     formData.append("fontSize", fontsize);
     formData.append("mainColor", mainColor);
     formData.append("secondaryColor", secondaryColor);
     formData.append("status", 1);
     formData.append("Client", client);

     for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); }

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

      <div className="form-title"> New Configuration UI</div>
      <div className="container">
      <form className="configuration-form" onSubmit={handleSubmit}  id="form">
      <div className="columns margin-top">
      <div className="column is-2 margin-top">
      </div>
      <div className="column is-8 margin-top">

          <div className="field">
            <label className="label">Icon</label>

            <div className="control">
              <input className="button choose-file"
              type="file"
              name="icon"
              onChange={(e) => setIcon(e.target.files[0])}
              placeholder="Select Icon"/>

             <button className="button is-light" >
               Upload
             </button>
            </div>
          </div>

          <div className="field">
            <label className="label">Background</label>
            <div className="control">
              <input className="input"
              type="text"
              name="name"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Text input"/>
            </div>
        </div>
        <div className="columns">
          <div className="column is-6 margin-top">
              <div className="field">
                <label className="label">Font</label>
                <div className="control">
                  <div className="select">
                    <select value={font} onChange={(e) => setFont(e.target.value)}>
                    <option>Select option</option>
                      <option>Arial</option>
                        <option>Comic Sans</option>
                    </select>
                  </div>
                </div>
              </div>

          <div className="field">
            <label className="label">Secondary Color</label>
            <div className="control">
              <div className="select">
                  <select value={secondaryColor} onChange={(e) => setSecondary(e.target.value)}>
                  <option>Select option</option>
                  <option>Black</option>
                  <option>Green</option>
                </select>
              </div>
            </div>
          </div>

    </div>
  <div className="column is-6 margin-top">

  <div className="field">
    <label className="label">Font Size</label>
    <div className="control">
      <div className="select select-padding-right">
        <select className="ancho" value={fontsize} onChange={(e) => setFontsize(e.target.value)}>
        <option>Select option</option>
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>
    </div>
  </div>
      <div className="field">
        <label className="label">Main Color</label>
        <div className="control">
          <div className="select">
            <select value={mainColor} onChange={(e) => setMaincolor(e.target.value)}>
            <option>Select option</option>
                <option>White</option>
                <option>Orange</option>
            </select>
          </div>
        </div>
      </div>


      </div>
</div>

<div className="columns">
  <div className="column is-6 margin-top">
      <div className="field">
        <label className="label">Font Color</label>
        <div className="control">
          <div className="select">
            <select value={fontColor} onChange={(e) => setFontcolor(e.target.value)}>
            <option>Select option</option>
              <option>Arial</option>
                <option>Comic Sans</option>
            </select>
          </div>
        </div>
      </div>
</div>
</div>

    <div className="container">
      <div className="columns"></div>
        <div  className="column is-4"></div>
        <div className="column is-6">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-success"  value="Submit">Submit</button>
            </div>
            <div className="control">
              <button className="button is-success is-light">Cancel</button>
            </div>
        </div> {/* colum 6 */}
      </div> {/* columns */}
   </div> {/* container */}
      </div>{/* column 8*/}

      </div>{/* columns */}
</form>

  </div>{/* big container */}
</div>
      )
    }
