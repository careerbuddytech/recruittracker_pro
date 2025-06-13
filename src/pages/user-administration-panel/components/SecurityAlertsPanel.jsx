import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SecurityAlertsPanel = ({ alerts, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unresolved') return !alert.resolved;
    return alert.severity === filter;
  });

  const getAlertIcon = (type) => {
    switch (type) {
      case 'failed_login':
        return 'AlertTriangle';
      case 'suspicious_activity':
        return 'Eye';
      case 'permission_change':
        return 'Key';
      case 'system_access':
        return 'Shield';
      default:
        return 'Info';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error-50 border-error-200';
      case 'medium':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'low':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-secondary-600 bg-secondary-50 border-secondary-200';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-error-100 text-error-700',
      medium: 'bg-warning-100 text-warning-700',
      low: 'bg-success-100 text-success-700'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[severity]}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleResolveAlert = (alertId) => {
    console.log('Resolving alert:', alertId);
    // In a real app, this would update the alert status
  };

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Security Alerts</h3>
          <p className="text-sm text-text-secondary">
            Monitor and respond to security events across the system
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
        >
          <Icon name="X" size={20} className="text-secondary-400" />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex bg-secondary-100 rounded-lg p-1">
            {['all', 'unresolved', 'high', 'medium', 'low'].map(filterOption => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filter === filterOption
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-secondary-600 hover:text-text-primary'
                }`}
              >
                {filterOption === 'all' ? 'All' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <span>{filteredAlerts.length} alerts</span>
            <span>•</span>
            <span>{alerts.filter(a => !a.resolved).length} unresolved</span>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Shield" size={48} className="text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No alerts found</h3>
            <p className="text-text-secondary">
              {filter === 'all' ?'No security alerts to display'
                : `No ${filter} alerts found`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-4 hover:bg-secondary-50 transition-colors duration-200 ${
                  !alert.resolved ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getAlertColor(alert.severity)}`}>
                    <Icon name={getAlertIcon(alert.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getSeverityBadge(alert.severity)}
                        {!alert.resolved && (
                          <span className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full font-medium">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-secondary">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-primary mb-3">{alert.message}</p>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleViewDetails(alert)}
                        className="text-sm text-primary hover:text-primary-700 font-medium"
                      >
                        View Details
                      </button>
                      
                      {!alert.resolved && (
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
                          className="text-sm text-success hover:text-success-700 font-medium"
                        >
                          Mark Resolved
                        </button>
                      )}
                      
                      <button className="text-sm text-secondary-600 hover:text-text-primary font-medium">
                        Investigate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-110">
          <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={20} className="text-secondary-400" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getAlertColor(selectedAlert.severity)}`}>
                    <Icon name={getAlertIcon(selectedAlert.type)} size={20} />
                  </div>
                  <div>
                    {getSeverityBadge(selectedAlert.severity)}
                    <p className="text-sm text-text-secondary mt-1">
                      {selectedAlert.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Description</h4>
                  <p className="text-text-secondary">{selectedAlert.message}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Recommended Actions</h4>
                  <ul className="list-disc list-inside text-text-secondary space-y-1">
                    <li>Review user activity logs for suspicious patterns</li>
                    <li>Verify user identity through secondary channels</li>
                    <li>Consider temporary account restrictions if necessary</li>
                    <li>Document findings in security incident report</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Status</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedAlert.resolved 
                      ? 'bg-success-100 text-success-700' :'bg-warning-100 text-warning-700'
                  }`}>
                    {selectedAlert.resolved ? 'Resolved' : 'Pending Investigation'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-border">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 text-secondary-600 hover:text-text-primary transition-colors duration-200"
              >
                Close
              </button>
              {!selectedAlert.resolved && (
                <button
                  onClick={() => {
                    handleResolveAlert(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success-700 transition-colors duration-200"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityAlertsPanel;