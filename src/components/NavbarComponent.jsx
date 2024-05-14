// nav link
import { NavLink } from 'react-router-dom';
// logo
import logo from '../assets/logo.png';
// icons
import { FaUser } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";


function NavbarComponent() {
	return (
		<nav className='bg-mainBlue h-[100%] py-[10px] lg:py-0 lg:h-[100px] w-full flex items-center'>
			<div className='container mx-auto  flex flex-col lg:flex-row  gap-[20px] justify-between items-center'>
				<img src={logo} alt="logo" />

                {/* TODO: Search Component */}
                <div className='bg-white rounded-[20px] flex'>
                    <input type="text" placeholder='Search products..' className='rounded-l-[20px] px-[25px] py-[17px] outline-none placeholder:text-mainOrange' />
                    <button className='bg-mainOrange rounded-r-[20px] px-[25px] text-textWhite'>Search</button>
                </div>

                {/* General Info */}
                <div className='flex gap-[20px] text-textWhite'>
                    <div className='flex items-center  gap-[10px]'>
                        <FaUser size={24}/>
                        <p>Clerk</p>
                    </div>
                    <div className='flex items-center  gap-[10px]'>
                        <MdFavoriteBorder size={24}/>
                        <span className='w-[25px] h-[25px] rounded-full bg-mainOrange text-textWhite flex items-center justify-center'>0</span>
                        <NavLink to='/'>Favorite</NavLink>
                       
                    </div>
                    <div className='flex items-center  gap-[10px]'>
                       <FaShoppingCart size={24}/>
                       <span className='w-[25px] h-[25px] rounded-full bg-mainOrange text-textWhite flex items-center justify-center'>0</span>
                        <NavLink to='/'>Cart</NavLink>
                  
                    </div>
                </div>

			</div>
		</nav>
	);
}

export default NavbarComponent;
