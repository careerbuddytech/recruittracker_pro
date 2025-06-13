import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const ProfitabilityAnalysis = ({ data }) => {
  const [sortBy, setSortBy] = useState('revenue');
  const [viewType, setViewType] = useState('chart');

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'profit') return b.profit - a.profit;
    if (sortBy === 'margin') return b.margin - a.margin;
    return b.placements - a.placements;
  });

  const formatTooltip = (value, name) => {
    if (name === 'Revenue' || name === 'Profit') {
      return [`$${(value / 1000).toFixed(0)}K`, name];
    }
    return [value, name];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-surface border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Client Profitability</h3>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="revenue">Sort by Revenue</option>
            <option value="profit">Sort by Profit</option>
            <option value="margin">Sort by Margin</option>
            <option value="placements">Sort by Placements</option>
          </select>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewType('chart')}
              className={`p-1.5 rounded-md transition-colors duration-200 ${
                viewType === 'chart' ? 'bg-primary text-white' : 'text-secondary-400 hover:text-secondary-600'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`p-1.5 rounded-md transition-colors duration-200 ${
                viewType === 'table' ? 'bg-primary text-white' : 'text-secondary-400 hover:text-secondary-600'
              }`}
            >
              <Icon name="Table" size={16} />
            </button>
          </div>
        </div>
      </div>

      {viewType === 'chart' ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="client" 
                stroke="#64748B"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="revenue" fill="#1E3A8A" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#059669" name="Profit" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Client</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Profit</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Margin</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Placements</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((client, index) => (
                <tr key={index} className="border-b border-border last:border-b-0 hover:bg-secondary-50 transition-colors duration-200">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="Building2" size={16} className="text-primary" />
                      </div>
                      <span className="font-medium text-text-primary">{client.client}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-medium text-text-primary">
                    ${(client.revenue / 1000).toFixed(0)}K
                  </td>
                  <td className="text-right py-3 px-4 text-success font-medium">
                    ${(client.profit / 1000).toFixed(0)}K
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      client.margin >= 30 
                        ? 'bg-success-100 text-success-700'
                        : client.margin >= 25
                        ? 'bg-warning-100 text-warning-700' :'bg-error-100 text-error-700'
                    }`}>
                      {client.margin}%
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 text-text-secondary">{client.placements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-1">Top Client Revenue</p>
          <p className="text-sm font-semibold text-primary">
            ${(Math.max(...data.map(c => c.revenue)) / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-1">Avg Profit Margin</p>
          <p className="text-sm font-semibold text-success">
            {(data.reduce((sum, c) => sum + c.margin, 0) / data.length).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-3 bg-accent-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-1">Total Clients</p>
          <p className="text-sm font-semibold text-accent">{data.length}</p>
        </div>
        <div className="text-center p-3 bg-warning-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-1">Total Placements</p>
          <p className="text-sm font-semibold text-warning">
            {data.reduce((sum, c) => sum + c.placements, 0)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfitabilityAnalysis;