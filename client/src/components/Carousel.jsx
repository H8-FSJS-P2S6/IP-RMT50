import React from 'react';

export default function Carousel() {
    return (
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide-to={0}
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                />
                <button
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                />
                <button
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide-to={2}
                    aria-label="Slide 3"
                />
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://cdn.gameleap.com/images/articles/art_5zHg1aFoR9/art-img_YkdptXlng/1x.webp" className="d-block w-100" alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img src="https://assetsio.gnwcdn.com/genshin-impact-from-ashes-reborn-july-august-2023.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp" className="d-block w-100" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/genshin-impact/8/8a/Genshin-banner-nilou.jpg?width=1280" className="d-block w-100" alt="Third slide" />
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
