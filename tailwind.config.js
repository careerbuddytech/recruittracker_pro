/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E3A8A', // Deep blue (primary) - blue-800
        'primary-50': '#EFF6FF', // Very light blue - blue-50
        'primary-100': '#DBEAFE', // Light blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Darker blue - blue-600
        'primary-700': '#1D4ED8', // Dark blue - blue-700
        'primary-900': '#1E3A8A', // Very dark blue - blue-900

        // Secondary Colors
        'secondary': '#64748B', // Balanced gray-blue - slate-500
        'secondary-50': '#F8FAFC', // Very light slate - slate-50
        'secondary-100': '#F1F5F9', // Light slate - slate-100
        'secondary-200': '#E2E8F0', // Light gray-blue - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate - slate-300
        'secondary-400': '#94A3B8', // Medium slate - slate-400
        'secondary-600': '#475569', // Dark slate - slate-600
        'secondary-700': '#334155', // Darker slate - slate-700
        'secondary-800': '#1E293B', // Very dark slate - slate-800
        'secondary-900': '#0F172A', // Near black slate - slate-900

        // Accent Colors
        'accent': '#0EA5E9', // Bright blue accent - sky-500
        'accent-50': '#F0F9FF', // Very light sky - sky-50
        'accent-100': '#E0F2FE', // Light sky - sky-100
        'accent-200': '#BAE6FD', // Light blue accent - sky-200
        'accent-300': '#7DD3FC', // Medium light sky - sky-300
        'accent-400': '#38BDF8', // Medium sky - sky-400
        'accent-600': '#0284C7', // Dark sky - sky-600
        'accent-700': '#0369A1', // Darker sky - sky-700

        // Background Colors
        'background': '#F8FAFC', // Soft off-white - slate-50
        'surface': '#FFFFFF', // Pure white surface - white
        'surface-secondary': '#F1F5F9', // Secondary surface - slate-100

        // Text Colors
        'text-primary': '#0F172A', // Near-black primary text - slate-900
        'text-secondary': '#475569', // Medium gray secondary text - slate-600
        'text-tertiary': '#64748B', // Light gray tertiary text - slate-500
        'text-inverse': '#FFFFFF', // White text for dark backgrounds - white

        // Status Colors
        'success': '#059669', // Professional green - emerald-600
        'success-50': '#ECFDF5', // Very light emerald - emerald-50
        'success-100': '#D1FAE5', // Light emerald - emerald-100
        'success-500': '#10B981', // Medium emerald - emerald-500
        'success-700': '#047857', // Dark emerald - emerald-700

        'warning': '#D97706', // Warm orange warning - amber-600
        'warning-50': '#FFFBEB', // Very light amber - amber-50
        'warning-100': '#FEF3C7', // Light amber - amber-100
        'warning-500': '#F59E0B', // Medium amber - amber-500
        'warning-700': '#B45309', // Dark amber - amber-700

        'error': '#DC2626', // Clear red error - red-600
        'error-50': '#FEF2F2', // Very light red - red-50
        'error-100': '#FEE2E2', // Light red - red-100
        'error-500': '#EF4444', // Medium red - red-500
        'error-700': '#B91C1C', // Dark red - red-700

        // Border Colors
        'border': '#E2E8F0', // Light gray border - slate-200
        'border-secondary': '#CBD5E1', // Secondary border - slate-300
        'border-focus': '#0EA5E9', // Focus border - sky-500
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'floating': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in': 'slideIn 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}