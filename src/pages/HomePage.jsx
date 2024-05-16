import React, { useEffect } from 'react'

// products
import ProductsService from '../services/productsService';
import { useDispatch, useSelector } from 'react-redux';
import { saveAllProductsAction } from '../store/productsSlice';

// components
import LoadingComponent from '../components/LoadingComponent';
import CardProductComponent from '../components/CardProductComponent';

function HomePage() {

  const {isLoading, allProducts} = useSelector(state => state.productStore);

  const dispatch = useDispatch();

  useEffect(() => {
    ProductsService.getAllProducts()
      .then(res => dispatch(saveAllProductsAction(res.data.products)))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
        {isLoading ? allProducts.map(product => <CardProductComponent key={product.id} product={product} />) : <LoadingComponent />}
    </div>
  )
}

export default HomePage