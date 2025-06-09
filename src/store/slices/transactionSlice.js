import { createSlice } from '@reduxjs/toolkit';
import { transactionData } from 'data/transactions';

const initialState = {
  transactions: transactionData,
  loading: false,
  error: null,
  filters: {
    dateRange: 'all',
    transactionType: 'all',
    category: 'all',
    status: 'all'
  }
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.unshift({
        ...action.payload,
        id: `txn_${Date.now()}`,
        createdAt: new Date().toISOString(),
        referenceNumber: `REF-${Date.now().toString().slice(-8)}`
      });
    },
    updateTransaction: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        state.transactions[index] = { ...state.transactions[index], ...updates };
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        dateRange: 'all',
        transactionType: 'all',
        category: 'all',
        status: 'all'
      };
    }
  }
});

export const { 
  addTransaction, 
  updateTransaction, 
  deleteTransaction, 
  setFilters, 
  clearFilters 
} = transactionSlice.actions;

// Selectors
export const selectAllTransactions = (state) => state.transactions.transactions;
export const selectTransactionFilters = (state) => state.transactions.filters;
export const selectFilteredTransactions = (state) => {
  const transactions = state.transactions.transactions;
  const filters = state.transactions.filters;
  
  return transactions.filter(transaction => {
    // Date range filter
    if (filters.dateRange !== 'all') {
      const transactionDate = new Date(transaction.date);
      const now = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          if (transactionDate.toDateString() !== now.toDateString()) return false;
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (transactionDate < weekAgo) return false;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (transactionDate < monthAgo) return false;
          break;
      }
    }
    
    // Transaction type filter
    if (filters.transactionType !== 'all' && transaction.type !== filters.transactionType) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && transaction.status !== filters.status) {
      return false;
    }
    
    return true;
  });
};

export default transactionSlice.reducer;