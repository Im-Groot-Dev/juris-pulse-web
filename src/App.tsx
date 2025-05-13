
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LawyerRegister from "./pages/LawyerRegister";
import Services from "./pages/Services";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import UserDashboard from "./pages/UserDashboard";
import LawyerDashboard from "./pages/LawyerDashboard";
import FindLawyer from "./pages/FindLawyer";
import Company from "./pages/Company";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewLawyerProfile from "./pages/ViewLawyerProfile";
import AppointmentPage from "./pages/AppointmentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lawyer-register" element={<LawyerRegister />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/company" element={<Company />} />
            <Route path="/find-lawyer" element={<FindLawyer />} />
            <Route path="/lawyer/:id" element={<ViewLawyerProfile />} />
            <Route path="/appointment/:lawyerId" element={
              <ProtectedRoute role="user">
                <AppointmentPage />
              </ProtectedRoute>
            } />
            <Route path="/user-dashboard" element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/lawyer-dashboard" element={
              <ProtectedRoute role="lawyer">
                <LawyerDashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
