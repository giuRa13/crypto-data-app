import React from 'react'
import { Outlet } from 'react-router-dom' //for rendering
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext'
import { TrendingProvider } from '../context/TrendingContext'
import { StorageProvider } from '../context/StorageContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    
    <CryptoProvider>
    <TrendingProvider>
    <StorageProvider>
    <main className='w-full h-full 
        flex flex-col
        first-letter: content-center
        items-center
        relative
        text-gray-100
        font-nunito'>
    
    <div className='w-screen h-screen bg-gray-300 fixed -z-10'></div>
    
        <Logo/>
        <ToastContainer/>

        <Navigation/>

        <Outlet/> 
    </main>
    </StorageProvider>
    </TrendingProvider>
    </CryptoProvider>


  )
}

export default Home