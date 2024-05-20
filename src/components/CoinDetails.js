import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoContext } from '../context/CryptoContext';

const HighLowIndicator = ({ currentPrice, high, low }) => {
    const [green, setGreen] = useState();
  
    useEffect(() => {
      let total = high - low;
      let greenZone = ((high - currentPrice) * 100) / total;
      setGreen(Math.ceil(greenZone));
    }, [currentPrice, high, low]);
  
    return (
      <>
        <span
          className="bg-red h-1.5 rounded-l-lg w-[50%]"
          style={{ width: `${100 - green}%` }}
        >
          &nbsp;
        </span>
        <span
          className="bg-green h-1.5 rounded-r-lg w-[50%]"
          style={{ width: `${green}%` }}
        >
          &nbsp;
        </span>
      </>
    );
  };



function CoinDetails() {

    let {getCoinData, coinData:data, currency} = useContext(CryptoContext);
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
            data ? 
            <div className='flex items-center justify-between h-full w-full p-2'>

                <div className='flex flex-col w-[30%] h-full pr-2 bg-darkgrey2'>
                    <div className='flex w-full items-center ml-2'>
                        <img className='w-[4rem] h-[4rem] mx-2 my-2' 
                        src={data.image.large} alt={data.id}/>
                        <h1 className='text-xxl capitalize font-bold'>
                            {data.name}
                        </h1>
                        <span className='uppercase bg-orange text-orange rounded
                        py-1 px-2.5 ml-2 bg-opacity-25'>
                            {data.symbol}
                        </span>
                    </div>

                        
                    <div className='flex w-full mt-6'>
                        <div className='flex flex-col w-full'>
                            <div className='flex justify-between'>
                                <span className='text-grey text-md'>Price</span>
                                <div className={`
                                    px-1 ml-2 flex items-center rounded bg-opacity-25
                                    ${data.market_data.price_change_percentage_24h > 0 
                                    ? 'bg-green text-green' : 'bg-red text-red'} 
                                `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                    className={`
                                        ${data.market_data.price_change_percentage_24h > 0 
                                        ? 'fill-green rotate-180' : 'fill-red'}
                                    `}>
                                    <path fill="" d="m12 16l-6-6h12z"/>
                                    </svg>
                                    <span>{Number(data.market_data.price_change_percentage_24h).toFixed(2)} %</span>
                                </div>
                            </div>
                            <h2 className='text-lg font-bold'> 
                                {new Intl.NumberFormat("en-IN",{
                                    style: "currency",
                                    currency: currency,
                                    currencyDisplay: "symbol"
                                }).format(Number(data.market_data.current_price[currency]).toFixed(3))}</h2>
                        </div>
                    </div>                           
                        
                    <div className='flex flex-col w-full mt-4 justify-between'>
                        <div className='flex flex-col'>
                            <span className='text-grey text-md'>Market Cap</span>
                            <h2 className='text-md font-bold'>
                                {new Intl.NumberFormat("en-IN",{
                                    style: "currency",
                                    currency: currency,
                                    currencyDisplay: "symbol",
                                    minimumFractionDigits: 0,                                   
                                }).format(data.market_data.market_cap[currency])}
                            </h2>
                        </div>
                        <div className='flex flex-col mt-4'>
                        <span className='text-grey text-md'>Total Volume</span>
                            <h2 className='text-md font-bold'>
                                {new Intl.NumberFormat("en-IN",{
                                    style: "currency",
                                    currency: currency,
                                    currencyDisplay: "symbol",
                                    minimumFractionDigits: 0, 
                                }).format(data.market_data.total_volume[currency])}
                            </h2>
                        </div>
                    </div>

                    <div className="flex w-full mt-4 justify-between">
                        <div className='flex flex-col '>
                            <span className='text-grey text-md'>ATH</span>
                            <h2 className='text-md font-bold'>
                                {new Intl.NumberFormat("en-IN",{
                                    style: "currency",
                                    currency: currency,
                                    currencyDisplay: "symbol",
                                    //minimumFractionDigits: 0, 
                                }).format(data.market_data.ath[currency])}
                            </h2>                           
                        </div>
                        <div className='flex flex-col '>
                            <span className='text-grey text-md'>from ath:</span>
                            <h2 className={`text-md font-bold
                            ${data.market_data.ath_change_percentage.usd > 0
                                ? 'text-green' : 'text-red'}
                            `}>
                                {(data.market_data.ath_change_percentage.usd).toFixed(2)} %            
                            </h2>
                        </div>
                    </div>           

                    <div className="flex w-full mt-4 justify-between">
                        <div className="flex flex-col">
                            <span className="text-md  text-grey">
                                Max Supply
                            </span>
                            <h2 className="text-md font-bold">
                                {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: currency,
                                currencyDisplay: "symbol",
                                minimumFractionDigits: 0,
                                }).format(data.market_data.max_supply)}
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-md  text-grey">
                                Circulating Supply
                            </span>
                            <h2 className="text-md font-bold">
                                {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: currency,
                                currencyDisplay: "symbol",
                                minimumFractionDigits: 0,
                                }).format(data.market_data.circulating_supply)}
                            </h2>
                        </div>
                    </div>     
                    
                    <div className="flex w-full mt-10  justify-between">
                        <div className="flex flex-col">
                            <span className="text-md  text-grey">
                                Low 24H
                            </span>
                            <h2 className="text-md font-bold">
                                {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: currency,
                                currencyDisplay: "symbol",
                                minimumFractionDigits: 5,
                                }).format(data.market_data.low_24h[currency])}
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-md  text-grey">
                                high 24H
                            </span>
                            <h2 className="text-md font-bold">
                                {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: currency,
                                currencyDisplay: "symbol",
                                minimumFractionDigits: 5,
                                }).format(data.market_data.high_24h[currency])}
                            </h2>
                        </div>
                    </div>

                    <div className="flex w-full mt-2 justify-between">
                    <HighLowIndicator
                        currentPrice={data.market_data.current_price[currency]}
                        high={data.market_data.high_24h[currency]}
                        low={data.market_data.low_24h[currency]}
                    />
                    </div> 
                    
                        <div className='flex flex-row justify-center items-center mt-10'>
                            <span className="text-md font-bold">Sentiment: </span>
                            <div className='flex justify-between'>
                                <div className={`
                                    px-1 ml-2 my-1 flex items-center rounded bg-opacity-25 bg-green text-green
                                `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                        className={`fill-green rotate-180`}>
                                        <path fill="" d="m12 16l-6-6h12z"/>
                                    </svg>
                                    <span>{Number(data.sentiment_votes_up_percentage).toFixed(2)} %</span>
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <div className={`
                                    px-1 ml-2 my-1 flex items-center rounded bg-opacity-25 bg-red text-red
                                `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                        className={`fill-red`}>
                                        <path fill="" d="m12 16l-6-6h12z"/>
                                    </svg>
                                    <span>{Number(data.sentiment_votes_down_percentage).toFixed(2)} %</span>
                                </div>
                            </div>
                        </div>
                    
                    <div className='flex w-full mt-10 justify-center items-center'>
                        <div className='flex flex-col'>
                            <a target={"_blank"} rel='noreferrer' className='text-sm bg-darkgrey py-1 my-1 px-1.5 rounded-md' href={data?.links?.homepage[0]}>{data?.links?.homepage[0].substring(0,30)}</a>
                            {
                                data?.links?.repos_url.github[0] &&
                                <a target={"_blank"} rel='noreferrer' className='text-sm bg-darkgrey py-1 my-1 px-1.5 rounded-md' href={data?.links?.repos_url.github[0]}>{data?.links?.repos_url.github[0].substring(0,30)}</a>

                            }
                            {
                                data?.links?.official_forum_url[0] &&
                                <a target={"_blank"} rel='noreferrer' className='text-sm bg-darkgrey py-1 my-1 px-1.5 rounded-md' href={data?.links?.official_forum_url[0]}>{data?.links?.official_forum_url[0].substring(0,30)}</a>
                            }
                        </div>
                    </div>

                </div>



                <div className='flex flex-col w-[70%] h-full pr-2 justify-center items-center'>
                    Right
                </div>

            </div> 
            : null
            }
        </div>      
    </div>
  )
}

export default CoinDetails