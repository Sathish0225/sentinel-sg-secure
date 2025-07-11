
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guard' | 'supervisor' | 'client' | 'hr' | 'admin' | 'management';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employeeId: string;
  department?: string;
  site?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user based on email
    const demoUser: User = {
      id: '1',
      name: email === 'admin@security.sg' ? 'Admin User' : 
            email === 'guard@security.sg' ? 'Security Guard' : 
            email === 'supervisor@security.sg' ? 'Site Supervisor' : 'Demo User',
      email,
      role: email === 'admin@security.sg' ? 'admin' : 
            email === 'guard@security.sg' ? 'guard' : 
            email === 'supervisor@security.sg' ? 'supervisor' : 'guard',
      employeeId: 'EMP001',
      department: 'Security Operations',
      site: 'Orchard Road Mall'
    };
    
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
