import React, { useEffect } from 'react';

// products
import ProductsService from '../services/productsService';
import { useDispatch, useSelector } from 'react-redux';
import { saveAllProductsAction } from '../store/productsSlice';

// components
import LoadingComponent from '../components/LoadingComponent';
import CardProductComponent from '../components/CardProductComponent';

// icons
import { FaList } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";


function HomePage() {
	const { isLoading, allProducts } = useSelector(
		(state) => state.productStore
	);

	const dispatch = useDispatch();

	useEffect(() => {
		ProductsService.getAllProducts()
			.then((res) =>
				dispatch(saveAllProductsAction(res.data.products))
			)
			.catch((err) => console.log(err));
	}, []);

	return (
    <main className='mt-[50px] container mx-auto'>
        {/* list/grid view */}

        <div className='flex gap-[20px] justify-end mb-[30px]'>
          <FaList size={32} className='cursor-pointer'/>
          <CiGrid41 size={32} className='cursor-pointer'/>
        </div>


          {/* Our Products */}
            <div className='flex flex-wrap items-center justify-center gap-[20px]'>
          {isLoading ? (
            allProducts.map((product) => (
              <CardProductComponent key={product.id} product={product} />
            ))
          ) : (
            <LoadingComponent />
          )}
        </div>
    </main>
	);
}

export default HomePage;
