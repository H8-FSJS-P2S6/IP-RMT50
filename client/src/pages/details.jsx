import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { fetchOneChannel } from "../features/channels/channelSlice";

const YouTuberDetailsPage = () => {
  const { channelId } = useParams()
  const isLoading = useSelector(state => state.channel.loading)
  const channel = useSelector(state => state.channel.channel)

  const dispatch = useDispatch()
  // console.log(channelId)

  useEffect(() => {
    dispatch(fetchOneChannel(channelId))
  }, [channelId, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!channel.found) {
    return <div>Error loading channel data. Please try again.</div>;
  }



  return (

    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={isLoading == true ? "Loading" : channel.found.thumbnails}
              alt="profilePic" />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{isLoading == true ? "Loading" : channel.found.customUrl}</div>
            <h1 className="mt-1 text-4xl font-bold text-gray-900">{isLoading == true ? "Loading" : channel.found.title}</h1>
            <p className="mt-2 text-gray-600">{isLoading == true ? "Loading" : channel.found.description}</p>
          </div>
          <div className="px-8 py-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Channel Summary</h2>
            <p className="mt-2 text-gray-600"> {isLoading == true? "(AI-generated summary here)":channel.AIText} </p>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Date Created</h2>
              <p className="mt-1 text-lg font-semibold text-gray-900">{isLoading == true ? "Loading" : channel.found.publishedAt.toString().substring(0, 10)}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Country</h2>
              <p className="mt-1 text-lg font-semibold text-gray-900">{isLoading == true ? "Loading" : channel.found.country}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Total Views</h2>
              <p className="mt-1 text-lg font-semibold text-gray-900">{isLoading == true ? "Loading" : channel.found.viewCount.toLocaleString()}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Subscribers</h2>
              <p className="mt-1 text-lg font-semibold text-gray-900">{isLoading == true ? "Loading" : channel.found.subscriberCount.toLocaleString()}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Video Count</h2>
              <p className="mt-1 text-lg font-semibold text-gray-900">{isLoading == true ? "Loading" : channel.found.videoCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Monthly Views</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                <tr key="January">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">January</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"103294".toLocaleString()}</td>
                </tr>

                <tr key="February">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">February</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"103294".toLocaleString()}</td>
                </tr>

                <tr key="March">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">March</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"103294".toLocaleString()}</td>
                </tr>

                <tr key="April">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">April</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"103294".toLocaleString()}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTuberDetailsPage;