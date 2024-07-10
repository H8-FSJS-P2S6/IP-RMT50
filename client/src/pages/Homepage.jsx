import React, { useEffect } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/pagination';
import SearchBar from '../components/searchbar';
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { fetchChannels } from '../features/channels/channelSlice';
import { useNavigate } from 'react-router-dom';

function Homepage() {

    const channels = useSelector(state => state.channel.channels)
    const dispatch = useDispatch()

    function handleDetails(){
        
    }

    useEffect(() => {
        dispatch(fetchChannels())
    }, []);


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">YouTubers Rankings</h1>
            <div className="flex mb-4">
                <SearchBar />
                <FilterDropdown />
            </div>
            {channels.map((channel, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center hover:bg-gray-100">
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
                            {channel.customUrl} • {channel.ChannelView.tag}
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