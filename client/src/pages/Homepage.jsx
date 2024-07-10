import React, { useEffect, useState } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/pagination';
import SearchBar from '../components/searchbar';
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { fetchChannels } from '../features/channels/channelSlice';
import { useNavigate } from 'react-router-dom';
import AddChannel from './AddChannel';

function Homepage() {
    const navigate = useNavigate()
    const channels = useSelector(state => state.channel.channels)
    const dispatch = useDispatch()

    const [search, setSearch] = useState()
    const [selectedTag, setSelectedTag] = useState('');
    const [page, setPage] = useState(1)
    const [maxPage, setmaxPage] = useState(0)

    function handleDetails(channelId) {
        navigate(`/details/${channelId}`)
    }

    useEffect(() => {
        dispatch(fetchChannels(search))
        console.log(search)
    }, [search]);


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">YouTubers Rankings</h1>
            <div className="flex mb-4">
                <form className="w-full mr-4">
                    <input
                        type="text"
                        placeholder="Search Clippers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>
                <FilterDropdown />
            </div>
            {channels.map((channel, index) => (
                <div key={index} onClick={() => handleDetails(channel.channelId)} className="bg-white shadow-md rounded-lg p-4 flex items-center hover:bg-gray-100">
                    <div className="mr-4 text-2xl font-bold text-gray-500 w-10 text-center">
                        {index + 1}
                    </div>
                    <img
                        src={channel.thumbnails}
                        alt={channel.title}
                        className="w-24 h-24 rounded-full mr-6 object-cover"
                    />
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-2">{channel.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">
                            {channel.customUrl} • {channel?.ChannelView?.tag}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-lg">
                                <span className="font-semibold">Views:</span> {channel.viewCount.toLocaleString()}
                                <span className="text-green-500 ml-2">(+{"859453".toLocaleString()})</span>
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">Subs:</span> {channel.subscriberCount.toLocaleString()}
                                <span className="text-green-500 ml-2">(+{"609".toLocaleString()})</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <Pagination


            />
        </div>
    )
}
export default Homepage