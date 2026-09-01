export const currencies = {
  USD: {
    code: 'USD',
    label: 'USD',
    symbol: '$',
    locale: 'en-US',
    rate: 1,
  },

  IDR: {
    code: 'IDR',
    label: 'IDR',
    symbol: 'Rp',
    locale: 'id-ID',

    // Fixed demo rate for prototype only.
    // 1 USD = Rp16,000
    rate: 16000,
  },
}

export const defaultCurrency = 'USD'