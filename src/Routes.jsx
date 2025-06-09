import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import Sidebar from "components/ui/Sidebar";
import ExecutiveDashboard from "pages/executive-dashboard";
import RevenueTracking from "pages/revenue-tracking";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <Sidebar />
          <main className="lg:ml-64 pt-16">
            <RouterRoutes>
              <Route path="/" element={<ExecutiveDashboard />} />
              <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
              <Route path="/revenue-tracking" element={<RevenueTracking />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;