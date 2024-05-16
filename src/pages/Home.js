import React from 'react'
import { Outlet } from 'react-router-dom' //for rendering
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'

function Home() {
  return (
    <main className='w-full h-full 
        flex flex-col
        first-letter: content-center
        items-center
        relative
        text-white
        font-nunito'>
    
    <div className='w-screen h-screen bg-gray-300 fixed -z-10'></div>

        <Logo/>
        <Navigation/>

        <Outlet/> 
    </main>
  )
}

export default Home