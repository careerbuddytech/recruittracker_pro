import { createSlice } from '@reduxjs/toolkit';

// Mock exchange rate - in a real app, this would come from an API
const USD_TO_NGN_RATE = 1650; // 1 USD = 1650 NGN (approximate)

const initialState = {
  activeCurrency: 'USD',
  exchangeRate: USD_TO_NGN_RATE,
  supportedCurrencies: {
    USD: { symbol: '$', name: 'US Dollar', code: 'USD' },
    NGN: { symbol: '₦', name: 'Nigerian Naira', code: 'NGN' }
  }
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    toggleCurrency: (state) => {
      state.activeCurrency = state.activeCurrency === 'USD' ? 'NGN' : 'USD';
    },
    setCurrency: (state, action) => {
      state.activeCurrency = action.payload;
    },
    updateExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    }
  }
});

export const { toggleCurrency, setCurrency, updateExchangeRate } = currencySlice.actions;

// Selectors
export const selectActiveCurrency = (state) => state.currency.activeCurrency;
export const selectExchangeRate = (state) => state.currency.exchangeRate;
export const selectCurrencyInfo = (state) => state.currency.supportedCurrencies[state.currency.activeCurrency];
export const selectSupportedCurrencies = (state) => state.currency.supportedCurrencies;

// Conversion helpers
export const convertCurrency = (amount, fromCurrency, toCurrency, exchangeRate) => {
  if (fromCurrency === toCurrency) return amount;
  
  if (fromCurrency === 'USD' && toCurrency === 'NGN') {
    return amount * exchangeRate;
  } else if (fromCurrency === 'NGN' && toCurrency === 'USD') {
    return amount / exchangeRate;
  }
  
  return amount;
};

export const formatCurrency = (amount, currencyCode, exchangeRate) => {
  const currencies = {
    USD: { symbol: '$', name: 'US Dollar' },
    NGN: { symbol: '₦', name: 'Nigerian Naira' }
  };
  
  const currency = currencies[currencyCode];
  if (!currency) return amount.toString();
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
    minimumFractionDigits: currencyCode === 'NGN' ? 0 : 2,
    maximumFractionDigits: currencyCode === 'NGN' ? 0 : 2,
  }).format(amount).replace(/[A-Z]{3}/, currency.symbol);
};

export default currencySlice.reducer;