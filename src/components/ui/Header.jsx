import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'payment', message: 'Invoice #INV-2024-001 payment overdue', time: '2 hours ago', unread: true },
    { id: 2, type: 'approval', message: 'Commission calculation requires approval', time: '4 hours ago', unread: true },
    { id: 3, type: 'system', message: 'Monthly financial report generated', time: '1 day ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNotificationClick = (notificationId) => {
    console.log('Notification clicked:', notificationId);
  };

  const handleUserMenuAction = (action) => {
    console.log('User action:', action);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-90 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200">
          <Icon name="Menu" size={20} className="text-secondary-600" />
        </button>

        {/* Logo - Hidden on mobile when sidebar is present */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">RecruitPro</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Global Search */}
          <div className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className={`relative transition-all duration-300 ${
                isSearchExpanded ? 'w-80' : 'w-64'
              } hidden md:block`}>
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                />
                <input
                  type="text"
                  placeholder="Search clients, candidates, invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setIsSearchExpanded(false)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              {/* Mobile Search Button */}
              <button 
                type="button"
                className="md:hidden p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200"
              >
                <Icon name="Search" size={20} className="text-secondary-600" />
              </button>
            </form>
          </div>

          {/* Notification Center */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="Bell" size={20} className="text-secondary-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-floating z-100">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-medium text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-secondary-50 cursor-pointer transition-colors duration-200 ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-primary' : 'bg-secondary-300'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-primary">{notification.message}</p>
                          <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Context Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary">Sarah Johnson</p>
                <p className="text-xs text-text-secondary">Finance Manager</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-secondary-400 hidden md:block" />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-floating z-100">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">Sarah Johnson</p>
                  <p className="text-xs text-text-secondary">sarah.johnson@company.com</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
                    Finance Manager
                  </span>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => handleUserMenuAction('profile')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <Icon name="User" size={16} className="text-secondary-400" />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => handleUserMenuAction('preferences')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <Icon name="Settings" size={16} className="text-secondary-400" />
                    <span>Preferences</span>
                  </button>
                  <button
                    onClick={() => handleUserMenuAction('help')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <Icon name="HelpCircle" size={16} className="text-secondary-400" />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={() => handleUserMenuAction('logout')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200"
                  >
                    <Icon name="LogOut" size={16} className="text-error" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(isUserMenuOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-80"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;