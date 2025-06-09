import { 
  TRANSACTION_TYPES, 
  TRANSACTION_CATEGORIES, 
  PAYMENT_METHODS, 
  TRANSACTION_STATUS 
} from 'constants/transactionConstants';

export const transactionData = [
  {
    id: 'txn_001',
    referenceNumber: 'REF-20240301',
    date: '2024-03-01',
    type: TRANSACTION_TYPES.INCOME,
    category: TRANSACTION_CATEGORIES.RECRUITMENT_FEES,
    description: 'Senior Software Engineer placement fee - TechCorp Inc.',
    amountUSD: 15000,
    amountNGN: 24750000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
    status: TRANSACTION_STATUS.COMPLETED,
    createdBy: 'user_001',
    approvedBy: 'user_001',
    createdAt: '2024-03-01T10:30:00Z',
    approvedAt: '2024-03-01T11:00:00Z',
    documents: ['invoice_001.pdf', 'contract_001.pdf'],
    clientName: 'TechCorp Inc.',
    notes: 'Successful placement after 3 weeks of recruiting'
  },
  {
    id: 'txn_002',
    referenceNumber: 'REF-20240302',
    date: '2024-03-02',
    type: TRANSACTION_TYPES.EXPENSE,
    category: TRANSACTION_CATEGORIES.OFFICE_RENT,
    description: 'Monthly office rent - March 2024',
    amountUSD: 3500,
    amountNGN: 5775000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
    status: TRANSACTION_STATUS.COMPLETED,
    createdBy: 'user_002',
    approvedBy: 'user_001',
    createdAt: '2024-03-02T09:15:00Z',
    approvedAt: '2024-03-02T14:30:00Z',
    documents: ['rent_receipt_march.pdf'],
    vendorName: 'Prime Real Estate Ltd.',
    notes: 'Monthly rent for main office location'
  },
  {
    id: 'txn_003',
    referenceNumber: 'REF-20240303',
    date: '2024-03-03',
    type: TRANSACTION_TYPES.INCOME,
    category: TRANSACTION_CATEGORIES.MEDIA_AD_SALES,
    description: 'Facebook Ads campaign management - Q1 2024',
    amountUSD: 8500,
    amountNGN: 14025000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.STRIPE,
    status: TRANSACTION_STATUS.COMPLETED,
    createdBy: 'user_003',
    approvedBy: 'user_001',
    createdAt: '2024-03-03T13:45:00Z',
    approvedAt: '2024-03-03T16:20:00Z',
    documents: ['campaign_report_q1.pdf', 'client_invoice_003.pdf'],
    clientName: 'Digital Marketing Agency LLC',
    notes: '20% commission on $42,500 ad spend'
  },
  {
    id: 'txn_004',
    referenceNumber: 'REF-20240304',
    date: '2024-03-04',
    type: TRANSACTION_TYPES.EXPENSE,
    category: TRANSACTION_CATEGORIES.SALARIES_WAGES,
    description: 'Monthly salaries - March 2024',
    amountUSD: 45000,
    amountNGN: 74250000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
    status: TRANSACTION_STATUS.COMPLETED,
    createdBy: 'user_001',
    approvedBy: 'user_001',
    createdAt: '2024-03-04T08:00:00Z',
    approvedAt: '2024-03-04T08:30:00Z',
    documents: ['payroll_march_2024.pdf'],
    notes: 'Salaries for 15 team members'
  },
  {
    id: 'txn_005',
    referenceNumber: 'REF-20240305',
    date: '2024-03-05',
    type: TRANSACTION_TYPES.INCOME,
    category: TRANSACTION_CATEGORIES.CV_WRITING_SERVICES,
    description: 'Executive CV package - 5 clients',
    amountUSD: 1500,
    amountNGN: 2475000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.PAYPAL,
    status: TRANSACTION_STATUS.COMPLETED,
    createdBy: 'user_004',
    approvedBy: 'user_001',
    createdAt: '2024-03-05T11:20:00Z',
    approvedAt: '2024-03-05T12:00:00Z',
    documents: ['cv_orders_march_week1.pdf'],
    notes: '5 executive CV packages completed'
  },
  {
    id: 'txn_006',
    referenceNumber: 'REF-20240306',
    date: '2024-03-06',
    type: TRANSACTION_TYPES.EXPENSE,
    category: TRANSACTION_CATEGORIES.SOFTWARE_SUBSCRIPTIONS,
    description: 'Monthly software subscriptions',
    amountUSD: 1200,
    amountNGN: 1980000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
    status: TRANSACTION_STATUS.COMPLETED,
    createdBy: 'user_002',
    approvedBy: 'user_001',
    createdAt: '2024-03-06T10:45:00Z',
    approvedAt: '2024-03-06T11:15:00Z',
    documents: ['software_receipts_march.pdf'],
    notes: 'CRM, ATS, and project management tools'
  },
  {
    id: 'txn_007',
    referenceNumber: 'REF-20240307',
    date: '2024-03-07',
    type: TRANSACTION_TYPES.INCOME,
    category: TRANSACTION_CATEGORIES.OUTSOURCING_SERVICES,
    description: 'IT Support Team - Weekly payment',
    amountUSD: 9600,
    amountNGN: 15840000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
    status: TRANSACTION_STATUS.PENDING,
    createdBy: 'user_003',
    approvedBy: null,
    createdAt: '2024-03-07T14:30:00Z',
    approvedAt: null,
    documents: ['timesheet_week1_march.pdf'],
    clientName: 'Global Manufacturing Corp',
    notes: '8 team members @ 40 hours each @ $30/hour'
  },
  {
    id: 'txn_008',
    referenceNumber: 'REF-20240308',
    date: '2024-03-08',
    type: TRANSACTION_TYPES.EXPENSE,
    category: TRANSACTION_CATEGORIES.MARKETING_ADVERTISING,
    description: 'LinkedIn Ads campaign - Talent acquisition',
    amountUSD: 2500,
    amountNGN: 4125000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
    status: TRANSACTION_STATUS.COMPLETED,
    createdBy: 'user_002',
    approvedBy: 'user_001',
    createdAt: '2024-03-08T09:20:00Z',
    approvedAt: '2024-03-08T15:45:00Z',
    documents: ['linkedin_ads_invoice.pdf'],
    notes: 'Campaign to attract senior developers'
  },
  {
    id: 'txn_009',
    referenceNumber: 'REF-20240309',
    date: '2024-03-09',
    type: TRANSACTION_TYPES.INCOME,
    category: TRANSACTION_CATEGORIES.CONSULTING_FEES,
    description: 'HR Strategy consultation - StartupXYZ',
    amountUSD: 5000,
    amountNGN: 8250000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
    status: TRANSACTION_STATUS.APPROVED,
    createdBy: 'user_001',
    approvedBy: 'user_001',
    createdAt: '2024-03-09T16:00:00Z',
    approvedAt: '2024-03-09T16:30:00Z',
    documents: ['consultation_contract.pdf', 'deliverables_report.pdf'],
    clientName: 'StartupXYZ Inc.',
    notes: '2-week HR strategy development project'
  },
  {
    id: 'txn_010',
    referenceNumber: 'REF-20240310',
    date: '2024-03-10',
    type: TRANSACTION_TYPES.EXPENSE,
    category: TRANSACTION_CATEGORIES.TRAVEL_EXPENSES,
    description: 'Client meeting travel - Lagos to Abuja',
    amountUSD: 800,
    amountNGN: 1320000,
    currency: 'USD',
    paymentMethod: PAYMENT_METHODS.DEBIT_CARD,
    status: TRANSACTION_STATUS.PENDING,
    createdBy: 'user_003',
    approvedBy: null,
    createdAt: '2024-03-10T12:15:00Z',
    approvedAt: null,
    documents: ['flight_tickets.pdf', 'hotel_receipt.pdf'],
    notes: 'Client presentation and contract negotiation'
  }
];

// Helper function to calculate running balances
export const calculateRunningBalances = (transactions) => {
  let balanceUSD = 0;
  let balanceNGN = 0;
  
  return transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(transaction => {
      if (transaction.type === TRANSACTION_TYPES.INCOME) {
        balanceUSD += transaction.amountUSD;
        balanceNGN += transaction.amountNGN;
      } else {
        balanceUSD -= transaction.amountUSD;
        balanceNGN -= transaction.amountNGN;
      }
      
      return {
        ...transaction,
        runningBalanceUSD: balanceUSD,
        runningBalanceNGN: balanceNGN
      };
    });
};

// Helper function to get summary statistics
export const getTransactionSummary = (transactions) => {
  const summary = {
    totalIncomeUSD: 0,
    totalIncomeNGN: 0,
    totalExpenseUSD: 0,
    totalExpenseNGN: 0,
    netIncomeUSD: 0,
    netIncomeNGN: 0,
    transactionCount: transactions.length,
    pendingCount: 0,
    completedCount: 0
  };
  
  transactions.forEach(transaction => {
    if (transaction.type === TRANSACTION_TYPES.INCOME) {
      summary.totalIncomeUSD += transaction.amountUSD;
      summary.totalIncomeNGN += transaction.amountNGN;
    } else {
      summary.totalExpenseUSD += transaction.amountUSD;
      summary.totalExpenseNGN += transaction.amountNGN;
    }
    
    if (transaction.status === TRANSACTION_STATUS.PENDING) {
      summary.pendingCount++;
    } else if (transaction.status === TRANSACTION_STATUS.COMPLETED) {
      summary.completedCount++;
    }
  });
  
  summary.netIncomeUSD = summary.totalIncomeUSD - summary.totalExpenseUSD;
  summary.netIncomeNGN = summary.totalIncomeNGN - summary.totalExpenseNGN;
  
  return summary;
};