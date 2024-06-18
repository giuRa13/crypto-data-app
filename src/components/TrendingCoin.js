import React, { useContext } from 'react'
import { CryptoContext } from '../context/CryptoContext';
import {  useNavigate } from 'react-router-dom';


function TrendingCoin({data}) { //data.item.id

  let {currency} = useContext(CryptoContext);
  let navigate = useNavigate();

  const getDetails = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div onClick={()=>getDetails(data.id)} 
    className="w-[40%] bg-darkgrey2 mb-12
    last:mb-0 rounded-lg p-6 relative cursor-pointer
     hover:bg-gray-200 responsi5">
    {   data  ? (
        <>

        <h3 className='flex flex-row items-center justify-start mb-6 responsi'>
            <img className='w-[1.5rem] h-[1.5rem] mx-2 my-2 rounded-full' src={data.large} alt={data.id}/>
            <span className=' text-lg font-bold'>{data.name}</span>    
            <span className='uppercase bg-orange text-orange rounded
            py-1 px-2.5 ml-2 bg-opacity-25'>
              {data.symbol}
            </span>

            <div className={`
            px-2 py-2 flex items-center rounded-lg bg-opacity-25 ml-auto responsi2
            ${data.data.price_change_percentage_24h[currency] > 0 
            ? 'bg-green text-green' : 'bg-red text-red'} 
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
              className={`
              ${data.data.price_change_percentage_24h[currency] > 0 
                ? 'fill-green rotate-180' : 'fill-red'}
              `}>
                <path fill="" d="m12 16l-6-6h12z"/>
              </svg>
              <span>{Number(data.data.price_change_percentage_24h[currency]).toFixed(2)} %</span>
            </div>

        </h3>

        <h3 className='flex items-center'>
          <span className='text-grey'>Market Cap Rank &nbsp; </span>
          <span className='font-bold'>{data.market_cap_rank}</span>       
        </h3>
        <h3 className='flex items-center'>
          <span className='text-grey'>Price &nbsp; </span>
          <span className='font-bold'>
            {(data.data.price).toLocaleString("en-IN", { 
              style: "currency", 
              currency: currency, 
              maximumSignificantDigits: 6 
              })}
            </span>       
        </h3>
        <h3 className='flex items-center'>
          <span className='text-grey'>Score &nbsp; </span>
          <span className='font-bold'>{data.score}</span>       
        </h3>
        <h3 className='flex items-center'>
          <span className='text-grey'>Market Cap &nbsp; </span>
          <span className='font-bold'>{data.data.market_cap}</span>       
        </h3>
        <h3 className='flex items-center'>
          <span className='text-grey'>Total Volume &nbsp; </span>
          <span className='font-bold'>{data.data.total_volume}</span>       
        </h3>

        <img className='w-[25%] h-auto rounded-full
        absolute bottom-0 right-0 -translate-y-0' 
        src={data.large} alt={data.name}/>

        </>
    ) : (
        <div className='w-full h-full flex justify-center items-center p-4 min-h-[50vh]'>
          <div className='w-10 h-10 border-4 border-gray-200 rounded-full
        border-b-orange animate-spin'
          role='status'>
          </div>
          <span className='ml-2'>Loading...</span>
        </div>
    )
    }

    </div>
  )
}

export default TrendingCoin