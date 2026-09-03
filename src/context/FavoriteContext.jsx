'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const FavoriteContext =
  createContext(null)

const STORAGE_KEY =
  'travelxxx-favorites'

export function FavoriteProvider({
  children,
}) {
  const [
    favoriteHotelIds,
    setFavoriteHotelIds,
  ] = useState([])

  const [
    favoriteDestinationIds,
    setFavoriteDestinationIds,
  ] = useState([])

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          STORAGE_KEY
        )

      if (!stored) return

      const parsed =
        JSON.parse(stored)

      setFavoriteHotelIds(
        parsed.hotels ?? []
      )

      setFavoriteDestinationIds(
        parsed.destinations ??
          []
      )
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        hotels:
          favoriteHotelIds,

        destinations:
          favoriteDestinationIds,
      })
    )
  }, [
    favoriteHotelIds,
    favoriteDestinationIds,
  ])

  const toggleFavoriteHotel = (
    id
  ) => {
    setFavoriteHotelIds(
      (current) =>
        current.includes(id)
          ? current.filter(
              (item) =>
                item !== id
            )
          : [
              ...current,
              id,
            ]
    )
  }

  const toggleFavoriteDestination =
    (id) => {
      setFavoriteDestinationIds(
        (current) =>
          current.includes(id)
            ? current.filter(
                (item) =>
                  item !== id
              )
            : [
                ...current,
                id,
              ]
      )
    }

  const isFavoriteHotel = (
    id
  ) =>
    favoriteHotelIds.includes(
      id
    )

  const isFavoriteDestination = (
    id
  ) =>
    favoriteDestinationIds.includes(
      id
    )

  return (
    <FavoriteContext.Provider
      value={{
        favoriteHotelIds,
        favoriteDestinationIds,

        toggleFavoriteHotel,
        toggleFavoriteDestination,

        isFavoriteHotel,
        isFavoriteDestination,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavorite() {
  const context =
    useContext(
      FavoriteContext
    )

  if (!context) {
    throw new Error(
      'useFavorite must be used inside FavoriteProvider'
    )
  }

  return context
}