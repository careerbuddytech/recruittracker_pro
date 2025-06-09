import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import Sidebar from "components/ui/Sidebar";
import ExecutiveDashboard from "pages/executive-dashboard";
import ClientCandidateDatabase from "pages/client-candidate-database";
import InvoiceManagementCenter from "pages/invoice-management-center";
import FinancialAnalyticsDashboard from "pages/financial-analytics-dashboard";
import CommissionCalculator from "pages/commission-calculator";
import UserAdministrationPanel from "pages/user-administration-panel";
import TransactionEntryForm from "pages/transaction-entry-form";
import RecruiterProfile from "pages/recruiter-profile";
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
              <Route path="/client-candidate-database" element={<ClientCandidateDatabase />} />
              <Route path="/invoice-management-center" element={<InvoiceManagementCenter />} />
              <Route path="/financial-analytics-dashboard" element={<FinancialAnalyticsDashboard />} />
              <Route path="/commission-calculator" element={<CommissionCalculator />} />
              <Route path="/user-administration-panel" element={<UserAdministrationPanel />} />
              <Route path="/transaction-entry-form" element={<TransactionEntryForm />} />
              <Route path="/recruiter/:id" element={<RecruiterProfile />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;