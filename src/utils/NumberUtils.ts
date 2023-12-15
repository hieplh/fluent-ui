export const currencyFormat = (value: any, locale: string, currency: string) =>
  new Intl.NumberFormat(locale ? locale : 'en-US', {
    style: 'currency',
    currency: currency ? currency : 'USD',
  }).format(value);