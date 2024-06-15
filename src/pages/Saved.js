import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
//import reloadSVG from '../assets/reload.svg';
import { StorageContext } from '../context/StorageContext';
import { CryptoContext } from '../context/CryptoContext';
import upSvg from '../assets/up.svg';
import downSvg from '../assets/down.svg';
import reloadSVG from '../assets/reload.svg';

const SaveBtn = ({data}) => {

  let { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
      e.preventDefault();
      saveCoin(data.id);

      if(allCoins.includes(data.id)){
          removeCoin(data.id)
      }
      else{
          saveCoin(data.id)
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
//////////////////////////////////////////////////////////////////


const Saved = () => {

  let { saveData, resetSavedResult } = useContext(StorageContext);
  let { currency } = useContext(CryptoContext);

  const renderIcon = (change) => {
    return change > 0 ?  <img src={upSvg} alt='UpIcon' className='w-[1.5] h-[1.5] '/> 
    :  <img src={downSvg} alt='DownIcon' className='w-[1.5] h-[1.5] '/>
}


  return (
    <section className='w-[80%] h-full flex flex-col mt-12 mb-24 relative respo'>

          <div className='w-full min-h-[20vh]   mt-12 border border-orange rounded-lg res3'>
            {
              saveData ?
                <table className='w-full table-auto'>      
                <thead className='capitalize text-darkgrey2 text-base font-bold bg-orange 
                    border-b border-grey'>
                    <tr>
                        <th className='py-3 w-[25%]' >coin</th>
                        <th className='py-3 w-[5%] res2' >rank</th>
                        <th className='py-3 w-[10%]' >price</th>
                        <th className='py-3 w-[10%]' >24H</th>
                        <th className='py-3 w-[10%] res25' >7D</th>
                        <th className='py-3 w-[10%] res45' >1M</th>
                        <th className='py-3 w-[15%] res' >total volume</th>
                        <th className='py-3 w-[15%] res' >market cap</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        saveData.map(data => {
                            return(
                                <tr className='text-center text-base text-gray-100
                                border-b border-grey
                                hover:bg-gray-200
                                last:border-b-0'
                                key={data.id}>
                                    <td className='py-4 flex items-center justify-start'>
    
                                        <SaveBtn data={data}/>
    
                                        <Link to={`/${data.id}`} className='ml-6 cursor-pointer'>                                      
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
                                    <td> 
                                        <div className={
                                                data.price_change_percentage_7d_in_currency > 0 ? 
                                                "text-green flex justify-center items-center res2" 
                                                : "text-red  flex items-center display:block res2"
                                            }> 
                                            {renderIcon(data.price_change_percentage_7d_in_currency)}
                                            {Number(data.price_change_percentage_7d_in_currency).toFixed(2)} %
                                        </div>
                                    </td>
                                    <td> 
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

                <h1 className='min-h-[50vh] text-orange font-bold
                flex items-center justify-center'>
                    No Coins Saved Yet...
                </h1>
            }
            <button onClick={resetSavedResult} className='flex items-center text-darkgrey2 font-bold py-2 px-4 rounded bg-orange 
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

export default Saved