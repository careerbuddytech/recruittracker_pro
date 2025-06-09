import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { recruiters } from 'data/recruiters';

const RecruiterProductivityRankings = ({ office, dateRange }) => {
  const [sortBy, setSortBy] = useState('revenue');
  const [viewMode, setViewMode] = useState('list');
  const [expandedRecruiter, setExpandedRecruiter] = useState(null);

  const sortOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'placements', label: 'Placements' },
    { value: 'successRate', label: 'Success Rate' },
    { value: 'clientSatisfaction', label: 'Client Satisfaction' }
  ];

  const getBadgeInfo = (badge) => {
    const badges = {
      top_performer: { label: 'Top Performer', color: 'bg-success text-white', icon: 'Crown' },
      rising_star: { label: 'Rising Star', color: 'bg-accent text-white', icon: 'Star' },
      efficiency_expert: { label: 'Efficiency Expert', color: 'bg-primary text-white', icon: 'Zap' }
    };
    return badges[badge] || null;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={14} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={14} className="text-error" />;
      default:
        return <Icon name="Minus" size={14} className="text-secondary-400" />;
    }
  };

  // Filter recruiters by office if specified
  const filteredRecruiters = office === 'all' || !office 
    ? recruiters 
    : recruiters.filter(recruiter => recruiter.office.toLowerCase() === office.toLowerCase());

  const sortedRecruiters = [...filteredRecruiters].sort((a, b) => {
    const aValue = a.performanceMetrics[sortBy];
    const bValue = b.performanceMetrics[sortBy];
    return bValue - aValue;
  });

  const handleRecruiterClick = (recruiter) => {
    console.log('Viewing detailed performance for:', recruiter.name);
    // Implementation for detailed recruiter performance view
  };

  const toggleExpanded = (recruiterId) => {
    setExpandedRecruiter(expandedRecruiter === recruiterId ? null : recruiterId);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Recruiter Rankings</h3>
          <p className="text-sm text-text-secondary">Top performing recruiters by key metrics</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'list' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="List" size={14} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Grid3X3" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Rankings List */}
      <div className="space-y-3">
        {sortedRecruiters.map((recruiter, index) => {
          const badge = getBadgeInfo(recruiter.performanceMetrics.badge);
          const isExpanded = expandedRecruiter === recruiter.id;
          
          return (
            <div
              key={recruiter.id}
              className="border border-border rounded-lg hover:shadow-elevated transition-all duration-200"
            >
              <div
                onClick={() => handleRecruiterClick(recruiter)}
                className="flex items-center p-4 cursor-pointer"
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8 mr-4">
                  {index < 3 ? (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-warning' : 
                      index === 1 ? 'bg-secondary-400': 'bg-warning-600'
                    }`}>
                      {index + 1}
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-text-secondary">#{index + 1}</span>
                  )}
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center flex-1 min-w-0">
                  <img
                    src={recruiter.avatar}
                    alt={recruiter.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-text-primary truncate">
                        {recruiter.name}
                      </h4>
                      {badge && (
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                          <Icon name={badge.icon} size={10} />
                          <span>{badge.label}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <span>{recruiter.role}</span>
                      <span>•</span>
                      <span>{recruiter.office}</span>
                      <span>•</span>
                      <span>{recruiter.specializations[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="hidden md:flex items-center space-x-6 mr-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">
                      ${(recruiter.performanceMetrics.revenue / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-text-secondary">Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">{recruiter.performanceMetrics.placements}</p>
                    <p className="text-xs text-text-secondary">Placements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">{recruiter.performanceMetrics.successRate}%</p>
                    <p className="text-xs text-text-secondary">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">{recruiter.performanceMetrics.avgTimeToFill}d</p>
                    <p className="text-xs text-text-secondary">Avg. Fill Time</p>
                  </div>
                </div>

                {/* Trend & Expand */}
                <div className="flex items-center space-x-3">
                  {getTrendIcon(recruiter.performanceMetrics.trend)}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(recruiter.id);
                    }}
                    className="p-1 hover:bg-secondary-100 rounded transition-colors duration-200"
                  >
                    <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-secondary-400" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-border p-4 bg-secondary-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Specializations */}
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Specializations</h5>
                      <div className="flex flex-wrap gap-1">
                        {recruiter.specializations.slice(0, 3).map((spec, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                        {recruiter.specializations.length > 3 && (
                          <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                            +{recruiter.specializations.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Goals Progress */}
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Goal Progress</h5>
                      <div className="space-y-2">
                        {recruiter.goals.slice(0, 2).map((goal, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-text-secondary truncate">{goal.description}</span>
                              <span className="text-text-primary font-medium">{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${goal.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Contact</h5>
                      <div className="space-y-1 text-xs text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <Icon name="Mail" size={12} />
                          <span>{recruiter.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Phone" size={12} />
                          <span>{recruiter.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="MapPin" size={12} />
                          <span>{recruiter.office}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-border">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary rounded-md hover:bg-primary-200 transition-colors duration-200 text-sm">
                      <Icon name="MessageCircle" size={14} />
                      <span>Message</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-accent-100 text-accent rounded-md hover:bg-accent-200 transition-colors duration-200 text-sm">
                      <Icon name="Calendar" size={14} />
                      <span>Schedule</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors duration-200 text-sm">
                      <Icon name="BarChart3" size={14} />
                      <span>View Performance</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            ${(sortedRecruiters.reduce((sum, r) => sum + r.performanceMetrics.revenue, 0) / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-text-secondary">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            {sortedRecruiters.reduce((sum, r) => sum + r.performanceMetrics.placements, 0)}
          </p>
          <p className="text-xs text-text-secondary">Total Placements</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            {(sortedRecruiters.reduce((sum, r) => sum + r.performanceMetrics.successRate, 0) / sortedRecruiters.length).toFixed(1)}%
          </p>
          <p className="text-xs text-text-secondary">Avg. Success Rate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            {(sortedRecruiters.reduce((sum, r) => sum + r.performanceMetrics.avgTimeToFill, 0) / sortedRecruiters.length).toFixed(1)}d
          </p>
          <p className="text-xs text-text-secondary">Avg. Fill Time</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProductivityRankings;