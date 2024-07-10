import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import PaginationButton from "../components/PaginationButton";
import PageSize from "../components/PageSize";
import Navbar from "../components/navbar";
import "../Css/HomePage.css";
import GeminiChatBot from "../components/ChatBotGemini";
import Footer from "../components/Footer";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, pageSize]);

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("access_token");

      const { data } = await axios.get("http://localhost:3000/characters", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: currentPage,
          limit: pageSize,
        },
      });

      setCharacters(data.characters || []);
      setTotalCharacters(data.totalCharacters || 0);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCharacters / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return (
    <div>
      <Navbar />
      <div className="container-fluid text-center mx-auto p-0">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <GeminiChatBot />
          </div>
          <div className="col-md-8">
            <h2 className="my-4">Character List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : characters.length === 0 ? (
              <p>No characters found.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {characters.map((character) => (
                  <div className="col mb-4" key={character.id}>
                    <CharacterCard character={character} />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 d-flex justify-content-center">
              <PaginationButton
                onClick={handlePrevPage}
                text="Previous"
                disabled={isFirstPage}
                className="btn btn-primary me-2"
              />
              <PaginationButton
                onClick={handleNextPage}
                text="Next"
                disabled={isLastPage}
                className="btn btn-primary"
              />
            </div>
            <div className="mt-3">
              <PageSize
                sizes={[10, 20, 50]}
                onSelectSize={handlePageSizeChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
