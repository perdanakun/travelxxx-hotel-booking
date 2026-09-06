'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import LoadingScreen from '@/components/LoadingScreen'

import {
  getTravelerProfile,
  hasCompletedOnboarding,
} from '@/lib/travelerProfile'


export default function HomePage() {
  const router =
    useRouter()

  const [
    profile,
    setProfile,
  ] = useState(null)

  const [
    checked,
    setChecked,
  ] = useState(false)

  useEffect(() => {
    const travelerProfile =
      getTravelerProfile()

    const completed =
      hasCompletedOnboarding()

    const validProfile =
      Boolean(
        completed &&
        travelerProfile?.name
      )

    setProfile(
      validProfile
        ? travelerProfile
        : null
    )

    setChecked(true)
  }, [])


  useEffect(() => {
    if (!checked) {
      return
    }

    /*
     * Returning user gets slightly
     * longer branded preparation.
     *
     * First visit only needs a short
     * opening transition.
     */
    const duration =
      profile
        ? 1000
        : 700

    const timer =
      window.setTimeout(
        () => {
          if (profile) {
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
    checked,
    profile,
    router,
  ])


  /*
   * While localStorage is being
   * checked, use the same loading
   * visual too.
   */
  if (!checked) {
    return (
      <LoadingScreen
        title="Opening TravelXXX"
        messages={[
          'Getting things ready...',
        ]}
      />
    )
  }


  /*
   * RETURNING USER
   */
  if (profile) {
    return (
      <LoadingScreen
        title={`Welcome back, ${profile.name}.`}
        messages={[
          'Preparing your Explore...',
        ]}
      />
    )
  }


  /*
   * FIRST VISIT
   */
  return (
    <LoadingScreen
      title="Welcome to TravelXXX"
      messages={[
        'Getting your trip discovery ready...',
      ]}
    />
  )
}