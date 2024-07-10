import React, { useEffect, useState } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/pagination';
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { fetchChannels, handleAddModal2, handleEditModal2 } from '../features/channels/channelSlice';
import { useNavigate } from 'react-router-dom';
import AddChannel from './AddChannel';
import EditChannel from './EditChannel';
import axios from 'axios'

function Homepage() {
    const navigate = useNavigate()
    const channels = useSelector(state => state.channel.channels)
    const showAddModal = useSelector(state => state.channel.showAddModal)
    const showEditModal = useSelector(state => state.channel.showEditModal)
    const dispatch = useDispatch()

    const [search, setSearch] = useState()
    const [channelId, setchannelId] = useState('');
    const [tag, settag] = useState(1)
    // const [maxPage, setmaxPage] = useState(0)

    function handleDetails(channelId) {
        navigate(`/details/${channelId}`)
    }

    function handleAdd(value){
        console.log(value, "<===Homepage")
        dispatch(handleAddModal2(true))
        console.log(showAddModal)
    }

    function handleEdit(channelId, tag){
        dispatch(handleEditModal2(true))
        setchannelId(channelId)
        settag(tag)
    }

    function onClose(){
        dispatch(handleAddModal2(false))
        dispatch(handleEditModal2(false))
        setchannelId(null)
        settag(null)
    }


    useEffect(() => {
        dispatch(fetchChannels(search))
        console.log(search)
    }, [search,tag]);

    async function handleDelete(channelId){
        try {
          let response = await axios.delete(`http://localhost:3000/channel/${channelId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
          console.log(response.data);
          dispatch(fetchChannels(search))
        } catch (error) {
          console.log(error)
        }
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-3">Clipper Rankings</h1>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => handleAdd(true)}
            >
                Add Channel
            </button>

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

            {showAddModal && <AddChannel onClose={onClose} />}
            {showEditModal && <EditChannel onClose={onClose} channelId={channelId} selectedTag={tag} />}

            {channels.map((channel, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center hover:bg-gray-100">
                    <div className="mr-4 text-2xl font-bold text-gray-500 w-10 text-center">
                        {index + 1}
                    </div>
                    <img onClick={() => handleDetails(channel.channelId)}
                        src={channel.thumbnails}
                        alt={channel.title}
                        className="w-24 h-24 rounded-full mr-6 object-cover"
                    />
                    <div className="flex-grow" onClick={() => handleDetails(channel.channelId)}>
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
                        <button onClick={() => handleEdit(channel.channelId, channel.ChannelView.tag)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Update
                        </button>
                        <button onClick={()=> handleDelete(channel.channelId)}
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