import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const InsightsPanel = ({ revenueData, clientData, forecastData }) => {
  const [activeTab, setActiveTab] = useState('insights');

  // Generate automated insights
  const insights = [
    {
      type: 'positive',
      title: 'Revenue Growth Acceleration',
      description: 'Q4 revenue increased by 18% compared to Q3, driven by strong performance in Executive Search division.',
      impact: 'high',
      action: 'Consider expanding executive search team'
    },
    {
      type: 'warning',
      title: 'Client Concentration Risk',
      description: 'Top 3 clients represent 65% of total revenue. Diversification recommended.',
      impact: 'medium',
      action: 'Develop new client acquisition strategy'
    },
    {
      type: 'positive',
      title: 'Profit Margin Improvement',
      description: 'Average profit margin increased to 30%, exceeding industry benchmark of 25%.',
      impact: 'high',
      action: 'Maintain current operational efficiency'
    },
    {
      type: 'neutral',
      title: 'Seasonal Pattern Detected',
      description: 'Revenue typically peaks in Q4 and Q1, with 15% variance from average.',
      impact: 'low',
      action: 'Plan resource allocation accordingly'
    }
  ];

  const alerts = [
    {
      severity: 'high',
      title: 'Budget Variance Alert',
      message: 'Operating expenses exceeded budget by 2% this quarter',
      timestamp: '2 hours ago'
    },
    {
      severity: 'medium',
      title: 'Client Payment Overdue',
      message: 'TechCorp Solutions invoice #INV-2024-001 is 15 days overdue',
      timestamp: '1 day ago'
    },
    {
      severity: 'low',
      title: 'Monthly Report Ready',
      message: 'Financial analytics report for December is available',
      timestamp: '2 days ago'
    }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'warning': return 'AlertTriangle';
      case 'neutral': return 'Info';
      default: return 'Info';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'warning': return 'text-warning';
      case 'neutral': return 'text-primary';
      default: return 'text-primary';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-error bg-error-50';
      case 'medium': return 'border-l-warning bg-warning-50';
      case 'low': return 'border-l-primary bg-primary-50';
      default: return 'border-l-primary bg-primary-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-80 bg-surface border border-border rounded-lg h-fit sticky top-6"
    >
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'insights' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-secondary-600 hover:text-text-primary'
          }`}
        >
          <Icon name="Lightbulb" size={16} className="inline mr-2" />
          Insights
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'alerts' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-secondary-600 hover:text-text-primary'
          }`}
        >
          <Icon name="Bell" size={16} className="inline mr-2" />
          Alerts
        </button>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'insights' ? (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-text-primary mb-2">AI-Generated Insights</h3>
              <p className="text-xs text-text-secondary">
                Automated analysis based on current data patterns
              </p>
            </div>

            {insights.map((insight, index) => (
              <div key={index} className="p-3 bg-secondary-50 rounded-lg border-l-4 border-l-primary">
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getInsightIcon(insight.type)} 
                    size={16} 
                    className={`mt-0.5 ${getInsightColor(insight.type)}`} 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-text-secondary mb-2">
                      {insight.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.impact === 'high' ?'bg-error-100 text-error-700'
                          : insight.impact === 'medium' ?'bg-warning-100 text-warning-700' :'bg-primary-100 text-primary-700'
                      }`}>
                        {insight.impact} impact
                      </span>
                      <button className="text-xs text-primary hover:text-primary-700 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                    {insight.action && (
                      <div className="mt-2 p-2 bg-surface rounded border border-border">
                        <p className="text-xs text-text-secondary">
                          <Icon name="ArrowRight" size={12} className="inline mr-1" />
                          {insight.action}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Forecast Section */}
            <div className="mt-6 p-3 bg-accent-50 rounded-lg">
              <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                <Icon name="TrendingUp" size={16} className="mr-2 text-accent" />
                Revenue Forecast
              </h4>
              <div className="space-y-2">
                {forecastData.map((forecast, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{forecast.period}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-text-primary">
                        ${(forecast.revenue / 1000000).toFixed(1)}M
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        forecast.confidence === 'High' ?'bg-success-100 text-success-700' :'bg-warning-100 text-warning-700'
                      }`}>
                        {forecast.confidence}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-text-primary mb-2">Recent Alerts</h3>
              <p className="text-xs text-text-secondary">
                Important notifications and system updates
              </p>
            </div>

            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-text-primary">{alert.title}</h4>
                  <span className="text-xs text-text-secondary">{alert.timestamp}</span>
                </div>
                <p className="text-xs text-text-secondary mb-2">{alert.message}</p>
                <div className="flex items-center space-x-2">
                  <button className="text-xs text-primary hover:text-primary-700 transition-colors duration-200">
                    View Details
                  </button>
                  <button className="text-xs text-secondary-600 hover:text-text-primary transition-colors duration-200">
                    Dismiss
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 p-3 bg-secondary-50 rounded-lg text-center">
              <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
              <p className="text-xs text-text-secondary">All critical alerts resolved</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <button className="text-xs text-secondary-600 hover:text-text-primary transition-colors duration-200">
            <Icon name="Settings" size={14} className="inline mr-1" />
            Configure
          </button>
          <button className="text-xs text-primary hover:text-primary-700 transition-colors duration-200">
            <Icon name="RefreshCw" size={14} className="inline mr-1" />
            Refresh
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightsPanel;