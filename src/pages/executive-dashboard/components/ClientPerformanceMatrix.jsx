import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const ClientPerformanceMatrix = ({ office, serviceLine }) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  // Mock client performance data
  const clientData = [
    { 
      name: 'TechCorp Ltd', 
      revenue: 450000, 
      placements: 28, 
      satisfaction: 92, 
      category: 'strategic',
      size: 'large'
    },
    { 
      name: 'StartupXYZ', 
      revenue: 180000, 
      placements: 15, 
      satisfaction: 88, 
      category: 'growth',
      size: 'medium'
    },
    { 
      name: 'Global Finance Inc', 
      revenue: 620000, 
      placements: 35, 
      satisfaction: 95, 
      category: 'strategic',
      size: 'large'
    },
    { 
      name: 'Local Business Co', 
      revenue: 85000, 
      placements: 8, 
      satisfaction: 78, 
      category: 'maintenance',
      size: 'small'
    },
    { 
      name: 'Innovation Labs', 
      revenue: 320000, 
      placements: 22, 
      satisfaction: 90, 
      category: 'strategic',
      size: 'medium'
    },
    { 
      name: 'Traditional Corp', 
      revenue: 240000, 
      placements: 12, 
      satisfaction: 82, 
      category: 'maintenance',
      size: 'medium'
    },
    { 
      name: 'Fast Growth Ltd', 
      revenue: 150000, 
      placements: 18, 
      satisfaction: 85, 
      category: 'growth',
      size: 'small'
    },
    { 
      name: 'Enterprise Solutions', 
      revenue: 780000, 
      placements: 42, 
      satisfaction: 97, 
      category: 'strategic',
      size: 'large'
    }
  ];

  const getClientColor = (client) => {
    const colorMap = {
      strategic: '#059669', // Green for high value, high satisfaction
      growth: '#0EA5E9',    // Blue for growing clients
      maintenance: '#D97706', // Orange for stable clients
      risk: '#DC2626'       // Red for at-risk clients
    };
    return colorMap[client.category] || '#64748B';
  };

  const getClientSize = (client) => {
    const sizeMap = {
      small: 60,
      medium: 100,
      large: 140
    };
    return sizeMap[client.size] || 80;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const client = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-floating max-w-xs">
          <h4 className="text-sm font-semibold text-text-primary mb-3">{client.name}</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Revenue:</span>
              <span className="text-sm font-medium text-text-primary">
                ${client.revenue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Placements:</span>
              <span className="text-sm font-medium text-text-primary">{client.placements}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Satisfaction:</span>
              <span className="text-sm font-medium text-text-primary">{client.satisfaction}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Category:</span>
              <span className={`text-sm font-medium capitalize px-2 py-1 rounded-full text-white`}
                    style={{ backgroundColor: getClientColor(client) }}>
                {client.category}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleClientClick = (client) => {
    console.log('Drilling down into client data for:', client.name);
    // Implementation for detailed client analysis
  };

  const quadrants = [
    {
      name: 'Strategic Partners',
      description: 'High revenue, high satisfaction',
      color: 'success',
      position: 'top-right'
    },
    {
      name: 'Growth Opportunities',
      description: 'Low revenue, high satisfaction',
      position: 'top-left'
    },
    {
      name: 'At Risk',
      description: 'High revenue, low satisfaction',
      color: 'error',
      position: 'bottom-right'
    },
    {
      name: 'Maintenance',
      description: 'Low revenue, low satisfaction',
      color: 'warning',
      position: 'bottom-left'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Client Performance Matrix</h3>
          <p className="text-sm text-text-secondary">Revenue vs satisfaction analysis by client</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* Show Labels Toggle */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              showLabels 
                ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Tag" size={14} />
            <span>Labels</span>
          </button>

          {/* Export Button */}
          <button className="p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200">
            <Icon name="Download" size={16} className="text-secondary-400" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              type="number"
              dataKey="revenue"
              domain={['dataMin - 50000', 'dataMax + 50000']}
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              name="Revenue"
            />
            <YAxis 
              type="number"
              dataKey="satisfaction"
              domain={[70, 100]}
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              name="Satisfaction"
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={clientData} 
              onClick={handleClientClick}
              cursor="pointer"
            >
              {clientData.map((client, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getClientColor(client)}
                  r={getClientSize(client) / 10}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Quadrant Labels */}
        {showLabels && (
          <>
            <div className="absolute top-4 right-4 bg-success-50 text-success-700 px-3 py-2 rounded-lg text-sm font-medium">
              Strategic Partners
            </div>
            <div className="absolute top-4 left-4 bg-accent-50 text-accent-700 px-3 py-2 rounded-lg text-sm font-medium">
              Growth Opportunities
            </div>
            <div className="absolute bottom-4 right-4 bg-error-50 text-error-700 px-3 py-2 rounded-lg text-sm font-medium">
              At Risk
            </div>
            <div className="absolute bottom-4 left-4 bg-warning-50 text-warning-700 px-3 py-2 rounded-lg text-sm font-medium">
              Maintenance
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
        {quadrants.map((quadrant, index) => (
          <div key={index} className="text-center">
            <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
              quadrant.color === 'success' ? 'bg-success' :
              quadrant.color === 'error' ? 'bg-error' :
              quadrant.color === 'warning' ? 'bg-warning' : 'bg-accent'
            }`} />
            <h4 className="text-sm font-medium text-text-primary">{quadrant.name}</h4>
            <p className="text-xs text-text-secondary mt-1">{quadrant.description}</p>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {clientData.filter(c => c.category === 'strategic').length}
          </p>
          <p className="text-sm text-text-secondary">Strategic Partners</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">
            {clientData.filter(c => c.category === 'growth').length}
          </p>
          <p className="text-sm text-text-secondary">Growth Opportunities</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-error">
            {clientData.filter(c => c.category === 'risk').length}
          </p>
          <p className="text-sm text-text-secondary">At Risk</p>
        </div>
      </div>
    </div>
  );
};

export default ClientPerformanceMatrix;