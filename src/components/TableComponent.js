import React, { useContext } from 'react'
import { CryptoContext } from '../context/CryptoContext';
import upSvg from '../assets/up.svg';
import downSvg from '../assets/down.svg';

function TableComponent() {

  let { cryptoData, currency } = useContext(CryptoContext);

  const renderIcon = (change) => {
    return change > 0 ?  <img src={upSvg} alt='UpIcon' className='w-[1.5] h-[1.5] '/> 
    :  <img src={downSvg} alt='DownIcon' className='w-[1.5] h-[1.5] '/>
}

  return (
    <div className='
        flex flex-col mt-12
        border border-grey rounded'
    >
        {
            cryptoData ? <table className='w-full table-auto'>      
            <thead className='capitalize text-base text-orange font-medium
                border-b border-grey'>
                <tr>
                    <th className='py-1'>coin</th>
                    <th className='py-1'>rank</th>
                    <th className='py-1'>name</th>
                    <th className='py-1'>price</th>
                    <th className='py-1'>24h</th>
                    <th className='py-1'>7d</th>
                    <th className='py-1'>1m</th>
                    <th className='py-1'>total volume</th>
                    <th className='py-1'>market cap</th>
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
                                <td className='py-4 flex items-center uppercase'>
                                    <button className='outline-0 border-0 bg-none cursor-pointer'>
                                        <svg className='w-[3rem] ml-2.5 fill-gray-100 hover:fill-orange'
                                        xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                                        <path /*fill=""*/ d="M9.6 15.65L12 13.8l2.4 1.85l-.9-3.05l2.25-1.6h-2.8L12 7.9l-.95 3.1h-2.8l2.25 1.6zm-1.91 2.696l1.614-5.33L5.115 10h5.216L12 4.462L13.67 10h5.215l-4.189 3.016l1.614 5.33L12 15.07zM12 11.775"/>
                                        </svg>
                                    </button>
                                    <img className='w-[2.25rem] h-[2.25rem] mx-10' src={data.image} alt={data.name}/>
                                    <span>{data.symbol}</span>
                                </td>
                                <td className='py-4'>#{data.market_cap_rank}</td>
                                <td className='py-4'>{data.name}</td>                              
                                <td className='py-4'>{
                                    new Intl.NumberFormat("en-IN",{
                                        style: "currency",
                                        currency: currency,
                                        currencyDisplay: "symbol"
                                    }).format(data.current_price)}
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
                                <td> 
                                    <div className={
                                            data.price_change_percentage_7d_in_currency > 0 ? 
                                            "text-green flex justify-center items-center " 
                                            : "text-red  flex items-center display:block "
                                        }> 
                                        {renderIcon(data.price_change_percentage_7d_in_currency)}
                                        {Number(data.price_change_percentage_7d_in_currency).toFixed(2)} %
                                    </div>
                                </td>
                                <td> 
                                    <div className={
                                            data.price_change_percentage_30d_in_currency > 0 ? 
                                            "text-green flex justify-center items-center " 
                                            : "text-red  flex items-center display:block "
                                        }> 
                                        {renderIcon(data.price_change_percentage_30d_in_currency)}
                                        {Number(data.price_change_percentage_30d_in_currency).toFixed(2)} %
                                    </div>
                                </td>

                                <td className='py-4'>{
                                    new Intl.NumberFormat("en-IN",{
                                        style: "currency",
                                        currency: currency,
                                        currencyDisplay: "code"
                                    }).format( data.total_volume)} 
                                </td>
                                <td className='py-4'>{
                                     new Intl.NumberFormat("en-IN",{
                                        style: "currency",
                                        currency: currency,
                                        currencyDisplay: "code"
                                    }).format(data.market_cap)} 
                                </td>
                            </tr>
                            )
                        }
                    )
                }
            </tbody>
        </table> : null
        }

    </div>
  )
}

export default TableComponent