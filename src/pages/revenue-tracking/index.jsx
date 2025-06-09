import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import MediaAdSalesForm from './components/MediaAdSalesForm';
import OutsourcingServicesForm from './components/OutsourcingServicesForm';
import CVWritingServicesForm from './components/CVWritingServicesForm';
import RevenueAnalytics from './components/RevenueAnalytics';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';

const RevenueTracking = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const tabs = [
    { id: 'analytics', name: 'Revenue Analytics', icon: 'BarChart3' },
    { id: 'transactions', name: 'Transactions', icon: 'Receipt' },
    { id: 'media_ads', name: 'Media Ad Sales', icon: 'Megaphone' },
    { id: 'outsourcing', name: 'Outsourcing Services', icon: 'Users' },
    { id: 'cv_writing', name: 'CV Writing Services', icon: 'FileText' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <RevenueAnalytics />;
      case 'transactions':
        return <TransactionHistory />;
      case 'media_ads':
        return <MediaAdSalesForm />;
      case 'outsourcing':
        return <OutsourcingServicesForm />;
      case 'cv_writing':
        return <CVWritingServicesForm />;
      default:
        return <RevenueAnalytics />;
    }
  };

  const handleNewTransaction = () => {
    if (activeTab === 'transactions') {
      setShowTransactionForm(true);
    } else {
      setActiveTab('transactions');
      setTimeout(() => setShowTransactionForm(true), 100);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Revenue Tracking</h1>
          <p className="text-text-secondary">Comprehensive tracking for all business revenue streams and transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-secondary-100 text-text-secondary px-4 py-2 rounded-lg hover:bg-secondary-200 transition-colors duration-200">
            <Icon name="Download" size={16} className="inline mr-2" />
            Export Data
          </button>
          <button 
            onClick={handleNewTransaction}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Plus" size={16} className="inline mr-2" />
            New Transaction
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Transaction Form Modal/Overlay */}
      {showTransactionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <TransactionForm onClose={() => setShowTransactionForm(false)} />
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default RevenueTracking;