import React, { createContext, useContext, useState } from 'react';
import searchIcon from '../assets/search-icon.svg';
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';

const SearchInput = ({handleSearch}) => {

  const [searchText, setSearchText] = useState(""); 
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    //console.log(query);
    setSearchText(query);
    handleSearch(query);//getSearchResult(query);
  };

  //select coin wirh button too
  let handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText(""); // empty the search input
    setSearchData();// this empty the all search(set an empty state)
  };

  return(
    <>
    <form className='w-96 relative flex tems-center ml-5' onSubmit={handleSubmit}>
    <input type='text' name='search' className='w-[75%] rounded bg-grey   
      required outline-0 border border-transparent 
      focus:border-orange
      placeholder:text-gray-100 pl-2
      overflow-y rounded'
      placeholder='Search...'
      onChange={handleInput}
      value={searchText}
      />
    <button type='submit' alt='search' 
      className='cursor-pointer w-[25%] bg-orange
        border border-orange rounded
        flex justify-center items-center
        hover:bg-gray-200 hover:color-orange'
    >
      <img src={searchIcon} alt='search' className='justify-center ' />
    </button>
  </form>

  {
    searchText.length > 0 ?
      <ul className='absolute top-10 left-5 w-96 h-96 rounded-lg
        overflow-x-hidden py-2 bg-darkgrey2 bg-opacity-60 
        backdrop-blur-md' 
        >
        {
          searchData ?  
          searchData.map(item => 
            {return<li className='flex items-center ml-2 my-3 cursor-pointer hover:bg-gray-200' 
          key={item.id}
          onClick={()=>selectCoin(item.id)}
          >
              <img className='w-[1rem] h-[1rem]' src={item.thumb} alt={item.name}/>
              <span className='mx-2'>{item.name} ({item.symbol})</span>
            </li>
          }) 
          : 
          <div className='w-full h-full flex justify-center items-center'>
            <div className='w-10 h-10 border-4 border-orange rounded-full
              border-b-gray-200 animate-spin'
              role='status'>
            </div>
            <span className='ml-2'>Searching...</span>
          </div>
        }

      </ul>

      : null
  }
  </>
  );
};

const Search= () => {

  let { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function(val) {
    getSearchResult(val);
  },2000);

  

  return (

    <div className='relative'>

    <SearchInput handleSearch={debounceFunc}/>

    </div>
  )
}

export default Search;