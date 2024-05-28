import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteItemCartAction,
	setPriceHandlerAction,
} from '../store/cartSlice';

function CartPage() {
	const [cartData, setCartData] = useState();
	const [currentCoupon, setCurrentCoupon] = useState(null);
  const [activeInput, setActiveInput] = useState(false);
	const { cart, totalPrice } = useSelector(
		(state) => state.cartStore
	);
	const dispatch = useDispatch();
	// console.log(cart)

	const coupon = useRef();

	function handleCoupon() {
		setCurrentCoupon(coupon.current.value);
    setActiveInput(true);

    coupon.current.value = '';
	}

	useEffect(() => {
		setCartData(JSON.parse(localStorage.getItem('cart_item')));
	}, [cart]);

	return (
		<div className=' mt-[50px] px-[15px] lg:px-[0px]'>
			<div className='container mx-auto flex flex-col lg:flex-row gap-[20px]'>
				{/* left side */}
				<TableContainer
					component={Paper}
					className='w-full lg:w-[70%]'>
					<Table sx={{ minWidth: 250 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Products</TableCell>
								<TableCell align='left'>Price</TableCell>
								<TableCell align='left'>Quantity</TableCell>
								<TableCell align='right'>Subtotal</TableCell>
								<TableCell align='right'>Remove</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* OUR DATA */}
							{cartData ? (
								cartData.map((product, index) => (
									<TableRow key={product.id}>
										<TableCell component='th' scope='row'>
											<img
												src={product.thumbnail}
												alt=''
												className='w-[90px] h-[90px] border border-mainBlue rounded-lg'
											/>
										</TableCell>
										<TableCell align='left'>
											${product.price}
										</TableCell>
										<TableCell align='left'>
											<div className='flex items-center'>
												<button
													className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
													onClick={() =>
														dispatch(
															setPriceHandlerAction({
																increment: -1,
																index,
															})
														)
													}>
													-
												</button>
												<span className='px-[8px] py-[4px] bg-slate-300 text-[18px]'>
													{product.count}
												</span>
												<button
													className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
													onClick={() =>
														dispatch(
															setPriceHandlerAction({
																increment: 1,
																index,
															})
														)
													}>
													+
												</button>
											</div>
										</TableCell>
										<TableCell align='right'>
											${Math.floor(product.cartTotal)}
										</TableCell>
										<TableCell align='right'>
											<button
												className='text-red-500'
												onClick={() =>
													dispatch(deleteItemCartAction(product))
												}>
												Remove
											</button>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell>Prazna Korpa</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				{/* right side - cart total */}

				<div className='w-full lg:w-[30%]'>
					<h2 className='bg-mainBlue text-white p-[15px] text-center'>
						CART TOTAL
					</h2>

					<div className='flex flex-col gap-[20px] mt-[30px]'>
						<h2>Total Price:</h2>
						<span className='text-[30px] font-bold'>
							${currentCoupon === 'alphacode' ? Math.floor(totalPrice) / 2 : Math.floor(totalPrice)}
						</span>

						<input
              ref={coupon}
							type='text'
							placeholder='Use Coupon'
							className='border border-mainBlue px-[20px] py-[10px]'
              disabled={activeInput && true}
						/>
						<button onClick={handleCoupon} className='bg-mainBlue text-white px-[20px] py-[10px]'>
							Use Discount
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
