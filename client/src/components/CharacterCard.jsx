import { Link, useNavigate } from 'react-router-dom'

export default function CharacterCard({ character, index }) {
    const star = 'https://w7.pngwing.com/pngs/149/21/png-transparent-graphics-star-illustration-star-angle-triangle-logo.png'

    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<img key={i} src={star} alt="star" style={{ width: '20px', height: '20px', margin: '2px' }} />);
        }
        return stars;
    };

    return <>
        <div className="card m-4 p-2" style={{ width: "18rem" }}>
            <div className="text-center">{index + 1}</div>
            <img className="card-img-top m-1 p-2" style={{ width: "100%", height: "100%" }} src={character.wiki_url} alt="Card image cap" />
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">{character.rarity === '5_star' ? renderStars(5) : renderStars(4)}
                </p>
                <Link to={`/characters/${character.id}`}>
                    <button className='btn btn-success'>
                        Details
                    </button>
                </Link>
            </div>
        </div>

    </>
}