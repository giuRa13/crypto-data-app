import React from 'react';
import { Link } from 'react-router-dom';
import logo3Svg from '../assets/logo3.svg';
import logoSvg from '../assets/logo.svg';

function Logo() {
  return (

        <Link to="/"
            className='
            absolute top-[1.5rem] left-[1.5rem] font-bold
            text-xl text-orange flex items-center '>
            <img src={logoSvg} alt='CryptoApp'/>
            <span>CoinScan</span>
        </Link>

  )
}

export default Logo