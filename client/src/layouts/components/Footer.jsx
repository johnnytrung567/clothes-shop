import { Link, NavLink } from 'react-router-dom'
import { BsPinMapFill, BsTelephoneFill, BsSkype } from 'react-icons/bs'
import { GrMail, GrInstagram } from 'react-icons/gr'
import {
    FaFacebookF,
    FaTwitter,
    FaPinterest,
    FaLinkedinIn,
} from 'react-icons/fa'
import menuData from '../../data/menuData'
import googlePlayImg from '../../assets/google-play.png'
import appStoreImg from '../../assets/app-store.png'

const Footer = () => {
    return (
        <footer className='bg-gray-700'>
            <div className='py-20 max-w-[1230px] text-white flex justify-between flex-wrap mx-auto '>
                <div className='w-full px-4 sm:w-1/2 md:w-1/4'>
                    <h3 className='uppercase text-base font-bold mb-5'>
                        Contact
                    </h3>
                    <div className='flex text-sm mb-1.5'>
                        <BsPinMapFill className='mr-4 translate-y-1' />
                        <p className='flex-1'>
                            720 A Dien Bien Phu, Ward 22, Binh Thanh District,
                            Ho Chi Minh City
                        </p>
                    </div>
                    <a href='tel:0123456789' className='flex text-sm mb-1.5'>
                        <BsTelephoneFill className='mr-4 translate-y-1' />
                        <p className=' transition-all duration-300 hover:text-brown-300'>
                            012 345 6789
                        </p>
                    </a>
                    <a
                        href='mailto:vantrung242628@gmail.com'
                        className='flex text-sm mb-1.5 break-all'
                    >
                        <GrMail size={16} className='mr-4 translate-y-1' />
                        <p className=' transition-all duration-300 hover:text-brown-300'>
                            vantrung242628@gmail.com
                        </p>
                    </a>
                    <a
                        href='skype:johnnytrung?chat'
                        className='flex text-sm mb-1.5'
                    >
                        <BsSkype className='mr-4 translate-y-1' />
                        <p className=' transition-all duration-300 hover:text-brown-300'>
                            johnnytrung
                        </p>
                    </a>
                    <div className='flex flex-wrap'>
                        <a
                            target='_blank'
                            href='https://www.facebook.com'
                            className='w-9 h-9 rounded-full mt-6 flex items-center justify-center transition-color duration-300 mr-3 bg-blue-800 hover:bg-blue-900'
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            target='_blank'
                            href='https://www.instagram.com'
                            className='w-9 h-9 rounded-full mt-6 flex items-center justify-center transition-color duration-300 mr-3 bg-gradient-to-tr from-yellow-400 via-red-600 to-fuchsia-600 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-700 hover:to-fuchsia-700'
                        >
                            <GrInstagram />
                        </a>
                        <a
                            target='_blank'
                            href='https://www.twitter.com'
                            className='w-9 h-9 rounded-full mt-6 flex items-center justify-center transition-color duration-300 mr-3 bg-cyan-600 hover:bg-cyan-700'
                        >
                            <FaTwitter />
                        </a>
                        <a
                            target='_blank'
                            href='https://www.pinterest.com/'
                            className='w-9 h-9 rounded-full mt-6 flex items-center justify-center transition-color duration-300 mr-3 bg-red-800 hover:bg-red-900'
                        >
                            <FaPinterest />
                        </a>
                        <a
                            target='_blank'
                            href='https://www.linkedin.com'
                            className='w-9 h-9 rounded-full mt-6 flex items-center justify-center transition-color duration-300 mr-3 bg-sky-700 hover:bg-sky-800'
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
                <div className='w-1/2 px-4 mt-6 sm:w-1/4 sm:mt-0'>
                    <h3 className='uppercase text-base font-bold mb-5'>
                        Links
                    </h3>
                    <ul className='flex flex-col text-sm'>
                        {menuData.slice(1).map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'mb-1.5 text-brown-300'
                                        : 'mb-1.5 transition-all duration-300 hover:text-brown-300'
                                }
                            >
                                {item.title}
                            </NavLink>
                        ))}
                    </ul>
                </div>
                <div className='w-1/2 px-4 mt-6 sm:w-1/4 sm:mt-0'>
                    <h3 className='uppercase text-base font-bold mb-5'>
                        Support
                    </h3>
                    <ul className='flex flex-col text-sm'>
                        <Link
                            to='/about'
                            className='mb-1.5 transition-all duration-300 hover:text-brown-300'
                        >
                            Shopping guide
                        </Link>
                        <Link
                            to='/about'
                            className='mb-1.5 transition-all duration-300 hover:text-brown-300'
                        >
                            Warranty policy
                        </Link>
                        <Link
                            to='/about'
                            className='mb-1.5 transition-all duration-300 hover:text-brown-300'
                        >
                            Return policy
                        </Link>
                        <Link
                            to='/about'
                            className='mb-1.5 transition-all duration-300 hover:text-brown-300'
                        >
                            Customer consulting
                        </Link>
                    </ul>
                </div>
                <div className='w-full px-4 mt-5 sm:w-1/2 md:w-1/4 md:mt-0'>
                    <h3 className='uppercase text-base font-bold mb-5'>
                        Download application
                    </h3>
                    <p className='flex text-sm mb-3'>
                        The Fashion Outfit app is available now on Google Play &
                        App Store. Download it now.
                    </p>
                    <div className='flex flex-wrap'>
                        <div className='w-[48%] pr-4 sm:w-4/6 sm:p-0 sm:mb-2.5'>
                            <a target='blank' href='https://www.apple.com'>
                                <img src={appStoreImg} alt='app store' />
                            </a>
                        </div>
                        <div className='w-[48%] pl-4 sm:w-4/6 sm:p-0'>
                            <a target='blank' href='https://play.google.com'>
                                <img
                                    src={googlePlayImg}
                                    alt='google play store'
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
