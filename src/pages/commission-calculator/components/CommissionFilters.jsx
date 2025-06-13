import React from 'react';
import Icon from 'components/AppIcon';

const CommissionFilters = ({ filters, onFiltersChange, commissionData }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: 'all',
      recruiter: 'all',
      paymentStatus: 'all',
      commissionTier: 'all',
      searchQuery: ''
    });
  };

  // Extract unique values for filter options
  const uniqueRecruiters = [...new Set(commissionData.map(comm => comm.recruiter))];
  const uniqueTiers = [...new Set(commissionData.map(comm => comm.tier))];
  const paymentStatuses = ['paid', 'pending', 'processing', 'disputed'];

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== '');

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-sm text-secondary-600 hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
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
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              placeholder="Search by recruiter, client, candidate, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Recruiter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Recruiter
          </label>
          <select
            value={filters.recruiter}
            onChange={(e) => handleFilterChange('recruiter', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          >
            <option value="all">All Recruiters</option>
            {uniqueRecruiters.map(recruiter => (
              <option key={recruiter} value={recruiter}>{recruiter}</option>
            ))}
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Payment Status
          </label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          >
            <option value="all">All Statuses</option>
            {paymentStatuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Commission Tier */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Commission Tier
          </label>
          <select
            value={filters.commissionTier}
            onChange={(e) => handleFilterChange('commissionTier', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          >
            <option value="all">All Tiers</option>
            {uniqueTiers.map(tier => (
              <option key={tier} value={tier}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-2 flex items-end space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Icon name="Filter" size={16} />
            <span>Apply Filters</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200">
            <Icon name="Save" size={16} />
            <span>Save Filter</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-colors duration-200">
            <Icon name="Download" size={16} />
            <span>Export Results</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm font-medium text-text-secondary">Active filters:</span>
            
            {filters.searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary">
                Search: "{filters.searchQuery}"
                <button
                  onClick={() => handleFilterChange('searchQuery', '')}
                  className="ml-2 hover:text-primary-700"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.recruiter !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                Recruiter: {filters.recruiter}
                <button
                  onClick={() => handleFilterChange('recruiter', 'all')}
                  className="ml-2 hover:text-success-800"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.paymentStatus !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-700">
                Status: {filters.paymentStatus.charAt(0).toUpperCase() + filters.paymentStatus.slice(1)}
                <button
                  onClick={() => handleFilterChange('paymentStatus', 'all')}
                  className="ml-2 hover:text-warning-800"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.commissionTier !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                Tier: {filters.commissionTier.charAt(0).toUpperCase() + filters.commissionTier.slice(1)}
                <button
                  onClick={() => handleFilterChange('commissionTier', 'all')}
                  className="ml-2 hover:text-accent-800"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionFilters;