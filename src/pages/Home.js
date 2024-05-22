import React from 'react'
import { Outlet } from 'react-router-dom' //for rendering
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext'
import { TrendingContext, TrendingProvider } from '../context/TrendingContext'

function Home() {
  return (
    <CryptoProvider>
    <TrendingProvider>
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
    </TrendingProvider>
    </CryptoProvider>

  )
}

export default Home