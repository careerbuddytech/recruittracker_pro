import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'components/AppIcon';
import { addTransaction } from 'store/slices/transactionSlice';
import { selectActiveCurrency, selectExchangeRate, convertCurrency, formatCurrency } from 'store/slices/currencySlice';
import { selectCurrentUser, selectUserPermissions } from 'store/slices/userSlice';
import {
  TRANSACTION_TYPES,
  TRANSACTION_CATEGORIES,
  PAYMENT_METHODS,
  TRANSACTION_STATUS,
  CATEGORY_LABELS,
  PAYMENT_METHOD_LABELS,
  STATUS_LABELS,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES
} from 'constants/transactionConstants';

const TransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const activeCurrency = useSelector(selectActiveCurrency);
  const exchangeRate = useSelector(selectExchangeRate);
  const currentUser = useSelector(selectCurrentUser);
  const userPermissions = useSelector(selectUserPermissions);
  
  const [selectedType, setSelectedType] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrency);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [documents, setDocuments] = useState([]);

  const isAdmin = currentUser?.role === 'administrator';
  const canApprove = userPermissions.includes('approve_transactions');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      type: '',
      category: '',
      amount: '',
      currency: activeCurrency,
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: '',
      status: isAdmin ? TRANSACTION_STATUS.APPROVED : TRANSACTION_STATUS.PENDING
    }
  });

  const watchedAmount = watch('amount');
  const watchedType = watch('type');

  // Update converted amount when amount or currency changes
  useEffect(() => {
    if (watchedAmount && !isNaN(watchedAmount)) {
      const amount = parseFloat(watchedAmount);
      const targetCurrency = selectedCurrency === 'USD' ? 'NGN' : 'USD';
      const converted = convertCurrency(amount, selectedCurrency, targetCurrency, exchangeRate);
      setConvertedAmount(converted.toFixed(2));
    } else {
      setConvertedAmount('');
    }
  }, [watchedAmount, selectedCurrency, exchangeRate]);

  // Update available categories when transaction type changes
  useEffect(() => {
    setSelectedType(watchedType);
    setValue('category', '');
  }, [watchedType, setValue]);

  // Update currency when global currency changes
  useEffect(() => {
    setSelectedCurrency(activeCurrency);
    setValue('currency', activeCurrency);
  }, [activeCurrency, setValue]);

  const getAvailableCategories = () => {
    if (selectedType === TRANSACTION_TYPES.INCOME) {
      return INCOME_CATEGORIES;
    } else if (selectedType === TRANSACTION_TYPES.EXPENSE) {
      return EXPENSE_CATEGORIES;
    }
    return [];
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      // Basic validation - in a real app, you'd have more sophisticated checks
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv'];
      return file.size <= maxSize && allowedTypes.includes(file.type);
    });
    
    setDocuments(prev => [...prev, ...validFiles.map(file => file.name)]);
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    const amount = parseFloat(data.amount);
    
    // Calculate amounts in both currencies
    const amountUSD = selectedCurrency === 'USD' ? amount : convertCurrency(amount, 'NGN', 'USD', exchangeRate);
    const amountNGN = selectedCurrency === 'NGN' ? amount : convertCurrency(amount, 'USD', 'NGN', exchangeRate);

    const transaction = {
      ...data,
      amount,
      currency: selectedCurrency,
      amountUSD: Math.round(amountUSD * 100) / 100,
      amountNGN: Math.round(amountNGN),
      createdBy: currentUser.id,
      approvedBy: canApprove && data.status === TRANSACTION_STATUS.APPROVED ? currentUser.id : null,
      documents,
      createdAt: new Date().toISOString(),
      approvedAt: canApprove && data.status === TRANSACTION_STATUS.APPROVED ? new Date().toISOString() : null
    };

    dispatch(addTransaction(transaction));
    onClose && onClose();
  };

  const generateReferenceNumber = () => {
    return `REF-${Date.now().toString().slice(-8)}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">New Transaction</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Transaction Type *
                </label>
                <select
                  {...register('type', { required: 'Transaction type is required' })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select type</option>
                  <option value={TRANSACTION_TYPES.INCOME}>Income</option>
                  <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
                </select>
                {errors.type && (
                  <p className="text-error text-sm mt-1">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Category *
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={!selectedType}
                >
                  <option value="">Select category</option>
                  {getAvailableCategories().map(category => (
                    <option key={category} value={category}>
                      {CATEGORY_LABELS[category]}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-error text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Date *
              </label>
              <input
                type="date"
                {...register('date', { 
                  required: 'Date is required',
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(23, 59, 59, 999);
                    return selectedDate <= today || 'Date cannot be in the future';
                  }
                })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.date && (
                <p className="text-error text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Amount *
              </label>
              <div className="relative">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register('amount', { 
                        required: 'Amount is required',
                        min: { value: 0.01, message: 'Amount must be greater than 0' }
                      })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => {
                      setSelectedCurrency(e.target.value);
                      setValue('currency', e.target.value);
                    }}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="NGN">NGN (₦)</option>
                  </select>
                </div>
                {convertedAmount && (
                  <div className="mt-2 text-sm text-text-secondary">
                    ≈ {formatCurrency(parseFloat(convertedAmount), selectedCurrency === 'USD' ? 'NGN' : 'USD', exchangeRate)}
                  </div>
                )}
              </div>
              {errors.amount && (
                <p className="text-error text-sm mt-1">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter transaction description..."
              />
              {errors.description && (
                <p className="text-error text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Payment Method *
              </label>
              <select
                {...register('paymentMethod', { required: 'Payment method is required' })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select payment method</option>
                {Object.entries(PAYMENT_METHOD_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              {errors.paymentMethod && (
                <p className="text-error text-sm mt-1">{errors.paymentMethod.message}</p>
              )}
            </div>

            {isAdmin && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Reference Number
              </label>
              <input
                type="text"
                value={generateReferenceNumber()}
                readOnly
                className="w-full px-3 py-2 bg-secondary-50 border border-border rounded-lg text-text-secondary cursor-not-allowed"
              />
              <p className="text-xs text-text-tertiary mt-1">Auto-generated reference number</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Supporting Documents
              </label>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary-300 transition-colors duration-200">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload" className="cursor-pointer">
                    <Icon name="Upload" size={24} className="mx-auto text-text-tertiary mb-2" />
                    <p className="text-sm text-text-secondary">
                      Click to upload documents
                    </p>
                    <p className="text-xs text-text-tertiary">
                      PDF, JPG, PNG, CSV (max 10MB each)
                    </p>
                  </label>
                </div>

                {documents.length > 0 && (
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-secondary-50 px-3 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Icon name="File" size={16} className="text-text-secondary" />
                          <span className="text-sm text-text-primary">{doc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="p-1 hover:bg-secondary-200 rounded transition-colors duration-200"
                        >
                          <Icon name="X" size={14} className="text-text-secondary" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Create Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;