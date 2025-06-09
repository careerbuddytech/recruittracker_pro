import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Sidebar = () => {
  const navigation = [
    { name: 'Executive Dashboard', href: '/executive-dashboard', icon: 'BarChart3' },
    { name: 'Revenue Tracking', href: '/revenue-tracking', icon: 'TrendingUp' },
    { name: 'Client & Candidate Database', href: '/client-candidate-database', icon: 'Users' },
    { name: 'Invoice Management', href: '/invoice-management-center', icon: 'FileText' },
    { name: 'Financial Analytics', href: '/financial-analytics-dashboard', icon: 'PieChart' },
    { name: 'Commission Calculator', href: '/commission-calculator', icon: 'Calculator' },
    { name: 'Transaction Entry', href: '/transaction-entry-form', icon: 'Plus' },
    { name: 'User Administration', href: '/user-administration-panel', icon: 'Shield' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface border-r border-border overflow-y-auto hidden lg:block">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary border-r-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`
            }
          >
            <Icon name={item.icon} size={18} />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;