import React, { useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";

// Components
import LoginForm from "@/components/Auth/LoginForm";
import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import AttendanceModule from "@/components/Attendance/AttendanceModule";
import LeaveModule from "@/components/Leave/LeaveModule";
import IncidentModule from "@/components/Incidents/IncidentModule";
import GuardTourModule from "@/components/GuardTour/GuardTourModule";
import PayrollModule from "@/components/Payroll/PayrollModule";
import EOBModule from "@/components/EOB/EOBModule";
import ChecklistModule from "@/components/Checklist/ChecklistModule";
import ComplianceModule from "@/components/Compliance/ComplianceModule";
import ClientModule from "@/components/Clients/ClientModule";
import SettingsModule from "@/components/Settings/SettingsModule";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentModule, setCurrentModule] = useState("dashboard");
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderModule = () => {
    switch (currentModule) {
      case "dashboard":
        return <DashboardOverview />;
      case "attendance":
        return <AttendanceModule />;
      case "leave":
        return <LeaveModule />;
      case "incidents":
        return <IncidentModule />;
      case "guardtour":
        return <GuardTourModule />;
      case "payroll":
        return <PayrollModule />;
      case "eob":
        return <EOBModule />;
      case "checklist":
        return <ChecklistModule />;
      case "compliance":
        return <ComplianceModule />;
      case "clients":
        return <ClientModule />;
      case "settings":
        return <SettingsModule />;
      case "reports":
        return (
          <div className="p-8 text-center text-gray-500">
            Reports & Analytics - Coming Soon
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-64 flex-shrink-0">
          <Sidebar
            currentModule={currentModule}
            onModuleChange={setCurrentModule}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentModule={currentModule}
          onModuleChange={setCurrentModule}
        />
        <main className="flex-1 overflow-auto p-2">{renderModule()}</main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
