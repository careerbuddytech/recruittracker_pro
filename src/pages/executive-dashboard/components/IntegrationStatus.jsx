import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const IntegrationStatus = ({ integrations }) => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'syncing':
        return 'text-accent';
      default:
        return 'text-secondary-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'syncing':
        return 'RefreshCw';
      default:
        return 'Circle';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'syncing':
        return 'Syncing';
      default:
        return 'Unknown';
    }
  };

  const formatLastSync = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const handleIntegrationClick = (integration) => {
    setSelectedIntegration(selectedIntegration?.name === integration.name ? null : integration);
  };

  const handleIntegrationAction = (integration, action) => {
    console.log(`Performing ${action} on integration:`, integration.name);
    // Implementation for integration actions
  };

  const getIntegrationActions = (integration) => {
    const baseActions = [
      { label: 'View Details', action: 'view_details', icon: 'Eye' },
      { label: 'Test Connection', action: 'test_connection', icon: 'Zap' }
    ];

    if (integration.status === 'error') {
      baseActions.push({ label: 'Retry Sync', action: 'retry_sync', icon: 'RefreshCw' });
      baseActions.push({ label: 'View Logs', action: 'view_logs', icon: 'FileText' });
    } else if (integration.status === 'connected') {
      baseActions.push({ label: 'Force Sync', action: 'force_sync', icon: 'Download' });
    }

    baseActions.push({ label: 'Configure', action: 'configure', icon: 'Settings' });
    
    return baseActions;
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Plug" size={20} className="text-text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Integration Status</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-success bg-success-50 px-2 py-1 rounded-full font-medium">
            {connectedCount} Connected
          </span>
          {errorCount > 0 && (
            <span className="text-xs text-error bg-error-50 px-2 py-1 rounded-full font-medium">
              {errorCount} Error
            </span>
          )}
        </div>
      </div>

      {/* Integration List */}
      <div className="space-y-3">
        {integrations.map((integration, index) => {
          const isSelected = selectedIntegration?.name === integration.name;
          const actions = getIntegrationActions(integration);

          return (
            <div
              key={index}
              className={`border border-border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                isSelected ? 'bg-primary-50 border-primary' : 'hover:bg-secondary-50'
              }`}
              onClick={() => handleIntegrationClick(integration)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center`}>
                    <Icon 
                      name={getStatusIcon(integration.status)} 
                      size={16} 
                      className={`${getStatusColor(integration.status)} ${
                        integration.status === 'syncing' ? 'animate-spin' : ''
                      }`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      {integration.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-medium ${getStatusColor(integration.status)}`}>
                        {getStatusLabel(integration.status)}
                      </span>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">
                        Last sync: {formatLastSync(integration.lastSync)}
                      </span>
                    </div>
                  </div>
                </div>

                <Icon 
                  name={isSelected ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-secondary-400" 
                />
              </div>

              {/* Expanded Content */}
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-border">
                  {/* Integration Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-text-secondary">Status</p>
                      <p className={`text-sm font-medium ${getStatusColor(integration.status)}`}>
                        {getStatusLabel(integration.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Last Sync</p>
                      <p className="text-sm font-medium text-text-primary">
                        {formatLastSync(integration.lastSync)}
                      </p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {integration.status === 'error' && (
                    <div className="bg-error-50 border border-error-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-error">Connection Error</p>
                          <p className="text-xs text-error-700 mt-1">
                            Authentication failed. Please check your credentials and try again.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIntegrationAction(integration, action.action);
                        }}
                        className="flex items-center space-x-1 px-3 py-1 bg-surface border border-border rounded-md text-sm font-medium text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <Icon name={action.icon} size={14} />
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-success">{connectedCount}</p>
            <p className="text-xs text-text-secondary">Active Connections</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">{integrations.length}</p>
            <p className="text-xs text-text-secondary">Total Integrations</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex items-center justify-between">
        <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
          Add Integration
        </button>
        <button className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
          View All
        </button>
      </div>
    </div>
  );
};

export default IntegrationStatus;