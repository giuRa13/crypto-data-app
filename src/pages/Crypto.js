import React from 'react'
import TableComponent from '../components/TableComponent'
import Filters from '../components/Filters'

function Crypto() {
  return (
    <section className='w-[80%] h-full flex flex-col mt-12 mb-24 relative'>


      <Filters />
      <TableComponent/>
    
    </section>
  )
}

export default Crypto