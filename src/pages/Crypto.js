import React from 'react'
import TableComponent from '../components/TableComponent'
import Filters from '../components/Filters'
import { Outlet } from 'react-router-dom'


function Crypto() {
  return (
    <section className='w-[80%] h-full flex flex-col mt-12 mb-24 relative respo'>


      <Filters />
      <TableComponent/>
    
    <Outlet/>
    </section>
    
  )
}

export default Crypto