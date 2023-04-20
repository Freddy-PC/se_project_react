import React from "react";
import "./SideBar.css";
import avatarImage from "../../../images/avatar-image.png";

function SideBar({ currentUser }) {
  return (
    <div className="sidebar__container">
      <div className="sidebar__info">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="user avatar"
        />
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
    </div>
  );
}

export default SideBar;
