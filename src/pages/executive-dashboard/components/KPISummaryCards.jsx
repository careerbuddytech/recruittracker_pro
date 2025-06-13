import React from 'react';
import Icon from 'components/AppIcon';

const KPISummaryCards = ({ data, currency }) => {
  // Format currency based on the selected currency type
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '-';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'NGN' ? 'NGN' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    return formatter.format(amount);
  };

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Format percentage change with + or - sign
  const formatChange = (change) => {
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  // Determine trend icon and color
  const getTrendProperties = (change) => {
    if (change > 0) {
      return { icon: 'TrendingUp', color: 'text-success' };
    } else if (change < 0) {
      return { icon: 'TrendingDown', color: 'text-error' };
    }
    return { icon: 'Minus', color: 'text-text-secondary' };
  };

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    if (!target) return 0;
    const progress = (current / target) * 100;
    return Math.min(progress, 100); // Cap at 100%
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Revenue Card */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-text-primary">
              {formatCurrency(data?.revenue?.current)}
            </p>
          </div>
          <div className="p-2 bg-primary-50 rounded-md">
            <Icon name="DollarSign" size={20} className="text-primary" />
          </div>
        </div>
        
        {data?.revenue?.previous && (
          <div className="flex items-center space-x-2 mb-3">
            <div className={getTrendProperties(calculateChange(data.revenue.current, data.revenue.previous)).color}>
              <Icon 
                name={getTrendProperties(calculateChange(data.revenue.current, data.revenue.previous)).icon} 
                size={16} 
                className="inline" 
              />
              <span className="text-sm font-medium ml-1">
                {formatChange(calculateChange(data.revenue.current, data.revenue.previous))}
              </span>
            </div>
            <span className="text-xs text-text-secondary">vs previous period</span>
          </div>
        )}
        
        {data?.revenue?.target && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-secondary">Progress to target</span>
              <span className="font-medium text-text-primary">
                {data.revenue.current.toLocaleString()} / {data.revenue.target.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${calculateProgress(data.revenue.current, data.revenue.target)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Placements Card */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">Total Placements</h3>
            <p className="text-2xl font-bold text-text-primary">
              {data?.placements?.current}
            </p>
          </div>
          <div className="p-2 bg-success-50 rounded-md">
            <Icon name="Users" size={20} className="text-success" />
          </div>
        </div>
        
        {data?.placements?.previous && (
          <div className="flex items-center space-x-2 mb-3">
            <div className={getTrendProperties(calculateChange(data.placements.current, data.placements.previous)).color}>
              <Icon 
                name={getTrendProperties(calculateChange(data.placements.current, data.placements.previous)).icon} 
                size={16} 
                className="inline" 
              />
              <span className="text-sm font-medium ml-1">
                {formatChange(calculateChange(data.placements.current, data.placements.previous))}
              </span>
            </div>
            <span className="text-xs text-text-secondary">vs previous period</span>
          </div>
        )}
        
        {data?.placements?.target && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-secondary">Progress to target</span>
              <span className="font-medium text-text-primary">
                {data.placements.current} / {data.placements.target}
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${calculateProgress(data.placements.current, data.placements.target)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Pipeline Value Card */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">Pipeline Value</h3>
            <p className="text-2xl font-bold text-text-primary">
              {formatCurrency(data?.pipelineValue?.current)}
            </p>
          </div>
          <div className="p-2 bg-secondary-100 rounded-md">
            <Icon name="PieChart" size={20} className="text-secondary-500" />
          </div>
        </div>
        
        {data?.pipelineValue?.previous && (
          <div className="flex items-center space-x-2 mb-3">
            <div className={getTrendProperties(calculateChange(data.pipelineValue.current, data.pipelineValue.previous)).color}>
              <Icon 
                name={getTrendProperties(calculateChange(data.pipelineValue.current, data.pipelineValue.previous)).icon} 
                size={16} 
                className="inline" 
              />
              <span className="text-sm font-medium ml-1">
                {formatChange(calculateChange(data.pipelineValue.current, data.pipelineValue.previous))}
              </span>
            </div>
            <span className="text-xs text-text-secondary">vs previous period</span>
          </div>
        )}
        
        {data?.pipelineValue?.target && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-secondary">Progress to target</span>
              <span className="font-medium text-text-primary">
                {data.pipelineValue.current.toLocaleString()} / {data.pipelineValue.target.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div 
                className="bg-secondary-500 h-2 rounded-full" 
                style={{ width: `${calculateProgress(data.pipelineValue.current, data.pipelineValue.target)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Profit Margin Card */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">Profit Margin</h3>
            <p className="text-2xl font-bold text-text-primary">
              {data?.profitMargin?.current}%
            </p>
          </div>
          <div className="p-2 bg-accent-50 rounded-md">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
        </div>
        
        {data?.profitMargin?.previous && (
          <div className="flex items-center space-x-2 mb-3">
            <div className={getTrendProperties(calculateChange(data.profitMargin.current, data.profitMargin.previous)).color}>
              <Icon 
                name={getTrendProperties(calculateChange(data.profitMargin.current, data.profitMargin.previous)).icon} 
                size={16} 
                className="inline" 
              />
              <span className="text-sm font-medium ml-1">
                {formatChange(calculateChange(data.profitMargin.current, data.profitMargin.previous))}
              </span>
            </div>
            <span className="text-xs text-text-secondary">vs previous period</span>
          </div>
        )}
        
        {data?.profitMargin?.target && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-secondary">Progress to target</span>
              <span className="font-medium text-text-primary">
                {data.profitMargin.current}% / {data.profitMargin.target}%
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full" 
                style={{ width: `${calculateProgress(data.profitMargin.current, data.profitMargin.target)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPISummaryCards;