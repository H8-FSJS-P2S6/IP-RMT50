const YouTuberDetailsPage = () => {
    // Assuming youtuber object contains all the required information
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src="data:image/png;base64,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"
              alt="profilePic" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">@Pamomi</div>
              <h1 className="mt-1 text-4xl font-bold text-gray-900">Pamomi Clips</h1>
              <p className="mt-2 text-gray-600">Just clipping vtubers, especially HoloEN</p>
            </div>
          </div>
          
          <div className="px-8 py-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Date Created</h2>
                <p className="mt-1 text-lg font-semibold text-gray-900">23-12-2020</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Country</h2>
                <p className="mt-1 text-lg font-semibold text-gray-900">Indonesia</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Total Views</h2>
                <p className="mt-1 text-lg font-semibold text-gray-900">{"47384738".toLocaleString()}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Subscribers</h2>
                <p className="mt-1 text-lg font-semibold text-gray-900">{"20392".toLocaleString()}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Video Count</h2>
                <p className="mt-1 text-lg font-semibold text-gray-900">{"65".toLocaleString()}</p>
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