import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const FilterPanel = ({ 
  isOpen, 
  onFilterChange, 
  selectedDateRange, 
  selectedClients, 
  selectedRecruiters, 
  selectedServiceLines 
}) => {
  const [savedViews] = useState([
    { id: 1, name: 'Executive Summary', filters: { dateRange: 'last-12-months', clients: [], recruiters: [] } },
    { id: 2, name: 'Q4 Performance', filters: { dateRange: 'q4-2023', clients: ['TechCorp Solutions'], recruiters: [] } },
    { id: 3, name: 'Top Clients', filters: { dateRange: 'last-6-months', clients: ['TechCorp Solutions', 'Global Finance Ltd'], recruiters: [] } }
  ]);

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-12-months', label: 'Last 12 Months' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const clientOptions = [
    'TechCorp Solutions',
    'Global Finance Ltd',
    'Innovation Systems',
    'Digital Dynamics',
    'Future Enterprises',
    'Quantum Technologies',
    'NextGen Solutions'
  ];

  const recruiterOptions = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Rodriguez',
    'David Thompson',
    'Lisa Anderson',
    'James Wilson',
    'Maria Garcia'
  ];

  const serviceLineOptions = [
    'Executive Search',
    'Technology Roles',
    'Finance & Accounting',
    'Sales & Marketing',
    'Operations',
    'Human Resources'
  ];

  const handleMultiSelect = (type, value) => {
    let currentSelection;
    switch (type) {
      case 'clients':
        currentSelection = selectedClients;
        break;
      case 'recruiters':
        currentSelection = selectedRecruiters;
        break;
      case 'serviceLines':
        currentSelection = selectedServiceLines;
        break;
      default:
        return;
    }

    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];
    
    onFilterChange(type, newSelection);
  };

  const clearAllFilters = () => {
    onFilterChange('dateRange', 'last-12-months');
    onFilterChange('clients', []);
    onFilterChange('recruiters', []);
    onFilterChange('serviceLines', []);
  };

  const applySavedView = (view) => {
    onFilterChange('dateRange', view.filters.dateRange);
    onFilterChange('clients', view.filters.clients);
    onFilterChange('recruiters', view.filters.recruiters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-surface border-r border-border z-90 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Filters & Views</h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>

            {/* Saved Views */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">Saved Views</h4>
              <div className="space-y-2">
                {savedViews.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => applySavedView(view)}
                    className="w-full flex items-center justify-between p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium text-text-primary">{view.name}</span>
                    <Icon name="ChevronRight" size={16} className="text-secondary-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">Date Range</h4>
              <select
                value={selectedDateRange}
                onChange={(e) => onFilterChange('dateRange', e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Client Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">
                Clients ({selectedClients.length} selected)
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {clientOptions.map((client) => (
                  <label key={client} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client)}
                      onChange={() => handleMultiSelect('clients', client)}
                      className="rounded border-border text-primary focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{client}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Recruiter Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">
                Recruiters ({selectedRecruiters.length} selected)
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {recruiterOptions.map((recruiter) => (
                  <label key={recruiter} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRecruiters.includes(recruiter)}
                      onChange={() => handleMultiSelect('recruiters', recruiter)}
                      className="rounded border-border text-primary focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{recruiter}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Service Line Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">
                Service Lines ({selectedServiceLines.length} selected)
              </h4>
              <div className="space-y-2">
                {serviceLineOptions.map((serviceLine) => (
                  <label key={serviceLine} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedServiceLines.includes(serviceLine)}
                      onChange={() => handleMultiSelect('serviceLines', serviceLine)}
                      className="rounded border-border text-primary focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{serviceLine}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-2 text-sm text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                  <Icon name="Save" size={16} className="text-secondary-400" />
                  <span>Save Current View</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-sm text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                  <Icon name="Download" size={16} className="text-secondary-400" />
                  <span>Export Filtered Data</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 text-sm text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                  <Icon name="RefreshCw" size={16} className="text-secondary-400" />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;