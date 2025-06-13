import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkOperations = ({ selectedRecords, activeTab, onAction, onClose }) => {
  const [selectedOperation, setSelectedOperation] = useState('');
  const [operationData, setOperationData] = useState({
    emailTemplate: '',
    status: '',
    tags: [],
    assignTo: '',
    notes: ''
  });

  const clientOperations = [
    { id: 'email', label: 'Send Email Campaign', icon: 'Mail' },
    { id: 'status', label: 'Update Status', icon: 'RefreshCw' },
    { id: 'assign', label: 'Assign to Consultant', icon: 'UserPlus' },
    { id: 'tag', label: 'Add Tags', icon: 'Tag' },
    { id: 'export', label: 'Export Data', icon: 'Download' },
    { id: 'merge', label: 'Merge Duplicates', icon: 'GitMerge' }
  ];

  const candidateOperations = [
    { id: 'email', label: 'Send Email Campaign', icon: 'Mail' },
    { id: 'status', label: 'Update Status', icon: 'RefreshCw' },
    { id: 'match', label: 'Auto-Match to Roles', icon: 'Target' },
    { id: 'tag', label: 'Add Tags', icon: 'Tag' },
    { id: 'export', label: 'Export Data', icon: 'Download' },
    { id: 'archive', label: 'Archive Profiles', icon: 'Archive' }
  ];

  const operations = activeTab === 'clients' ? clientOperations : candidateOperations;

  const emailTemplates = [
    { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to our network' },
    { id: 'follow-up', name: 'Follow-up Email', subject: 'Following up on our conversation' },
    { id: 'newsletter', name: 'Monthly Newsletter', subject: 'Industry insights and opportunities' },
    { id: 'role-alert', name: 'New Role Alert', subject: 'New opportunities matching your profile' }
  ];

  const statusOptions = activeTab === 'clients' 
    ? ['Active', 'Prospect', 'Inactive', 'On Hold']
    : ['Available', 'Interviewing', 'Placed', 'Not Available'];

  const consultants = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com' },
    { id: 2, name: 'Mike Chen', email: 'mike@company.com' },
    { id: 3, name: 'Lisa Rodriguez', email: 'lisa@company.com' }
  ];

  const handleOperationChange = (operationId) => {
    setSelectedOperation(operationId);
    setOperationData({
      emailTemplate: '',
      status: '',
      tags: [],
      assignTo: '',
      notes: ''
    });
  };

  const handleExecute = () => {
    if (!selectedOperation) return;

    const actionData = {
      operation: selectedOperation,
      records: selectedRecords,
      data: operationData
    };

    onAction(actionData);
  };

  const handleTagAdd = (tag) => {
    if (!operationData.tags.includes(tag)) {
      setOperationData({
        ...operationData,
        tags: [...operationData.tags, tag]
      });
    }
  };

  const handleTagRemove = (tag) => {
    setOperationData({
      ...operationData,
      tags: operationData.tags.filter(t => t !== tag)
    });
  };

  return (
    <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-100">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Bulk Operations</h2>
            <p className="text-sm text-text-secondary mt-1">
              Perform actions on {selectedRecords.length} selected {activeTab}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-400 hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Operation Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Select Operation</h3>
            <div className="grid grid-cols-2 gap-3">
              {operations.map((operation) => (
                <button
                  key={operation.id}
                  onClick={() => handleOperationChange(operation.id)}
                  className={`flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 ${
                    selectedOperation === operation.id
                      ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 text-text-primary'
                  }`}
                >
                  <Icon name={operation.icon} size={20} />
                  <span className="text-sm font-medium">{operation.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Operation Configuration */}
          {selectedOperation && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-primary mb-3">Configuration</h3>
              
              {selectedOperation === 'email' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Template
                    </label>
                    <select
                      value={operationData.emailTemplate}
                      onChange={(e) => setOperationData({ ...operationData, emailTemplate: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select template...</option>
                      {emailTemplates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name} - {template.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={operationData.notes}
                      onChange={(e) => setOperationData({ ...operationData, notes: e.target.value })}
                      placeholder="Add personalized message..."
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}

              {selectedOperation === 'status' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    New Status
                  </label>
                  <select
                    value={operationData.status}
                    onChange={(e) => setOperationData({ ...operationData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select status...</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedOperation === 'assign' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Assign to Consultant
                  </label>
                  <select
                    value={operationData.assignTo}
                    onChange={(e) => setOperationData({ ...operationData, assignTo: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select consultant...</option>
                    {consultants.map((consultant) => (
                      <option key={consultant.id} value={consultant.id}>
                        {consultant.name} ({consultant.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedOperation === 'tag' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Add Tags
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {['High Priority', 'VIP Client', 'Remote', 'Senior Level', 'Contract', 'Urgent'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagAdd(tag)}
                          className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors duration-200"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                    
                    {operationData.tags.length > 0 && (
                      <div>
                        <p className="text-sm text-text-secondary mb-2">Selected tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {operationData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary rounded-full text-sm"
                            >
                              <span>{tag}</span>
                              <button
                                onClick={() => handleTagRemove(tag)}
                                className="text-primary hover:text-primary-700"
                              >
                                <Icon name="X" size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(selectedOperation === 'export' || selectedOperation === 'match' || selectedOperation === 'merge' || selectedOperation === 'archive') && (
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={20} className="text-accent mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-1">
                        {selectedOperation === 'export' && 'Export Configuration'}
                        {selectedOperation === 'match' && 'Auto-Match Settings'}
                        {selectedOperation === 'merge' && 'Merge Duplicates'}
                        {selectedOperation === 'archive' && 'Archive Confirmation'}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {selectedOperation === 'export' && 'Data will be exported in CSV format with all available fields.'}
                        {selectedOperation === 'match' && 'Candidates will be automatically matched to open roles based on skills and preferences.'}
                        {selectedOperation === 'merge' && 'Duplicate records will be identified and merged based on email and name similarity.'}
                        {selectedOperation === 'archive' && 'Selected records will be moved to archive and marked as inactive.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {selectedOperation && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-primary mb-3">Preview</h3>
              <div className="bg-secondary-50 rounded-lg p-4">
                <p className="text-sm text-text-secondary">
                  This operation will affect <strong>{selectedRecords.length}</strong> {activeTab}.
                  {selectedOperation === 'email' && operationData.emailTemplate && (
                    <span> Email template "{emailTemplates.find(t => t.id === operationData.emailTemplate)?.name}" will be sent.</span>
                  )}
                  {selectedOperation === 'status' && operationData.status && (
                    <span> Status will be changed to "{operationData.status}".</span>
                  )}
                  {selectedOperation === 'assign' && operationData.assignTo && (
                    <span> Records will be assigned to {consultants.find(c => c.id === parseInt(operationData.assignTo))?.name}.</span>
                  )}
                  {selectedOperation === 'tag' && operationData.tags.length > 0 && (
                    <span> Tags "{operationData.tags.join(', ')}" will be added.</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            {selectedRecords.length} {activeTab} selected
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-secondary-700 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleExecute}
              disabled={!selectedOperation}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedOperation
                  ? 'bg-primary text-white hover:bg-primary-700' :'bg-secondary-100 text-secondary-400 cursor-not-allowed'
              }`}
            >
              Execute Operation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOperations;