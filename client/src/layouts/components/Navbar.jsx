import { NavLink } from 'react-router-dom'
import menuData from '../../data/menuData'

const Navbar = () => {
    return (
        <nav className='hidden md:block h-[55px] bg-gray-700'>
            <div className='w-full h-full max-w-[55px] mx-auto flex items-center justify-center text-white uppercase font-bold text-13 gap-x-16'>
                {menuData.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-brown-300 relative leading-8 after:absolute after:h-px after:bg-brown-300 after:left-0 after:right-0 after:bottom-0'
                                : 'transition-all duration-300 hover:text-brown-300'
                        }
                    >
                        {item.title}
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}
export default Navbar
