import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

import Breadcrumbs from 'components/ui/Breadcrumbs';
import ClientView from './components/ClientView';
import CandidateView from './components/CandidateView';
import SearchToolbar from './components/SearchToolbar';
import BulkOperations from './components/BulkOperations';
import DocumentManager from './components/DocumentManager';

const ClientCandidateDatabase = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: '',
    location: '',
    industry: '',
    skills: [],
    dateRange: ''
  });
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // cards, table, list

  // Mock data for clients
  const clientsData = [
    {
      id: 1,
      companyName: "TechCorp Solutions",
      industry: "Technology",
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      status: "Active",
      activeRoles: 5,
      totalPlacements: 23,
      billingHistory: "$450,000",
      lastContact: "2024-01-15",
      relationship: "Strategic Partner",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
      companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      tags: ["Enterprise", "High Value", "Long-term"],
      notes: `Strategic technology partner with consistent high-volume recruitment needs. Specializes in AI/ML and cloud infrastructure roles.
      
Excellent payment history and strong collaborative relationship. Primary contact Sarah Johnson is responsive and provides detailed role specifications.`,
      hierarchy: [
        { name: "Sarah Johnson", role: "VP of Engineering", email: "sarah.johnson@techcorp.com", primary: true },
        { name: "Mike Chen", role: "Engineering Manager", email: "mike.chen@techcorp.com", primary: false },
        { name: "Lisa Rodriguez", role: "HR Director", email: "lisa.rodriguez@techcorp.com", primary: false }
      ]
    },
    {
      id: 2,
      companyName: "Global Finance Inc",
      industry: "Financial Services",
      contactPerson: "Robert Williams",
      email: "robert.williams@globalfinance.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      status: "Active",
      activeRoles: 3,
      totalPlacements: 15,
      billingHistory: "$280,000",
      lastContact: "2024-01-12",
      relationship: "Regular Client",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      companyLogo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
      tags: ["Finance", "Compliance"],
      notes: `Established financial services client with focus on regulatory compliance and risk management roles. Requires candidates with specific certifications and clearances.`,
      hierarchy: [
        { name: "Robert Williams", role: "Chief Risk Officer", email: "robert.williams@globalfinance.com", primary: true },
        { name: "Amanda Davis", role: "Compliance Manager", email: "amanda.davis@globalfinance.com", primary: false }
      ]
    },
    {
      id: 3,
      companyName: "HealthTech Innovations",
      industry: "Healthcare",
      contactPerson: "Dr. Emily Carter",
      email: "emily.carter@healthtech.com",
      phone: "+1 (555) 456-7890",
      location: "Boston, MA",
      status: "Prospect",
      activeRoles: 1,
      totalPlacements: 3,
      billingHistory: "$75,000",
      lastContact: "2024-01-10",
      relationship: "New Client",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
      companyLogo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop",
      tags: ["Healthcare", "Innovation"],
      notes: `Emerging healthcare technology company focusing on digital health solutions. Growing team with immediate needs for senior developers and product managers.`,
      hierarchy: [
        { name: "Dr. Emily Carter", role: "Chief Technology Officer", email: "emily.carter@healthtech.com", primary: true }
      ]
    }
  ];

  // Mock data for candidates
  const candidatesData = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      phone: "+1 (555) 111-2222",
      location: "San Francisco, CA",
      status: "Available",
      currentRole: "Senior Software Engineer",
      experience: "8 years",
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
      salary: "$145,000",
      availability: "2 weeks notice",
      lastPlacement: "2023-06-15",
      placementSuccess: "85%",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      tags: ["Senior", "Full-Stack", "Remote"],
      notes: `Highly skilled full-stack developer with strong background in modern web technologies. Excellent communication skills and proven track record in agile environments.
      
Previously placed at TechCorp Solutions with outstanding performance reviews. Open to remote or hybrid opportunities.`,
      interviews: [
        { company: "TechCorp Solutions", date: "2024-01-10", status: "Passed", feedback: "Excellent technical skills" },
        { company: "StartupXYZ", date: "2024-01-05", status: "Pending", feedback: "Strong cultural fit" }
      ],
      documents: ["Resume_AlexThompson.pdf", "Portfolio_2024.pdf"]
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "+1 (555) 333-4444",
      location: "Austin, TX",
      status: "Interviewing",
      currentRole: "Product Manager",
      experience: "6 years",
      skills: ["Product Strategy", "Agile", "Analytics", "UX Design", "SQL"],
      salary: "$125,000",
      availability: "1 month notice",
      lastPlacement: "2023-09-20",
      placementSuccess: "92%",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces",
      tags: ["Product", "Strategy", "Leadership"],
      notes: `Experienced product manager with strong analytical background and proven ability to drive product growth. Excellent stakeholder management skills.`,
      interviews: [
        { company: "Global Finance Inc", date: "2024-01-12", status: "In Progress", feedback: "Strong strategic thinking" }
      ],
      documents: ["Resume_MariaRodriguez.pdf", "CaseStudy_ProductGrowth.pdf"]
    },
    {
      id: 3,
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 555-6666",
      location: "Seattle, WA",
      status: "Placed",
      currentRole: "DevOps Engineer",
      experience: "5 years",
      skills: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Monitoring"],
      salary: "$135,000",
      availability: "Placed",
      lastPlacement: "2024-01-08",
      placementSuccess: "78%",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      tags: ["DevOps", "Cloud", "Infrastructure"],
      notes: `Skilled DevOps engineer with expertise in cloud infrastructure and automation. Recently placed at HealthTech Innovations.`,
      interviews: [
        { company: "HealthTech Innovations", date: "2024-01-05", status: "Hired", feedback: "Perfect technical match" }
      ],
      documents: ["Resume_DavidKim.pdf", "Certifications_AWS.pdf"]
    }
  ];

  // Filter data based on search and filters
  const filteredClients = useMemo(() => {
    return clientsData.filter(client => {
      const matchesSearch = searchQuery === '' || 
        client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.industry.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedFilters.status === '' || client.status === selectedFilters.status;
      const matchesLocation = selectedFilters.location === '' || client.location.includes(selectedFilters.location);
      const matchesIndustry = selectedFilters.industry === '' || client.industry === selectedFilters.industry;
      
      return matchesSearch && matchesStatus && matchesLocation && matchesIndustry;
    });
  }, [searchQuery, selectedFilters]);

  const filteredCandidates = useMemo(() => {
    return candidatesData.filter(candidate => {
      const matchesSearch = searchQuery === '' || 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = selectedFilters.status === '' || candidate.status === selectedFilters.status;
      const matchesLocation = selectedFilters.location === '' || candidate.location.includes(selectedFilters.location);
      const matchesSkills = selectedFilters.skills.length === 0 || 
        selectedFilters.skills.some(skill => candidate.skills.includes(skill));
      
      return matchesSearch && matchesStatus && matchesLocation && matchesSkills;
    });
  }, [searchQuery, selectedFilters]);

  const handleRecordSelection = (recordId, isSelected) => {
    if (isSelected) {
      setSelectedRecords([...selectedRecords, recordId]);
    } else {
      setSelectedRecords(selectedRecords.filter(id => id !== recordId));
    }
  };

  const handleSelectAll = () => {
    const currentData = activeTab === 'clients' ? filteredClients : filteredCandidates;
    if (selectedRecords.length === currentData.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(currentData.map(record => record.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on records:`, selectedRecords);
    setSelectedRecords([]);
    setShowBulkOperations(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Client & Candidate Database</h1>
              <p className="text-text-secondary">
                Unified relationship management system for tracking clients and candidates
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setShowDocumentManager(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
              >
                <Icon name="FileText" size={16} />
                <span>Documents</span>
              </button>
              
              <button
                onClick={() => setShowBulkOperations(true)}
                disabled={selectedRecords.length === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedRecords.length > 0
                    ? 'bg-accent text-white hover:bg-accent-600' :'bg-secondary-100 text-secondary-400 cursor-not-allowed'
                }`}
              >
                <Icon name="Settings" size={16} />
                <span>Bulk Actions ({selectedRecords.length})</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Plus" size={16} />
                <span>Add New</span>
              </button>
            </div>
          </div>

          {/* Search Toolbar */}
          <SearchToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilters={selectedFilters}
            onFiltersChange={setSelectedFilters}
            activeTab={activeTab}
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('clients')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'clients' ?'bg-white text-primary shadow-sm' :'text-secondary-600 hover:text-text-primary'
                }`}
              >
                <Icon name="Building2" size={16} className="inline mr-2" />
                Clients ({filteredClients.length})
              </button>
              <button
                onClick={() => setActiveTab('candidates')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'candidates' ?'bg-white text-primary shadow-sm' :'text-secondary-600 hover:text-text-primary'
                }`}
              >
                <Icon name="Users" size={16} className="inline mr-2" />
                Candidates ({filteredCandidates.length})
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">View:</span>
              <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded transition-colors duration-200 ${
                    viewMode === 'cards' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                  }`}
                >
                  <Icon name="LayoutGrid" size={16} className={viewMode === 'cards' ? 'text-primary' : 'text-secondary-600'} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded transition-colors duration-200 ${
                    viewMode === 'table' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                  }`}
                >
                  <Icon name="Table" size={16} className={viewMode === 'table' ? 'text-primary' : 'text-secondary-600'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                  }`}
                >
                  <Icon name="List" size={16} className={viewMode === 'list' ? 'text-primary' : 'text-secondary-600'} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Controls */}
        {(filteredClients.length > 0 || filteredCandidates.length > 0) && (
          <div className="mb-4 flex items-center justify-between bg-surface border border-border rounded-lg p-3">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRecords.length > 0 && selectedRecords.length === (activeTab === 'clients' ? filteredClients.length : filteredCandidates.length)}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
                <span className="text-sm text-text-secondary">
                  Select All ({activeTab === 'clients' ? filteredClients.length : filteredCandidates.length})
                </span>
              </label>
              
              {selectedRecords.length > 0 && (
                <span className="text-sm text-primary font-medium">
                  {selectedRecords.length} selected
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Keyboard" size={14} />
              <span>Ctrl+A: Select All | Ctrl+↑↓: Navigate</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-surface border border-border rounded-lg">
          {activeTab === 'clients' ? (
            <ClientView
              clients={filteredClients}
              viewMode={viewMode}
              selectedRecords={selectedRecords}
              onRecordSelection={handleRecordSelection}
            />
          ) : (
            <CandidateView
              candidates={filteredCandidates}
              viewMode={viewMode}
              selectedRecords={selectedRecords}
              onRecordSelection={handleRecordSelection}
            />
          )}
        </div>

        {/* Bulk Operations Modal */}
        {showBulkOperations && (
          <BulkOperations
            selectedRecords={selectedRecords}
            activeTab={activeTab}
            onAction={handleBulkAction}
            onClose={() => setShowBulkOperations(false)}
          />
        )}

        {/* Document Manager Modal */}
        {showDocumentManager && (
          <DocumentManager
            onClose={() => setShowDocumentManager(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ClientCandidateDatabase;