import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='w-[60%] mt-24 flex justify-around align-middle
        border border-orange rounded-lg navigation'>
        
    <NavLink 
        to="/"
        end
        className={({isActive}) => {
            return `w-full text-base text-center m-3
            ${//bg-gray-200
                isActive 
                ? "bg-orange text-darkgrey2 " 
                : "bg-grey text-gray-100 hover:text-grey active:bg-orange active:text-darkgrey2"
            }
            cursor-pointer border-0 rounded capitalize font-bold hover:opacity-70`;
        }}>
            Crypto          
    </NavLink>

    <NavLink 
        to="/trending"
        className={({isActive}) => {
            return `w-full text-base text-center m-3
            ${
                isActive 
                ? "bg-orange text-darkgrey2" 
                : "bg-grey text-gray-100 hover:text-orange active:bg-orange active:text-darkgrey2 "
            }
            cursor-pointer border-0 rounded capitalize font-bold hover:opacity-70`;
        }}>
            Trending            
    </NavLink>

    <NavLink 
        to="/saved"
        className={({isActive}) => {
            return `w-full text-base text-center m-3
            ${
                isActive 
                ? "bg-orange text-darkgrey2 " 
                : "bg-grey text-gray-100 hover:text-orange active:bg-orange active:text-darkgrey2 "
            }
            cursor-pointer border-0 rounded capitalize font-bold hover:opacity-70`;
        }}>
            Saved           
    </NavLink>


    </nav>
  )
}

export default Navigation