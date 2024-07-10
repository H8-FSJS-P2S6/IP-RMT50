import PropTypes from "prop-types";
import "../Css/CharacterCard.css";

const CharacterCard = ({ character }) => {
  const hasJutsu = character && character.jutsu && character.jutsu.length > 0;
  const isFirstJutsuNaruto = hasJutsu && character.jutsu[0].startsWith("Naruto");

  return (
    <div className="card">
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title">{character ? character.name : "Unknown Character"}</h5>
        <div className="character-image-container">
          <img
            src={character ? character.images[0] : ""}
            alt={character ? character.name : ""}
            className="card-img-top character-image"
          />
        </div>
        {hasJutsu ? (
          <p className="card-text">Jutsu: {isFirstJutsuNaruto ? "No jutsu available" : character.jutsu[0]}</p>
        ) : (
          <p className="card-text">Jutsu: Unknown Jutsu</p>
        )}
        <button className="btn btn-primary mt-3">Learn More</button>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    jutsu: PropTypes.arrayOf(PropTypes.string),
    village: PropTypes.string.isRequired,
  }),
};

export default CharacterCard;
