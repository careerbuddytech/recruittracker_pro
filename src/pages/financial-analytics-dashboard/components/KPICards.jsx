import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const KPICards = ({ data }) => {
  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `$${(data.totalRevenue / 1000000).toFixed(1)}M`,
      change: `+${data.revenueGrowth}%`,
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'primary',
      description: 'vs last year'
    },
    {
      title: 'Profit Margin',
      value: `${data.profitMargin}%`,
      change: '+2.3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'success',
      description: 'vs last quarter'
    },
    {
      title: 'Total Placements',
      value: data.totalPlacements.toString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'accent',
      description: 'vs last year'
    },
    {
      title: 'Avg Fee/Placement',
      value: `$${data.avgFeePerPlacement.toLocaleString()}`,
      change: '+5.7%',
      changeType: 'positive',
      icon: 'Calculator',
      color: 'warning',
      description: 'vs last year'
    },
    {
      title: 'Client Retention',
      value: `${data.clientRetention}%`,
      change: '+1.2%',
      changeType: 'positive',
      icon: 'Shield',
      color: 'success',
      description: 'vs last year'
    },
    {
      title: 'Time to Fill',
      value: `${data.timeToFill} days`,
      change: '-3.5 days',
      changeType: 'positive',
      icon: 'Clock',
      color: 'primary',
      description: 'vs last quarter'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary',
      success: 'bg-success-50 text-success',
      accent: 'bg-accent-50 text-accent',
      warning: 'bg-warning-50 text-warning'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {kpiCards.map((kpi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevated transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(kpi.color)}`}>
              <Icon name={kpi.icon} size={20} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              kpi.changeType === 'positive' ?'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
            }`}>
              {kpi.change}
            </span>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">{kpi.title}</h3>
            <p className="text-2xl font-bold text-text-primary mb-1">{kpi.value}</p>
            <p className="text-xs text-text-secondary">{kpi.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;