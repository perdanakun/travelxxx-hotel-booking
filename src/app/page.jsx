'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import {
  Compass,
} from 'lucide-react'

import {
  getTravelerProfile,
  hasCompletedOnboarding,
} from '@/lib/travelerProfile'


export default function Page() {
  const router =
    useRouter()

  const [
    checking,
    setChecking,
  ] = useState(true)

  useEffect(() => {
    const profile =
      getTravelerProfile()

    const completed =
      hasCompletedOnboarding()

    /*
     * FIRST VISIT
     */
    if (
      !completed ||
      !profile
    ) {
      router.replace(
        '/onboarding-survey'
      )

      return
    }

    /*
     * RETURNING VISIT
     *
     * Small artificial delay so
     * branded preparation screen
     * can be perceived.
     */
    const timer =
      setTimeout(() => {
        router.replace(
          '/explore'
        )
      }, 850)

    setChecking(false)

    return () => {
      clearTimeout(
        timer
      )
    }
  }, [router])

  return (
    <main
      className="
        flex
        h-[100dvh]
        items-center
        justify-center
        overflow-hidden
        bg-background
        px-5
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* BRAND MARK */}
        <div
          className="
            flex
            size-16
            items-center
            justify-center
            rounded-2xl
            bg-secondary
            text-secondary-foreground
            shadow-sm

            animate-in
            fade-in
            zoom-in-95
            duration-500
          "
        >
          <Compass
            className="
              size-8
            "
          />
        </div>

        {/* BRAND */}
        <p
          className="
            mt-5
            text-xs
            font-bold
            uppercase
            tracking-[0.18em]
            text-primary

            animate-in
            fade-in
            slide-in-from-bottom-1
            duration-500
          "
        >
          TravelXXX
        </p>

        <h1
          className="
            mt-2
            text-xl
            font-bold
            tracking-tight

            animate-in
            fade-in
            slide-in-from-bottom-1
            duration-1000
          "
        >
          Preparing your trip
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground

            animate-in
            fade-in
            duration-700
          "
        >
          Finding places that
          match your travel style.
        </p>

        {/* LOADING */}
        <div
          className="
            mt-6
            flex
            items-center
            gap-1.5
          "
        >
          <span
            className="
              size-2
              rounded-full
              bg-primary
              animate-bounce
              [animation-delay:-0.2s]
            "
          />

          <span
            className="
              size-2
              rounded-full
              bg-primary
              animate-bounce
              [animation-delay:-0.1s]
            "
          />

          <span
            className="
              size-2
              rounded-full
              bg-primary
              animate-bounce
            "
          />
        </div>

        {checking && (
          <span
            className="
              sr-only
            "
          >
            Checking traveler
            profile...
          </span>
        )}
      </div>
    </main>
  )
}