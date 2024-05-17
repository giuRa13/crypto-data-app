import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='w-[55%] mt-16 flex justify-around align-middle
        border border-orange rounded-md'>
        
    <NavLink 
        to="/"
        end
        className={({isActive}) => {
            return `w-full text-base text-center m-3
            ${//bg-gray-200
                isActive 
                ? "bg-orange text-gray-300" 
                : "bg-darkgrey text-gray-100 hover:text-orange active:bg-orange active:text-gray-300"
            }
            cursor-pointer border-0 rounded capitalize font-bold`;
        }}>
            Crypto          
    </NavLink>

    <NavLink 
        to="/trending"
        className={({isActive}) => {
            return `w-full text-base text-center m-2.5
            ${
                isActive 
                ? "bg-orange text-gray-300" 
                : "bg-darkgrey text-gray-100 hover:text-orange active:bg-orange active:text-gray-300"
            }
            cursor-pointer border-0 rounded capitalize font-bold`;
        }}>
            Trending            
    </NavLink>

    <NavLink 
        to="/saved"
        className={({isActive}) => {
            return `w-full text-base text-center m-2.5
            ${
                isActive 
                ? "bg-orange text-gray-300" 
                : "bg-darkgrey text-gray-100 hover:text-orange active:bg-orange active:text-gray-300"
            }
            cursor-pointer border-0 rounded capitalize font-bold`;
        }}>
            Saved           
    </NavLink>


    </nav>
  )
}

export default Navigation