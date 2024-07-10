import PropTypes from "prop-types";
import "../Css/CharacterCard.css";

const CharacterCard = ({ character }) => {
  const hasJutsu = character && character.abilities && character.abilities.length > 0;
  const isFirstJutsuNaruto = hasJutsu && character.abilities.includes("Naruto");

  return (
    <div className="card">
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title">{character ? character.name : "Unknown Character"}</h5>
        <div className="character-image-container">
          <img
            src={character ? character.imageUrl : ""}
            alt={character ? character.name : ""}
            className="card-img-top character-image"
          />
        </div>
        {hasJutsu ? (
          <p className="card-text">Abilities: {isFirstJutsuNaruto ? "No jutsu available" : character.abilities[0]}</p>
        ) : (
          <p className="card-text">Abilities: Unknown Abilities</p>
        )}
        <button className="btn btn-primary mt-3">Learn More</button>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    village: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default CharacterCard;
