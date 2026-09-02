'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const CompareContext = createContext(null)

const STORAGE_KEY = 'travelxxx-compare'
const MAX_COMPARE = 3

export function CompareProvider({ children }) {
  const [comparedIds, setComparedIds] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (stored) {
        const parsed = JSON.parse(stored)

        if (Array.isArray(parsed)) {
          setComparedIds(parsed.slice(0, MAX_COMPARE))
        }
      }
    } catch (error) {
      console.error('Failed to load comparison:', error)
    }

    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(comparedIds)
    )
  }, [comparedIds, hydrated])

  const addToCompare = (hotelId) => {
    setComparedIds((current) => {
      if (current.includes(hotelId)) {
        return current
      }

      if (current.length >= MAX_COMPARE) {
        return current
      }

      return [...current, hotelId]
    })
  }

  const removeFromCompare = (hotelId) => {
    setComparedIds((current) =>
      current.filter((id) => id !== hotelId)
    )
  }

  const toggleCompare = (hotelId) => {
    setComparedIds((current) => {
      if (current.includes(hotelId)) {
        return current.filter((id) => id !== hotelId)
      }

      if (current.length >= MAX_COMPARE) {
        return current
      }

      return [...current, hotelId]
    })
  }

  const isCompared = (hotelId) =>
    comparedIds.includes(hotelId)

  return (
    <CompareContext.Provider
      value={{
        comparedIds,
        count: comparedIds.length,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isCompared,
        maxCompare: MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)

  if (!context) {
    throw new Error(
      'useCompare must be used inside CompareProvider'
    )
  }

  return context
}