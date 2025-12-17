import { Outlet } from "react-router-dom";
import Footer from "./footer";
import { Toaster } from '@/components/ui/sonner';


const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 pt-20">
                <Outlet />
            </main>
            <Footer />
            <Toaster position="top-right" />
        </div>
    )
}

export default Layout;