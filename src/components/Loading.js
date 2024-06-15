import React from "react"

function Loading() {

    return (
        <div className='w-full h-full flex justify-center items-center'>
        <div className='w-10 h-10 border-4 border-gray-200 rounded-full
        border-b-orange animate-spin'
        role='status'>
        </div>
        <span className='ml-2'>Loading...</span>
        </div>
    )
}

export default Loading