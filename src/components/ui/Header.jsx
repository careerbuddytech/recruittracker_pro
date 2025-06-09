import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'components/AppIcon';
import { toggleCurrency, selectActiveCurrency, selectCurrencyInfo } from 'store/slices/currencySlice';
import { selectCurrentUser, setUserRole } from 'store/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const activeCurrency = useSelector(selectActiveCurrency);
  const currencyInfo = useSelector(selectCurrencyInfo);
  const currentUser = useSelector(selectCurrentUser);

  const handleCurrencyToggle = () => {
    dispatch(toggleCurrency());
  };

  const handleRoleToggle = () => {
    const newRole = currentUser.role === 'administrator' ? 'teamMember' : 'administrator';
    dispatch(setUserRole(newRole));
  };

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
          {/* Currency Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Currency:</span>
            <button
              onClick={handleCurrencyToggle}
              className="flex items-center space-x-2 px-3 py-1.5 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors duration-200"
            >
              <span className="font-medium text-primary">{currencyInfo.symbol}</span>
              <span className="text-sm font-medium text-primary">{activeCurrency}</span>
              <Icon name="RefreshCw" size={14} className="text-primary" />
            </button>
          </div>

          {/* Role Toggle (Demo) */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Role:</span>
            <button
              onClick={handleRoleToggle}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentUser.role === 'administrator'
                  ? 'bg-success-100 text-success-700 border border-success-200'
                  : 'bg-accent-100 text-accent-700 border border-accent-200'
              }`}
            >
              {currentUser.role === 'administrator' ? 'Admin' : 'Team Member'}
            </button>
          </div>

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