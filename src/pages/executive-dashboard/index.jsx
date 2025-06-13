import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import KPISummaryCards from './components/KPISummaryCards';
import RevenueChart from './components/RevenueChart';
import PlacementVelocityChart from './components/PlacementVelocityChart';
import ClientPerformanceMatrix from './components/ClientPerformanceMatrix';
import RecruiterProductivityRankings from './components/RecruiterProductivityRankings';
import AlertsPanel from './components/AlertsPanel';
import QuickFilters from './components/QuickFilters';
import IntegrationStatus from './components/IntegrationStatus';
import CurrencySwitcher from '../transaction-entry-form/components/CurrencySwitcher';

const ExecutiveDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');
  const [selectedOffice, setSelectedOffice] = useState('all');
  const [selectedServiceLine, setSelectedServiceLine] = useState('all');
  const [savedView, setSavedView] = useState('default');
  const [isExporting, setIsExporting] = useState(false);
  const [currency, setCurrency] = useState('USD'); // Default to USD for dashboard

  // Mock data for dashboard
  const dashboardData = {
    kpis: {
      revenue: { current: 2450000, previous: 2180000, target: 2500000 },
      placements: { current: 156, previous: 142, target: 160 },
      pipelineValue: { current: 8750000, previous: 8200000, target: 9000000 },
      profitMargin: { current: 32.5, previous: 29.8, target: 35.0 }
    },
    alerts: [
      {
        id: 1,
        type: 'overdue_invoice',
        title: 'Overdue Invoice Alert',
        message: 'TechCorp Ltd has 3 invoices overdue by 15+ days totaling $45,000',
        severity: 'high',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 2,
        type: 'at_risk_placement',
        title: 'At-Risk Placement',
        message: 'Senior Developer role at StartupXYZ showing candidate withdrawal risk',
        severity: 'medium',
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: 3,
        type: 'performance_anomaly',
        title: 'Performance Anomaly',
        message: 'London office showing 15% drop in placement velocity this week',
        severity: 'medium',
        timestamp: new Date(Date.now() - 10800000)
      }
    ],
    integrations: [
      { name: 'QuickBooks', status: 'connected', lastSync: new Date(Date.now() - 300000) },
      { name: 'Salesforce CRM', status: 'connected', lastSync: new Date(Date.now() - 600000) },
      { name: 'Xero Accounting', status: 'error', lastSync: new Date(Date.now() - 3600000) },
      { name: 'LinkedIn Recruiter', status: 'connected', lastSync: new Date(Date.now() - 900000) }
    ]
  };

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisQuarter', label: 'This Quarter' },
    { value: 'lastQuarter', label: 'Last Quarter' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const savedViews = [
    { value: 'default', label: 'Default View' },
    { value: 'financial_focus', label: 'Financial Focus' },
    { value: 'operational_focus', label: 'Operational Focus' },
    { value: 'team_performance', label: 'Team Performance' },
    { value: 'client_analysis', label: 'Client Analysis' }
  ];

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exporting dashboard data in ${format} format`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveView = (viewName) => {
    console.log('Saving current view as:', viewName);
    // Implementation for saving current filter state
  };

  const handleKeyboardShortcut = (event) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '1':
          event.preventDefault();
          setSelectedDateRange('today');
          break;
        case '2':
          event.preventDefault();
          setSelectedDateRange('last7days');
          break;
        case '3':
          event.preventDefault();
          setSelectedDateRange('last30days');
          break;
        case 'e':
          event.preventDefault();
          handleExport('pdf');
          break;
        default:
          break;
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  const filteredData = useMemo(() => {
    // Apply filters to dashboard data based on selected criteria
    return dashboardData;
  }, [selectedDateRange, selectedOffice, selectedServiceLine, dashboardData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Executive Dashboard</h1>
            <p className="text-text-secondary">Strategic command center for business performance insights</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
            {/* Currency Switcher */}
            <CurrencySwitcher 
              currency={currency} 
              onCurrencyChange={handleCurrencyChange} 
            />

            {/* Date Range Selector */}
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-secondary-400" />
              <select
                value={selectedDateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Saved Views */}
            <div className="flex items-center space-x-2">
              <Icon name="Bookmark" size={16} className="text-secondary-400" />
              <select
                value={savedView}
                onChange={(e) => setSavedView(e.target.value)}
                className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {savedViews.map(view => (
                  <option key={view.value} value={view.value}>
                    {view.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <div className="relative">
              <button
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <Icon name="Loader2" size={16} className="animate-spin" />
                ) : (
                  <Icon name="Download" size={16} />
                )}
                <span className="text-sm font-medium">
                  {isExporting ? 'Exporting...' : 'Export'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <KPISummaryCards data={filteredData.kpis} currency={currency} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* Left Sidebar - Quick Filters */}
          <div className="xl:col-span-1">
            <QuickFilters
              selectedOffice={selectedOffice}
              selectedServiceLine={selectedServiceLine}
              onOfficeChange={setSelectedOffice}
              onServiceLineChange={setSelectedServiceLine}
              onSaveView={handleSaveView}
            />
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-6">
            {/* Revenue Trends Chart */}
            <RevenueChart dateRange={selectedDateRange} />
            
            {/* Placement Velocity Chart */}
            <PlacementVelocityChart dateRange={selectedDateRange} />
            
            {/* Client Performance Matrix */}
            <ClientPerformanceMatrix 
              office={selectedOffice}
              serviceLine={selectedServiceLine}
            />
          </div>

          {/* Right Panel */}
          <div className="xl:col-span-1 space-y-6">
            {/* Alerts Panel */}
            <AlertsPanel alerts={filteredData.alerts} />
            
            {/* Integration Status */}
            <IntegrationStatus integrations={filteredData.integrations} />
            
            {/* Recruiter Productivity Rankings */}
            <RecruiterProductivityRankings 
              office={selectedOffice}
              dateRange={selectedDateRange}
            />
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Keyboard" size={16} className="text-secondary-400" />
            <h3 className="text-sm font-medium text-text-primary">Keyboard Shortcuts</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-text-secondary">
            <div><kbd className="bg-secondary-100 px-1 rounded">Ctrl+1</kbd> Today</div>
            <div><kbd className="bg-secondary-100 px-1 rounded">Ctrl+2</kbd> Last 7 Days</div>
            <div><kbd className="bg-secondary-100 px-1 rounded">Ctrl+3</kbd> Last 30 Days</div>
            <div><kbd className="bg-secondary-100 px-1 rounded">Ctrl+E</kbd> Export PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;