import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UserDetailsGrid = ({ users, selectedUsers, onUserSelect, onSelectAll, onEditUser, currentView }) => {
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

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'lastLogin') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success-100', text: 'text-success-700', label: 'Active' },
      inactive: { bg: 'bg-secondary-100', text: 'text-secondary-700', label: 'Inactive' },
      suspended: { bg: 'bg-warning-100', text: 'text-warning-700', label: 'Suspended' }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getPermissionSummary = (permissions) => {
    if (permissions.includes('full_access')) return 'Full Access';
    if (permissions.length > 3) return `${permissions.length} permissions`;
    return permissions.slice(0, 2).join(', ') + (permissions.length > 2 ? '...' : '');
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      onClick={() => handleSort(field)}
      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50 transition-colors duration-200"
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <Icon 
            name={sortDirection === 'asc' ? "ChevronUp" : "ChevronDown"} 
            size={14} 
            className="text-primary" 
          />
        )}
      </div>
    </th>
  );

  if (currentView === 'tree') {
    return (
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">User Hierarchy</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {sortedUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onUserSelect(user.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-text-primary">{user.name}</h4>
                    {getStatusBadge(user.status)}
                    {user.securityFlags.includes('mfa_enabled') && (
                      <Icon name="Shield" size={16} className="text-success" />
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{user.email}</p>
                  <p className="text-sm text-text-secondary">{user.role} • {user.department}</p>
                </div>
                <button
                  onClick={() => onEditUser(user)}
                  className="p-2 text-secondary-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  <Icon name="Edit" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">User Details</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">
              {selectedUsers.length > 0 && `${selectedUsers.length} selected • `}
              {users.length} total users
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
              </th>
              <SortableHeader field="name">User</SortableHeader>
              <SortableHeader field="role">Role</SortableHeader>
              <SortableHeader field="department">Department</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="lastLogin">Last Login</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Security
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {sortedUsers.map(user => (
              <tr key={user.id} className="hover:bg-secondary-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onUserSelect(user.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{user.name}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text-primary">{user.role}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text-primary">{user.department}</p>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-text-primary">{formatLastLogin(user.lastLogin)}</p>
                    {user.sessionCount > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary">
                        {user.sessionCount} active
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text-primary">{getPermissionSummary(user.permissions)}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {user.securityFlags.includes('mfa_enabled') && (
                      <Icon name="Shield" size={16} className="text-success" title="MFA Enabled" />
                    )}
                    {user.securityFlags.includes('admin_access') && (
                      <Icon name="Key" size={16} className="text-warning" title="Admin Access" />
                    )}
                    {user.securityFlags.includes('account_locked') && (
                      <Icon name="Lock" size={16} className="text-error" title="Account Locked" />
                    )}
                    {user.failedLogins > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-error-100 text-error">
                        {user.failedLogins} failed
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-1 text-secondary-400 hover:text-primary hover:bg-primary-50 rounded transition-colors duration-200"
                      title="Edit User"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      className="p-1 text-secondary-400 hover:text-accent hover:bg-accent-50 rounded transition-colors duration-200"
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      className="p-1 text-secondary-400 hover:text-error hover:bg-error-50 rounded transition-colors duration-200"
                      title="More Actions"
                    >
                      <Icon name="MoreVertical" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No users found</h3>
          <p className="text-text-secondary">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsGrid;