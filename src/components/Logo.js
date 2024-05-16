import React from 'react';
import { Link } from 'react-router-dom';
import logo3Svg from '../assets/logo3.svg';
import logo2Svg from '../assets/logo2.svg';

function Logo() {
  return (

        <Link to="/"
            className='
            absolute top-[1.5rem] left-[1.5rem] font-bold
            text-xl text-orange flex items-center '>
            <img src={logo3Svg} alt='CryptoApp'/>
            <span>CryptoApp</span>
        </Link>

  )
}

export default Logo