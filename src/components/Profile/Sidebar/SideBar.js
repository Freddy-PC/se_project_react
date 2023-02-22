import React from "react";
import "./SideBar.css";
import avatarImage from "../../../images/avatar-image.png";

function SideBar() {
  return (
    <div className="sidebar__container">
      <div className="sidebar__info">
        <img className="sidebar__avatar" src={avatarImage} alt="user avatar" />
        <p className="sidebar__name">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default SideBar;
