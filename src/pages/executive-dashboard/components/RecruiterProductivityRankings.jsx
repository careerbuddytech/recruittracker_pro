import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecruiterProductivityRankings = ({ office, dateRange }) => {
  const [sortBy, setSortBy] = useState('revenue');
  const [viewMode, setViewMode] = useState('list');

  // Mock recruiter data
  const recruiterData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      office: 'London',
      revenue: 485000,
      placements: 32,
      successRate: 94,
      avgTimeToFill: 14,
      clientSatisfaction: 96,
      trend: 'up',
      badge: 'top_performer'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      office: 'New York',
      revenue: 420000,
      placements: 28,
      successRate: 89,
      avgTimeToFill: 16,
      clientSatisfaction: 92,
      trend: 'up',
      badge: 'rising_star'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      office: 'London',
      revenue: 395000,
      placements: 26,
      successRate: 91,
      avgTimeToFill: 15,
      clientSatisfaction: 94,
      trend: 'stable',
      badge: null
    },
    {
      id: 4,
      name: 'David Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      office: 'Sydney',
      revenue: 365000,
      placements: 24,
      successRate: 87,
      avgTimeToFill: 18,
      clientSatisfaction: 89,
      trend: 'down',
      badge: null
    },
    {
      id: 5,
      name: 'Lisa Wang',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      office: 'Singapore',
      revenue: 445000,
      placements: 30,
      successRate: 92,
      avgTimeToFill: 13,
      clientSatisfaction: 95,
      trend: 'up',
      badge: 'efficiency_expert'
    }
  ];

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

  const sortedRecruiters = [...recruiterData].sort((a, b) => {
    return b[sortBy] - a[sortBy];
  });

  const handleRecruiterClick = (recruiter) => {
    console.log('Viewing detailed performance for:', recruiter.name);
    // Implementation for detailed recruiter performance view
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
          const badge = getBadgeInfo(recruiter.badge);
          
          return (
            <div
              key={recruiter.id}
              onClick={() => handleRecruiterClick(recruiter)}
              className="flex items-center p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200 cursor-pointer"
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
                  <p className="text-xs text-text-secondary">{recruiter.office}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="hidden md:flex items-center space-x-6 mr-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary">
                    ${(recruiter.revenue / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-text-secondary">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary">{recruiter.placements}</p>
                  <p className="text-xs text-text-secondary">Placements</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary">{recruiter.successRate}%</p>
                  <p className="text-xs text-text-secondary">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary">{recruiter.avgTimeToFill}d</p>
                  <p className="text-xs text-text-secondary">Avg. Fill Time</p>
                </div>
              </div>

              {/* Trend & Action */}
              <div className="flex items-center space-x-3">
                {getTrendIcon(recruiter.trend)}
                <Icon name="ChevronRight" size={16} className="text-secondary-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            ${(sortedRecruiters.reduce((sum, r) => sum + r.revenue, 0) / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-text-secondary">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            {sortedRecruiters.reduce((sum, r) => sum + r.placements, 0)}
          </p>
          <p className="text-xs text-text-secondary">Total Placements</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            {(sortedRecruiters.reduce((sum, r) => sum + r.successRate, 0) / sortedRecruiters.length).toFixed(1)}%
          </p>
          <p className="text-xs text-text-secondary">Avg. Success Rate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">
            {(sortedRecruiters.reduce((sum, r) => sum + r.avgTimeToFill, 0) / sortedRecruiters.length).toFixed(1)}d
          </p>
          <p className="text-xs text-text-secondary">Avg. Fill Time</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProductivityRankings;