import React from 'react';

const Pagination = ({ youtubersPerPage, totalYoutubers, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalYoutubers / youtubersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8">
      <ul className="flex justify-center space-x-2">

          <li key={1}>
            <button
            //   onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 rounded ${
                // currentPage === number
                  'bg-blue-500 text-white'
                //   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {1}
            </button>
          </li>

      </ul>
    </nav>
  );
};

export default Pagination;