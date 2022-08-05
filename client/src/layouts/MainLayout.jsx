import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <div>
            <Header
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <Navbar />
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            <Outlet />
        </div>
    )
}
export default MainLayout
