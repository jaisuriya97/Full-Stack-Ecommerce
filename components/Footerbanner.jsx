import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/Client'
const Footer = ({footerbanner}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{footerbanner.discount}</p>
          <h3>{footerbanner.largeText1}</h3>
          <h3>{footerbanner.largeText2}</h3>
          <p>{footerbanner.saleTime}</p>
        </div>
        <div className='right'>
          <p>{footerbanner.smallText}</p>
          <h3>{footerbanner.midText}</h3>
          <p>{footerbanner.desc}</p>
          <Link href={`/product/${footerbanner.product}`}>
            <button type='button'>{footerbanner.buttonText}</button>
          </Link>
        </div>
        {/* <img src={urlFor(footerbanner.image)} alt="" className='footer-banner-image' /> */}
      </div>
      
    </div>
  )
}

export default Footer
