import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function AddChannel({ onClose, id }) {


  const [link, setlink] = useState(null);
  const [tag, settag] = useState(null);


  useEffect(() => {

  }, []);


  async function handlePostChannel(e) {
    e.preventDefault();

    try {
      const channelData = {
        link, tag
      };
      let response = await axios.post('http://localhost:3000/channel', channelData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      console.log(response.data);
      onClose();
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-semibold text-gray-800">Add Channel</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="p-6" onSubmit={handlePostChannel}>
          <div className="space-y-6">
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                Channel Link
              </label>
              <input
                type="text"
                id="link"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Channel Link"
                required
                value={link}
                onChange={(e) => setlink(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <input
                type="text"
                id="tag"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Channel Tag"
                required
                value={tag}
                onChange={(e) => settag(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
            >
              Add New Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddChannel