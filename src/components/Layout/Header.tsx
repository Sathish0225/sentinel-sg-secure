
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Menu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import NotificationCenter from '@/components/Notifications/NotificationCenter';
import Sidebar from './Sidebar';

interface HeaderProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentModule, onModuleChange }) => {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();

  const getModuleTitle = (module: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      attendance: 'Employee Attendance',
      leave: 'Leave Management',
      incidents: 'Incident Reporting',
      guardtour: 'Guard Tour System',
      payroll: 'Payroll Management',
      eob: 'E-Occurrence Book',
      checklist: 'Supervisory Checklist',
      compliance: 'MOM Compliance',
      clients: 'Client Management',
      reports: 'Reports & Analytics',
      settings: 'System Settings'
    };
    return titles[module] || 'Security Management System';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu trigger */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar currentModule={currentModule} onModuleChange={onModuleChange} />
            </SheetContent>
          </Sheet>
        )}

        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
            {isMobile ? getModuleTitle(currentModule).split(' ')[0] : getModuleTitle(currentModule)}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 truncate">
            {user?.name} • {user?.site || 'Singapore Operations'}
          </p>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <NotificationCenter />
          
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <span>ID: {user?.employeeId}</span>
            <Badge variant="secondary" className="capitalize">
              {user?.role}
            </Badge>
          </div>

          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
