import React from "react";

export default function Authority(props) {
  let url_add="/authority";
  let url_list = "/authorities";
  let  url = "/authority";
return(
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                Authority
              </p>
              <a href={url} className="card-header-icon" aria-label="more options">
                <span className="icon">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div className="card-content">
              <div className="content">
                Manage multiple authorities to protect into all survey data collected across your organization
                <br/>
              </div>
            </div>
            <footer className="card-footer">
              <a href={url_add} className="card-footer-item">Add</a>
              <a href={url_list} className="card-footer-item">List</a>
            </footer>
          </div>
        )
}
