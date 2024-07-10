import React, { useState, useEffect } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/pagination';
import SearchBar from '../components/searchbar';
import YouTuberCard from '../components/YouTuberCard';
import YouTuberList from '../components/YouTuberList';

function Homepage() {
    const [youtubers, setYoutubers] = useState([]);
    const [filteredYoutubers, setFilteredYoutubers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const youtubersPerPage = 10;

    useEffect(() => {
        // Fetch youtubers data from API or load from a file
        // For now, we'll use mock data
        const mockData = [
            // Add mock YouTuber data here
        ];
        setYoutubers(mockData);
        setFilteredYoutubers(mockData);
    }, []);

    const indexOfLastYoutuber = currentPage * youtubersPerPage;
    const indexOfFirstYoutuber = indexOfLastYoutuber - youtubersPerPage;
    const currentYoutubers = filteredYoutubers.slice(indexOfFirstYoutuber, indexOfLastYoutuber);


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">YouTubers Rankings</h1>
            <div className="flex mb-4">
                <SearchBar  />
                <FilterDropdown />
            </div>
            <YouTuberList  />
            <Pagination
            
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
export default Homepage