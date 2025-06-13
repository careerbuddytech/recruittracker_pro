import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CandidateView = ({ candidates, viewMode, selectedRecords, onRecordSelection }) => {
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-success-100 text-success-700';
      case 'Interviewing': return 'bg-warning-100 text-warning-700';
      case 'Placed': return 'bg-primary-100 text-primary-700';
      case 'Not Available': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getInterviewStatusColor = (status) => {
    switch (status) {
      case 'Passed': return 'bg-success-100 text-success-700';
      case 'Pending': return 'bg-warning-100 text-warning-700';
      case 'Hired': return 'bg-primary-100 text-primary-700';
      case 'Rejected': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  if (viewMode === 'table') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Candidate</span>
                  <Icon name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">Current Role</th>
              <th className="text-left px-4 py-3">Skills</th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Status</span>
                  <Icon name={sortField === 'status' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">Experience</th>
              <th className="text-left px-4 py-3">Salary</th>
              <th className="text-left px-4 py-3">Success Rate</th>
              <th className="w-20 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-secondary-50 transition-colors duration-200">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(candidate.id)}
                    onChange={(e) => onRecordSelection(candidate.id, e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-text-primary">{candidate.name}</p>
                      <p className="text-sm text-text-secondary">{candidate.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{candidate.currentRole}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{candidate.experience}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{candidate.salary}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{candidate.placementSuccess}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200">
                      <Icon name="Edit" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}>
        {sortedCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className={`bg-surface border border-border rounded-lg transition-all duration-200 hover:shadow-elevated ${
              selectedRecords.includes(candidate.id) ? 'ring-2 ring-primary-500 border-primary-500' : ''
            }`}
          >
            {/* Card Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(candidate.id)}
                    onChange={(e) => onRecordSelection(candidate.id, e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <Image
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary">{candidate.name}</h3>
                    <p className="text-sm text-text-secondary">{candidate.currentRole}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                  <button
                    onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                    className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200"
                  >
                    <Icon name={expandedCandidate === candidate.id ? 'ChevronUp' : 'ChevronDown'} size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Contact Info */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={14} className="text-secondary-400" />
                  <span className="text-sm text-text-secondary">{candidate.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-secondary-400" />
                  <span className="text-sm text-text-secondary">{candidate.experience} experience</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-text-primary mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                      +{candidate.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-success">{candidate.placementSuccess}</p>
                  <p className="text-xs text-text-secondary">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">{candidate.salary}</p>
                  <p className="text-xs text-text-secondary">Salary</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-accent">{candidate.availability}</p>
                  <p className="text-xs text-text-secondary">Availability</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {candidate.tags.map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary rounded-md hover:bg-primary-200 transition-colors duration-200">
                    <Icon name="Phone" size={14} />
                    <span className="text-sm">Call</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-accent-100 text-accent rounded-md hover:bg-accent-200 transition-colors duration-200">
                    <Icon name="Mail" size={14} />
                    <span className="text-sm">Email</span>
                  </button>
                </div>
                
                <button className="flex items-center space-x-1 px-3 py-1 bg-success-100 text-success rounded-md hover:bg-success-200 transition-colors duration-200">
                  <Icon name="UserPlus" size={14} />
                  <span className="text-sm">Match</span>
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCandidate === candidate.id && (
              <div className="border-t border-border p-4 bg-secondary-50">
                {/* Interview History */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Recent Interviews</h4>
                  <div className="space-y-2">
                    {candidate.interviews.map((interview, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-surface rounded-md">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{interview.company}</p>
                          <p className="text-xs text-text-secondary">{interview.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getInterviewStatusColor(interview.status)}`}>
                            {interview.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Documents</h4>
                  <div className="space-y-1">
                    {candidate.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-surface rounded-md">
                        <div className="flex items-center space-x-2">
                          <Icon name="FileText" size={14} className="text-secondary-400" />
                          <span className="text-sm text-text-primary">{doc}</span>
                        </div>
                        <button className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200">
                          <Icon name="Download" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Notes</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{candidate.notes}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedCandidates.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No candidates found</h3>
          <p className="text-text-secondary">Try adjusting your search criteria or add a new candidate.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateView;