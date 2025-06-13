import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const QuickFilters = ({ 
  selectedOffice, 
  selectedServiceLine, 
  onOfficeChange, 
  onServiceLineChange, 
  onSaveView 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [customViewName, setCustomViewName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Mock filter options
  const offices = [
    { value: 'all', label: 'All Offices', count: 156 },
    { value: 'london', label: 'London', count: 45 },
    { value: 'new_york', label: 'New York', count: 38 },
    { value: 'singapore', label: 'Singapore', count: 32 },
    { value: 'sydney', label: 'Sydney', count: 28 },
    { value: 'toronto', label: 'Toronto', count: 13 }
  ];

  const serviceLines = [
    { value: 'all', label: 'All Service Lines', count: 156 },
    { value: 'technology', label: 'Technology', count: 68 },
    { value: 'finance', label: 'Finance & Banking', count: 42 },
    { value: 'healthcare', label: 'Healthcare', count: 25 },
    { value: 'engineering', label: 'Engineering', count: 21 }
  ];

  const savedViews = [
    { name: 'Default View', filters: { office: 'all', serviceLine: 'all' } },
    { name: 'London Tech Focus', filters: { office: 'london', serviceLine: 'technology' } },
    { name: 'Finance Global', filters: { office: 'all', serviceLine: 'finance' } },
    { name: 'APAC Overview', filters: { office: 'singapore', serviceLine: 'all' } }
  ];

  const handleSaveView = () => {
    if (customViewName.trim()) {
      onSaveView(customViewName);
      setCustomViewName('');
      setShowSaveDialog(false);
    }
  };

  const handleLoadView = (view) => {
    onOfficeChange(view.filters.office);
    onServiceLineChange(view.filters.serviceLine);
  };

  const handleResetFilters = () => {
    onOfficeChange('all');
    onServiceLineChange('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedOffice !== 'all') count++;
    if (selectedServiceLine !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-text-primary" />
          <h3 className="text-sm font-semibold text-text-primary">Quick Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-secondary-100 transition-colors duration-200"
        >
          <Icon 
            name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
            size={16} 
            className="text-secondary-400" 
          />
        </button>
      </div>

      {/* Filter Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-6">
          {/* Office Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Office Location
            </label>
            <div className="space-y-2">
              {offices.map((office) => (
                <button
                  key={office.value}
                  onClick={() => onOfficeChange(office.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 ${
                    selectedOffice === office.value
                      ? 'bg-primary-50 border border-primary text-primary' :'bg-secondary-50 hover:bg-secondary-100 border border-transparent text-text-secondary'
                  }`}
                >
                  <span className="text-sm font-medium">{office.label}</span>
                  <span className="text-xs bg-surface px-2 py-1 rounded-full">
                    {office.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Line Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Service Line
            </label>
            <div className="space-y-2">
              {serviceLines.map((serviceLine) => (
                <button
                  key={serviceLine.value}
                  onClick={() => onServiceLineChange(serviceLine.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 ${
                    selectedServiceLine === serviceLine.value
                      ? 'bg-primary-50 border border-primary text-primary' :'bg-secondary-50 hover:bg-secondary-100 border border-transparent text-text-secondary'
                  }`}
                >
                  <span className="text-sm font-medium">{serviceLine.label}</span>
                  <span className="text-xs bg-surface px-2 py-1 rounded-full">
                    {serviceLine.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center space-x-2 pt-4 border-t border-border">
            <button
              onClick={handleResetFilters}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-secondary-100 text-text-secondary rounded-md hover:bg-secondary-200 transition-colors duration-200"
            >
              <Icon name="RotateCcw" size={14} />
              <span className="text-sm font-medium">Reset</span>
            </button>
            
            <button
              onClick={() => setShowSaveDialog(true)}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="Save" size={14} />
              <span className="text-sm font-medium">Save View</span>
            </button>
          </div>

          {/* Saved Views */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Saved Views
            </label>
            <div className="space-y-2">
              {savedViews.map((view, index) => (
                <button
                  key={index}
                  onClick={() => handleLoadView(view)}
                  className="w-full flex items-center justify-between p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg text-left transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Bookmark" size={14} className="text-secondary-400" />
                    <span className="text-sm font-medium text-text-primary">{view.name}</span>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-secondary-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save View Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-surface border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Save Current View</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                View Name
              </label>
              <input
                type="text"
                value={customViewName}
                onChange={(e) => setCustomViewName(e.target.value)}
                placeholder="Enter view name..."
                className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 bg-secondary-100 text-text-secondary rounded-md hover:bg-secondary-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveView}
                disabled={!customViewName.trim()}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFilters;