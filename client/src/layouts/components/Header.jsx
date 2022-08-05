import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { FaUserAlt, FaHeart } from 'react-icons/fa'
import { GiShoppingBag } from 'react-icons/gi'
import { GoThreeBars } from 'react-icons/go'
import logo from '../../assets/logo.png'
import { useRef, useState } from 'react'
import { useEffect } from 'react'

const Header = ({ isSidebarOpen, toggleSidebar }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen)

    const userIconRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = e => {
            if (
                isDropdownOpen &&
                userIconRef.current &&
                !userIconRef.current.contains(e.target)
            ) {
                toggleDropdown()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [isDropdownOpen, userIconRef])

    return (
        <header className='w-full  h-[98px] bg-gray-700 border-b border-b-white/10'>
            <div className='max-w-[1230px] h-full pl-4 pr-6 mx-auto flex items-center justify-between'>
                <GoThreeBars
                    size={24}
                    className={`${
                        isSidebarOpen ? 'opacity-0' : 'opacity-90'
                    } block md:hidden text-white cursor-pointer  transition-all duration-300 delay-75 hover:opacity-100`}
                    onClick={toggleSidebar}
                />
                <Link to='/' className='h-[44px] cursor-pointer'>
                    <img className='h-full' src={logo} alt='' />
                </Link>
                <form className='hidden md:flex bg-white w-[300px] lg:w-[460px] rounded-md overflow-hidden'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='flex-1 border-none outline-none p-2.5 text-13 text-gray-700 focus:shadow-neutral-300 focus:shadow-sm'
                    />
                    <button className='bg-brown-300 flex items-center justify-center text-white text-lg px-6 cursor-pointer transition-all duration-300 hover:bg-brown-400'>
                        <FiSearch />
                    </button>
                </form>
                <div className='flex items-center text-white text-xl gap-x-7'>
                    <div
                        className='hidden md:block cursor-pointer opacity-95 transition-all relative hover:opacity-100'
                        ref={userIconRef}
                    >
                        <FaUserAlt onClick={toggleDropdown} />
                        <ul
                            className={`${
                                isDropdownOpen ? 'max-h-[250px]' : 'max-h-0'
                            } absolute top-[25px] -left-[40px] w-[180px] bg-white/95 shadow-md rounded-md text-13 text-gray-500 uppercase font-bold flex flex-col justify-center transition-all duration-300 h-auto overflow-y-hidden`}
                        >
                            <Link
                                to='/signin'
                                className='px-3 py-2 border-b transition-all duration-300 hover:text-gray-700 hover:bg-black/5'
                            >
                                Sign in
                            </Link>
                            <div className='px-3 py-2 border-b transition-all duration-300 hover:text-gray-700 flex items-center hover:bg-black/5'>
                                <span className='mr-3'>Dark mode</span>
                                <label
                                    htmlFor='darkmode-toggle'
                                    className='inline-flex relative items-center cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        value=''
                                        id='darkmode-toggle'
                                        className='sr-only peer'
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brown-300"></div>
                                </label>
                            </div>
                        </ul>
                    </div>
                    <Link
                        to='/favorites'
                        className='hidden md:block opacity-95 transition-all relative hover:opacity-100'
                    >
                        <FaHeart />
                        <div className='absolute -top-2.5 left-3/4 bg-brown-600 text-white text-center text-[11px] leading-none p-1 min-w-[19px] rounded-xl'>
                            34
                        </div>
                    </Link>
                    <Link
                        to='/bag'
                        className='text-2xl opacity-95 transition-all relative hover:opacity-100'
                    >
                        <GiShoppingBag />
                        <div className='absolute -top-1.5 left-3/4 bg-brown-600 text-white text-center text-[11px] leading-none p-1 min-w-[19px] rounded-xl'>
                            34
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
export default Header
