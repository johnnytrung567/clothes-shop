import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    const [isNavbarFixed, setNavbarFixed] = useState(false)
    useEffect(() => {
        const fixedNavbar = () => {
            if (window.scrollY > 152) setNavbarFixed(true)
            else setNavbarFixed(false)
        }

        window.addEventListener('scroll', fixedNavbar)

        return () => window.removeEventListener('scroll', fixedNavbar)
    }, [])

    return (
        <div>
            <Header
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <Navbar isFixed={isNavbarFixed} />
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            <Outlet />
            <Footer />
        </div>
    )
}
export default MainLayout
