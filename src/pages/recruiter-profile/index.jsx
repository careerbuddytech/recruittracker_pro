import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import { getRecruiterById } from 'data/recruiters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const RecruiterProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recruiter = getRecruiterById(parseInt(id));
  const [activeTab, setActiveTab] = useState('overview');

  if (!recruiter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="UserX" size={48} className="text-secondary-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">Recruiter Not Found</h2>
          <p className="text-text-secondary mb-4">The requested recruiter profile could not be found.</p>
          <button
            onClick={() => navigate('/executive-dashboard')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'User' },
    { id: 'performance', name: 'Performance', icon: 'TrendingUp' },
    { id: 'goals', name: 'Goals & Development', icon: 'Target' },
    { id: 'feedback', name: 'Client Feedback', icon: 'MessageSquare' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'inactive':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTenure = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    
    return `${diffYears} years, ${diffMonths} months`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-secondary-600 hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                <Icon name="MessageCircle" size={16} />
                <span>Message</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Edit" size={16} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Header */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <img
                  src={recruiter.avatar}
                  alt={recruiter.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-elevated"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-text-primary mb-1">{recruiter.name}</h1>
                    <p className="text-lg text-text-secondary">{recruiter.role}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(recruiter.status)}`}>
                        {recruiter.status.charAt(0).toUpperCase() + recruiter.status.slice(1)}
                      </span>
                      {recruiter.teamLead && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary">
                          Team Lead
                        </span>
                      )}
                      {recruiter.performanceMetrics.badge && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-700">
                          {recruiter.performanceMetrics.badge.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-primary">
                      ${(recruiter.performanceMetrics.revenue / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-text-secondary">Annual Revenue</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-text-secondary">Department</div>
                    <div className="font-medium text-text-primary">{recruiter.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Office</div>
                    <div className="font-medium text-text-primary">{recruiter.office}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Start Date</div>
                    <div className="font-medium text-text-primary">{formatDate(recruiter.startDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Tenure</div>
                    <div className="font-medium text-text-primary">{calculateTenure(recruiter.startDate)}</div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">{recruiter.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                }`}
              >
                <Icon name={tab.icon} size={16} className="inline mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Performance Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{recruiter.performanceMetrics.placements}</div>
                      <div className="text-sm text-text-secondary">Placements</div>
                    </div>
                    <div className="text-center p-4 bg-success-50 rounded-lg">
                      <div className="text-2xl font-bold text-success">{recruiter.performanceMetrics.successRate}%</div>
                      <div className="text-sm text-text-secondary">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-accent-50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{recruiter.performanceMetrics.avgTimeToFill}d</div>
                      <div className="text-sm text-text-secondary">Avg. Time to Fill</div>
                    </div>
                    <div className="text-center p-4 bg-warning-50 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{recruiter.performanceMetrics.clientSatisfaction}%</div>
                      <div className="text-sm text-text-secondary">Client Satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {recruiter.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Skills Assessment</h3>
                  <div className="space-y-4">
                    {recruiter.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                          <span className="text-sm text-text-secondary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                {/* Revenue Trend */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={recruiter.performanceMetrics.historicalRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
                        <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                        <Line type="monotone" dataKey="revenue" stroke="#1E3A8A" strokeWidth={3} dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quarterly Performance */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">2024 Quarterly Performance</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={recruiter.performanceMetrics.quarterlyMetrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="quarter" stroke="#64748B" fontSize={12} />
                        <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                        <Bar dataKey="revenue" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-6">
                {/* Current Goals */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Current Goals</h3>
                  <div className="space-y-4">
                    {recruiter.goals.map((goal, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-text-primary">{goal.description}</h4>
                          <span className="text-sm text-text-secondary">{goal.progress}%</span>
                        </div>
                        <div className="mb-2">
                          <div className="w-full bg-secondary-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                goal.progress >= 90 ? 'bg-success' : goal.progress >= 70 ? 'bg-primary' : 'bg-warning'
                              }`}
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-text-secondary">
                          <span>Target: {typeof goal.target === 'number' ? goal.target.toLocaleString() : goal.target}</span>
                          <span>Deadline: {formatDate(goal.deadline)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {recruiter.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium text-text-primary">{cert.name}</h4>
                          <p className="text-sm text-text-secondary">{cert.institution}</p>
                          <p className="text-xs text-text-secondary">Issued: {formatDate(cert.date)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {cert.validUntil ? (
                            <span className="text-xs text-text-secondary">
                              Valid until: {formatDate(cert.validUntil)}
                            </span>
                          ) : (
                            <span className="text-xs text-success">No expiration</span>
                          )}
                          <Icon name="Award" size={20} className="text-warning" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="space-y-6">
                {/* Client Feedback */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Client Feedback</h3>
                  <div className="space-y-4">
                    {recruiter.clientFeedback.map((feedback, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-text-primary">{feedback.client}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={i < feedback.rating ? 'text-warning fill-current' : 'text-secondary-300'} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-text-secondary leading-relaxed">{feedback.feedback}</p>
                        <p className="text-xs text-text-secondary mt-2">{formatDate(feedback.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-secondary-400" />
                  <a href={`mailto:${recruiter.email}`} className="text-primary hover:text-primary-700">
                    {recruiter.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-secondary-400" />
                  <a href={`tel:${recruiter.phone}`} className="text-primary hover:text-primary-700">
                    {recruiter.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-secondary-400" />
                  <span className="text-text-secondary">{recruiter.office}</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Education</h3>
              <div className="space-y-4">
                {recruiter.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-text-primary">{edu.degree}</h4>
                    <p className="text-sm text-text-secondary">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-text-secondary">{edu.year}</span>
                      <span className="text-xs text-success font-medium">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages & Territories */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Languages & Territories</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Languages</h4>
                  <div className="space-y-1">
                    {recruiter.languages.map((language, index) => (
                      <span key={index} className="block text-sm text-text-secondary">{language}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Territories</h4>
                  <div className="flex flex-wrap gap-1">
                    {recruiter.territories.map((territory, index) => (
                      <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                        {territory}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;