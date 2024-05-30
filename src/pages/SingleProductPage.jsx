import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductsService from '../services/productsService';
import LoadingComponent from '../components/LoadingComponent';
import { Rating } from '@mui/material';

// icons
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { CiHeart } from 'react-icons/ci';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
import { updateFavoriteAction } from '../store/favoriteSlice';

function SingleProductPage() {
	const [singleProduct, setSignleProduct] = useState({});
	const [currentImage, setCurrentImage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);

	const {allFavorite} = useSelector((state) => state.favoriteStore);
	// 1. UZMI ID HOOK
	const { id } = useParams();

	const dispatch = useDispatch();

	// 2. Poslati Request - Service - da uzmemo taj 1 prozivod po ID-u
	useEffect(() => {
		ProductsService.getSingleProduct(id)
			.then((res) => {
				setSignleProduct(res.data);
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		// FIXME: Kad imamo vise od 1 proizvod u favorite, ne radi da obrise puno srce!
		if(allFavorite.length > 0){
			allFavorite.find((item) => {
				if(item.id === parseInt(id)){
					setFavoriteIdIcon(item.id);
					return;
				}
			})
		}else{
			setFavoriteIdIcon(null);
			console.log('BRISE')
		}
		
		
		
		
	}, [allFavorite])

	// change image
	function handleImage(index) {
		setCurrentImage(index);
	}


	// to save in redux cart
	function handleAddCart(){
		dispatch(saveInCartAction(singleProduct))
	}
	return (
		<div className='px-[20px]'>
			{isLoading ? (
				<div className='container mx-auto flex flex-col md:flex-row items-center mt-[50px] gap-[20px]'>
					{/* left side */}
					<div className='w-full md:w-[50%] flex flex-col gap-[20px]'>
						{/* thumbnail */}
						<img
							src={singleProduct.images[currentImage]}
							alt=''
							className='w-full h-[400px] object-cover'
						/>
						{/* small images from products */}
						<div className='flex justify-center gap-[10px]'>
							{singleProduct.images.map((el, index) => {
								return (
									<img
										src={el}
										alt='slika'
										className='w-[90px] h-[90px] object-cover border border-mainBlue rounded-xl cursor-pointer'
										key={index}
										onClick={() => handleImage(index)}
									/>
								);
							})}
						</div>
					</div>

					{/* right side */}
					<div className='w-full md:w-[50%]'>
						<h2>{singleProduct.title}</h2>
						<span>${singleProduct.price}</span>
						<p className='flex items-center gap-[20px]'>
							<span>Reviews: </span>
							<Rating
								name='read-only'
								value={singleProduct.rating}
								readOnly
							/>
						</p>

						<p>{singleProduct.description}</p>

						<p className='flex items-center gap-[20px]'>
							<span>Availibilty</span>
							{singleProduct.stock ? (
								<span className='flex items-center gap-[5px] text-green-500'>
									<FaCheck /> In Stock
								</span>
							) : (
								<span className='flex items-center gap-[5px] text-red-500'>
									{' '}
									<ImCross /> Out Stock
								</span>
							)}
						</p>

						<div className='mt-[40px] flex gap-[20px]'>
							<Link
								to='/cart'
								className='px-[24px] py-[12px] bg-mainBlue hover:bg-mainOrange transition-all text-textWhite rounded-xl flex items-center justify-center'
								onClick={handleAddCart}
								>
								Add Cart
							</Link>
							<Link
								to={favoriteIdIcon ? `/singleProduct/${id}` : '/favorite'} 
								className='px-[24px] py-[12px] bg-mainBlue hover:bg-mainOrange transition-all text-textWhite rounded-xl flex items-center justify-center'
								onClick={() => dispatch(updateFavoriteAction(singleProduct))}
								>
								{favoriteIdIcon === parseInt(id) ? <CiHeart size={32} color='red' /> : <CiHeart size={32} /> } 
							</Link>
						</div>
					</div>
				</div>
			) : (
				<LoadingComponent />
			)}
		</div>
	);
}

export default SingleProductPage;
