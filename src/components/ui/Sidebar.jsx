import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      section: 'Dashboard',
      items: [
        {
          label: 'Executive Dashboard',
          path: '/executive-dashboard',
          icon: 'BarChart3',
          description: 'Strategic overview and KPIs'
        }
      ]
    },
    {
      section: 'Financial Operations',
      items: [
        {
          label: 'Invoice Management',
          path: '/invoice-management-center',
          icon: 'FileText',
          description: 'Billing and invoice processing'
        },
        {
          label: 'Commission Calculator',
          path: '/commission-calculator',
          icon: 'Calculator',
          description: 'Calculate and track commissions'
        },
        {
          label: 'Financial Analytics',
          path: '/financial-analytics-dashboard',
          icon: 'TrendingUp',
          description: 'Revenue insights and reporting'
        },
        {
          label: 'Transaction Entry',
          path: '/transaction-entry-form',
          icon: 'PlusSquare',
          description: 'Record new placements and transactions'
        }
      ]
    },
    {
      section: 'Client & Candidates',
      items: [
        {
          label: 'Database Management',
          path: '/client-candidate-database',
          icon: 'Users',
          description: 'Manage relationships and profiles'
        }
      ]
    },
    {
      section: 'Administration',
      items: [
        {
          label: 'User Administration',
          path: '/user-administration-panel',
          icon: 'Shield',
          description: 'System and user management'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary">RecruitPro</span>
              <span className="text-xs text-text-secondary">Management System</span>
            </div>
          )}
        </div>
        
        {/* Desktop Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-1.5 rounded-md hover:bg-secondary-100 transition-colors duration-200"
        >
          <Icon 
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
            size={16} 
            className="text-secondary-400" 
          />
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-md hover:bg-secondary-100 transition-colors duration-200"
        >
          <Icon name="X" size={16} className="text-secondary-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-6">
          {navigationItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {!isCollapsed && (
                <h3 className="px-4 text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                  {section.section}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = isActiveRoute(item.path);
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 group relative ${
                        isActive
                          ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-secondary-600 hover:bg-secondary-50 hover:text-text-primary'
                      }`}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className={`${isActive ? 'text-primary' : 'text-secondary-400 group-hover:text-secondary-600'} transition-colors duration-200`}
                      />
                      
                      {!isCollapsed && (
                        <div className="ml-3 flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isActive ? 'text-primary' : ''}`}>
                            {item.label}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5 truncate">
                            {item.description}
                          </p>
                        </div>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-3 py-2 bg-secondary-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-secondary-300 mt-1">{item.description}</div>
                          <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-secondary-800 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        {!isCollapsed ? (
          <div className="text-center">
            <p className="text-xs text-text-secondary">Version 2.1.0</p>
            <p className="text-xs text-text-secondary mt-1">© 2024 RecruitPro</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-success rounded-full" title="System Online"></div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 bg-surface border-r border-border z-100 transition-all duration-300 ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-100">
          <div className="fixed inset-0 bg-secondary-900 bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-surface border-r border-border">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-90 p-2 bg-surface border border-border rounded-md shadow-elevated"
      >
        <Icon name="Menu" size={20} className="text-secondary-600" />
      </button>
    </>
  );
};

export default Sidebar;