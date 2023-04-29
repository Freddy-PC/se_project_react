import "./ItemCard.css";

// Clothing values from db.json
function ItemCard({
  clothing,
  cardClick,
  handleLikeClick,
  isLoggedIn,
  currentUser,
}) {
  // Check if the item was liked by the current user!!!!!!!!!!
  console.log(currentUser);
  console.log(clothing);
  const isLiked = clothing.likes.some((owner) => owner._id === currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button" : "card__like-button_hidden"
  }`;

  // IF logged in then current user can have like functionality
  // Like functioality gets id & compares to currentUser

  // isliked should or not update likes if user isLoggedIn???
  return (
    // List of cards
    <li className="card">
      <div className="card__wrapper">
        <h3 className="card__title">{clothing.name}</h3>
        {isLoggedIn ? (
          <>
            <button
              className={itemLikeButtonClassName}
              onClick={() => {
                handleLikeClick(clothing._id, !isLiked);
              }}
            ></button>
          </>
        ) : (
          <>
            <button className="card__like-button"></button>
          </>
        )}
        <img
          // When clicked gets clothig data
          onClick={() => {
            cardClick(clothing);
          }}
          className="card__image"
          src={clothing.imageUrl}
          alt={clothing.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
