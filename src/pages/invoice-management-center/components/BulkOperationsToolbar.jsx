import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkOperationsToolbar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bulkActions = [
    {
      id: 'approve',
      label: 'Approve Selected',
      icon: 'CheckCircle',
      color: 'text-success',
      description: 'Approve all selected invoices for sending'
    },
    {
      id: 'send',
      label: 'Send to Clients',
      icon: 'Send',
      color: 'text-accent',
      description: 'Send approved invoices to clients'
    },
    {
      id: 'download',
      label: 'Download PDFs',
      icon: 'Download',
      color: 'text-primary',
      description: 'Download PDF versions of selected invoices'
    },
    {
      id: 'reminder',
      label: 'Send Reminders',
      icon: 'Mail',
      color: 'text-warning',
      description: 'Send payment reminders for overdue invoices'
    },
    {
      id: 'export',
      label: 'Export to CSV',
      icon: 'FileSpreadsheet',
      color: 'text-secondary-600',
      description: 'Export selected invoice data to CSV'
    },
    {
      id: 'delete',
      label: 'Delete Drafts',
      icon: 'Trash2',
      color: 'text-error',
      description: 'Delete selected draft invoices'
    }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-primary">
              {selectedCount} invoice{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="h-6 w-px bg-primary-200"></div>
          
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <button
              onClick={() => handleActionClick('approve')}
              className="flex items-center space-x-2 px-3 py-1.5 bg-success text-white rounded-md hover:bg-success-700 transition-colors duration-200 text-sm"
            >
              <Icon name="CheckCircle" size={16} />
              <span>Approve</span>
            </button>
            
            <button
              onClick={() => handleActionClick('send')}
              className="flex items-center space-x-2 px-3 py-1.5 bg-accent text-white rounded-md hover:bg-accent-600 transition-colors duration-200 text-sm"
            >
              <Icon name="Send" size={16} />
              <span>Send</span>
            </button>
            
            <button
              onClick={() => handleActionClick('download')}
              className="flex items-center space-x-2 px-3 py-1.5 bg-surface text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200 text-sm"
            >
              <Icon name="Download" size={16} />
              <span>Download</span>
            </button>

            {/* More Actions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-surface text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200 text-sm"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
                <Icon name="ChevronDown" size={14} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-lg shadow-floating z-50">
                  <div className="py-2">
                    {bulkActions.slice(3).map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action.id)}
                        className="w-full flex items-start space-x-3 px-4 py-3 text-left hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <Icon name={action.icon} size={16} className={action.color} />
                        <div>
                          <p className="font-medium text-text-primary text-sm">{action.label}</p>
                          <p className="text-xs text-text-secondary">{action.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onClearSelection}
            className="flex items-center space-x-2 px-3 py-1.5 text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm"
          >
            <Icon name="X" size={16} />
            <span>Clear Selection</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator for Bulk Operations */}
      <div className="mt-4 hidden" id="bulk-progress">
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-primary-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
          </div>
          <span className="text-sm text-primary font-medium">Processing...</span>
        </div>
      </div>

      {/* Click outside handler */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default BulkOperationsToolbar;