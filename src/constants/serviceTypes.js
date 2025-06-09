export const REVENUE_STREAMS = {
  MEDIA_AD_SALES: 'media_ad_sales',
  OUTSOURCING_SERVICES: 'outsourcing_services',
  CV_WRITING_SERVICES: 'cv_writing_services',
  RECRUITMENT_SERVICES: 'recruitment_services'
};

export const MEDIA_AD_PLATFORMS = [
  'Google Ads',
  'Facebook Ads',
  'LinkedIn Ads',
  'Instagram Ads',
  'Twitter Ads',
  'TikTok Ads',
  'YouTube Ads',
  'Programmatic Display',
  'Native Advertising',
  'Podcast Advertising'
];

export const OUTSOURCING_SERVICE_TYPES = [
  'IT Support Team',
  'Customer Service Team',
  'Development Team',
  'Data Entry Team',
  'Marketing Team',
  'Finance & Accounting',
  'HR Services',
  'Legal Services',
  'Design Team',
  'Content Writing',
  'Virtual Assistant',
  'Research & Analysis'
];

export const CV_SERVICE_TIERS = [
  { 
    name: 'Basic CV Review', 
    price: 50, 
    turnaround: '2-3 days',
    features: ['Grammar & spelling check', 'Basic formatting', 'Content review']
  },
  { 
    name: 'Professional CV Rewrite', 
    price: 150, 
    turnaround: '3-5 days',
    features: ['Complete rewrite', 'ATS optimization', 'Industry-specific keywords', 'Cover letter template']
  },
  { 
    name: 'Executive CV Package', 
    price: 300, 
    turnaround: '5-7 days',
    features: ['Executive-level rewrite', 'LinkedIn optimization', 'Personal branding', 'Interview coaching session']
  },
  { 
    name: 'Career Transition Package', 
    price: 450, 
    turnaround: '7-10 days',
    features: ['Complete career pivot', 'Multiple CV versions', 'LinkedIn makeover', 'Job search strategy', '30-day support']
  }
];

export const PAYMENT_TERMS = [
  { value: 'immediate', label: 'Immediate' },
  { value: 'net_7', label: 'Net 7' },
  { value: 'net_15', label: 'Net 15' },
  { value: 'net_30', label: 'Net 30' },
  { value: 'net_45', label: 'Net 45' },
  { value: 'net_60', label: 'Net 60' },
  { value: 'milestone', label: 'Milestone-based' },
  { value: 'recurring', label: 'Recurring' }
];

export const CONTRACT_TYPES = [
  { value: 'one_time', label: 'One-time Project' },
  { value: 'monthly', label: 'Monthly Retainer' },
  { value: 'quarterly', label: 'Quarterly Contract' },
  { value: 'annual', label: 'Annual Contract' },
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'performance', label: 'Performance-based' }
];

export const CAMPAIGN_TYPES = [
  'Brand Awareness',
  'Lead Generation',
  'Sales Conversion',
  'Retargeting',
  'Event Promotion',
  'Product Launch',
  'Seasonal Campaign',
  'Competitive Targeting'
];

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PARTIAL: 'partial',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled'
};

export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold',
  CANCELLED: 'cancelled',
  PENDING: 'pending'
};