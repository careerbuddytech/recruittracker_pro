import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkOperations = ({ selectedCount, onBulkAction }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const bulkActions = [
    {
      id: 'mark-paid',
      label: 'Mark as Paid',
      icon: 'CheckCircle',
      color: 'text-success',
      description: 'Mark selected commissions as paid'
    },
    {
      id: 'mark-pending',
      label: 'Mark as Pending',
      icon: 'Clock',
      color: 'text-warning',
      description: 'Mark selected commissions as pending'
    },
    {
      id: 'process-payment',
      label: 'Process Payment',
      icon: 'CreditCard',
      color: 'text-primary',
      description: 'Initiate payment processing for selected commissions'
    },
    {
      id: 'generate-statements',
      label: 'Generate Statements',
      icon: 'FileText',
      color: 'text-accent',
      description: 'Generate commission statements for selected records'
    },
    {
      id: 'export-selected',
      label: 'Export Selected',
      icon: 'Download',
      color: 'text-secondary-600',
      description: 'Export selected commissions to CSV/Excel'
    },
    {
      id: 'bulk-edit',
      label: 'Bulk Edit',
      icon: 'Edit',
      color: 'text-secondary-600',
      description: 'Edit multiple commission records at once'
    },
    {
      id: 'delete-selected',
      label: 'Delete Selected',
      icon: 'Trash2',
      color: 'text-error',
      description: 'Delete selected commission records',
      requiresConfirmation: true
    }
  ];

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setIsDropdownOpen(false);
    
    if (action.requiresConfirmation) {
      setIsConfirmModalOpen(true);
    } else {
      onBulkAction(action.id);
    }
  };

  const handleConfirmAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction.id);
      setIsConfirmModalOpen(false);
      setSelectedAction(null);
    }
  };

  const handleCancelAction = () => {
    setIsConfirmModalOpen(false);
    setSelectedAction(null);
  };

  return (
    <>
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {selectedCount} commission{selectedCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-text-secondary">
                Choose an action to apply to all selected records
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Settings" size={16} />
                <span>Bulk Actions</span>
                <Icon name="ChevronDown" size={14} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-floating z-50">
                  <div className="p-2">
                    {bulkActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <Icon name={action.icon} size={16} className={action.color} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">{action.label}</p>
                          <p className="text-xs text-text-secondary truncate">{action.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onBulkAction('clear-selection')}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-secondary-600 hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={14} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={() => onBulkAction('mark-paid')}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-success-100 text-success-700 rounded-md hover:bg-success-200 transition-colors duration-200"
          >
            <Icon name="CheckCircle" size={12} />
            <span>Mark Paid</span>
          </button>
          
          <button
            onClick={() => onBulkAction('generate-statements')}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-accent-100 text-accent-700 rounded-md hover:bg-accent-200 transition-colors duration-200"
          >
            <Icon name="FileText" size={12} />
            <span>Generate Statements</span>
          </button>
          
          <button
            onClick={() => onBulkAction('export-selected')}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors duration-200"
          >
            <Icon name="Download" size={12} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && selectedAction && (
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-surface border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                <Icon name={selectedAction.icon} size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Confirm Action</h3>
                <p className="text-sm text-text-secondary">This action cannot be undone</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-text-primary mb-2">
                Are you sure you want to <strong>{selectedAction.label.toLowerCase()}</strong> for {selectedCount} selected commission{selectedCount !== 1 ? 's' : ''}?
              </p>
              <p className="text-xs text-text-secondary">
                {selectedAction.description}
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={handleCancelAction}
                className="px-4 py-2 text-sm text-secondary-600 hover:text-text-primary transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error-700 transition-colors duration-200 text-sm font-medium"
              >
                {selectedAction.label}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handler for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default BulkOperations;