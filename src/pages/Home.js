import React from 'react'
import { Outlet } from 'react-router-dom' //for rendering
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext'

function Home() {
  return (
    <CryptoProvider>
    <main className='w-full h-full 
        flex flex-col
        first-letter: content-center
        items-center
        relative
        text-gray-100
        font-nunito'>
    
    <div className='w-screen h-screen bg-gray-300 fixed -z-10'></div>

        <Logo/>
        <Navigation/>

        <Outlet/> 
    </main>
    </CryptoProvider>

  )
}

export default Home