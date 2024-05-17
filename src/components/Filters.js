import React from 'react'
import Search from './Search'

function Filters({}) {
  return (
    <div className='w-full h-14 border-2 
    border-darkgrey rounded-md
    flex items-center justify-between relative'
    >
        <Search/>
        <div>currency</div>
        <div>sorting</div>

    </div>
  )
}

export default Filters