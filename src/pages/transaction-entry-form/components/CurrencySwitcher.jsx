import React from 'react';
import Icon from 'components/AppIcon';

const CurrencySwitcher = ({ currency, onCurrencyChange }) => {
  return (
    <div className="flex items-center bg-surface border border-border rounded-lg p-1 mt-4 md:mt-0">
      <button
        type="button"
        onClick={() => onCurrencyChange('NGN')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
          currency === 'NGN' ?'bg-primary text-white' :'hover:bg-secondary-50 text-text-secondary'
        }`}
      >
        <span className="font-medium">₦</span>
        <span>Naira</span>
      </button>
      
      <button
        type="button"
        onClick={() => onCurrencyChange('USD')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
          currency === 'USD' ?'bg-primary text-white' :'hover:bg-secondary-50 text-text-secondary'
        }`}
      >
        <span className="font-medium">$</span>
        <span>USD</span>
      </button>
      
      <div className="ml-2 hidden md:flex items-center text-secondary-400">
        <Icon name="RefreshCw" size={14} className="mr-1" />
        <span className="text-xs">Auto-convert</span>
      </div>
    </div>
  );
};

export default CurrencySwitcher;