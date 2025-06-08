import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ActionPanel = ({ selectedInvoice, onClose }) => {
  const [activeTab, setActiveTab] = useState('preview');

  if (!selectedInvoice) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No Invoice Selected</h3>
          <p className="text-text-secondary">
            Select an invoice from the grid to view details, approval history, and payment tracking.
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const mockApprovalHistory = [
    {
      id: 1,
      action: 'Created',
      user: selectedInvoice.consultant,
      timestamp: selectedInvoice.issueDate,
      notes: 'Invoice created from placement'
    },
    {
      id: 2,
      action: 'Approved',
      user: selectedInvoice.approvedBy,
      timestamp: selectedInvoice.approvalDate,
      notes: 'Approved for sending to client'
    }
  ];

  const mockPaymentHistory = [
    {
      id: 1,
      date: selectedInvoice.paymentDate,
      amount: selectedInvoice.amount,
      method: 'Bank Transfer',
      reference: 'TXN-2024-001234',
      status: selectedInvoice.status === 'paid' ? 'completed' : 'pending'
    }
  ];

  const tabs = [
    { id: 'preview', label: 'Preview', icon: 'Eye' },
    { id: 'approval', label: 'Approval History', icon: 'CheckSquare' },
    { id: 'payment', label: 'Payment Tracking', icon: 'CreditCard' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Invoice Details</h3>
        <button
          onClick={onClose}
          className="p-1 text-secondary-400 hover:text-text-primary transition-colors duration-200"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} className="inline mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'preview' && (
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-semibold text-text-primary">{selectedInvoice.id}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusColor(selectedInvoice.status)}`}>
                  {selectedInvoice.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-text-primary">
                  {formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}
                </p>
                <p className="text-sm text-text-secondary">{selectedInvoice.feePercentage}% placement fee</p>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-secondary-50 rounded-lg p-4">
              <h5 className="font-medium text-text-primary mb-3">Bill To</h5>
              <div className="space-y-2">
                <p className="font-medium text-text-primary">{selectedInvoice.clientName}</p>
                <p className="text-sm text-text-secondary">Client ID: {selectedInvoice.clientId}</p>
                <p className="text-sm text-text-secondary">Payment Terms: {selectedInvoice.paymentTerms}</p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-secondary">Issue Date</p>
                <p className="font-medium text-text-primary">{formatDate(selectedInvoice.issueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Due Date</p>
                <p className="font-medium text-text-primary">{formatDate(selectedInvoice.dueDate)}</p>
                {selectedInvoice.overdueDays > 0 && (
                  <p className="text-sm text-error">{selectedInvoice.overdueDays} days overdue</p>
                )}
              </div>
            </div>

            {/* Placement Details */}
            <div className="border-t border-border pt-4">
              <h5 className="font-medium text-text-primary mb-3">Placement Details</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Candidate:</span>
                  <span className="font-medium text-text-primary">{selectedInvoice.candidateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Role:</span>
                  <span className="font-medium text-text-primary">{selectedInvoice.roleName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Consultant:</span>
                  <span className="font-medium text-text-primary">{selectedInvoice.consultant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Placement ID:</span>
                  <span className="font-medium text-text-primary">{selectedInvoice.placementId}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedInvoice.notes && (
              <div className="border-t border-border pt-4">
                <h5 className="font-medium text-text-primary mb-2">Notes</h5>
                <p className="text-text-secondary text-sm">{selectedInvoice.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-border pt-4 space-y-3">
              <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Send" size={16} className="inline mr-2" />
                Send Invoice
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-secondary-100 text-secondary-700 py-2 px-4 rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                  <Icon name="Edit" size={16} className="inline mr-2" />
                  Edit
                </button>
                <button className="bg-secondary-100 text-secondary-700 py-2 px-4 rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                  <Icon name="Download" size={16} className="inline mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'approval' && (
          <div className="space-y-4">
            <h5 className="font-medium text-text-primary">Approval Timeline</h5>
            <div className="space-y-4">
              {mockApprovalHistory.map((entry) => (
                <div key={entry.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-text-primary">{entry.action}</p>
                      <p className="text-sm text-text-secondary">{formatDate(entry.timestamp)}</p>
                    </div>
                    <p className="text-sm text-text-secondary">by {entry.user}</p>
                    {entry.notes && (
                      <p className="text-sm text-text-secondary mt-1">{entry.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h5 className="font-medium text-text-primary">Payment History</h5>
            {selectedInvoice.status === 'paid' ? (
              <div className="space-y-4">
                {mockPaymentHistory.map((payment) => (
                  <div key={payment.id} className="bg-success-50 border border-success-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-success-700">Payment Received</span>
                      <span className="text-sm text-success-600">{formatDate(payment.date)}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-success-600">Amount:</span>
                        <span className="font-medium text-success-700">
                          {formatCurrency(payment.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-success-600">Method:</span>
                        <span className="text-sm text-success-700">{payment.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-success-600">Reference:</span>
                        <span className="text-sm text-success-700">{payment.reference}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Clock" size={48} className="text-secondary-300 mx-auto mb-4" />
                <h6 className="font-medium text-text-primary mb-2">Payment Pending</h6>
                <p className="text-text-secondary text-sm">
                  {selectedInvoice.status === 'overdue' 
                    ? `Payment is ${selectedInvoice.overdueDays} days overdue`
                    : 'Waiting for payment from client'
                  }
                </p>
                {selectedInvoice.status === 'overdue' && (
                  <button className="mt-4 bg-warning text-white py-2 px-4 rounded-lg hover:bg-warning-700 transition-colors duration-200">
                    <Icon name="Mail" size={16} className="inline mr-2" />
                    Send Reminder
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionPanel;