import React, { useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts(){
    let {data} = await axios.get('https://route-ecommerce.onrender.com//api/v1/products')
    setProducts(data.data)
  }
  useEffect(()=>{
    getProducts()
  } , [])
  return <>
    <h1>FeaturedProducts</h1>
    {loading?
    <div className="">
    <BallTriangle
        height={100}
        width={100}
        radius={5}
        color='#fff'
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass="text-main"
        visible={true}
        />
    </div>

    : <div className="row gy-4">
      {products.map(product =>
        <div key={product.id} className="col-lg-2">
          <Link to={`/productdetails/${product.id}`}>
        <div className="product p-2">
          <img src={product.imageCover} className='w-100' alt={product.title}
          <span className='font-sm text-main'>{product.category.name}</span>
          <h3 className='h5'>{product.title.split('').splice(0,2).join('')}</h3>
          <div className="d-flex py-3 justify-content-between align-items-center">
          <span className='font-sm'>{product.price} EGP</span>
          <span className='font-sm'>
            <i className='fas fa-star rating-color me-1'></i>
             {product.ratingsAverage}
           </span>
           </div>
           <button className='btn bg-main text-main-light w-100 btn-sm'>add to Cart</button>
         </div>
         </Link>
       </div>)}
      </div>}
  </>
}
