import React from 'react';
import Icon from 'components/AppIcon';

const IntegrationStatus = ({ status }) => {
  const getStatusIcon = (statusType) => {
    switch (statusType) {
      case 'connected':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'syncing':
        return <Icon name="RefreshCw" size={16} className="text-warning animate-spin-slow" />;
      case 'error':
        return <Icon name="AlertTriangle" size={16} className="text-error" />;
      default:
        return <Icon name="Circle" size={16} className="text-secondary-400" />;
    }
  };

  return (
    <div className="bg-secondary-50 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
        <Icon name="Link" size={16} className="mr-2 text-primary" />
        Integration Status
      </h3>
      
      <div className="space-y-3">
        {Object.entries(status).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{value.message}</span>
              {getStatusIcon(value.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationStatus;