import React from 'react';
import Icon from 'components/AppIcon';

const InvoiceGrid = ({ 
  invoices, 
  selectedInvoices, 
  onInvoiceSelect, 
  onSelectAll, 
  onInvoiceClick,
  viewMode 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-700';
      case 'sent':
        return 'bg-accent-100 text-accent-700';
      case 'overdue':
        return 'bg-error-100 text-error-700';
      case 'pending_approval':
        return 'bg-warning-100 text-warning-700';
      case 'draft':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return 'CheckCircle';
      case 'sent':
        return 'Send';
      case 'overdue':
        return 'AlertTriangle';
      case 'pending_approval':
        return 'Clock';
      case 'draft':
        return 'Edit';
      default:
        return 'FileText';
    }
  };

  const getIntegrationStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'not_synced':
        return 'text-secondary-400';
      default:
        return 'text-secondary-400';
    }
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.length === invoices.length && invoices.length > 0}
                    onChange={onSelectAll}
                    className="rounded border-border focus:ring-primary-500"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Invoice #</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Client</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Issue Date</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Due Date</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Integration</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-secondary-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => onInvoiceClick(invoice)}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => onInvoiceSelect(invoice.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-border focus:ring-primary-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-text-primary">{invoice.id}</div>
                    <div className="text-sm text-text-secondary">{invoice.consultant}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-text-primary">{invoice.clientName}</div>
                    <div className="text-sm text-text-secondary">{invoice.candidateName}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-text-primary">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </div>
                    <div className="text-sm text-text-secondary">{invoice.feePercentage}% fee</div>
                  </td>
                  <td className="p-4 text-text-primary">{formatDate(invoice.issueDate)}</td>
                  <td className="p-4">
                    <div className="text-text-primary">{formatDate(invoice.dueDate)}</div>
                    {invoice.overdueDays > 0 && (
                      <div className="text-sm text-error">{invoice.overdueDays} days overdue</div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      <Icon name={getStatusIcon(invoice.status)} size={12} className="mr-1" />
                      {invoice.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <Icon 
                      name="Zap" 
                      size={16} 
                      className={getIntegrationStatusColor(invoice.integrationStatus)} 
                      title={`Integration: ${invoice.integrationStatus}`}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit invoice:', invoice.id);
                        }}
                        className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Download invoice:', invoice.id);
                        }}
                        className="p-1 text-secondary-400 hover:text-primary transition-colors duration-200"
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
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          onClick={() => onInvoiceClick(invoice)}
          className={`bg-surface border rounded-lg p-6 hover:shadow-elevated transition-all duration-200 cursor-pointer ${
            selectedInvoices.includes(invoice.id) ? 'border-primary bg-primary-50' : 'border-border'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedInvoices.includes(invoice.id)}
                onChange={() => onInvoiceSelect(invoice.id)}
                onClick={(e) => e.stopPropagation()}
                className="rounded border-border focus:ring-primary-500"
              />
              <div>
                <h3 className="font-semibold text-text-primary">{invoice.id}</h3>
                <p className="text-sm text-text-secondary">{invoice.clientName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon 
                name="Zap" 
                size={16} 
                className={getIntegrationStatusColor(invoice.integrationStatus)} 
                title={`Integration: ${invoice.integrationStatus}`}
              />
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                <Icon name={getStatusIcon(invoice.status)} size={12} className="mr-1" />
                {invoice.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-text-secondary">Amount</p>
              <p className="font-semibold text-text-primary">
                {formatCurrency(invoice.amount, invoice.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Due Date</p>
              <p className="font-medium text-text-primary">{formatDate(invoice.dueDate)}</p>
              {invoice.overdueDays > 0 && (
                <p className="text-sm text-error">{invoice.overdueDays} days overdue</p>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Candidate</p>
                <p className="font-medium text-text-primary">{invoice.candidateName}</p>
                <p className="text-xs text-text-secondary">{invoice.roleName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit invoice:', invoice.id);
                  }}
                  className="p-2 text-secondary-400 hover:text-primary hover:bg-secondary-100 rounded-md transition-colors duration-200"
                >
                  <Icon name="Edit" size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Download invoice:', invoice.id);
                  }}
                  className="p-2 text-secondary-400 hover:text-primary hover:bg-secondary-100 rounded-md transition-colors duration-200"
                >
                  <Icon name="Download" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceGrid;