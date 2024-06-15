import { useContext, useRef } from "react";
import { CryptoContext } from "../context/CryptoContext";
import pageR from '../assets/pagination-right.svg';

const  PerPage = () => {

    let {setPerPage} = useContext(CryptoContext);
    const inputRef = useRef(null); 
  
    const handleSubmit = (e) => {
        e.preventDefault();
        let val = inputRef.current.value;
        if (val !== 0){
            setPerPage(val);
        }
    };

    return(
    <form className='flex relative items-center' onSubmit={handleSubmit}> 

      <label htmlFor='perpage'
        className='relative justify-center items-center mr-2 font-bold'>
            Per Page:
      </label>

      <input className='uppercase w-16 rounded outline-0 border border-orange focus:border-orange
        leading-4 bg-grey py-1'
        type='number' 
        name='perpage' 
        placeholder='50'
        min={10}
        max={250}
        ref={inputRef}/>

      <button type='submit'
        className='rounded ml-1 cursor-pointer hover:text-grey'>
        <img className='w-[70%] h-auto hover:bg-gray-200' src={pageR} alt='right'/>

      </button>      

    </form>
    )
  };

  export default PerPage;