import React from 'react'
import { client } from '../lib/Client'
import { Products, Footerbanner, Herobanner ,Category} from '../components';
 
const Home = ({product,bannerData,cat}) => {
  return (
    <div>
    <Herobanner herobanner={ bannerData[0]} />
    <div className='products-heading'>
      <h2>Best selling Products</h2>
      <p>You may Love It</p>
    </div>
    <div className='products-container'>
      {product?.map((pro)=><Products key={pro._id} product={pro}/>)}
    </div>
    <div className='products-heading'>
      <h2>Choose From The Featured Neon Signs</h2>
    </div>
    <div className='products-container'>
      {cat?.map((pro)=><Category key={pro._id} product={pro}/>)}
    </div>
    <Footerbanner footerbanner={bannerData[0]} />
    </div>
  )
}
export const getServerSideProps = async()=>{
  const query = '*[_type == "product"]';
  const product  = await client.fetch(query)

  const query1 = '*[_type == "category"]';
  const cat  = await client.fetch(query1)

  const banner = '*[_type == "banner"]';
  const bannerData = await client.fetch(banner);  
  return {
    props:{product,bannerData,cat}
  }
}
export default Home
