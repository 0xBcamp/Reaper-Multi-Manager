import React from 'react'

const Loader = () => {
  return (
      <div className="flex h-full justify-center mt-32 text-lg text-gray-400">
        <div className="mt-2 mr-3 animate-spin rounded-full h-3 w-3 border-t-2 border-blue-500 "></div>
          Loading dashboard data...
      </div>
  )
}

export default Loader