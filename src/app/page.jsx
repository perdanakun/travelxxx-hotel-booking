'use client'

import {
  useEffect,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import LoadingScreen from '@/components/LoadingScreen'

import {
  useTravelerProfile,
} from '@/context/TravelerProfileContext'


export default function HomePage() {
  const router =
    useRouter()

  const {
    profile,
    ready,
  } = useTravelerProfile()


  /* -------------------------------------------------
     ROUTING
  -------------------------------------------------- */

  useEffect(() => {
    /*
     * Wait until TravelerProfileContext
     * has finished reading localStorage.
     */
    if (!ready) {
      return
    }


    /*
     * A valid saved profile means
     * onboarding has already been
     * completed.
     */
    const hasProfile =
      Boolean(
        profile?.name
      )


    /*
     * Returning users get a slightly
     * longer branded transition.
     *
     * First visit only gets a short
     * opening transition.
     */
    const duration =
      hasProfile
        ? 1000
        : 700


    const timer =
      window.setTimeout(
        () => {
          if (hasProfile) {
            router.replace(
              '/explore'
            )

            return
          }

          router.replace(
            '/onboarding-survey'
          )
        },
        duration
      )


    return () => {
      window.clearTimeout(
        timer
      )
    }
  }, [
    ready,
    profile,
    router,
  ])


  /* -------------------------------------------------
     CONTEXT HYDRATION
  -------------------------------------------------- */

  if (!ready) {
    return (
      <LoadingScreen
        title="Opening TravelXXX"
        messages={[
          'Getting things ready...',
        ]}
      />
    )
  }


  /* -------------------------------------------------
     RETURNING USER
  -------------------------------------------------- */

  if (profile?.name) {
    return (
      <LoadingScreen
        title={`Welcome back, ${profile.name}.`}
        messages={[
          'Preparing your Explore...',
        ]}
      />
    )
  }


  /* -------------------------------------------------
     FIRST VISIT
  -------------------------------------------------- */

  return (
    <LoadingScreen
      title="Welcome to TravelXXX"
      messages={[
        'Getting your trip discovery ready...',
      ]}
    />
  )
}