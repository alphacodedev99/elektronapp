import React from 'react'
import { useSelector } from 'react-redux'
import CardProductComponent from '../components/CardProductComponent';

function FavoritePage() {
    const {allFavorite} = useSelector((state) => state.favoriteStore);

  return (
    <div className='container mx-auto mt-[50px]'>
       <div className='flex flex-wrap gap-[20px] items-center justify-center'>
        {allFavorite.map((favorite) => {
                return <CardProductComponent key={favorite.id} product={favorite} />
            })}
       </div>
    </div>
  )
}

export default FavoritePage