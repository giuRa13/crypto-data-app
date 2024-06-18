import React, { useContext, useRef} from 'react'
import Search from './Search'
import { CryptoContext } from '../context/CryptoContext'
import  downIcon  from '../assets/downIcon.svg'
import pageR from '../assets/pagination-right.svg';
import PerPage from './PerPage';




function Filters() {

  let { setCurrency, setSortBy } = useContext(CryptoContext);
  const currencyRef = useRef(null);
  
  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency((val).toLowerCase());
    currencyRef.current.value = "";
  };

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };



  return (
    <div className='w-full h-20 border-2 
    border-orange rounded-lg p-4
    flex items-center justify-between relative pons'
    >
        <Search />

        <PerPage/>

        <div className='flex pons3'>
          <form className='relative flex items-center mr-12 sortedclass3' onSubmit={handleCurrencySubmit}>
            <label htmlFor='currency'
              className='relative justify-center items-center mr-2 font-bold'>Currency:</label>
            <input type='text' name='currency' placeholder='USD'
              className='uppercase w-16 rounded outline-0 border border-orange focus:border-orange
              leading-4 bg-grey py-1'
              ref={currencyRef}/>
            <button type='submit'
              className='rounded ml-1 cursor-pointer
              hover:text-grey'>
                 <img className='w-[70%] h-auto hover:bg-gray-200' src={pageR} alt='right'/>

            </button>      
          </form>

          <label className='relative flex justify-center items-center pons35'>
            <span className='font-bold mr-2 sortedclass'>Sort by:  </span>
            <select name='sortby' className='rounded bg-grey text-base border border-orange
              pl-2  py-1 leading-4 capitalize  focus:outline-0 sortedclass2'
              onClick={handleSort}
              >
              <option value="market_cap_desc">market cap desc</option> 
              <option value="market_cap_asc">market cap asc</option>                                      
              <option value="volume_asc">volume asc</option>
              <option value="volume_desc">volume desc</option>
              <option value="id_asc">id asc</option>
              <option value="id_desc">id desc</option>
            </select>
            <img src={downIcon} alt='submit' className='w-[1.2rem] h-auto
              absolute right-1 top-2 pointer-events-none sortedclass4'/>
        </label>

        </div>

    </div>
  )
}

export default Filters