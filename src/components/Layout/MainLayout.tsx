import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  School, 
  Code, 
  Assignment, 
  Group, 
  Book, 
  AccountCircle,
  Settings,
  ExitToApp
} from '@mui/icons-material';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-primary-100 text-primary-700' 
        : 'hover:bg-gray-100 text-gray-700'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const navItems = [
    { to: '/', icon: <Home />, label: 'Dashboard' },
    { to: '/learning-paths', icon: <School />, label: 'Learning Paths' },
    { to: '/practice', icon: <Code />, label: 'Practice' },
    { to: '/mock-interviews', icon: <Assignment />, label: 'Mock Interviews' },
    { to: '/group-study', icon: <Group />, label: 'Group Study' },
    { to: '/resources', icon: <Book />, label: 'Resources' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="JavaInt Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                JavaInt
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="text-gray-600" />
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                >
                  <AccountCircle className="text-gray-600" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {/* Handle logout */}}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-16 h-full w-64 bg-white shadow-sm">
        <nav className="mt-5 px-2">
          {navItems.map((item) => (
            <div key={item.to} className="mb-2">
              <NavItem
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout; 