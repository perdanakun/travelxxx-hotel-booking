'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

import { translations } from '@/data/translations'

const LocaleContext = createContext(null)

export function LocaleProvider({
  children,
}) {
  const [locale, setLocale] =
    useState('en')

  const currency =
    locale === 'id'
      ? 'IDR'
      : 'USD'

  const toggleLocale = () => {
    setLocale((current) =>
      current === 'en'
        ? 'id'
        : 'en'
    )
  }

  const t =
    translations[locale] ??
    translations.en

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      currency,
      t,
    }),
    [locale, currency, t]
  )

  return (
    <LocaleContext.Provider
      value={value}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context =
    useContext(LocaleContext)

  if (!context) {
    throw new Error(
      'useLocale must be used inside LocaleProvider'
    )
  }

  return context
}