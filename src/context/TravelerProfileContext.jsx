'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  getTravelerProfile,
  saveTravelerProfile,
} from '@/lib/travelerProfile'


const TravelerProfileContext =
  createContext(null)


export function TravelerProfileProvider({
  children,
}) {
  const [
    profile,
    setProfileState,
  ] = useState(null)

  const [
    ready,
    setReady,
  ] = useState(false)


  useEffect(() => {
    const saved =
      getTravelerProfile()

    setProfileState(
      saved
    )

    setReady(true)
  }, [])


  const setProfile = (
    nextProfile
  ) => {
    setProfileState(
      nextProfile
    )

    saveTravelerProfile(
      nextProfile
    )
  }


  const updateProfile = (
    updates
  ) => {
    setProfileState(
      (current) => {
        if (!current) {
          return current
        }

        const next = {
          ...current,
          ...updates,

          updatedAt:
            new Date()
              .toISOString(),
        }

        saveTravelerProfile(
          next
        )

        return next
      }
    )
  }


  const value =
    useMemo(
      () => ({
        profile,
        ready,

        hasProfile:
          Boolean(profile),

        setProfile,
        updateProfile,
      }),
      [
        profile,
        ready,
      ]
    )


  return (
    <TravelerProfileContext.Provider
      value={value}
    >
      {children}
    </TravelerProfileContext.Provider>
  )
}


export function useTravelerProfile() {
  const context =
    useContext(
      TravelerProfileContext
    )

  if (!context) {
    throw new Error(
      'useTravelerProfile must be used inside TravelerProfileProvider'
    )
  }

  return context
}