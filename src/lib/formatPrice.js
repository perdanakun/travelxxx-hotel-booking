import {
  currencies,
  defaultCurrency,
} from '@/data/currency'

export function convertPrice(
  amount,
  fromCurrency = 'USD',
  toCurrency = defaultCurrency
) {
  const from =
    currencies[fromCurrency]

  const to =
    currencies[toCurrency]

  if (!from || !to) {
    return amount
  }

  // Convert source currency back to USD,
  // then convert USD to target currency.
  const amountInUSD =
    amount / from.rate

  return amountInUSD * to.rate
}

export function formatPrice(
  amount,
  {
    fromCurrency = 'USD',
    currency = defaultCurrency,
  } = {}
) {
  const config =
    currencies[currency] ??
    currencies[defaultCurrency]

  const converted =
    convertPrice(
      amount,
      fromCurrency,
      currency
    )

  return new Intl.NumberFormat(
    config.locale,
    {
      style: 'currency',
      currency: config.code,
      maximumFractionDigits: 0,
    }
  ).format(converted)
}

export function getFinalPrice(pricing) {
  return (
    pricing.base +
    pricing.taxes
  )
}