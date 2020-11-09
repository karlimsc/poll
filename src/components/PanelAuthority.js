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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href={url}>@Karlimsc</a>.
                <a href={url}>#css</a>
                <a href={url}>#responsive</a>
                <br/>
              </div>
            </div>
            <footer className="card-footer">
              <a href={url_add} className="card-footer-item">Add</a>
              <a href={url_list} className="card-footer-item">List</a>
              <a href={url} className="card-footer-item">Delete</a>
            </footer>
          </div>
        )
}
