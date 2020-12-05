import React from "react";

export default function PanelConfigurationsUI(props) {
  let url="/questions";
  let urlAdd="/configurationUI";
  let urlList ="/configurationUIList"

return(
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                Configurations UI
              </p>
              <a href={url} className="card-header-icon" aria-label="more options">
                <span className="icon">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div className="card-content">
              <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              
                <br/>
              </div>
            </div>
            <footer className="card-footer">
              <a href={urlAdd} className="card-footer-item">Add</a>
              <a href={urlList} className="card-footer-item">List</a>
            </footer>
          </div>
        )
}
