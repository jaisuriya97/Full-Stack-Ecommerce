import React from 'react'
import { client, urlFor } from '../../lib/Client'
import { Products } from '../../components';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product
    const {qty,incQty,decQty,onAdd}  = useStateContext();
    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img width={450} height={450} src={urlFor(image[0])} className='product-detail-image' />
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar></AiFillStar>
                            <AiFillStar></AiFillStar>
                            <AiFillStar></AiFillStar>
                            <AiFillStar></AiFillStar>
                            <AiOutlineStar></AiOutlineStar>

                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4><br></br>
                    <p>{details}</p>
                    <p className='price'>Rs:{price}</p><br></br>
                    <div className='quantity'>
                        <h3>Quantity:</h3><br></br>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num' onClick="">
                                {qty}
                            </span>
                            <span className='plus' onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button className='add-to-cart' type='button' onClick={()=>onAdd(product,qty)}>Add to cart</button>
                        <button className='buy-now' type='button'>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
<div className='maylike-products-container track'>
    {products.map((item)=>(
        <Products key={item._id}
        product={item}
        />
    ))}

</div>
                </div>
            </div>
        </div>
    )
}
export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));
    return {
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productQuery = '*[_type == "product"]'
    const product = await client.fetch(query)
    const products = await client.fetch(productQuery)
    return {
        props: { product, products }
    }
}
export default ProductDetails
