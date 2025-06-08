import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const RevenueChart = ({ data }) => {
  const [chartType, setChartType] = useState('area');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const metrics = [
    { key: 'revenue', label: 'Revenue', color: '#1E3A8A' },
    { key: 'profit', label: 'Profit', color: '#059669' },
    { key: 'expenses', label: 'Expenses', color: '#DC2626' }
  ];

  const formatTooltip = (value, name) => {
    const formattedValue = `$${(value / 1000).toFixed(0)}K`;
    return [formattedValue, name];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-surface border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Revenue Trends</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {metrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                  selectedMetric === metric.key
                    ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-md transition-colors duration-200 ${
                chartType === 'area' ? 'bg-primary text-white' : 'text-secondary-400 hover:text-secondary-600'
              }`}
            >
              <Icon name="AreaChart" size={16} />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded-md transition-colors duration-200 ${
                chartType === 'line' ? 'bg-primary text-white' : 'text-secondary-400 hover:text-secondary-600'
              }`}
            >
              <Icon name="LineChart" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              {selectedMetric === 'revenue' && (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1E3A8A"
                  fill="#1E3A8A"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Revenue"
                />
              )}
              {selectedMetric === 'profit' && (
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Profit"
                />
              )}
              {selectedMetric === 'expenses' && (
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#DC2626"
                  fill="#DC2626"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Expenses"
                />
              )}
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              {selectedMetric === 'revenue' && (
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1E3A8A"
                  strokeWidth={3}
                  dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
                  name="Revenue"
                />
              )}
              {selectedMetric === 'profit' && (
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                  name="Profit"
                />
              )}
              {selectedMetric === 'expenses' && (
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#DC2626"
                  strokeWidth={3}
                  dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                  name="Expenses"
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-1">Avg Monthly Revenue</p>
          <p className="text-lg font-semibold text-primary">
            ${(data.reduce((sum, item) => sum + item.revenue, 0) / data.length / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-1">Avg Monthly Profit</p>
          <p className="text-lg font-semibold text-success">
            ${(data.reduce((sum, item) => sum + item.profit, 0) / data.length / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="text-center p-3 bg-accent-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-1">Total Placements</p>
          <p className="text-lg font-semibold text-accent">
            {data.reduce((sum, item) => sum + item.placements, 0)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;