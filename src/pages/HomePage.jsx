import React, { useEffect, useState } from 'react';

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
  const [activeView, setActiveView] = useState('gridView');


	const { isLoading, allProducts, searchTitle,selectCategory } = useSelector(
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

  useEffect(() => {
    ProductsService.getSearchProduct(searchTitle)
      .then(res => dispatch(saveAllProductsAction(res.data.products)))
      .catch(err => console.log(err))
  }, [searchTitle])

  useEffect(() => {
    if(selectCategory){
      ProductsService.getProductsByCategory(selectCategory)
      .then(res => dispatch(saveAllProductsAction(res.data.products)))
      .catch(err => console.log(err))
    }
  }, [selectCategory])


	return (
    <main className='mt-[50px] container mx-auto'>
        {/* list/grid view */}

        <div className='flex gap-[20px] justify-end mb-[30px]'>
          <FaList 
            size={42} 
            className={activeView === 'listView' ? 'cursor-pointer bg-mainOrange p-[5px] rounded-lg'  : 'p-[5px]' }
            onClick={() => setActiveView('listView')}  
          />
          <CiGrid41 
            size={42} 
            className={activeView === 'gridView' ? 'cursor-pointer bg-mainOrange p-[5px] rounded-lg' : 'p-[5px]' }
            onClick={() => setActiveView('gridView')}
            />
        </div>


          {/* Our Products */}
            <div className={activeView === 'gridView' ? 'flex flex-wrap items-center justify-center gap-[20px]' : 'flex flex-col flex-wrap items-center justify-center gap-[20px]'}>
          {isLoading ? (
            allProducts.map((product) => (
              <CardProductComponent key={product.id} product={product} activeView={activeView} />
            ))
          ) : (
            <LoadingComponent />
          )}
        </div>
    </main>
	);
}

export default HomePage;
