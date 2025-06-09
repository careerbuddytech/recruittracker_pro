import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'components/AppIcon';
import { 
  selectFilteredTransactions, 
  selectTransactionFilters, 
  setFilters, 
  clearFilters 
} from 'store/slices/transactionSlice';
import { selectActiveCurrency, formatCurrency, selectExchangeRate } from 'store/slices/currencySlice';
import { selectCurrentUser } from 'store/slices/userSlice';
import { 
  TRANSACTION_TYPES, 
  CATEGORY_LABELS, 
  PAYMENT_METHOD_LABELS, 
  STATUS_LABELS 
} from 'constants/transactionConstants';
import { calculateRunningBalances, getTransactionSummary } from 'data/transactions';

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectFilteredTransactions);
  const filters = useSelector(selectTransactionFilters);
  const activeCurrency = useSelector(selectActiveCurrency);
  const exchangeRate = useSelector(selectExchangeRate);
  const currentUser = useSelector(selectCurrentUser);
  
  const [sortConfig, setSortConfig] = useState({ field: 'date', direction: 'desc' });

  const isAdmin = currentUser?.role === 'administrator';

  // Filter transactions based on user role
  const userTransactions = isAdmin 
    ? transactions 
    : transactions.filter(t => t.createdBy === currentUser?.id);

  const transactionsWithBalance = calculateRunningBalances(userTransactions);
  const summary = getTransactionSummary(userTransactions);

  // Sort transactions
  const sortedTransactions = [...transactionsWithBalance].sort((a, b) => {
    const aValue = a[sortConfig.field];
    const bValue = b[sortConfig.field];
    
    if (sortConfig.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field) => {
    setSortConfig(prevConfig => ({
      field,
      direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success-100 text-success-700';
      case 'approved': return 'bg-primary-100 text-primary-700';
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'rejected': return 'bg-error-100 text-error-700';
      case 'cancelled': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getTypeColor = (type) => {
    return type === TRANSACTION_TYPES.INCOME 
      ? 'bg-success-100 text-success-700' 
      : 'bg-error-100 text-error-700';
  };

  const formatAmount = (transaction) => {
    const amount = activeCurrency === 'USD' ? transaction.amountUSD : transaction.amountNGN;
    return formatCurrency(amount, activeCurrency, exchangeRate);
  };

  const formatRunningBalance = (transaction) => {
    const balance = activeCurrency === 'USD' ? transaction.runningBalanceUSD : transaction.runningBalanceNGN;
    return formatCurrency(balance, activeCurrency, exchangeRate);
  };

  const exportTransactions = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log('Exporting transactions in', activeCurrency);
    alert(`Export functionality would generate a ${activeCurrency} report here`);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Income</p>
              <p className="text-lg font-bold text-success">
                {formatCurrency(
                  activeCurrency === 'USD' ? summary.totalIncomeUSD : summary.totalIncomeNGN,
                  activeCurrency,
                  exchangeRate
                )}
              </p>
            </div>
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={18} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Expenses</p>
              <p className="text-lg font-bold text-error">
                {formatCurrency(
                  activeCurrency === 'USD' ? summary.totalExpenseUSD : summary.totalExpenseNGN,
                  activeCurrency,
                  exchangeRate
                )}
              </p>
            </div>
            <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingDown" size={18} className="text-error" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Net Income</p>
              <p className={`text-lg font-bold ${summary.netIncomeUSD >= 0 ? 'text-success' : 'text-error'}`}>
                {formatCurrency(
                  activeCurrency === 'USD' ? summary.netIncomeUSD : summary.netIncomeNGN,
                  activeCurrency,
                  exchangeRate
                )}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              summary.netIncomeUSD >= 0 ? 'bg-success-100' : 'bg-error-100'
            }`}>
              <Icon 
                name={summary.netIncomeUSD >= 0 ? 'PlusCircle' : 'MinusCircle'} 
                size={18} 
                className={summary.netIncomeUSD >= 0 ? 'text-success' : 'text-error'} 
              />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Transactions</p>
              <p className="text-lg font-bold text-text-primary">{summary.transactionCount}</p>
              <p className="text-xs text-text-tertiary">{summary.pendingCount} pending</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Receipt" size={18} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            <div>
              <select
                value={filters.transactionType}
                onChange={(e) => handleFilterChange('transactionType', e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value={TRANSACTION_TYPES.INCOME}>Income</option>
                <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
              </select>
            </div>

            <div>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="all">All Status</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleClearFilters}
              className="px-3 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200 text-sm"
            >
              Clear Filters
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportTransactions}
              className="px-4 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200 text-sm"
            >
              <Icon name="Download" size={16} className="inline mr-2" />
              Export ({activeCurrency})
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                <th 
                  className="text-left p-4 text-sm font-medium text-text-secondary cursor-pointer hover:bg-secondary-100"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    {sortConfig.field === 'date' && (
                      <Icon 
                        name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Reference</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Description</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Category</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Type</th>
                <th 
                  className="text-right p-4 text-sm font-medium text-text-secondary cursor-pointer hover:bg-secondary-100"
                  onClick={() => handleSort('amountUSD')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Amount ({activeCurrency})</span>
                    {sortConfig.field === 'amountUSD' && (
                      <Icon 
                        name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
                <th className="text-right p-4 text-sm font-medium text-text-secondary">
                  Running Balance ({activeCurrency})
                </th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-secondary-50 transition-colors duration-200">
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-mono text-text-primary">{transaction.referenceNumber}</p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{transaction.description}</p>
                      {transaction.clientName && (
                        <p className="text-xs text-text-tertiary">{transaction.clientName}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                      {CATEGORY_LABELS[transaction.category]}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type === TRANSACTION_TYPES.INCOME ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <p className={`font-medium ${
                      transaction.type === TRANSACTION_TYPES.INCOME ? 'text-success' : 'text-error'
                    }`}>
                      {transaction.type === TRANSACTION_TYPES.INCOME ? '+' : '-'}{formatAmount(transaction)}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      via {PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <p className={`font-medium ${
                      (activeCurrency === 'USD' ? transaction.runningBalanceUSD : transaction.runningBalanceNGN) >= 0 
                        ? 'text-success' : 'text-error'
                    }`}>
                      {formatRunningBalance(transaction)}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {STATUS_LABELS[transaction.status]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200">
                        <Icon name="Eye" size={14} className="text-text-secondary" />
                      </button>
                      {(isAdmin || transaction.createdBy === currentUser?.id) && (
                        <button className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200">
                          <Icon name="Edit3" size={14} className="text-text-secondary" />
                        </button>
                      )}
                      <button className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200">
                        <Icon name="MoreHorizontal" size={14} className="text-text-secondary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedTransactions.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Receipt" size={48} className="mx-auto text-text-tertiary mb-4" />
              <p className="text-text-secondary">No transactions found</p>
              <p className="text-text-tertiary text-sm">Try adjusting your filters or create a new transaction</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;