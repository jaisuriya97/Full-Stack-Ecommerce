import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import Cart from './Cart'

import { useStateContext } from '../context/StateContext'
const Navbar = () => {
  const { totalQuantities,showcart, setshowcart } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Helum</Link>
      </p>
      {/* <p className='CustomDesign'>
        <span className='customDesign'>Create your own design</span>
      </p> */}
      <button type='button' className='cart-icon' onClick={()=>setshowcart(true)} >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {console.log(showcart)}
        {showcart &&   <Cart />}
    </div>
  )
}

export default Navbar
