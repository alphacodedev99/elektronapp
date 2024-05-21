import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function CardProductComponent({ product }) {
	return (
		<div className='w-[300px] h-full border border-mainBlue rounded-lg flex flex-col items-center gap-[20px] cursor-pointer'>
			{/* overlay */}
			<div className='w-full relative'>
				<img
					src={product.thumbnail}
					alt={product.title}
					className='w-full h-[150px] object-cover rounded-t-lg'
				/>
				{/* div ovarlay black */}
				<div className='bg-[#000] opacity-30 absolute inset-0 hover:opacity-0 transition-all cursor-pointer duration-500'></div>
			</div>
			<h2>{product.title}</h2>
			<span>${product.price}</span>
			{/* rating from Matirial */}
			<Rating name='read-only' value={product.rating} readOnly />

			<Link
				to={`/singleProduct/${product.id}`}
				className='bg-mainBlue px-[16px] py-[8px] text-textWhite hover:bg-mainOrange transition-all mb-[20px] rounded-lg'>
				View Detail
			</Link>
		</div>
	);
}

export default CardProductComponent;
