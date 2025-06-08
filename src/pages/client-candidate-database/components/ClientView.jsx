import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ClientView = ({ clients, viewMode, selectedRecords, onRecordSelection }) => {
  const [expandedClient, setExpandedClient] = useState(null);
  const [sortField, setSortField] = useState('companyName');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
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
      case 'Active': return 'bg-success-100 text-success-700';
      case 'Prospect': return 'bg-warning-100 text-warning-700';
      case 'Inactive': return 'bg-secondary-100 text-secondary-700';
      case 'On Hold': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getRelationshipColor = (relationship) => {
    switch (relationship) {
      case 'Strategic Partner': return 'bg-primary-100 text-primary-700';
      case 'Regular Client': return 'bg-accent-100 text-accent-700';
      case 'New Client': return 'bg-success-100 text-success-700';
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
                  onClick={() => handleSort('companyName')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Company</span>
                  <Icon name={sortField === 'companyName' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('industry')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Industry</span>
                  <Icon name={sortField === 'industry' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Status</span>
                  <Icon name={sortField === 'status' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">Active Roles</th>
              <th className="text-left px-4 py-3">Total Revenue</th>
              <th className="text-left px-4 py-3">Last Contact</th>
              <th className="w-20 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedClients.map((client) => (
              <tr key={client.id} className="hover:bg-secondary-50 transition-colors duration-200">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(client.id)}
                    onChange={(e) => onRecordSelection(client.id, e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={client.companyLogo}
                      alt={client.companyName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-text-primary">{client.companyName}</p>
                      <p className="text-sm text-text-secondary">{client.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{client.industry}</span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{client.contactPerson}</p>
                    <p className="text-sm text-text-secondary">{client.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{client.activeRoles}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-text-primary">{client.billingHistory}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">{client.lastContact}</span>
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
        {sortedClients.map((client) => (
          <div
            key={client.id}
            className={`bg-surface border border-border rounded-lg transition-all duration-200 hover:shadow-elevated ${
              selectedRecords.includes(client.id) ? 'ring-2 ring-primary-500 border-primary-500' : ''
            }`}
          >
            {/* Card Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(client.id)}
                    onChange={(e) => onRecordSelection(client.id, e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <Image
                    src={client.companyLogo}
                    alt={client.companyName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary">{client.companyName}</h3>
                    <p className="text-sm text-text-secondary">{client.industry}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                  <button
                    onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
                    className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200"
                  >
                    <Icon name={expandedClient === client.id ? 'ChevronUp' : 'ChevronDown'} size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Primary Contact */}
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={client.avatar}
                  alt={client.contactPerson}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-text-primary">{client.contactPerson}</p>
                  <p className="text-sm text-text-secondary">{client.email}</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">{client.activeRoles}</p>
                  <p className="text-xs text-text-secondary">Active Roles</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-success">{client.totalPlacements}</p>
                  <p className="text-xs text-text-secondary">Placements</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-accent">{client.billingHistory}</p>
                  <p className="text-xs text-text-secondary">Revenue</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRelationshipColor(client.relationship)}`}>
                  {client.relationship}
                </span>
                {client.tags.map((tag, index) => (
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
                
                <p className="text-xs text-text-secondary">
                  Last contact: {client.lastContact}
                </p>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedClient === client.id && (
              <div className="border-t border-border p-4 bg-secondary-50">
                {/* Company Hierarchy */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Contact Hierarchy</h4>
                  <div className="space-y-2">
                    {client.hierarchy.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-surface rounded-md">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{contact.name}</p>
                          <p className="text-xs text-text-secondary">{contact.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {contact.primary && (
                            <span className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">Primary</span>
                          )}
                          <button className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200">
                            <Icon name="Mail" size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Notes</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{client.notes}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedClients.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building2" size={48} className="text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No clients found</h3>
          <p className="text-text-secondary">Try adjusting your search criteria or add a new client.</p>
        </div>
      )}
    </div>
  );
};

export default ClientView;