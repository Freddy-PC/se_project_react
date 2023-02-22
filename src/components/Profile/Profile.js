import React from "react";
import "./Profile.css";
import SideBar from "./Sidebar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

/* Include components 'sidebar' and  'ClothesSection' */
function Profile({ cards, cardClick }) {
  return (
    <div className="profile__container">
      <SideBar />
      <ClothesSection cards={cards} cardClick={cardClick} />
    </div>
  );
}

export default Profile;
