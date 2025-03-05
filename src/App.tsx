
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Permissions from "./pages/Permissions";
import Network from "./pages/Network";
import Activity from "./pages/Activity";
import CloneDetection from "./pages/CloneDetection";
import Alerts from "./pages/Alerts";
import Applications from "./pages/Applications";
import DataAccess from "./pages/DataAccess";
import Termination from "./pages/Termination";
import Settings from "./pages/Settings";
import WebMonitoring from "./pages/WebMonitoring";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/permissions" element={
              <ProtectedRoute>
                <Permissions />
              </ProtectedRoute>
            } />
            <Route path="/network" element={
              <ProtectedRoute>
                <Network />
              </ProtectedRoute>
            } />
            <Route path="/activity" element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            } />
            <Route path="/clone-detection" element={
              <ProtectedRoute>
                <CloneDetection />
              </ProtectedRoute>
            } />
            <Route path="/alerts" element={
              <ProtectedRoute>
                <Alerts />
              </ProtectedRoute>
            } />
            <Route path="/applications" element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            } />
            <Route path="/data-access" element={
              <ProtectedRoute>
                <DataAccess />
              </ProtectedRoute>
            } />
            <Route path="/termination" element={
              <ProtectedRoute>
                <Termination />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/web" element={
              <ProtectedRoute>
                <WebMonitoring />
              </ProtectedRoute>
            } />
            {/* Catch-all route for any other paths */}
            <Route path="*" element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
