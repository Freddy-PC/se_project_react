import "./ItemCard.css";

// Clothing values from db.json
function ItemCard({
  clothing,
  cardClick,
  handleLikeClick,
  isLoggedIn,
  currentUser,
}) {
  // const [isLiked, setIsLiked] = useState(null);
  // How could I improve this?
  const isLiked = clothing.likes?.some((user) => user == currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button" : "card__like-button_liked"
  } `;
  console.log(isLiked);

  // displays button if user isLoggedIn
  return (
    // List of cards
    <li className="card">
      <div className="card__wrapper">
        <h3 className="card__title">{clothing.name}</h3>
        {isLoggedIn ? (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={(e) => {
              e.stopPropagation();
              console.log(clothing);
              handleLikeClick(clothing._id, !isLiked);
            }}
          ></button>
        ) : (
          <button type="button" className="card__like-button_hidden"></button>
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
