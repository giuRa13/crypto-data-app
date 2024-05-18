import React, { useContext, useRef } from 'react'
import Search from './Search'
import { CryptoContext } from '../context/CryptoContext'

function Filters({}) {

  let { setCurrency } = useContext(CryptoContext);
  const currencyRef = useRef(null);
  
  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency((val).toLowerCase());
    currencyRef.current.value = "";
  };

  return (
    <div className='w-full h-14 border-2 
    border-grey rounded-md
    flex items-center justify-between relative'
    >
        <Search/>

        <div className='flex mr-7'>
          <form className='relative items-center mr-12' onSubmit={handleCurrencySubmit}>
            <label htmlFor='currency'
              className='relative justify-center items-center mr-2 font-bold'>Currency:</label>
            <input type='text' name='currency' placeholder='USD'
              className='uppercase w-16 rounded outline-0 border border-orange focus:border-orange
              leading-4 bg-grey'
              ref={currencyRef}/>
            <button type='submit'
              className='text-darkgrey2 font-bold p-2 rounded bg-orange ml-1 cursor-pointer border-2 border-orange leading-4
              hover:text-orange hover:bg-darkgrey'>
            Change</button>
          
          </form>
        </div>

        <div>sorting</div>

    </div>
  )
}

export default Filters