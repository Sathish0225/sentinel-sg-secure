
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Clock, 
  Calendar, 
  AlertTriangle, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  CheckSquare,
  BarChart3,
  Settings,
  Shield,
  Users,
  FileText,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange }) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['guard', 'supervisor', 'client', 'hr', 'admin', 'management'] },
    { id: 'attendance', label: 'Attendance', icon: Clock, roles: ['guard', 'supervisor', 'hr', 'admin', 'management'] },
    { id: 'leave', label: 'Leave Management', icon: Calendar, roles: ['guard', 'supervisor', 'hr', 'admin', 'management'] },
    { id: 'incidents', label: 'Incident Reports', icon: AlertTriangle, roles: ['guard', 'supervisor', 'admin', 'management'] },
    { id: 'guardtour', label: 'Guard Tours', icon: MapPin, roles: ['guard', 'supervisor', 'admin', 'management'] },
    { id: 'payroll', label: 'Payroll', icon: DollarSign, roles: ['hr', 'admin', 'management'] },
    { id: 'eob', label: 'E-Occurrence Book', icon: BookOpen, roles: ['guard', 'supervisor', 'admin', 'management'] },
    { id: 'checklist', label: 'Supervisory Checklist', icon: CheckSquare, roles: ['supervisor', 'admin', 'management'] },
    { id: 'compliance', label: 'MOM Compliance', icon: Shield, roles: ['hr', 'admin', 'management'] },
    { id: 'clients', label: 'Client Management', icon: Users, roles: ['admin', 'management'] },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, roles: ['supervisor', 'admin', 'management'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'management'] },
  ];

  const filteredItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-full h-full bg-slate-900 text-white flex flex-col">
      <div className="p-4 md:p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 md:h-8 w-6 md:w-8 text-blue-400 flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-bold truncate">SecureOps SG</h1>
            <p className="text-xs md:text-sm text-slate-400 truncate">Security Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 md:p-4 overflow-y-auto">
        <ul className="space-y-1 md:space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onModuleChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-left transition-colors text-sm md:text-base",
                    currentModule === item.id 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-4 md:h-5 w-4 md:w-5 flex-shrink-0" />
                  <span className="truncate">{isMobile ? item.label.split(' ')[0] : item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 md:p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-6 md:w-8 h-6 md:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs md:text-sm font-medium">{user?.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize truncate">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
