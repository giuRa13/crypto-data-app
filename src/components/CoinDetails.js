import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoContext } from '../context/CryptoContext';
import Chart from './Chart';
import geckologo from '../assets/coingecko-logo.webp';
//import redditSvg from '../assets/reddit.svg';
//import facebookSvg from '../assets/facebook.svg';
//import twitterSvg from '../assets/twitter.svg';
//import githubSvg from '../assets/github.svg';

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
  ///////////////////////////////////////////////////////////


const CoinInfo = ({heading, desc}) => {

    const shortDesc = desc.slice(0, 600) +
        "<span style='color:var(--orange);cursor:pointer;'> Read More...</span>";

    const longDesc = desc + 
        "<br/><span style='color:var(--orange);cursor:pointer;'>Read Less...</span>";

    const [flag, setFlag] = useState(false);

    return (
    <div>
        <h2 className=' text-lg font-bold'>{heading}</h2>
        <p dangerouslySetInnerHTML={{__html: desc.length >= 600 ? 
            (flag ? longDesc : shortDesc) : desc,}}
            onClick={() => setFlag(!flag)}></p>
    </div>
    );
};
  ///////////////////////////////////////////////////////////



function CoinDetails() {

    let {getCoinData, coinData:data, currency} = useContext(CryptoContext);
    let {coinId} = useParams();

    useLayoutEffect(() => {
        getCoinData(coinId);
    }, [coinId])

  return (
    <div className='fixed top-0 bottom-0 w-[80%] h-full flex flex-col mt-6 mb-24 relative '>
    {
    data ?
    <div>
        <div className='flex flex-col mt-12
        border border-grey rounded-md w-full h-auto relative
        items-center justify-center rounded-md'>

        <div className='flex items-center justify-between h-full w-full bg-darkgrey2'> 

                <div className='flex flex-col w-[30%] h-full p-2 bg-darkgrey2'>
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

                
                <div className='flex  flex-col items-center justify-between  w-[70%] h-full p-1 bg-darkgrey2'>
                    <div className='flex mt-2 bg-darkgrey2 border border-grey rounded-md'>
                        <Chart id={data.id} />
                    </div>

                    <div className='flex flex-col mt-6 ml-6 w-full h-full'>
                        <h3 className="text-md font-bold py-1"><span className="font-normal text-grey" >Market Cap Rank : </span>{data.market_cap_rank}</h3> 
                        <h3 className="text-md font-bold py-1"><span className="font-normal  text-grey">Twitter Followers : </span> 
                        {new Intl.NumberFormat("en-IN", {
                                //style: "currency",
                                //currency: currency,
                                //currencyDisplay: "symbol",
                                minimumFractionDigits: 0,
                                }).format(data.community_data.twitter_followers)}</h3> 
                        <h3 className=" text-md  py-1"><span className="font-normal  text-grey">Whitepaper : </span>
                        {
                                data?.links?.whitepaper &&
                                <a target={"_blank"} rel='noreferrer' className='text-sm bg-darkgrey py-1 my-1 px-1.5 rounded-md' href={data?.links?.whitepaper}>{data?.links?.whitepaper.substring(0,30)}</a>
                        }
                        </h3>                        
                    </div>

                    <div className='flex flex-col  mb-14 mt-14 ml-auto'>
                    <div className='flex flex-row mr-6'>
                        {
                            data?.links?.repos_url.github[0] &&   
                            <a className='px-2' href={data?.links?.repos_url.github[0]}  target={"_blank"} rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 448 512">
	                                <path fill="#fc5b23" d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4.1-28.8.1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7.1 30.6c0 4.8.1 8.6.1 10c0 4.3-3 9.5-11.5 8c-66-22.1-112.2-84.9-112.2-158.3c0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8m-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7.6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9.4-3.7-.4-3.9-1.7m-9.1 3.2c-2.2.2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7.9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4m-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3m-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3.6c1.3 1.3 1.8 3.3.9 4.1c-.9 1.1-2.8.9-4.3-.6m-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9.6-2.6 0-3.7-1.5m-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5.6c1.1 1.3 1.3 2.8.4 3.5c-.9.9-2.4.4-3.5-.6m-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3.7 1.9 1.8 1.5 2.6c-.4.9-1.7 1.1-2.8.4" />
                                </svg>
                            </a>
                        }
                        {
                            data?.links?.twitter_screen_name &&   
                            <a className='px-2' href={`https://twitter.com/${data.links.twitter_screen_name}`} target={"_blank"} rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 448 512">
	                                <path fill="#fc5b23" d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z" />
                                </svg>
                            </a>
                        }
                        {
                            data?.links?.subreddit_url &&  
                            <a className='px-2' href={data?.links?.subreddit_url} target={"_blank"} rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 16 16">
	                                <g fill="#fc5b23">
                                        <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306a.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487c-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0a.213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325c-.801-.573-1.9-.945-3.121-.993l.534-2.501l1.738.372a.83.83 0 1 0 .83-.869a.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028a.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992c-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353c.401-.181.688-.592.688-1.069c0-.65-.525-1.165-1.165-1.165" />
                                    </g>
                                </svg>
                            </a>
                        }
                        {
                            data?.links?.facebook_username &&   
                            <a className='px-2' href={`https://facebook.com/${data.links.facebook_username}`} target={"_blank"} rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 20 20">
                                    <path fill="#fc5b23" d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h7v-7H8V9.525h2v-2.05c0-2.164 1.212-3.684 3.766-3.684l1.803.002v2.605h-1.197c-.994 0-1.372.746-1.372 1.438v1.69h2.568L15 12h-2v7h4c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2" />
                                </svg>
                            </a>
                        }

                    </div>
                    </div>
                </div>

        </div>
               
        </div>  


        <div className='flex flex-col mt-4 py-4 px-4
        border border-grey rounded-md w-full h-auto relative
        items-center justify-center rounded-md bg-darkgrey2'>
            <CoinInfo 
                heading={data.name}
                desc={data.description.en}/>                
        </div>

        <div className='flex items-center justify-center mt-10 capitalize'>
            <span>Data provided by</span>
            <a href="http://www.coingecko.com"
                rel="noreferrer"
                target={"_blank"}
            > <img src={geckologo} alt='gecko' className='w-[8rem] h-[5-rem] ml-2'/> </a>  
        </div>
    </div>

    : null

    }

    </div>
  )
}

export default CoinDetails
//'absolute bottom-8 right-8 flex items-center bg-darkgrey'

