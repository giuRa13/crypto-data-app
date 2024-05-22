import React, { useContext } from 'react'
import { TrendingContext } from '../context/TrendingContext'
import TrendingCoin from '../components/TrendingCoin';
import { Outlet } from 'react-router-dom';
import reloadSVG from '../assets/reload.svg';

const Trending = () => {

  const {trendData, resetTrendingResult} = useContext(TrendingContext);

  return (
    <section className='w-[80%] h-full flex flex-col mt-12 mb-24 relative'>

          <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly mt-12 border border-grey rounded-md'>
            {
              trendData && trendData.map(coin => 
              <TrendingCoin key={coin.coin_id} data={coin.item}/>
            )//<h1>{coin.item.name}</h1>
            }

            <button onClick={resetTrendingResult} className='flex items-center text-darkgrey2 font-bold py-2 px-4 rounded bg-orange 
            ml-1 cursor-pointer border-2 border-orange leading-4 hover:text-grey
            absolute right-10 -top-6'>
              
              <img  src={reloadSVG} alt='reload'></img>
              <span>Update</span>
            </button>
          </div>

    <Outlet/>
    </section>
  )
}

export default Trending