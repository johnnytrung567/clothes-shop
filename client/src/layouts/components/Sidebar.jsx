import { NavLink } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { FaTimes } from 'react-icons/fa'
import menuData from '../../data/menuData'

const Sidebar = ({ isOpen, toggle }) => {
    return (
        <>
            <div
                className={`${
                    isOpen ? '' : 'hidden'
                } fixed top-0 bottom-0 left-0 right-0 z-40 bg-black/50`}
                onClick={toggle}
            ></div>
            <aside
                className={`${
                    isOpen ? 'left-0 opacity-100' : '-left-full opacity-0'
                } w-[260px] fixed top-0 bottom-0 overflow-y-auto bg-white/95 flex flex-col z-50 transition-all duration-300`}
            >
                <div
                    className='self-end p-2 text-gray-500 cursor-pointer'
                    onClick={toggle}
                >
                    <FaTimes size={26} />
                </div>
                <form className=' mt- p-5 flex'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='px-2.5 py-1.5 outline-none border text-gray-700 text-13 border-gray-300 rounded-l w-full focus:shadow-sm'
                    />
                    <button className='flex items-center text-lg text-white bg-brown-300 px-2 flex-1 rounded-r transition-all duration-300 hover:bg-brown-400'>
                        <FiSearch />
                    </button>
                </form>
                {menuData.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) =>
                            isActive
                                ? 'py-4 pl-5 uppercase font-bold border-t border-t-slate-200 text-brown-300 bg-black/5 relative after:absolute after:w-1 after:left-0 after:top-0 after:bottom-0 after:bg-brown-300'
                                : 'py-4 pl-5 text-gray-500 uppercase font-bold border-t border-t-slate-200 transition-all duration-300 hover:text-gray-700 hover:bg-black/5'
                        }
                        onClick={toggle}
                    >
                        {item.title}
                    </NavLink>
                ))}
                <NavLink
                    to='/favorites'
                    className={({ isActive }) =>
                        isActive
                            ? 'py-4 pl-5 uppercase font-bold border-t border-t-slate-200 text-brown-300 bg-black/5 relative after:absolute after:w-1 after:left-0 after:top-0 after:bottom-0 after:bg-brown-300'
                            : 'py-4 pl-5 text-gray-500 uppercase font-bold border-t border-t-slate-200 transition-all duration-300 hover:text-gray-700 hover:bg-black/5'
                    }
                >
                    Favorites
                </NavLink>
                <NavLink
                    to='/signin'
                    className={({ isActive }) =>
                        isActive
                            ? 'py-4 pl-5 uppercase font-bold border-t border-t-slate-200 text-brown-300 bg-black/5 relative after:absolute after:w-1 after:left-0 after:top-0 after:bottom-0 after:bg-brown-300'
                            : 'py-4 pl-5 text-gray-500 uppercase font-bold border-t border-t-slate-200 transition-all duration-300 hover:text-gray-700 hover:bg-black/5'
                    }
                >
                    Sign in
                </NavLink>
                <div className='py-4 pl-5 text-gray-500 uppercase font-bold border-t border-t-slate-200 transition-all duration-300 hover:text-gray-700 hover:bg-black/5 flex items-center'>
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
            </aside>
        </>
    )
}
export default Sidebar
