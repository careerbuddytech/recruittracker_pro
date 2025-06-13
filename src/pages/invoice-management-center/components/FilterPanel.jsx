import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, invoices }) => {
  const handleFilterUpdate = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      client: 'all',
      dateRange: 'all',
      amountRange: 'all'
    });
  };

  // Get unique clients for filter dropdown
  const uniqueClients = [...new Set(invoices.map(invoice => invoice.clientName))]
    .map(name => {
      const invoice = invoices.find(inv => inv.clientName === name);
      return { id: invoice.clientId, name };
    });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'sent', label: 'Sent' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const amountRangeOptions = [
    { value: 'all', label: 'All Amounts' },
    { value: '0-10000', label: '$0 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: '25000-50000', label: '$25,000 - $50,000' },
    { value: '50000+', label: '$50,000+' }
  ];

  const activeFilterCount = Object.values(filters).filter(value => value !== 'all' && value !== '').length;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-text-primary">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Search
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
            />
            <input
              type="text"
              placeholder="Invoice #, client, candidate..."
              value={filters.search}
              onChange={(e) => handleFilterUpdate('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterUpdate('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Client Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Client
          </label>
          <select
            value={filters.client}
            onChange={(e) => handleFilterUpdate('client', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Clients</option>
            {uniqueClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterUpdate('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
        {/* Amount Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Amount Range
          </label>
          <select
            value={filters.amountRange}
            onChange={(e) => handleFilterUpdate('amountRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            {amountRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Filter Buttons */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Quick Filters
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterUpdate('status', 'overdue')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 ${
                filters.status === 'overdue' ?'bg-error text-white' :'bg-error-100 text-error-700 hover:bg-error-200'
              }`}
            >
              <Icon name="AlertTriangle" size={14} className="inline mr-1" />
              Overdue
            </button>
            
            <button
              onClick={() => handleFilterUpdate('status', 'pending_approval')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 ${
                filters.status === 'pending_approval' ?'bg-warning text-white' :'bg-warning-100 text-warning-700 hover:bg-warning-200'
              }`}
            >
              <Icon name="Clock" size={14} className="inline mr-1" />
              Pending Approval
            </button>
            
            <button
              onClick={() => handleFilterUpdate('dateRange', 'month')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 ${
                filters.dateRange === 'month' ?'bg-primary text-white' :'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }`}
            >
              <Icon name="Calendar" size={14} className="inline mr-1" />
              This Month
            </button>
          </div>
        </div>
      </div>

      {/* Filter Summary */}
      {activeFilterCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Info" size={16} />
            <span>
              Showing filtered results based on {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;