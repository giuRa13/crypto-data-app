import { useContext, useRef } from "react";
import { CryptoContext } from "../context/CryptoContext";

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
    <form className='relative items-center mr-12' onSubmit={handleSubmit}> 

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
        className='text-darkgrey2 font-bold p-2 rounded bg-orange ml-1 cursor-pointer border-2 border-orange leading-4
        hover:text-grey'>
        Change
      </button>      

    </form>
    )
  };

  export default PerPage;