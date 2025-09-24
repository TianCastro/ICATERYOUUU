import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, User, LogOut, Heart } from 'lucide-react';
import { UserType } from '../App';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: { type: UserType; name: string } | null;
  onLogout: () => void;
}

export function Header({ onNavigate, currentPage, user, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleDashboard = () => {
    if (user?.type === 'client') {
      onNavigate('client-dashboard');
    } else if (user?.type === 'provider') {
      onNavigate('provider-dashboard');
    } else if (user?.type === 'admin') {
      onNavigate('admin');
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    onNavigate('home');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">iC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">iCATERYou</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.page)}
                className={`px-3 py-2 text-sm transition-all duration-200 ${
                  currentPage === item.page
                    ? 'text-orange-600 border-b-2 border-orange-600 font-medium'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.type === 'client' && (
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('favorites')}
                    className="flex items-center space-x-2"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Favorites</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={handleDashboard}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('login')}
                  className="text-gray-700"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleNavigation('signup')}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.page)}
                  className={`text-left px-3 py-2 text-base transition-colors ${
                    currentPage === item.page
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              <div className="border-t border-gray-100 pt-4">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    {user.type === 'client' && (
                      <Button
                        variant="ghost"
                        onClick={() => handleNavigation('favorites')}
                        className="justify-start flex items-center space-x-2"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Favorites</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={handleDashboard}
                      className="justify-start flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="justify-start flex items-center space-x-2 text-gray-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation('login')}
                      className="justify-start"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleNavigation('signup')}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}