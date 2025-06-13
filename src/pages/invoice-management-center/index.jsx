import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import InvoiceGrid from './components/InvoiceGrid';
import ActionPanel from './components/ActionPanel';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';
import FilterPanel from './components/FilterPanel';

const InvoiceManagementCenter = () => {
  const navigate = useNavigate();
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    client: 'all',
    dateRange: 'all',
    amountRange: 'all'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock invoice data
  const invoices = [
    {
      id: 'INV-2024-001',
      clientId: 'CL001',
      clientName: 'TechCorp Solutions',
      amount: 25000,
      currency: 'USD',
      issueDate: '2024-01-15',
      dueDate: '2024-02-14',
      status: 'paid',
      paymentDate: '2024-02-10',
      overdueDays: 0,
      placementId: 'PL001',
      candidateName: 'John Smith',
      roleName: 'Senior Software Engineer',
      feePercentage: 20,
      consultant: 'Sarah Johnson',
      approvedBy: 'Michael Chen',
      approvalDate: '2024-01-16',
      paymentTerms: 'Net 30',
      notes: 'Standard placement fee for senior role',
      integrationStatus: 'synced',
      lastSyncDate: '2024-02-10T14:30:00Z'
    },
    {
      id: 'INV-2024-002',
      clientId: 'CL002',
      clientName: 'Global Finance Ltd',
      amount: 18500,
      currency: 'USD',
      issueDate: '2024-01-20',
      dueDate: '2024-02-19',
      status: 'overdue',
      paymentDate: null,
      overdueDays: 5,
      placementId: 'PL002',
      candidateName: 'Emily Davis',
      roleName: 'Financial Analyst',
      feePercentage: 18,
      consultant: 'David Wilson',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-01-21',
      paymentTerms: 'Net 30',
      notes: 'Follow up required for payment',
      integrationStatus: 'pending',
      lastSyncDate: '2024-01-21T09:15:00Z'
    },
    {
      id: 'INV-2024-003',
      clientId: 'CL003',
      clientName: 'Healthcare Innovations',
      amount: 32000,
      currency: 'USD',
      issueDate: '2024-01-25',
      dueDate: '2024-02-24',
      status: 'pending_approval',
      paymentDate: null,
      overdueDays: 0,
      placementId: 'PL003',
      candidateName: 'Robert Brown',
      roleName: 'Medical Director',
      feePercentage: 25,
      consultant: 'Lisa Anderson',
      approvedBy: null,
      approvalDate: null,
      paymentTerms: 'Net 30',
      notes: 'High-value placement requiring director approval',
      integrationStatus: 'not_synced',
      lastSyncDate: null
    },
    {
      id: 'INV-2024-004',
      clientId: 'CL001',
      clientName: 'TechCorp Solutions',
      amount: 22000,
      currency: 'USD',
      issueDate: '2024-02-01',
      dueDate: '2024-03-02',
      status: 'sent',
      paymentDate: null,
      overdueDays: 0,
      placementId: 'PL004',
      candidateName: 'Jennifer Wilson',
      roleName: 'Product Manager',
      feePercentage: 20,
      consultant: 'Michael Rodriguez',
      approvedBy: 'Sarah Johnson',
      approvalDate: '2024-02-02',
      paymentTerms: 'Net 30',
      notes: 'Second placement for this client',
      integrationStatus: 'synced',
      lastSyncDate: '2024-02-02T11:45:00Z'
    },
    {
      id: 'INV-2024-005',
      clientId: 'CL004',
      clientName: 'Manufacturing Corp',
      amount: 15000,
      currency: 'USD',
      issueDate: '2024-02-05',
      dueDate: '2024-03-07',
      status: 'draft',
      paymentDate: null,
      overdueDays: 0,
      placementId: 'PL005',
      candidateName: 'Mark Thompson',
      roleName: 'Operations Manager',
      feePercentage: 15,
      consultant: 'Anna Garcia',
      approvedBy: null,
      approvalDate: null,
      paymentTerms: 'Net 30',
      notes: 'Draft pending final review',
      integrationStatus: 'not_synced',
      lastSyncDate: null
    }
  ];

  // Filter invoices based on current filters
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = invoice.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                           invoice.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
                           invoice.candidateName.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || invoice.status === filters.status;
      const matchesClient = filters.client === 'all' || invoice.clientId === filters.client;
      
      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [invoices, filters]);

  const handleInvoiceSelect = (invoiceId) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.id));
    }
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on invoices:`, selectedInvoices);
    // Handle bulk actions
    setSelectedInvoices([]);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getStatusCounts = () => {
    return {
      total: invoices.length,
      draft: invoices.filter(inv => inv.status === 'draft').length,
      pending_approval: invoices.filter(inv => inv.status === 'pending_approval').length,
      sent: invoices.filter(inv => inv.status === 'sent').length,
      paid: invoices.filter(inv => inv.status === 'paid').length,
      overdue: invoices.filter(inv => inv.status === 'overdue').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary mb-2">Invoice Management Center</h1>
              <p className="text-text-secondary">
                Streamline billing operations with automated invoice generation, approval workflows, and payment tracking
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  showFilters 
                    ? 'bg-primary text-white border-primary' :'bg-surface text-text-primary border-border hover:bg-secondary-50'
                }`}
              >
                <Icon name="Filter" size={16} className="inline mr-2" />
                Filters
              </button>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                <Icon name={viewMode === 'grid' ? 'List' : 'Grid'} size={16} className="inline mr-2" />
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
              
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Plus" size={16} className="inline mr-2" />
                Create Invoice
              </button>
            </div>
          </div>

          {/* Status Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total</p>
                  <p className="text-2xl font-semibold text-text-primary">{statusCounts.total}</p>
                </div>
                <Icon name="FileText" size={20} className="text-secondary-400" />
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Draft</p>
                  <p className="text-2xl font-semibold text-text-primary">{statusCounts.draft}</p>
                </div>
                <Icon name="Edit" size={20} className="text-warning" />
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Pending</p>
                  <p className="text-2xl font-semibold text-text-primary">{statusCounts.pending_approval}</p>
                </div>
                <Icon name="Clock" size={20} className="text-warning" />
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Sent</p>
                  <p className="text-2xl font-semibold text-text-primary">{statusCounts.sent}</p>
                </div>
                <Icon name="Send" size={20} className="text-accent" />
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Paid</p>
                  <p className="text-2xl font-semibold text-text-primary">{statusCounts.paid}</p>
                </div>
                <Icon name="CheckCircle" size={20} className="text-success" />
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Overdue</p>
                  <p className="text-2xl font-semibold text-text-primary">{statusCounts.overdue}</p>
                </div>
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            invoices={invoices}
          />
        )}

        {/* Bulk Operations Toolbar */}
        {selectedInvoices.length > 0 && (
          <BulkOperationsToolbar
            selectedCount={selectedInvoices.length}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedInvoices([])}
          />
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-6">
          {/* Invoice Grid - 70% */}
          <div className="xl:col-span-7">
            <InvoiceGrid
              invoices={filteredInvoices}
              selectedInvoices={selectedInvoices}
              onInvoiceSelect={handleInvoiceSelect}
              onSelectAll={handleSelectAll}
              onInvoiceClick={handleInvoiceClick}
              viewMode={viewMode}
            />
          </div>

          {/* Action Panel - 30% */}
          <div className="xl:col-span-3">
            <ActionPanel
              selectedInvoice={selectedInvoice}
              onClose={() => setSelectedInvoice(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagementCenter;