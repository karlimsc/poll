import React from "react";

export default function Menu() {

  return (
    <div>
      <aside className="menu">
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li><href>Dashboard</href></li>
          <li><href>Customers</href></li>
        </ul>
        <p className="menu-label">
          Administration
        </p>
        <ul className="menu-list">
          <li><href>Team Settings</href></li>
          <li>
            <href className="is-active">Manage Your Team</href>
            <ul>
              <li><href>Members</href></li>
              <li><href>Plugins</href></li>
              <li><href>Add a member</href></li>
            </ul>
          </li>
          <li><href>Invitations</href></li>
          <li><href>Cloud Storage Environment Settings</href></li>
          <li><href>Authentication</href></li>
        </ul>
        <p className="menu-label">
          Transactions
        </p>
      </aside>
    </div>
);
}
