import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CommissionGrid = ({ 
  commissions, 
  onSelectCommission, 
  onSelectAll, 
  selectedCommissions = [], 
  showSelectAll = false 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'createdDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'processing':
        return 'bg-accent-100 text-accent-700';
      case 'disputed':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'processing':
        return 'Loader';
      case 'disputed':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'executive':
        return 'bg-purple-100 text-purple-700';
      case 'senior':
        return 'bg-blue-100 text-blue-700';
      case 'standard':
        return 'bg-green-100 text-green-700';
      case 'junior':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedCommissions = [...commissions].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedCommissions = sortedCommissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedCommissions.length / itemsPerPage);

  const SortableHeader = ({ label, sortKey, className = "" }) => (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50 transition-colors duration-200 ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <Icon 
          name={sortConfig.key === sortKey && sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
          size={14} 
          className={`${sortConfig.key === sortKey ? 'text-primary' : 'text-secondary-400'}`}
        />
      </div>
    </th>
  );

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Commission Records</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">
              {sortedCommissions.length} total records
            </span>
            {selectedCommissions.length > 0 && (
              <span className="text-sm text-primary font-medium">
                {selectedCommissions.length} selected
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary-50">
            <tr>
              {showSelectAll && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCommissions.length === commissions.length && commissions.length > 0}
                    onChange={onSelectAll}
                    className="rounded border-border text-primary focus:ring-primary-500"
                  />
                </th>
              )}
              <SortableHeader label="Commission ID" sortKey="id" />
              <SortableHeader label="Recruiter" sortKey="recruiter" />
              <SortableHeader label="Client" sortKey="client" />
              <SortableHeader label="Role" sortKey="role" />
              <SortableHeader label="Placement Value" sortKey="placementValue" />
              <SortableHeader label="Commission" sortKey="commissionAmount" />
              <SortableHeader label="Rate" sortKey="commissionRate" />
              <SortableHeader label="Status" sortKey="paymentStatus" />
              <SortableHeader label="Tier" sortKey="tier" />
              <SortableHeader label="Date" sortKey="createdDate" />
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {paginatedCommissions.map((commission) => (
              <tr key={commission.id} className="hover:bg-secondary-50 transition-colors duration-200">
                {showSelectAll && (
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCommissions.includes(commission.id)}
                      onChange={() => onSelectCommission(commission.id)}
                      className="rounded border-border text-primary focus:ring-primary-500"
                    />
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{commission.id}</div>
                  <div className="text-sm text-text-secondary">{commission.placementId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{commission.recruiter}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary">{commission.client}</div>
                  <div className="text-sm text-text-secondary">{commission.candidate}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary max-w-xs truncate">{commission.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">
                    ${commission.placementValue.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-primary">
                    ${commission.commissionAmount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary">{commission.commissionRate}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.paymentStatus)}`}>
                    <Icon name={getStatusIcon(commission.paymentStatus)} size={12} className="mr-1" />
                    {commission.paymentStatus.charAt(0).toUpperCase() + commission.paymentStatus.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(commission.tier)}`}>
                    {commission.tier.charAt(0).toUpperCase() + commission.tier.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary">
                    {new Date(commission.createdDate).toLocaleDateString()}
                  </div>
                  {commission.paymentDate && (
                    <div className="text-sm text-text-secondary">
                      Paid: {new Date(commission.paymentDate).toLocaleDateString()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-primary hover:text-primary-700 transition-colors duration-200"
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      className="text-secondary-600 hover:text-text-primary transition-colors duration-200"
                      title="Edit"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      className="text-secondary-600 hover:text-text-primary transition-colors duration-200"
                      title="Download Statement"
                    >
                      <Icon name="Download" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedCommissions.length)} of {sortedCommissions.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:border-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded-md text-sm transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-primary text-white border-primary' :'border-border text-text-secondary hover:text-text-primary hover:border-secondary-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:border-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionGrid;