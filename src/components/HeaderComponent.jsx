// icons
import { FaLocationDot } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";

function HeaderComponent() {
  return (
    <header className="container mx-auto flex flex-col justify-center gap-[20px] items-center h-[90px] md:flex-row md:justify-between">
        <p>Need help? Call us: (+98) 0234 456 789</p>

        <div className="flex gap-[20px]">
            <div className="flex gap-[5px] items-center">
                <FaLocationDot />
                <span>Our store</span>
            </div>
            <div className="flex gap-[5px] items-center">
                <CiDeliveryTruck />
                <span>Our store</span>
            </div>
        </div>
    </header>
  )
}

export default HeaderComponent