import React from "react";

export default function ConfigurationsUI(props) {
  let url="/login";
return(
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Configurations UI
              </p>
              <a href={url} class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href={url}>@karlimsc</a>.
                <a href={url}>#css</a>
                <a href={url}>#responsive</a>
                <br/>
              </div>
            </div>
            <footer class="card-footer">
              <a href={url} class="card-footer-item">Add</a>
              <a href={url} class="card-footer-item">List</a>
              <a href={url} class="card-footer-item">Delete</a>
            </footer>
          </div>
        )
}
