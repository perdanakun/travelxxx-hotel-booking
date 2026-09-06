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

  const [
    hydrated,
    setHydrated,
  ] = useState(false)

  // LOAD
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          STORAGE_KEY
        )

      if (stored) {
        const parsed =
          JSON.parse(stored)

        if (
          Array.isArray(
            parsed.hotelIds
          )
        ) {
          setFavoriteHotelIds(
            parsed.hotelIds
          )
        }

        if (
          Array.isArray(
            parsed.destinationIds
          )
        ) {
          setFavoriteDestinationIds(
            parsed.destinationIds
          )
        }
      }
    } catch (error) {
      console.error(
        'Failed to load favorites:',
        error
      )
    }

    setHydrated(true)
  }, [])

  // SAVE
  useEffect(() => {
    if (!hydrated) return

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        hotelIds:
          favoriteHotelIds,
        destinationIds:
          favoriteDestinationIds,
      })
    )
  }, [
    favoriteHotelIds,
    favoriteDestinationIds,
    hydrated,
  ])

  const toggleHotelFavorite = (
    hotelId
  ) => {
    setFavoriteHotelIds(
      (current) =>
        current.includes(hotelId)
          ? current.filter(
              (id) =>
                id !== hotelId
            )
          : [
              ...current,
              hotelId,
            ]
    )
  }

  const toggleDestinationFavorite = (
    destinationId
  ) => {
    setFavoriteDestinationIds(
      (current) =>
        current.includes(
          destinationId
        )
          ? current.filter(
              (id) =>
                id !==
                destinationId
            )
          : [
              ...current,
              destinationId,
            ]
    )
  }

  const isHotelFavorite = (
    hotelId
  ) =>
    favoriteHotelIds.includes(
      hotelId
    )

  const isDestinationFavorite = (
    destinationId
  ) =>
    favoriteDestinationIds.includes(
      destinationId
    )

  const count =
    favoriteHotelIds.length +
    favoriteDestinationIds.length

  return (
    <FavoriteContext.Provider
      value={{
        favoriteHotelIds,
        favoriteDestinationIds,

        toggleHotelFavorite,
        toggleDestinationFavorite,

        isHotelFavorite,
        isDestinationFavorite,

        hotelCount:
          favoriteHotelIds.length,

        destinationCount:
          favoriteDestinationIds.length,

        count,
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