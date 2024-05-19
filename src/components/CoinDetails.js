import React, { useContext, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoContext } from '../context/CryptoContext';

function CoinDetails() {

    let {getCoinData, coinData} = useContext(CryptoContext);
    let {coinId} = useParams();

    useLayoutEffect(() => {
        getCoinData(coinId);
    }, [coinId])

  return (
    <div className='fixed top-0 bottom-0 w-[80%] h-full flex flex-col mt-12 mb-24 relative'>

        <div className='flex flex-col mt-12
        border border-grey rounded w-full h-auto relative
        items-center justify-center'>
            {
                coinData ? <img src={coinData.image.thumb} alt='coinimage'/> : null
            }
        </div>
        
    </div>
  )
}

export default CoinDetails