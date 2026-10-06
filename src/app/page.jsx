'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import {
  useTravelerProfile,
} from '@/context/TravelerProfileContext'

import styles from './HomeOpening.module.css'


const ENTRY_OPENING_TRANSFER_KEY =
  'travelxxx-entry-opening-transfer'


const OPENING_TIMING = {
  morphStart: 120,
  brandStart: 720,
  brandEnd: 1350,
  complete: 1800,
}


export default function HomePage() {
  const router =
    useRouter()

  const {
    profile,
    ready,
  } = useTravelerProfile()

  const [
    phase,
    setPhase,
  ] = useState('full')

  const [
    showBrand,
    setShowBrand,
  ] = useState(false)

  const [
    openingComplete,
    setOpeningComplete,
  ] = useState(false)


  /* ---------------------------------------------
     PREFETCH
  ---------------------------------------------- */

  useEffect(() => {
    router.prefetch(
      '/onboarding-survey'
    )

    router.prefetch(
      '/explore'
    )
  }, [router])


  /* ---------------------------------------------
     UNIVERSAL ENTRY OPENING

     Flow:
     fullscreen blue
     → shrink into dot
     → trave ● xxx
     → dot bounce
     → brand fades
     → route

     Total ≈ 1.3s
  ---------------------------------------------- */

  useEffect(() => {
    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

    const timers = []


    const queue = (
      callback,
      delay
    ) => {
      const timer =
        window.setTimeout(
          callback,
          delay
        )

      timers.push(
        timer
      )
    }


    /* -------------------------------------------
       REDUCED MOTION
    -------------------------------------------- */

    if (reducedMotion) {
      setPhase(
        'bounce'
      )

      setShowBrand(
        true
      )

      queue(
        () => {
          setShowBrand(
            false
          )

          setOpeningComplete(
            true
          )
        },
        420
      )


      return () => {
        timers.forEach(
          (timer) => {
            window.clearTimeout(
              timer
            )
          }
        )
      }
    }


    /* -------------------------------------------
       FULLSCREEN BLUE
       ↓
       DOT
    -------------------------------------------- */

    queue(
      () => {
        setPhase(
          'morph'
        )
      },
      OPENING_TIMING.morphStart
    )


    /* -------------------------------------------
       SHOW BRAND AROUND THE DOT
    -------------------------------------------- */

    queue(
      () => {
        setPhase(
          'bounce'
        )

        setShowBrand(
          true
        )
      },
      OPENING_TIMING.brandStart
    )


    /* -------------------------------------------
       FADE BRAND

       Keep the dot itself alive for the
       Home → Intro handoff.
    -------------------------------------------- */

    queue(
      () => {
        setShowBrand(
          false
        )
      },
      OPENING_TIMING.brandEnd
    )


    /* -------------------------------------------
       FINISH
    -------------------------------------------- */

    queue(
      () => {
        setOpeningComplete(
          true
        )
      },
      OPENING_TIMING.complete
    )


    return () => {
      timers.forEach(
        (timer) => {
          window.clearTimeout(
            timer
          )
        }
      )
    }
  }, [])


  /* ---------------------------------------------
     ROUTING

     Wait for:
     1. profile hydration
     2. opening complete
  ---------------------------------------------- */

  useEffect(() => {
    if (
      !ready ||
      !openingComplete
    ) {
      return
    }


    const hasProfile =
      Boolean(
        profile?.name
      )


    /* -------------------------------------------
       NEW VISITOR
       Continue centered dot → mascot intro
    -------------------------------------------- */

    if (!hasProfile) {
      window.sessionStorage
        .setItem(
          ENTRY_OPENING_TRANSFER_KEY,
          '1'
        )

      router.replace(
        '/onboarding-survey'
      )

      return
    }


    /* -------------------------------------------
       RETURNING VISITOR
    -------------------------------------------- */

    router.replace(
      '/explore'
    )
  }, [
    ready,
    openingComplete,
    profile,
    router,
  ])


  /* ---------------------------------------------
     RENDER
  ---------------------------------------------- */

  return (
    <main
      className={
        styles.screen
      }
      aria-label="Opening TravelXXX"
    >
      <div
        className={
          styles.stage
        }
        aria-hidden="true"
      >
        <span
          className={`
            ${styles.brandPart}
            ${styles.brandLeft}

            ${
              showBrand
                ? styles.brandVisible
                : ''
            }
          `}
        >
          Travel
        </span>

        <div
          className={`
            ${styles.dot}

            ${
              phase ===
              'morph'
                ? styles.dotMorph
                : ''
            }

            ${
              phase ===
              'bounce'
                ? styles.dotBounce
                : ''
            }
          `}
        />

        <span
          className={`
            ${styles.brandPart}
            ${styles.brandRight}

            ${
              showBrand
                ? styles.brandVisible
                : ''
            }
          `}
        >
          XXX
        </span>
      </div>
    </main>
  )
}
