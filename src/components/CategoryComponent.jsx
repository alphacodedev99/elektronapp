import React, { useEffect, useState } from 'react'
import ProductsService from '../services/productsService'
import { useDispatch, useSelector } from 'react-redux'
import { saveAllCategoryAction } from '../store/productsSlice';

function CategoryComponent() {

    const [isActive, setIsActive] = useState(false);

    const {allCategory} = useSelector(state => state.productStore);

    const dispatch = useDispatch();

  useEffect(() => {

    ProductsService.getAllCategory()
            .then(res => dispatch(saveAllCategoryAction(res.data)))
            .catch(err => console.log(err))

  }, [])

  function handleActiveCategory(){
    setIsActive(!isActive);
  }

  return (
    <div className='bg-[#f4f4f4] py-[20px] h-[100%] lg:h-[400px] xl:h-[300px] flex items-center'>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-[20px]">
            <button onClick={handleActiveCategory} className='bg-mainBlue text-textWhite px-[15px] py-[10px] rounded-[10px] hover:bg-mainOrange transition-all duration-500 ease-in-out'>Show Category</button>

            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]'>
                {isActive ? allCategory.map((cat,index) => {
                    return <li key={index} className='bg-mainBlue text-textWhite px-[16px] py-[8px] w-[250px] text-center rounded-lg cursor-pointer hover:bg-mainOrange transition-all'>{cat}</li>
                }) : null}
            </ul>
        </div>
    </div>
  )
}

export default CategoryComponent