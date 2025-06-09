import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { revenueAnalytics, revenueTargets } from 'data/revenueStreams';
import { REVENUE_STREAMS } from 'constants/serviceTypes';

const RevenueAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const periods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual', label: 'Annual' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStreamName = (stream) => {
    switch (stream) {
      case REVENUE_STREAMS.RECRUITMENT_SERVICES:
        return 'Recruitment Services';
      case REVENUE_STREAMS.OUTSOURCING_SERVICES:
        return 'Outsourcing Services';
      case REVENUE_STREAMS.CV_WRITING_SERVICES:
        return 'CV Writing Services';
      case REVENUE_STREAMS.MEDIA_AD_SALES:
        return 'Media Ad Sales';
      default:
        return stream;
    }
  };

  const getStreamIcon = (stream) => {
    switch (stream) {
      case REVENUE_STREAMS.RECRUITMENT_SERVICES:
        return 'Users';
      case REVENUE_STREAMS.OUTSOURCING_SERVICES:
        return 'Building';
      case REVENUE_STREAMS.CV_WRITING_SERVICES:
        return 'FileText';
      case REVENUE_STREAMS.MEDIA_AD_SALES:
        return 'Megaphone';
      default:
        return 'DollarSign';
    }
  };

  const getStreamColor = (stream) => {
    switch (stream) {
      case REVENUE_STREAMS.RECRUITMENT_SERVICES:
        return 'bg-primary-100 text-primary';
      case REVENUE_STREAMS.OUTSOURCING_SERVICES:
        return 'bg-success-100 text-success';
      case REVENUE_STREAMS.CV_WRITING_SERVICES:
        return 'bg-accent-100 text-accent';
      case REVENUE_STREAMS.MEDIA_AD_SALES:
        return 'bg-warning-100 text-warning';
      default:
        return 'bg-secondary-100 text-secondary';
    }
  };

  const calculateGrowth = (current, target) => {
    return ((current / target) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Revenue Overview</h2>
        <div className="flex bg-secondary-100 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedPeriod === period.value
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(revenueAnalytics.totalRevenue[selectedPeriod])}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Active Streams</p>
              <p className="text-2xl font-bold text-text-primary">4</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Avg Profit Margin</p>
              <p className="text-2xl font-bold text-text-primary">37.5%</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="Percent" size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Growth Rate</p>
              <p className="text-2xl font-bold text-text-primary">+12.4%</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="ArrowUp" size={20} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Streams Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue by Stream</h3>
          <div className="space-y-4">
            {Object.entries(revenueAnalytics.revenueByStream)
              .sort(([,a], [,b]) => b - a)
              .map(([stream, revenue]) => {
                const percentage = ((revenue / revenueAnalytics.totalRevenue.annual) * 100).toFixed(1);
                return (
                  <div key={stream} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStreamColor(stream)}`}>
                        <Icon name={getStreamIcon(stream)} size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{getStreamName(stream)}</p>
                        <p className="text-xs text-text-secondary">{percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-text-primary">{formatCurrency(revenue)}</p>
                      <p className="text-xs text-text-secondary">Annual</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Profit Margins by Stream</h3>
          <div className="space-y-4">
            {Object.entries(revenueAnalytics.profitMargins)
              .sort(([,a], [,b]) => b - a)
              .map(([stream, margin]) => (
                <div key={stream} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStreamColor(stream)}`}>
                      <Icon name={getStreamIcon(stream)} size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{getStreamName(stream)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">{(margin * 100).toFixed(1)}%</p>
                    <div className="w-16 h-2 bg-secondary-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-success rounded-full transition-all duration-300"
                        style={{ width: `${margin * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Targets vs Actuals */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Targets vs Actuals ({selectedPeriod})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(revenueTargets).map(([stream, targets]) => {
            const actual = revenueAnalytics.revenueByStream[stream] || 0;
            const target = targets[selectedPeriod] || 0;
            const achievement = ((actual / target) * 100).toFixed(1);
            
            return (
              <div key={stream} className="bg-secondary-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${getStreamColor(stream)}`}>
                    <Icon name={getStreamIcon(stream)} size={12} />
                  </div>
                  <p className="text-sm font-medium text-text-primary">{getStreamName(stream)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Target:</span>
                    <span className="text-text-primary">{formatCurrency(target)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Actual:</span>
                    <span className="text-text-primary">{formatCurrency(actual)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Achievement:</span>
                    <span className={`font-medium ${achievement >= 100 ? 'text-success' : achievement >= 80 ? 'text-warning' : 'text-error'}`}>
                      {achievement}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-secondary-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement >= 100 ? 'bg-success' : achievement >= 80 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${Math.min(achievement, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;