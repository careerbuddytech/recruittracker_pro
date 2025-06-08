import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const PlacementVelocityChart = ({ dateRange }) => {
  const [selectedMetric, setSelectedMetric] = useState('placements');
  const [viewType, setViewType] = useState('weekly');

  // Mock placement velocity data
  const velocityData = [
    { period: 'Week 1', placements: 12, timeToFill: 18, successRate: 85 },
    { period: 'Week 2', placements: 15, timeToFill: 16, successRate: 88 },
    { period: 'Week 3', placements: 9, timeToFill: 22, successRate: 78 },
    { period: 'Week 4', placements: 18, timeToFill: 14, successRate: 92 },
    { period: 'Week 5', placements: 14, timeToFill: 19, successRate: 86 },
    { period: 'Week 6', placements: 21, timeToFill: 12, successRate: 94 },
    { period: 'Week 7', placements: 16, timeToFill: 17, successRate: 89 },
    { period: 'Week 8', placements: 19, timeToFill: 15, successRate: 91 }
  ];

  const metrics = [
    { value: 'placements', label: 'Placements', color: '#1E3A8A', unit: '' },
    { value: 'timeToFill', label: 'Time to Fill', color: '#0EA5E9', unit: ' days' },
    { value: 'successRate', label: 'Success Rate', color: '#059669', unit: '%' }
  ];

  const getBarColor = (value, dataKey) => {
    const metric = metrics.find(m => m.value === dataKey);
    if (!metric) return '#64748B';

    if (dataKey === 'placements') {
      return value >= 15 ? '#059669' : value >= 10 ? '#D97706' : '#DC2626';
    } else if (dataKey === 'timeToFill') {
      return value <= 15 ? '#059669' : value <= 20 ? '#D97706' : '#DC2626';
    } else if (dataKey === 'successRate') {
      return value >= 90 ? '#059669' : value >= 80 ? '#D97706' : '#DC2626';
    }
    return metric.color;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-floating">
          <p className="text-sm font-medium text-text-primary mb-3">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Placements:</span>
              <span className="text-sm font-medium text-text-primary">{data.placements}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Time to Fill:</span>
              <span className="text-sm font-medium text-text-primary">{data.timeToFill} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Success Rate:</span>
              <span className="text-sm font-medium text-text-primary">{data.successRate}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    console.log('Drilling down into placement data for:', data.period);
    // Implementation for detailed placement breakdown
  };

  const currentMetric = metrics.find(m => m.value === selectedMetric);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Placement Velocity</h3>
          <p className="text-sm text-text-secondary">Weekly placement performance and efficiency metrics</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* Metric Selector */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {metrics.map(metric => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </select>

          {/* View Type Toggle */}
          <div className="flex items-center bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setViewType('weekly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewType === 'weekly' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewType('monthly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewType === 'monthly' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Export Button */}
          <button className="p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200">
            <Icon name="Download" size={16} className="text-secondary-400" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={velocityData} onClick={handleBarClick}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="period" 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}${currentMetric?.unit || ''}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={selectedMetric} 
              radius={[4, 4, 0, 0]}
              cursor="pointer"
            >
              {velocityData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry[selectedMetric], selectedMetric)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm font-medium text-text-primary">Excellent</span>
          </div>
          <p className="text-xs text-text-secondary">
            {selectedMetric === 'placements' && '15+ placements'}
            {selectedMetric === 'timeToFill' && '≤15 days'}
            {selectedMetric === 'successRate' && '≥90%'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-sm font-medium text-text-primary">Good</span>
          </div>
          <p className="text-xs text-text-secondary">
            {selectedMetric === 'placements' && '10-14 placements'}
            {selectedMetric === 'timeToFill' && '16-20 days'}
            {selectedMetric === 'successRate' && '80-89%'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-error rounded-full" />
            <span className="text-sm font-medium text-text-primary">Needs Attention</span>
          </div>
          <p className="text-xs text-text-secondary">
            {selectedMetric === 'placements' && '<10 placements'}
            {selectedMetric === 'timeToFill' && '>20 days'}
            {selectedMetric === 'successRate' && '<80%'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlacementVelocityChart;