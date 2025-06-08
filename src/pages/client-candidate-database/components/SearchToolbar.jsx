import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SearchToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedFilters, 
  onFiltersChange, 
  activeTab 
}) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [savedSearches] = useState([
    { id: 1, name: "Active Tech Clients", query: "technology active", filters: { status: "Active", industry: "Technology" } },
    { id: 2, name: "Available Senior Developers", query: "senior developer", filters: { status: "Available", skills: ["React", "Node.js"] } },
    { id: 3, name: "Finance Prospects", query: "finance", filters: { industry: "Financial Services", status: "Prospect" } }
  ]);

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...selectedFilters,
      [filterType]: value
    });
  };

  const handleSkillToggle = (skill) => {
    const currentSkills = selectedFilters.skills || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    handleFilterChange('skills', updatedSkills);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: '',
      location: '',
      industry: '',
      skills: [],
      dateRange: ''
    });
    onSearchChange('');
  };

  const applySavedSearch = (savedSearch) => {
    onSearchChange(savedSearch.query);
    onFiltersChange(savedSearch.filters);
  };

  const skillOptions = [
    "React", "Node.js", "Python", "Java", "AWS", "Docker", "Kubernetes",
    "Product Strategy", "Agile", "Analytics", "UX Design", "SQL", "Terraform"
  ];

  const statusOptions = activeTab === 'clients' 
    ? ["Active", "Prospect", "Inactive", "On Hold"]
    : ["Available", "Interviewing", "Placed", "Not Available"];

  const industryOptions = [
    "Technology", "Financial Services", "Healthcare", "Manufacturing", 
    "Retail", "Education", "Government", "Consulting"
  ];

  const locationOptions = [
    "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA",
    "Boston, MA", "Chicago, IL", "Los Angeles, CA", "Remote"
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Main Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
          />
          <input
            type="text"
            placeholder={`Search ${activeTab}... (use AND, OR for Boolean search)`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <button
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            showAdvancedSearch 
              ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          }`}
        >
          <Icon name="Filter" size={16} />
          <span>Advanced</span>
        </button>

        <button
          onClick={clearAllFilters}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
        >
          <Icon name="X" size={16} />
          <span>Clear</span>
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-text-secondary font-medium">Quick Filters:</span>
        
        <select
          value={selectedFilters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Status</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={selectedFilters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Locations</option>
          {locationOptions.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        {activeTab === 'clients' && (
          <select
            value={selectedFilters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Industries</option>
            {industryOptions.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        )}
      </div>

      {/* Advanced Search Panel */}
      {showAdvancedSearch && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Saved Searches */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Saved Searches</h4>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map(search => (
                <button
                  key={search.id}
                  onClick={() => applySavedSearch(search)}
                  className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm hover:bg-accent-200 transition-colors duration-200"
                >
                  {search.name}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Filter (for candidates) */}
          {activeTab === 'candidates' && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                      (selectedFilters.skills || []).includes(skill)
                        ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date Range Filter */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Date Range</h4>
            <div className="flex items-center space-x-4">
              <select
                value={selectedFilters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-text-secondary">to</span>
                <input
                  type="date"
                  className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Boolean Search Help */}
          <div className="bg-secondary-50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-text-primary mb-2">Search Tips</h4>
            <div className="text-xs text-text-secondary space-y-1">
              <p><strong>Boolean operators:</strong> Use AND, OR, NOT for complex searches</p>
              <p><strong>Exact phrases:</strong> Use quotes "senior developer" for exact matches</p>
              <p><strong>Wildcards:</strong> Use * for partial matches (develop* matches developer, development)</p>
              <p><strong>Keyboard shortcuts:</strong> Ctrl+F for quick search, Ctrl+Shift+F for advanced search</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchToolbar;