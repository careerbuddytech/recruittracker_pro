import { REVENUE_STREAMS, PAYMENT_STATUS, PROJECT_STATUS } from '../constants/serviceTypes';

// Media Advertisement Sales Data
export const mediaAdSalesData = [
  {
    id: 'ad_001',
    clientName: 'TechStartup Inc.',
    campaignName: 'Q1 Brand Awareness Campaign',
    platform: 'Google Ads',
    campaignType: 'Brand Awareness',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    monthlyBudget: 15000,
    totalBudget: 45000,
    actualSpend: 42500,
    revenue: 9000,
    profitMargin: 0.20,
    paymentTerms: 'net_30',
    paymentStatus: PAYMENT_STATUS.PAID,
    acquisitionCost: 2500,
    cpmTarget: 12.50,
    cpmActual: 11.80,
    ctrTarget: 0.025,
    ctrActual: 0.028,
    conversions: 145,
    conversionRate: 0.035,
    clientSatisfaction: 92
  },
  {
    id: 'ad_002',
    clientName: 'E-commerce Solutions LLC',
    campaignName: 'Holiday Sales Push',
    platform: 'Facebook Ads',
    campaignType: 'Sales Conversion',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    monthlyBudget: 25000,
    totalBudget: 25000,
    actualSpend: 24750,
    revenue: 6250,
    profitMargin: 0.25,
    paymentTerms: 'net_15',
    paymentStatus: PAYMENT_STATUS.PAID,
    acquisitionCost: 3200,
    cpmTarget: 8.50,
    cpmActual: 8.20,
    ctrTarget: 0.032,
    ctrActual: 0.034,
    conversions: 189,
    conversionRate: 0.041,
    clientSatisfaction: 88
  },
  {
    id: 'ad_003',
    clientName: 'Professional Services Group',
    campaignName: 'LinkedIn Lead Generation',
    platform: 'LinkedIn Ads',
    campaignType: 'Lead Generation',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    monthlyBudget: 8000,
    totalBudget: 24000,
    actualSpend: 18500,
    revenue: 4800,
    profitMargin: 0.20,
    paymentTerms: 'net_30',
    paymentStatus: PAYMENT_STATUS.PARTIAL,
    acquisitionCost: 1800,
    cpmTarget: 25.00,
    cpmActual: 23.50,
    ctrTarget: 0.018,
    ctrActual: 0.021,
    conversions: 78,
    conversionRate: 0.028,
    clientSatisfaction: 94
  }
];

// Outsourcing Services Data
export const outsourcingServicesData = [
  {
    id: 'out_001',
    clientName: 'Global Manufacturing Corp',
    projectName: 'IT Support Outsourcing',
    serviceType: 'IT Support Team',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    contractType: 'annual',
    teamSize: 8,
    hourlyRate: 45,
    totalContractValue: 475200,
    monthlyRevenue: 39600,
    paymentTerms: 'monthly',
    paymentStatus: PAYMENT_STATUS.PAID,
    acquisitionCost: 15000,
    status: PROJECT_STATUS.ACTIVE,
    completionRate: 85,
    clientSatisfaction: 96,
    kpiTargets: {
      responseTime: '2 hours',
      resolutionRate: 95,
      clientRetention: 98
    },
    kpiActual: {
      responseTime: '1.5 hours',
      resolutionRate: 97,
      clientRetention: 100
    }
  },
  {
    id: 'out_002',
    clientName: 'E-commerce Platform Ltd',
    projectName: 'Customer Service Outsourcing',
    serviceType: 'Customer Service Team',
    startDate: '2024-02-01',
    endDate: '2024-07-31',
    contractType: 'project',
    teamSize: 12,
    hourlyRate: 35,
    totalContractValue: 201600,
    monthlyRevenue: 33600,
    paymentTerms: 'bi-weekly',
    paymentStatus: PAYMENT_STATUS.PAID,
    acquisitionCost: 8500,
    status: PROJECT_STATUS.ACTIVE,
    completionRate: 67,
    clientSatisfaction: 89,
    kpiTargets: {
      responseTime: '30 minutes',
      resolutionRate: 90,
      clientRetention: 95
    },
    kpiActual: {
      responseTime: '25 minutes',
      resolutionRate: 92,
      clientRetention: 97
    }
  },
  {
    id: 'out_003',
    clientName: 'FinTech Innovations',
    projectName: 'Development Team Augmentation',
    serviceType: 'Development Team',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    contractType: 'project',
    teamSize: 6,
    hourlyRate: 85,
    totalContractValue: 367200,
    monthlyRevenue: 52457,
    paymentTerms: 'monthly',
    paymentStatus: PAYMENT_STATUS.PAID,
    acquisitionCost: 12000,
    status: PROJECT_STATUS.ACTIVE,
    completionRate: 43,
    clientSatisfaction: 93,
    kpiTargets: {
      responseTime: '4 hours',
      resolutionRate: 98,
      clientRetention: 100
    },
    kpiActual: {
      responseTime: '3 hours',
      resolutionRate: 99,
      clientRetention: 100
    }
  }
];

// CV Writing Services Data  
export const cvWritingServicesData = [
  {
    id: 'cv_001',
    clientName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    serviceType: 'Professional CV Rewrite',
    serviceTier: 'professional',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20',
    price: 150,
    rushOrder: false,
    rushFee: 0,
    totalAmount: 150,
    paymentStatus: PAYMENT_STATUS.PAID,
    status: 'completed',
    industry: 'Technology',
    experienceLevel: 'Mid-level',
    turnaroundTime: 5,
    targetTurnaround: 5,
    clientSatisfaction: 95,
    revisionRequests: 1,
    finalApproval: true,
    acquisitionSource: 'Website',
    acquisitionCost: 25
  },
  {
    id: 'cv_002',
    clientName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0456',
    serviceType: 'Executive CV Package',
    serviceTier: 'executive',
    orderDate: '2024-02-01',
    deliveryDate: '2024-02-08',
    price: 300,
    rushOrder: true,
    rushFee: 75,
    totalAmount: 375,
    paymentStatus: PAYMENT_STATUS.PAID,
    status: 'completed',
    industry: 'Finance',
    experienceLevel: 'Senior',
    turnaroundTime: 7,
    targetTurnaround: 7,
    clientSatisfaction: 98,
    revisionRequests: 2,
    finalApproval: true,
    acquisitionSource: 'Referral',
    acquisitionCost: 0
  },
  {
    id: 'cv_003',
    clientName: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1-555-0789',
    serviceType: 'Career Transition Package',
    serviceTier: 'career_transition',
    orderDate: '2024-02-10',
    deliveryDate: '2024-02-20',
    price: 450,
    rushOrder: false,
    rushFee: 0,
    totalAmount: 450,
    paymentStatus: PAYMENT_STATUS.PAID,
    status: 'in_progress',
    industry: 'Healthcare',
    experienceLevel: 'Senior',
    turnaroundTime: 8,
    targetTurnaround: 10,
    clientSatisfaction: null,
    revisionRequests: 0,
    finalApproval: false,
    acquisitionSource: 'LinkedIn',
    acquisitionCost: 45
  },
  {
    id: 'cv_004',
    clientName: 'Emma Williams',
    email: 'emma.w@email.com',
    phone: '+1-555-0321',
    serviceType: 'Basic CV Review',
    serviceTier: 'basic',
    orderDate: '2024-02-15',
    deliveryDate: '2024-02-18',
    price: 50,
    rushOrder: false,
    rushFee: 0,
    totalAmount: 50,
    paymentStatus: PAYMENT_STATUS.PENDING,
    status: 'pending',
    industry: 'Marketing',
    experienceLevel: 'Entry-level',
    turnaroundTime: null,
    targetTurnaround: 3,
    clientSatisfaction: null,
    revisionRequests: 0,
    finalApproval: false,
    acquisitionSource: 'Google Ads',
    acquisitionCost: 12
  }
];

// Revenue Targets and Analytics
export const revenueTargets = {
  [REVENUE_STREAMS.MEDIA_AD_SALES]: {
    monthly: 18000,
    quarterly: 54000,
    annual: 216000,
    profitMarginTarget: 0.22
  },
  [REVENUE_STREAMS.OUTSOURCING_SERVICES]: {
    monthly: 125000,
    quarterly: 375000,
    annual: 1500000,
    profitMarginTarget: 0.35
  },
  [REVENUE_STREAMS.CV_WRITING_SERVICES]: {
    monthly: 25000,
    quarterly: 75000,
    annual: 300000,
    profitMarginTarget: 0.65
  },
  [REVENUE_STREAMS.RECRUITMENT_SERVICES]: {
    monthly: 200000,
    quarterly: 600000,
    annual: 2400000,
    profitMarginTarget: 0.28
  }
};

// Combined revenue analytics
export const revenueAnalytics = {
  totalRevenue: {
    monthly: 368000,
    quarterly: 1104000,
    annual: 4416000
  },
  revenueByStream: {
    [REVENUE_STREAMS.RECRUITMENT_SERVICES]: 2400000,
    [REVENUE_STREAMS.OUTSOURCING_SERVICES]: 1500000,
    [REVENUE_STREAMS.CV_WRITING_SERVICES]: 300000,
    [REVENUE_STREAMS.MEDIA_AD_SALES]: 216000
  },
  profitMargins: {
    [REVENUE_STREAMS.CV_WRITING_SERVICES]: 0.65,
    [REVENUE_STREAMS.OUTSOURCING_SERVICES]: 0.35,
    [REVENUE_STREAMS.RECRUITMENT_SERVICES]: 0.28,
    [REVENUE_STREAMS.MEDIA_AD_SALES]: 0.22
  }
};