import React, { useContext } from 'react'
import { TrendingContext } from '../context/TrendingContext'
import TrendingCoin from '../components/TrendingCoin';
import { Outlet } from 'react-router-dom';
import reloadSVG from '../assets/reload.svg';
import geckologo from '../assets/coingecko-logo.webp';
import { data } from "autoprefixer";


const Trending = () => {

  const {trendData, resetTrendingResult} = useContext(TrendingContext);

  return (
    
    <section className=' w-[80%] h-full flex flex-col mt-12 mb-24 relative responsi3'>
          
          <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly mt-12 border border-orange rounded-lg '>
            {
              trendData && trendData.map((coin) => (
              /*<div key={coin.item.id} className='flex flex-col
              w-[40%] bg-darkgrey2 mb-12 last:mb-0
              rounded-md p-4 relative cursor-pointer
              hover:bg-gray-100 hover:bg-opacity-20 responsi5'>*/

                <TrendingCoin key={coin.item.id}/*key={coin[0]}*/ data={coin.item}/>
              /*</div>*/
          
            )//<h1>{coin.item.name}</h1>
            )}

            <button onClick={resetTrendingResult} className='flex items-center text-darkgrey2 font-bold py-2 px-4 rounded bg-orange 
            ml-1 cursor-pointer border-2 border-orange leading-4 hover:text-grey
            absolute right-10 -top-6'>
              
              <img  src={reloadSVG} alt='reload'></img>
              <span>Update</span>
            </button>

          </div>
         
          <div className='flex items-center justify-center mt-10 capitalize'>
                <div className='flex items-center'>
                <span>Data provided by</span>
                  <a href="http://www.coingecko.com"
                    rel="noreferrer"
                    target={"_blank"}
                    > <img src={geckologo} alt='gecko' className='w-[8rem] h-[5-rem] ml-2'/> </a>  
                </div>             
            </div> 

            
    </section>
    
  )
}

export default Trending