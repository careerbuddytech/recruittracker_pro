import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertsPanel = ({ alerts }) => {
  const [filter, setFilter] = useState('all');
  const [expandedAlert, setExpandedAlert] = useState(null);

  const alertTypes = {
    overdue_invoice: {
      icon: 'AlertTriangle',
      color: 'error',
      label: 'Overdue Invoice'
    },
    at_risk_placement: {
      icon: 'AlertCircle',
      color: 'warning',
      label: 'At-Risk Placement'
    },
    performance_anomaly: {
      icon: 'TrendingDown',
      color: 'warning',
      label: 'Performance Anomaly'
    },
    system_issue: {
      icon: 'AlertOctagon',
      color: 'error',
      label: 'System Issue'
    },
    opportunity: {
      icon: 'Lightbulb',
      color: 'success',
      label: 'Opportunity'
    }
  };

  const severityColors = {
    high: 'border-l-error bg-error-50',
    medium: 'border-l-warning bg-warning-50',
    low: 'border-l-accent bg-accent-50'
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const handleAlertClick = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const handleAlertAction = (alert, action) => {
    console.log(`Performing ${action} on alert:`, alert.id);
    // Implementation for alert actions
  };

  const getAlertActions = (alert) => {
    switch (alert.type) {
      case 'overdue_invoice':
        return [
          { label: 'Send Reminder', action: 'send_reminder', icon: 'Mail' },
          { label: 'View Invoice', action: 'view_invoice', icon: 'FileText' },
          { label: 'Contact Client', action: 'contact_client', icon: 'Phone' }
        ];
      case 'at_risk_placement':
        return [
          { label: 'Contact Candidate', action: 'contact_candidate', icon: 'User' },
          { label: 'Review Role', action: 'review_role', icon: 'Eye' },
          { label: 'Escalate', action: 'escalate', icon: 'ArrowUp' }
        ];
      case 'performance_anomaly':
        return [
          { label: 'Investigate', action: 'investigate', icon: 'Search' },
          { label: 'View Report', action: 'view_report', icon: 'BarChart3' },
          { label: 'Schedule Review', action: 'schedule_review', icon: 'Calendar' }
        ];
      default:
        return [
          { label: 'View Details', action: 'view_details', icon: 'Eye' }
        ];
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Alerts</h3>
          {filteredAlerts.length > 0 && (
            <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
              {filteredAlerts.filter(a => a.severity === 'high').length}
            </span>
          )}
        </div>
        
        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Alerts</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-text-secondary">No alerts to display</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const alertType = alertTypes[alert.type] || alertTypes.system_issue;
            const isExpanded = expandedAlert === alert.id;
            const actions = getAlertActions(alert);

            return (
              <div
                key={alert.id}
                className={`border-l-4 rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                  severityColors[alert.severity]
                } ${isExpanded ? 'shadow-md' : 'hover:shadow-sm'}`}
                onClick={() => handleAlertClick(alert.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    alert.severity === 'high' ? 'bg-error text-white' :
                    alert.severity === 'medium'? 'bg-warning text-white' : 'bg-accent text-white'
                  }`}>
                    <Icon name={alertType.icon} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-text-primary">
                        {alert.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-text-secondary">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                        <Icon 
                          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                          size={14} 
                          className="text-secondary-400" 
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                      {alert.message}
                    </p>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          {actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAlertAction(alert, action.action);
                              }}
                              className="flex items-center space-x-1 px-3 py-1 bg-surface border border-border rounded-md text-sm font-medium text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                            >
                              <Icon name={action.icon} size={14} />
                              <span>{action.label}</span>
                            </button>
                          ))}
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            alert.severity === 'high' ? 'bg-error-100 text-error-700' :
                            alert.severity === 'medium'? 'bg-warning-100 text-warning-700' : 'bg-accent-100 text-accent-700'
                          }`}>
                            {alert.severity.toUpperCase()} PRIORITY
                          </span>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAlertAction(alert, 'dismiss');
                            }}
                            className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                          >
                            Dismiss Alert
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      {filteredAlerts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
              Mark All as Read
            </button>
            <button className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
              View All Alerts
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;