import React, { useContext } from 'react'
import pageR from '../assets/pagination-right.svg';
import { CryptoContext } from '../context/CryptoContext';

function Pagination() {

    let {page, setPage, resetFunc, cryptoData, perPage} = useContext(CryptoContext);

    const totalNumber = 50;

    const next = () => {
        if (page === totalNumber) {
            return null;
        }
        else{
            setPage(page + 1);
        }     
    };
    const prev = () => {
        if (page === 1) {
            return null;
        }
        else{
            setPage(page - 1);
        }     
    };
    const multiStepNext = () => {
        if (page +3 >= totalNumber) {
            setPage(totalNumber -1);
        }
        else {
            setPage(page +3);
        }
    };
    const multiStepPrev = () => {
        if (page -3 <= 1) {
            setPage(totalNumber +1);
        }
        else {
            setPage(page -2);
        }
    };


if ( cryptoData && cryptoData.length >= perPage) {
  return (
    <div className='flex items-center'>

        <ul className='flex items-center justify-end text-lg'>
            <li className='flex items-center text-md mr-5'>
                {
                (page >= 10) ? 
                <button onClick={resetFunc} className='text-darkgrey2 font-bold p-2 rounded bg-orange ml-1 cursor-pointer border-2 border-orange leading-4
                hover:text-grey'>
                    Back to Page1
                </button>
                : null
                }
            </li>
            <li className='flex items-center'>
                <button className='outline-0 hover:text-orange' onClick={prev}>
                    <img className='w-full h-auto rotate-180 hover:bg-gray-200' src={pageR} alt='left'/>
                </button>
            </li>
            {
                (page+1 === totalNumber || page === totalNumber || page>3) ?
                <li>
                <button onClick={multiStepPrev} className='outline-0 bg-darkgrey mx-1.5
                    rounded-lg w-8 h-8 flex items-center justify-center text-lg
                    hover:text-orange hover:border border-orange'>...</button>
            </li>
            : null
            }
            {
                (page-1 !== 0) ?
                <li>
                <button className='outline-0 bg-darkgrey  mx-1.5
                    rounded-lg w-8 h-8 flex items-center justify-center 
                    hover:text-orange hover:border border-orange' onClick={prev}>{page-1}</button>
            </li>
            : null
            }
            <li>
                <button disabled className='outline-0 bg-orange text-darkgrey2 mx-1.5
                    rounded-lg w-8 h-8 flex items-center justify-center 
                    hover:text-grey  hover:border border-orange'>{page}</button>
            </li>
            {
                (page+1 !== totalNumber && page !== totalNumber) ?
                <li>
                <button className='outline-0 bg-darkgrey mx-1.5
                    rounded-lg w-8 h-8 flex items-center justify-center 
                    hover:text-orange hover:border border-orange' onClick={next}>{page+1}</button>
            </li>
            : null
            }
            <li>
                <button onClick={multiStepNext} className='outline-0 bg-darkgrey mx-1.5
                    rounded-lg w-8 h-8 flex items-center justify-center 
                    hover:text-orange hover:border border-orange'>...</button>
            </li>
            
            {page+1 !== totalNumber && page !== totalNumber ? (
                <li>
                    <button className='outline-0 bg-darkgrey mx-1.5
                        rounded-lg w-8 h-8 flex items-center justify-center 
                        hover:text-orange hover:border border-orange'
                        onClick={()=>setPage(totalNumber)}>{totalNumber}</button>
                </li>
                ) : null
            }        

            <li className='flex items-center'>
                <button className='outline-0 hover:text-orange' onClick={next}>
                    <img className='w-full h-auto hover:bg-gray-200' src={pageR} alt='right'/>
                </button>
            </li>
        </ul>
    </div>
  );
} else {
    return null;
}
}

export default Pagination