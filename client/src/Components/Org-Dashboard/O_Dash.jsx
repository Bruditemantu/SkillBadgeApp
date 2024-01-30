import React from "react";
import "./O_Dash.css"

const O_Dash = () => {
  return <div>
      <div className="dashboard">
      <div className="dash-left">
        <div className="profile">
          <div className="profile-image"></div>
          <p>username</p>
          <p>email</p>
        </div>
        <hr />
        <div className="menu">
          <ul className="badge-menu">
          <p>Manadge Badges</p>
            <li>Add New Badge</li>
            <li>View AllBadges</li>
            <li>Assign A Badge</li>
          </ul>
          <hr />
          <ul className="profile-menu">
          <p>Profile</p>
            <li>View Profile</li>
            <li>Edit Profile</li>
          </ul>
        </div>
      </div>
      <div className="dash-content">
        <h1>Dashboard</h1>
        <h3>Welcome User</h3>
      </div>
      
    </div>
  </div>;
};

export default O_Dash;
