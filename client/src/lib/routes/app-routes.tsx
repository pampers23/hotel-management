import AuthGuard from "@/components/auth/auth-guard"
import UnauthenticatedGuard from "@/components/auth/unauthenticated-guard"
import Layout from "@/components/layout/layout"
import Index from "@/pages"
import About from "@/pages/about"
import BookingConfirmationPage from "@/pages/booking-confirmation-page"
import Contact from "@/pages/contact"
import DashboardPage from "@/pages/dashboard-page"
import ForgotPassword from "@/pages/forgot-password"
import Login from "@/pages/login"
import NotFound from "@/pages/not-found"
import RoomDetailsPage from "@/pages/room-details-page"
import RoomsPage from "@/pages/rooms-page"
import SignUp from "@/pages/signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"


const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:id" element={<RoomDetailsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route
              path="/login"
              element={
                <UnauthenticatedGuard>
                  <Login />  
                </UnauthenticatedGuard>
              }  
            />

            <Route
              path="/sign-up"
              element={
                <UnauthenticatedGuard>
                  <SignUp />  
                </UnauthenticatedGuard>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <UnauthenticatedGuard>
                  <ForgotPassword />  
                </UnauthenticatedGuard>
              }  
            />

            <Route
              path="/booking/confirm/:roomId"
              element={
                <AuthGuard>
                  <BookingConfirmationPage />  
                </AuthGuard>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />  
        </Routes>
      </BrowserRouter>  
    )
}

export default AppRoutes;