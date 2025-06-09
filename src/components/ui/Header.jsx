import React from 'react';
import Icon from 'components/AppIcon';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border h-16">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center space-x-4">
          <div className="lg:hidden">
            <button className="p-2 rounded-md hover:bg-secondary-100">
              <Icon name="Menu" size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={16} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-text-primary">RecruitTracker Pro</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md hover:bg-secondary-100">
            <Icon name="Bell" size={20} className="text-text-secondary" />
          </button>
          <button className="p-2 rounded-md hover:bg-secondary-100">
            <Icon name="Settings" size={20} className="text-text-secondary" />
          </button>
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;