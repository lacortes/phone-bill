const FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export const formatNumber = number => FORMATTER.format(number);