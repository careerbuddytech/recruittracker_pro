import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import CalculationEngine from './components/CalculationEngine';
import CommissionGrid from './components/CommissionGrid';
import CommissionFilters from './components/CommissionFilters';
import BulkOperations from './components/BulkOperations';

const CommissionCalculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedCommissions, setSelectedCommissions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    recruiter: 'all',
    paymentStatus: 'all',
    commissionTier: 'all',
    searchQuery: ''
  });

  // Mock commission data
  const commissionData = [
    {
      id: 'COM-2024-001',
      placementId: 'PLC-2024-045',
      recruiter: 'Sarah Johnson',
      client: 'TechCorp Solutions',
      candidate: 'Michael Rodriguez',
      role: 'Senior Software Engineer',
      placementValue: 85000,
      commissionRate: 15,
      commissionAmount: 12750,
      teamSplits: [
        { name: 'Sarah Johnson', percentage: 60, amount: 7650 },
        { name: 'David Chen', percentage: 40, amount: 5100 }
      ],
      paymentStatus: 'paid',
      paymentDate: '2024-01-15',
      tier: 'senior',
      createdDate: '2024-01-10',
      notes: 'Standard placement with team collaboration'
    },
    {
      id: 'COM-2024-002',
      placementId: 'PLC-2024-046',
      recruiter: 'David Chen',
      client: 'InnovateLabs Inc',
      candidate: 'Emily Watson',
      role: 'Product Manager',
      placementValue: 95000,
      commissionRate: 18,
      commissionAmount: 17100,
      teamSplits: [
        { name: 'David Chen', percentage: 100, amount: 17100 }
      ],
      paymentStatus: 'pending',
      paymentDate: null,
      tier: 'executive',
      createdDate: '2024-01-12',
      notes: 'Executive placement with bonus tier'
    },
    {
      id: 'COM-2024-003',
      placementId: 'PLC-2024-047',
      recruiter: 'Lisa Park',
      client: 'Global Dynamics',
      candidate: 'James Wilson',
      role: 'Data Scientist',
      placementValue: 78000,
      commissionRate: 12,
      commissionAmount: 9360,
      teamSplits: [
        { name: 'Lisa Park', percentage: 70, amount: 6552 },
        { name: 'Mark Thompson', percentage: 30, amount: 2808 }
      ],
      paymentStatus: 'processing',
      paymentDate: null,
      tier: 'standard',
      createdDate: '2024-01-14',
      notes: 'Standard placement with research support'
    },
    {
      id: 'COM-2024-004',
      placementId: 'PLC-2024-048',
      recruiter: 'Mark Thompson',
      client: 'StartupVenture Co',
      candidate: 'Anna Martinez',
      role: 'UX Designer',
      placementValue: 65000,
      commissionRate: 10,
      commissionAmount: 6500,
      teamSplits: [
        { name: 'Mark Thompson', percentage: 100, amount: 6500 }
      ],
      paymentStatus: 'disputed',
      paymentDate: null,
      tier: 'junior',
      createdDate: '2024-01-16',
      notes: 'Client dispute regarding placement terms'
    },
    {
      id: 'COM-2024-005',
      placementId: 'PLC-2024-049',
      recruiter: 'Sarah Johnson',
      client: 'Enterprise Systems',
      candidate: 'Robert Kim',
      role: 'DevOps Engineer',
      placementValue: 88000,
      commissionRate: 16,
      commissionAmount: 14080,
      teamSplits: [
        { name: 'Sarah Johnson', percentage: 80, amount: 11264 },
        { name: 'Lisa Park', percentage: 20, amount: 2816 }
      ],
      paymentStatus: 'paid',
      paymentDate: '2024-01-18',
      tier: 'senior',
      createdDate: '2024-01-15',
      notes: 'Quick placement with technical assessment'
    }
  ];

  // Mock commission structure data
  const commissionStructures = [
    {
      id: 'tier-junior',
      name: 'Junior Level',
      description: 'Entry-level positions up to $60k',
      baseRate: 10,
      bonusThreshold: 50000,
      bonusRate: 2,
      salaryRange: { min: 30000, max: 60000 }
    },
    {
      id: 'tier-standard',
      name: 'Standard Level',
      description: 'Mid-level positions $60k-$80k',
      baseRate: 12,
      bonusThreshold: 75000,
      bonusRate: 3,
      salaryRange: { min: 60000, max: 80000 }
    },
    {
      id: 'tier-senior',
      name: 'Senior Level',
      description: 'Senior positions $80k-$100k',
      baseRate: 15,
      bonusThreshold: 90000,
      bonusRate: 3,
      salaryRange: { min: 80000, max: 100000 }
    },
    {
      id: 'tier-executive',
      name: 'Executive Level',
      description: 'Executive positions above $100k',
      baseRate: 18,
      bonusThreshold: 120000,
      bonusRate: 5,
      salaryRange: { min: 100000, max: 500000 }
    }
  ];

  // Filter commission data
  const filteredCommissions = useMemo(() => {
    return commissionData.filter(commission => {
      const matchesRecruiter = filters.recruiter === 'all' || commission.recruiter === filters.recruiter;
      const matchesStatus = filters.paymentStatus === 'all' || commission.paymentStatus === filters.paymentStatus;
      const matchesTier = filters.commissionTier === 'all' || commission.tier === filters.commissionTier;
      const matchesSearch = !filters.searchQuery || 
        commission.recruiter.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        commission.client.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        commission.candidate.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        commission.id.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesRecruiter && matchesStatus && matchesTier && matchesSearch;
    });
  }, [filters]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalCommissions = filteredCommissions.reduce((sum, comm) => sum + comm.commissionAmount, 0);
    const paidCommissions = filteredCommissions
      .filter(comm => comm.paymentStatus === 'paid')
      .reduce((sum, comm) => sum + comm.commissionAmount, 0);
    const pendingCommissions = filteredCommissions
      .filter(comm => comm.paymentStatus === 'pending' || comm.paymentStatus === 'processing')
      .reduce((sum, comm) => sum + comm.commissionAmount, 0);
    const disputedCommissions = filteredCommissions
      .filter(comm => comm.paymentStatus === 'disputed')
      .reduce((sum, comm) => sum + comm.commissionAmount, 0);

    return {
      total: totalCommissions,
      paid: paidCommissions,
      pending: pendingCommissions,
      disputed: disputedCommissions,
      count: filteredCommissions.length
    };
  }, [filteredCommissions]);

  const handleSelectCommission = (commissionId) => {
    setSelectedCommissions(prev => 
      prev.includes(commissionId) 
        ? prev.filter(id => id !== commissionId)
        : [...prev, commissionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCommissions.length === filteredCommissions.length) {
      setSelectedCommissions([]);
    } else {
      setSelectedCommissions(filteredCommissions.map(comm => comm.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on commissions:`, selectedCommissions);
    // Handle bulk operations
    setSelectedCommissions([]);
  };

  const handleExport = (format) => {
    console.log(`Exporting commissions in ${format} format`);
    // Handle export functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Commission Calculator</h1>
              <p className="text-text-secondary">
                Automate fee calculations, track team splits, and manage commission payouts
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
              >
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Plus" size={16} />
                <span>New Calculation</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Total Commissions</p>
                  <p className="text-2xl font-bold text-text-primary">${summaryStats.total.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Paid Out</p>
                  <p className="text-2xl font-bold text-success">${summaryStats.paid.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-warning">${summaryStats.pending.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Disputed</p>
                  <p className="text-2xl font-bold text-error">${summaryStats.disputed.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'calculator' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name="Calculator" size={16} className="inline mr-2" />
              Calculation Engine
            </button>
            
            <button
              onClick={() => setActiveTab('grid')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'grid' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name="Grid3X3" size={16} className="inline mr-2" />
              Commission Grid
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeTab === 'calculator' ? (
            <>
              <CalculationEngine commissionStructures={commissionStructures} />
              <CommissionGrid 
                commissions={filteredCommissions.slice(0, 10)}
                onSelectCommission={handleSelectCommission}
                selectedCommissions={selectedCommissions}
              />
            </>
          ) : (
            <>
              <div className="lg:col-span-2">
                <CommissionFilters 
                  filters={filters}
                  onFiltersChange={setFilters}
                  commissionData={commissionData}
                />
                
                {selectedCommissions.length > 0 && (
                  <BulkOperations 
                    selectedCount={selectedCommissions.length}
                    onBulkAction={handleBulkAction}
                  />
                )}
                
                <CommissionGrid 
                  commissions={filteredCommissions}
                  onSelectCommission={handleSelectCommission}
                  onSelectAll={handleSelectAll}
                  selectedCommissions={selectedCommissions}
                  showSelectAll={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommissionCalculator;