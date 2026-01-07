import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Index from "@/pages/index";
import RoomsPage from "@/pages/rooms-page";
import RoomDetailsPage from "@/pages/room-details-page";
import BookingConfirmationPage from "@/pages/booking-confirmation-page";
import DashboardPage from "@/pages/dashboard-page";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:id" element={<RoomDetailsPage />} />
            <Route path="/booking/confirm/:roomId" element={<BookingConfirmationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;