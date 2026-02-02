import React, { useState } from 'react';
import { LogOut, Bell, User, Menu, X } from 'lucide-react';
import logo from '../assets/ExtraEDUC.png';

const Header = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo}
              alt="ExtraEDUC" 
              className="h-10 sm:h-14 lg:h-20"
              style={{ width: 'auto', maxWidth: '150px' }}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5">
            {/* Notifications */}
            <button className="relative p-2 lg:p-3 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Avatar */}
            <button className="w-9 h-9 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <User className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>

            {/* User Name */}
            <div className="flex items-center gap-2">
              <span className="text-sm lg:text-base font-semibold text-gray-700">{user.name}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 lg:px-5 py-2 lg:py-2.5 text-sm lg:text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden lg:inline">Salir</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Notification badge en móvil */}
            <button className="relative p-2 hover:bg-gray-50 rounded-full">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{user.name}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;