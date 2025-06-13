import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from 'components/AppIcon';

const RevenueChart = ({ dateRange }) => {
  const [chartType, setChartType] = useState('line');
  const [showForecast, setShowForecast] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState('all');

  // Mock revenue data with different revenue sources
  const revenueData = [
    { 
      period: 'Jan', 
      actual: 180000, 
      forecast: 185000, 
      target: 200000,
      recruitment: 120000,
      outsourcing: 40000,
      mediaAdSales: 20000
    },
    { 
      period: 'Feb', 
      actual: 220000, 
      forecast: 225000, 
      target: 210000,
      recruitment: 150000,
      outsourcing: 45000,
      mediaAdSales: 25000
    },
    { 
      period: 'Mar', 
      actual: 195000, 
      forecast: 200000, 
      target: 205000,
      recruitment: 125000,
      outsourcing: 50000,
      mediaAdSales: 20000
    },
    { 
      period: 'Apr', 
      actual: 240000, 
      forecast: 245000, 
      target: 220000,
      recruitment: 160000,
      outsourcing: 55000,
      mediaAdSales: 25000
    },
    { 
      period: 'May', 
      actual: 280000, 
      forecast: 285000, 
      target: 250000,
      recruitment: 180000,
      outsourcing: 60000,
      mediaAdSales: 40000
    },
    { 
      period: 'Jun', 
      actual: 310000, 
      forecast: 315000, 
      target: 280000,
      recruitment: 200000,
      outsourcing: 70000,
      mediaAdSales: 40000
    },
    { 
      period: 'Jul', 
      actual: 295000, 
      forecast: 300000, 
      target: 290000,
      recruitment: 190000,
      outsourcing: 65000,
      mediaAdSales: 40000
    },
    { 
      period: 'Aug', 
      actual: 325000, 
      forecast: 330000, 
      target: 300000,
      recruitment: 210000,
      outsourcing: 75000,
      mediaAdSales: 40000
    },
    { 
      period: 'Sep', 
      actual: 340000, 
      forecast: 345000, 
      target: 320000,
      recruitment: 215000,
      outsourcing: 80000,
      mediaAdSales: 45000
    },
    { 
      period: 'Oct', 
      actual: 365000, 
      forecast: 370000, 
      target: 350000,
      recruitment: 235000,
      outsourcing: 85000,
      mediaAdSales: 45000
    },
    { 
      period: 'Nov', 
      actual: null, 
      forecast: 380000, 
      target: 360000,
      recruitment: null,
      outsourcing: null,
      mediaAdSales: null
    },
    { 
      period: 'Dec', 
      actual: null, 
      forecast: 395000, 
      target: 370000,
      recruitment: null,
      outsourcing: null,
      mediaAdSales: null
    }
  ];

  // Revenue source options
  const revenueSources = [
    { id: 'all', name: 'All Revenue', color: '#1E3A8A' },
    { id: 'recruitment', name: 'Recruitment', color: '#3B82F6' },
    { id: 'outsourcing', name: 'Outsourcing', color: '#10B981' },
    { id: 'mediaAdSales', name: 'Media Ad Sales', color: '#F59E0B' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-floating">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.dataKey === 'mediaAdSales' ? 'Media Ad Sales' : entry.dataKey}:</span>
              <span className="font-medium text-text-primary">
                ${entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleDrillDown = (data) => {
    console.log('Drilling down into revenue data for:', data.period);
    // Implementation for detailed revenue breakdown
  };

  // Function to get the data for the selected revenue type
  const getChartData = () => {
    return revenueData.map(data => {
      if (selectedRevenue === 'all') {
        return data;
      } else {
        return {
          ...data,
          actual: data[selectedRevenue]
        };
      }
    });
  };

  // Get the color for the selected revenue source
  const getRevenueColor = () => {
    const source = revenueSources.find(src => src.id === selectedRevenue);
    return source?.color || '#1E3A8A';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Revenue Trends</h3>
          <p className="text-sm text-text-secondary">Monthly revenue performance and forecasting</p>
        </div>
        
        <div className="flex flex-wrap items-center space-x-3 mt-4 sm:mt-0">
          {/* Revenue Source Filter */}
          <div className="flex items-center bg-secondary-100 rounded-lg p-1 mb-2 sm:mb-0">
            {revenueSources.map(source => (
              <button
                key={source.id}
                onClick={() => setSelectedRevenue(source.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedRevenue === source.id ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="whitespace-nowrap">{source.name}</span>
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                chartType === 'line' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={14} className="inline mr-1" />
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                chartType === 'area' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="BarChart3" size={14} className="inline mr-1" />
              Area
            </button>
          </div>

          {/* Forecast Toggle */}
          <button
            onClick={() => setShowForecast(!showForecast)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              showForecast 
                ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Eye" size={14} />
            <span>Forecast</span>
          </button>

          {/* Export Button */}
          <button className="p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200">
            <Icon name="Download" size={16} className="text-secondary-400" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={getChartData()} onClick={handleDrillDown}>
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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              {selectedRevenue === 'all' ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#1E3A8A" 
                    strokeWidth={3}
                    dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#1E3A8A', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#64748B" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  {showForecast && (
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#0EA5E9" 
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 3 }}
                    />
                  )}
                </>
              ) : (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke={getRevenueColor()} 
                    strokeWidth={3}
                    dot={{ fill: getRevenueColor(), strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: getRevenueColor(), strokeWidth: 2 }}
                    name={revenueSources.find(src => src.id === selectedRevenue)?.name}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#64748B" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </>
              )}
            </LineChart>
          ) : (
            <AreaChart data={getChartData()} onClick={handleDrillDown}>
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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              {selectedRevenue === 'all' ? (
                <>
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#1E3A8A" 
                    fill="#1E3A8A"
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                  {showForecast && (
                    <Area 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#0EA5E9" 
                      fill="#0EA5E9"
                      fillOpacity={0.05}
                      strokeWidth={2}
                      strokeDasharray="3 3"
                    />
                  )}
                </>
              ) : (
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke={getRevenueColor()} 
                  fill={getRevenueColor()}
                  fillOpacity={0.1}
                  strokeWidth={3}
                  name={revenueSources.find(src => src.id === selectedRevenue)?.name}
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        {selectedRevenue === 'all' ? (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-text-secondary">Total Revenue</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getRevenueColor() }} />
            <span className="text-sm text-text-secondary">{revenueSources.find(src => src.id === selectedRevenue)?.name}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-1 bg-secondary-400" style={{ borderTop: '2px dashed #64748B' }} />
          <span className="text-sm text-text-secondary">Target</span>
        </div>
        {showForecast && selectedRevenue === 'all' && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-accent" style={{ borderTop: '2px dashed #0EA5E9' }} />
            <span className="text-sm text-text-secondary">Forecast</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;