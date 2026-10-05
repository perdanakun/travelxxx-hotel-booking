'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  ArrowRight,
} from 'lucide-react'

import {
  Button,
} from '@/components/ui/button'

import styles from './Intro.module.css'


export default function Intro({
  onStart,
}) {
  const [phase, setPhase] =
    useState('idle')

  const [dotOrigin, setDotOrigin] =
    useState({
      x: 0,
      y: 0,
    })

  const [parallax, setParallax] =
    useState({
      x: 0,
      y: 0,
    })

  const screenRef = useRef(null)
  const buttonRef = useRef(null)
  const timersRef = useRef([])


  /* ---------------------------------------------
     CLEANUP
  ---------------------------------------------- */

  useEffect(() => {
    return () => {
      timersRef.current.forEach(
        (timer) => {
          window.clearTimeout(timer)
        }
      )
    }
  }, [])


  /* ---------------------------------------------
     TIMER
  ---------------------------------------------- */

  const queue = (
    callback,
    delay
  ) => {
    const timer =
      window.setTimeout(
        callback,
        delay
      )

    timersRef.current.push(timer)
  }


  /* ---------------------------------------------
     PARALLAX
  ---------------------------------------------- */

  const handlePointerMove = (
    event
  ) => {
    if (
      !screenRef.current ||
      phase !== 'idle'
    ) {
      return
    }

    const rect =
      screenRef.current
        .getBoundingClientRect()

    const normalizedX =
      (
        event.clientX -
        rect.left
      ) /
        rect.width -
      0.5

    const normalizedY =
      (
        event.clientY -
        rect.top
      ) /
        rect.height -
      0.5

    setParallax({
      x: normalizedX * 12,
      y: normalizedY * 9,
    })
  }


  const handlePointerLeave = () => {
    setParallax({
      x: 0,
      y: 0,
    })
  }


  /* ---------------------------------------------
     START
  ---------------------------------------------- */

  const handleStart = () => {
    if (phase !== 'idle') {
      return
    }

    const screen =
      screenRef.current

    const button =
      buttonRef.current

    if (
      screen &&
      button
    ) {
      const screenRect =
        screen.getBoundingClientRect()

      const buttonRect =
        button.getBoundingClientRect()

      setDotOrigin({
        x:
          buttonRect.left -
          screenRect.left +
          buttonRect.width / 2,

        y:
          buttonRect.top -
          screenRect.top +
          buttonRect.height / 2,
      })
    }


    /* button → circle */

    setPhase('circle')


    /* circle → white dot */

    queue(() => {
      setPhase('dot')
    }, 280)


    /* dot → center */

    queue(() => {
      setPhase('center')
    }, 350)


    /* bounce */

    queue(() => {
      setPhase('bounce')
    }, 760)


    /* expand */

    queue(() => {
      setPhase('expand')
    }, 1400)


    /* next screen */

    queue(() => {
      onStart()
    }, 2020)
  }


  /* ---------------------------------------------
     STATES
  ---------------------------------------------- */

  const isActive =
    phase !== 'idle'

  const showDot = [
    'dot',
    'center',
    'bounce',
    'expand',
  ].includes(phase)

  const dotIsCentered = [
    'center',
    'bounce',
    'expand',
  ].includes(phase)

  const dotIsBouncing =
    phase === 'bounce'

  const dotIsExpanding =
    phase === 'expand'


  /* ---------------------------------------------
     RENDER
  ---------------------------------------------- */

  return (
    <main
      ref={screenRef}
      className={styles.screen}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
    >
      {/* =========================================
          PARALLAX BACKGROUND
      ========================================== */}

      <div
        className={styles.parallaxScene}
      >
        <img
          src="/assets/images/intro-hero.png"
          alt=""
          draggable={false}
          className={styles.bgImage}
          style={{
            '--pointer-x':
              `${parallax.x}px`,

            '--pointer-y':
              `${parallax.y}px`,
          }}
        />
      </div>


      {/* optional readability overlay */}

      <div
        className={styles.overlay}
      />


      {/* =========================================
          CONTENT
      ========================================== */}

      <div
        className={styles.content}
      >
        <header
          className={styles.header}
        >
          <h1
            className={styles.logo}
          >
            TravelXXX
          </h1>

          <p
            className={styles.tagline}
          >
            Discover where to go
            <br />
            find where to stay
          </p>
        </header>
      </div>


      {/* =========================================
          CTA
      ========================================== */}

      <div
        className={styles.cta}
      >
        <div
          className={styles.ctaMotion}
        >
          <Button
            ref={buttonRef}
            type="button"
            size="lg"
            onClick={handleStart}
            aria-disabled={isActive}
            className={`
              ${styles.startButton}

              ${
                phase === 'circle'
                  ? styles.startButtonCircle
                  : ''
              }

              ${
                showDot
                  ? styles.startButtonHidden
                  : ''
              }
            `}
          >
            <span
              className={`
                ${styles.startLabel}

                ${
                  phase === 'circle' ||
                  showDot
                    ? styles.startLabelHidden
                    : ''
                }
              `}
            >
              Get started

              <ArrowRight
                className="size-5"
              />
            </span>
          </Button>
        </div>
      </div>


      {/* =========================================
          WHITE TRANSITION DOT
      ========================================== */}

      {showDot && (
        <div
          aria-hidden="true"
          className={`
            ${styles.transitionDot}

            ${
              dotIsCentered
                ? styles.transitionDotCenter
                : ''
            }

            ${
              dotIsBouncing
                ? styles.transitionDotBounce
                : ''
            }

            ${
              dotIsExpanding
                ? styles.transitionDotExpand
                : ''
            }
          `}
          style={{
            '--dot-start-x':
              `${dotOrigin.x}px`,

            '--dot-start-y':
              `${dotOrigin.y}px`,
          }}
        />
      )}
    </main>
  )
}