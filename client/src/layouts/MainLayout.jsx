import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer.jsx";
const MainLayout = () => {
    return (
        <div className="relative min-h-screen flex flex-col max-w-full overflow-hidden ">
            <Navbar />
            <div className="flex-grow">

                <Outlet />
            </div>
            < Footer />
            <ToastContainer />
        </div>
    )
}

export default MainLayout;