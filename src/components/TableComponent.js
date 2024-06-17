import React, { useContext } from 'react'
import { CryptoContext } from '../context/CryptoContext';
import upSvg from '../assets/up.svg';
import downSvg from '../assets/down.svg';
import Pagination from './Pagination';
import geckologo from '../assets/coingecko-logo.webp';
import { Link } from 'react-router-dom';
import { StorageContext } from '../context/StorageContext';
import { Bounce, toast } from "react-toastify";
//import Loading from './Loading';

const SaveBtn = ({data}) => {

    let { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

    const handleClick = (e) => {
        e.preventDefault();
        saveCoin(data.id);

        if(allCoins.includes(data.id)){
            removeCoin(data.id);
            toast.success('🦄 Coin removed from "Saved"!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                newestOnTop: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                style: { background: '#d6436e', color: '#fff',  },
                });
        }
        else{
            saveCoin(data.id);        
            toast.success('🦄 Coin added to "Saved"!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                newestOnTop: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                progressStyle: { background: '#E8DFD0' },
                style: { background: '#25da72', color: '#fff' },               
                });
        }
    };

    return(

        
      
        <button onClick={(e)=>handleClick(e)} 
        className='outline-0 border-0 bg-none cursor-pointer'>
             <svg className={`w-[3rem] ml-2.5 
             ${allCoins.includes(data.id)? "fill-orange" : "fill-gray-100"}
             hover:w-[3.5rem] hover:ml-0.5`}
                xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                <path  d="M9.6 15.65L12 13.8l2.4 1.85l-.9-3.05l2.25-1.6h-2.8L12 7.9l-.95 3.1h-2.8l2.25 1.6zm-1.91 2.696l1.614-5.33L5.115 10h5.216L12 4.462L13.67 10h5.215l-4.189 3.016l1.614 5.33L12 15.07zM12 11.775"/>
            </svg>
        </button>
      
    )
};


function TableComponent() {

  let { cryptoData, currency } = useContext(CryptoContext);

  const renderIcon = (change) => {
    return change > 0 ?  <img src={upSvg} alt='UpIcon' className='w-[1.5] h-[1.5] '/> 
    :  <img src={downSvg} alt='DownIcon' className='w-[1.5] h-[1.5] '/>
}

  return (
    <>
    <div className='
        flex flex-col mt-12
        border border-orange rounded-lg res3'
    >
        {
            cryptoData ? 
        <table className='w-full table-auto pons3'>      
            <thead className='capitalize text-darkgrey2 text-base font-bold bg-orange 
                border-b border-grey'>
                <tr>
                    <th className='py-3 w-[25%] res9' >coin</th>
                    <th className='py-3 w-[5%] res2' >rank</th>
                    <th className='py-3 w-[10%] res5' >price</th>
                    <th className='py-3 w-[10%] ' >24H</th>
                    <th className='py-3 w-[10%] res25' >7D</th>
                    <th className='py-3 w-[10%] res45' >1M</th>
                    <th className='py-3 w-[15%] res' >total volume</th>
                    <th className='py-3 w-[15%] res' >market cap</th>
                </tr>
            </thead>
            <tbody>
                {
                    cryptoData.map(data => {
                        return(
                            <tr className='text-center text-base text-gray-100
                            border-b border-grey
                            hover:bg-gray-200
                            last:border-b-0'
                            key={data.id}>                              
                                <td className='py-4 flex justify-start items-center'>

                                    <SaveBtn data={data}/>

                                    <Link to={`/${data.id}`} className='ml-6 cursor-pointer res10'>                                      
                                        <img className='w-[2.25rem] h-[2.25rem]' src={data.image} alt={data.name}/>
                                    </Link>
                                    <Link to={`/${data.id}`} className='ml-2 cursor-pointer'>
                                        {data.name}                                                                 
                                        <span className='ml-2 cursor-pointer uppercase ress'>({data.symbol})</span>
                                    </Link>
                                </td>
                                <td className='py-4 res2'>#{data.market_cap_rank}</td>                             
                                <td className='py-4 res5'>{
                                    new Intl.NumberFormat("en-IN",{
                                        style: "currency",
                                        currency: currency,
                                        currencyDisplay: "symbol"
                                    }).format(Number(data.current_price).toFixed(3))}
                                </td>
                                
                                <td> 
                                    <div className={
                                            data.price_change_percentage_24h_in_currency > 0 ? 
                                            "text-green flex justify-center items-center " 
                                            : "text-red  flex items-center display:block "
                                        }> 
                                        {renderIcon(data.price_change_percentage_24h_in_currency)}
                                        {Number(data.price_change_percentage_24h_in_currency).toFixed(2)} %
                                    </div>
                                </td>
                                <td className='res2'> 
                                    <div className={
                                            data.price_change_percentage_7d_in_currency > 0 ? 
                                            "text-green flex justify-center items-center res2" 
                                            : "text-red  flex items-center display:block res2"
                                        }> 
                                        {renderIcon(data.price_change_percentage_7d_in_currency)}
                                        {Number(data.price_change_percentage_7d_in_currency).toFixed(2)} %
                                    </div>
                                </td>
                                <td className='res22'> 
                                    <div className={
                                            data.price_change_percentage_30d_in_currency > 0 ? 
                                            "text-green flex justify-center items-center res4" 
                                            : "text-red  flex items-center display:block res4"
                                        }> 
                                        {renderIcon(data.price_change_percentage_30d_in_currency)}
                                        {Number(data.price_change_percentage_30d_in_currency).toFixed(2)} %
                                    </div>
                                </td>

                                <td className='py-4 res'>{
                                    new Intl.NumberFormat("en-IN",{
                                        style: "currency",
                                        currency: currency,
                                        currencyDisplay: "symbol"
                                    }).format( data.total_volume)} 
                                </td>
                                <td className='py-4 res'>{
                                     new Intl.NumberFormat("en-IN",{
                                        style: "currency",
                                        currency: currency,
                                        currencyDisplay: "symbol"
                                    }).format(data.market_cap)} 
                                </td>
                            </tr>
                            )
                        }
                    )
                }
            </tbody>
        </table> : 

        <div className='w-full h-full flex justify-center items-center p-4 min-h-[50vh]'>
            <div className='w-10 h-10 border-4 border-gray-200 rounded-full
          border-b-orange animate-spin'
            role='status'>
            </div>
            <span className='ml-2'>Loading...</span>
          </div>
        }

        </div>  
        
            <div className='flex items-center justify-between mt-10 capitalize low'>
                <div className='flex items-center'>
                <span>Data provided by</span>
                  <a href="http://www.coingecko.com"
                    rel="noreferrer"
                    target={"_blank"}
                    > <img src={geckologo} alt='gecko' className='w-[8rem] h-[5-rem] ml-2'/> </a>  
                </div>
                <Pagination/>
            </div>    
        </>
  )
}

export default TableComponent