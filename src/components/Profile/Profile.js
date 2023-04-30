import React from "react";
import "./Profile.css";
import SideBar from "./Sidebar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

/* Include components 'sidebar' and  'ClothesSection' */
function Profile({
  cards,
  cardClick,
  addModalClick,
  currentUser,
  handleEditClick,
  handleLogout,
  isLoggedIn,
  handleLikeClick,
}) {
  return (
    <div className="profile__container">
      <SideBar
        currentUser={currentUser}
        handleEditClick={handleEditClick}
        handleLogout={handleLogout}
      />
      <ClothesSection
        cards={cards}
        cardClick={cardClick}
        addModalClick={addModalClick}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
}

export default Profile;
