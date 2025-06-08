import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Line, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import RevenueChart from './components/RevenueChart';
import ProfitabilityAnalysis from './components/ProfitabilityAnalysis';
import KPICards from './components/KPICards';
import FilterPanel from './components/FilterPanel';
import ExportTools from './components/ExportTools';
import InsightsPanel from './components/InsightsPanel';

const FinancialAnalyticsDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('last-12-months');
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [selectedServiceLines, setSelectedServiceLines] = useState([]);
  const [viewMode, setViewMode] = useState('overview');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState('default');

  // Mock financial data
  const revenueData = [
    { month: 'Jan', revenue: 485000, profit: 145500, expenses: 339500, placements: 24 },
    { month: 'Feb', revenue: 520000, profit: 156000, expenses: 364000, placements: 28 },
    { month: 'Mar', revenue: 475000, profit: 142500, expenses: 332500, placements: 22 },
    { month: 'Apr', revenue: 610000, profit: 183000, expenses: 427000, placements: 32 },
    { month: 'May', revenue: 580000, profit: 174000, expenses: 406000, placements: 29 },
    { month: 'Jun', revenue: 645000, profit: 193500, expenses: 451500, placements: 35 },
    { month: 'Jul', revenue: 590000, profit: 177000, expenses: 413000, placements: 31 },
    { month: 'Aug', revenue: 675000, profit: 202500, expenses: 472500, placements: 38 },
    { month: 'Sep', revenue: 620000, profit: 186000, expenses: 434000, placements: 33 },
    { month: 'Oct', revenue: 710000, profit: 213000, expenses: 497000, placements: 41 },
    { month: 'Nov', revenue: 685000, profit: 205500, expenses: 479500, placements: 37 },
    { month: 'Dec', revenue: 750000, profit: 225000, expenses: 525000, placements: 43 }
  ];

  const clientProfitability = [
    { client: 'TechCorp Solutions', revenue: 1250000, profit: 375000, margin: 30, placements: 45 },
    { client: 'Global Finance Ltd', revenue: 980000, profit: 294000, margin: 30, placements: 38 },
    { client: 'Innovation Systems', revenue: 850000, profit: 238000, margin: 28, placements: 32 },
    { client: 'Digital Dynamics', revenue: 720000, profit: 194400, margin: 27, placements: 28 },
    { client: 'Future Enterprises', revenue: 650000, profit: 162500, margin: 25, placements: 24 }
  ];

  const serviceLineData = [
    { name: 'Executive Search', value: 2800000, percentage: 45, color: '#1E3A8A' },
    { name: 'Technology Roles', value: 1680000, percentage: 27, color: '#0EA5E9' },
    { name: 'Finance & Accounting', value: 1120000, percentage: 18, color: '#059669' },
    { name: 'Sales & Marketing', value: 620000, percentage: 10, color: '#D97706' }
  ];

  const kpiData = {
    totalRevenue: 7450000,
    totalProfit: 2235000,
    profitMargin: 30.0,
    totalPlacements: 393,
    avgFeePerPlacement: 18956,
    revenueGrowth: 15.2,
    clientRetention: 94.5,
    timeToFill: 28.5
  };

  const expenseBreakdown = [
    { category: 'Salaries & Benefits', amount: 2850000, percentage: 45.8 },
    { category: 'Marketing & Sales', amount: 980000, percentage: 15.7 },
    { category: 'Technology & Tools', amount: 620000, percentage: 10.0 },
    { category: 'Office & Operations', amount: 485000, percentage: 7.8 },
    { category: 'Travel & Entertainment', amount: 365000, percentage: 5.9 },
    { category: 'Professional Services', amount: 285000, percentage: 4.6 },
    { category: 'Training & Development', amount: 195000, percentage: 3.1 },
    { category: 'Other Expenses', amount: 445000, percentage: 7.1 }
  ];

  const commissionData = [
    { recruiter: 'Sarah Johnson', commissions: 125000, placements: 28, avgCommission: 4464 },
    { recruiter: 'Michael Chen', commissions: 118000, placements: 26, avgCommission: 4538 },
    { recruiter: 'Emily Rodriguez', commissions: 112000, placements: 24, avgCommission: 4667 },
    { recruiter: 'David Thompson', commissions: 98000, placements: 22, avgCommission: 4455 },
    { recruiter: 'Lisa Anderson', commissions: 89000, placements: 19, avgCommission: 4684 }
  ];

  const budgetVariance = [
    { category: 'Revenue', budget: 7200000, actual: 7450000, variance: 3.5, status: 'positive' },
    { category: 'Gross Profit', budget: 2160000, actual: 2235000, variance: 3.5, status: 'positive' },
    { category: 'Operating Expenses', budget: 6100000, actual: 6225000, variance: -2.0, status: 'negative' },
    { category: 'Net Profit', budget: 1100000, actual: 1225000, variance: 11.4, status: 'positive' },
    { category: 'Placements', budget: 380, actual: 393, variance: 3.4, status: 'positive' }
  ];

  const forecastData = [
    { period: 'Q1 2024', revenue: 1950000, confidence: 'High' },
    { period: 'Q2 2024', revenue: 2100000, confidence: 'High' },
    { period: 'Q3 2024', revenue: 2250000, confidence: 'Medium' },
    { period: 'Q4 2024', revenue: 2400000, confidence: 'Medium' }
  ];

  const filteredData = useMemo(() => {
    // Apply filters to data based on selected criteria
    return {
      revenue: revenueData,
      clients: clientProfitability,
      serviceLines: serviceLineData,
      expenses: expenseBreakdown,
      commissions: commissionData
    };
  }, [selectedDateRange, selectedClients, selectedRecruiters, selectedServiceLines]);

  const handleExport = (format, data) => {
    console.log(`Exporting ${data} in ${format} format`);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'dateRange':
        setSelectedDateRange(value);
        break;
      case 'clients':
        setSelectedClients(value);
        break;
      case 'recruiters':
        setSelectedRecruiters(value);
        break;
      case 'serviceLines':
        setSelectedServiceLines(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Financial Analytics Dashboard</h1>
            <p className="text-text-secondary">Advanced financial intelligence and performance insights</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
            >
              <Icon name="Filter" size={18} />
              <span>Filters</span>
            </button>
            
            <ExportTools onExport={handleExport} />
            
            <div className="flex items-center space-x-2 bg-surface border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                  viewMode === 'overview' ? 'bg-primary text-white' : 'text-secondary-600 hover:text-text-primary'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                  viewMode === 'detailed' ? 'bg-primary text-white' : 'text-secondary-600 hover:text-text-primary'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Panel */}
          <FilterPanel
            isOpen={isFilterPanelOpen}
            onFilterChange={handleFilterChange}
            selectedDateRange={selectedDateRange}
            selectedClients={selectedClients}
            selectedRecruiters={selectedRecruiters}
            selectedServiceLines={selectedServiceLines}
          />

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${isFilterPanelOpen ? 'lg:ml-80' : ''}`}>
            {/* KPI Cards */}
            <KPICards data={kpiData} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Trends */}
              <RevenueChart data={filteredData.revenue} />

              {/* Profitability Analysis */}
              <ProfitabilityAnalysis data={filteredData.clients} />

              {/* Service Line Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">Service Line Revenue</h3>
                  <Icon name="PieChart" size={20} className="text-secondary-400" />
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceLineData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {serviceLineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, 'Revenue']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Expense Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">Expense Analysis</h3>
                  <Icon name="TrendingDown" size={20} className="text-secondary-400" />
                </div>
                
                <div className="space-y-4">
                  {expenseBreakdown.slice(0, 5).map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-text-primary">{expense.category}</span>
                          <span className="text-sm text-text-secondary">{expense.percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary-100 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${expense.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-text-primary">
                        ${(expense.amount / 1000).toFixed(0)}K
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Commission Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-surface border border-border rounded-lg p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Top Performers - Commission Tracking</h3>
                <Icon name="Award" size={20} className="text-secondary-400" />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Recruiter</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Total Commissions</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Placements</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Avg Commission</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionData.map((recruiter, index) => (
                      <tr key={index} className="border-b border-border last:border-b-0 hover:bg-secondary-50 transition-colors duration-200">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                              <Icon name="User" size={16} className="text-primary" />
                            </div>
                            <span className="font-medium text-text-primary">{recruiter.recruiter}</span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-medium text-text-primary">
                          ${recruiter.commissions.toLocaleString()}
                        </td>
                        <td className="text-right py-3 px-4 text-text-secondary">{recruiter.placements}</td>
                        <td className="text-right py-3 px-4 text-text-secondary">
                          ${recruiter.avgCommission.toLocaleString()}
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <div className="w-16 bg-secondary-100 rounded-full h-2">
                              <div
                                className="bg-success h-2 rounded-full"
                                style={{ width: `${Math.min((recruiter.commissions / 125000) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-success font-medium">
                              {Math.round((recruiter.commissions / 125000) * 100)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Budget Variance Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-surface border border-border rounded-lg p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Budget vs Actual Performance</h3>
                <Icon name="Target" size={20} className="text-secondary-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {budgetVariance.map((item, index) => (
                  <div key={index} className="p-4 bg-secondary-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">{item.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'positive' ?'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                      }`}>
                        {item.variance > 0 ? '+' : ''}{item.variance}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-text-secondary">Budget:</span>
                        <span className="text-text-primary">
                          {typeof item.budget === 'number' && item.budget > 1000 
                            ? `$${(item.budget / 1000000).toFixed(1)}M`
                            : item.budget.toLocaleString()
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-text-secondary">Actual:</span>
                        <span className="text-text-primary font-medium">
                          {typeof item.actual === 'number' && item.actual > 1000 
                            ? `$${(item.actual / 1000000).toFixed(1)}M`
                            : item.actual.toLocaleString()
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Insights Panel */}
          <InsightsPanel 
            revenueData={revenueData}
            clientData={clientProfitability}
            forecastData={forecastData}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalyticsDashboard;