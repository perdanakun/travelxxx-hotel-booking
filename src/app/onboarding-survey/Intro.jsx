'use client'

import {
  useEffect,
  useLayoutEffect,
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


const ENTRY_OPENING_TRANSFER_KEY =
  'travelxxx-entry-opening-transfer'


const slides = [
  {
    id: 'welcome',
    asset: '/assets/mascots/Welcome.svg',
    title: 'Plan a trip that feels right',
    description:
      'Tell us how you like to travel, and we’ll help you choose where to stay with confidence.',
    motionClass: 'motionWelcome',
  },
  {
    id: 'discover',
    asset: '/assets/mascots/Discover.svg',
    title: 'Discover where to go',
    description:
      'Find places travelers love, picked to match your style instead of a long generic list.',
    motionClass: 'motionDiscover',
  },
  {
    id: 'find',
    asset: '/assets/mascots/Find.svg',
    title: 'Find where to stay',
    description:
      'Get areas and stays that fit your trip, so you book knowing it’s the right choice.',
    motionClass: 'motionFind',
  },
]


export default function Intro({
  onStart,
}) {
  const screenRef = useRef(null)
  const visualRef = useRef(null)
  const nextButtonRef = useRef(null)
  const pointerStartXRef = useRef(null)
  const timersRef = useRef([])

  const [slideIndex, setSlideIndex] =
    useState(0)

  const [copyMotion, setCopyMotion] =
    useState('entryHidden')

  /* Mascot 1 → 2 → 3 morph only. */
  const [morphPhase, setMorphPhase] =
    useState('idle')

  /* HomeOpening → first mascot handoff only. */
  const [entryActive, setEntryActive] =
    useState(true)

  const [entryPhase, setEntryPhase] =
    useState('hold')

  const [entryTarget, setEntryTarget] =
    useState({
      x: '50%',
      y: '50%',
    })

  const [isChangingSlide, setIsChangingSlide] =
    useState(false)

  const [buttonPulse, setButtonPulse] =
    useState(false)

  const [isFinishing, setIsFinishing] =
    useState(false)

  const [finishPoint, setFinishPoint] =
    useState({
      x: '50%',
      y: '88%',
    })

  const lastSlideIndex =
    slides.length - 1

  const slide =
    slides[slideIndex]

  const isLastSlide =
    slideIndex === lastSlideIndex


  /* ============================================
     TIMER HELPERS
  ============================================ */

  const queue = (
    callback,
    delay
  ) => {
    const timer =
      window.setTimeout(
        callback,
        delay
      )

    timersRef.current.push(
      timer
    )

    return timer
  }


  const clearTimers = () => {
    timersRef.current.forEach(
      (timer) => {
        window.clearTimeout(
          timer
        )
      }
    )

    timersRef.current = []
  }


  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [])


  /* ============================================
     HOME → INTRO HANDOFF

     HomeOpening:
     centered bouncing dot

     Intro:
     same centered dot
     → liquid glide to mascot center
     → pop into Welcome mascot
  ============================================ */

  useLayoutEffect(() => {
    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

    const cameFromOpening =
      window.sessionStorage
        .getItem(
          ENTRY_OPENING_TRANSFER_KEY
        ) === '1'


    /* -----------------------------------------
       DIRECT ENTRY / BACK TO INTRO

       Layout effect means this happens before
       the browser paints the temporary handoff.
    ------------------------------------------ */

    if (
      reducedMotion ||
      !cameFromOpening
    ) {
      if (reducedMotion) {
        window.sessionStorage
          .removeItem(
            ENTRY_OPENING_TRANSFER_KEY
          )
      }

      setEntryActive(false)
      setEntryPhase('done')
      setIsChangingSlide(false)
      setMorphPhase('idle')

      if (reducedMotion) {
        setCopyMotion('idle')
        return undefined
      }

      setCopyMotion('intro')

      const copyTimer =
        window.setTimeout(
          () => {
            setCopyMotion('idle')
          },
          760
        )

      return () => {
        window.clearTimeout(
          copyTimer
        )
      }
    }


    const screen =
      screenRef.current

    const visual =
      visualRef.current

    if (!screen || !visual) {
      setEntryActive(false)
      setEntryPhase('done')
      setCopyMotion('intro')
      return undefined
    }


    const screenRect =
      screen.getBoundingClientRect()

    const visualRect =
      visual.getBoundingClientRect()

    const targetX =
      visualRect.left -
      screenRect.left +
      visualRect.width / 2

    const targetY =
      visualRect.top -
      screenRect.top +
      visualRect.height / 2


    /* First painted frame remains at screen center. */

    setEntryTarget({
      x: `${targetX}px`,
      y: `${targetY}px`,
    })

    setEntryActive(true)
    setEntryPhase('hold')
    setIsChangingSlide(true)
    setMorphPhase('idle')
    setCopyMotion('entryHidden')


    /*
     * A short hold makes the final Home frame and
     * first Intro frame read as the same physical dot.
     */

    const glideTimer =
      window.setTimeout(
        () => {
          setEntryPhase('glide')
        },
        70
      )


    /*
     * Dot has reached mascot center.
     * Start dot burst and mascot growth together.
     */

    const popTimer =
      window.setTimeout(
        () => {
          setEntryPhase('pop')
          setCopyMotion('intro')
        },
        430
      )


    const settleTimer =
      window.setTimeout(
        () => {
          setEntryPhase('settle')
        },
        730
      )


    const doneTimer =
      window.setTimeout(
        () => {
          setEntryActive(false)
          setEntryPhase('done')
          setIsChangingSlide(false)
          setCopyMotion('idle')

          window.sessionStorage
            .removeItem(
              ENTRY_OPENING_TRANSFER_KEY
            )
        },
        900
      )


    return () => {
      window.clearTimeout(
        glideTimer
      )

      window.clearTimeout(
        popTimer
      )

      window.clearTimeout(
        settleTimer
      )

      window.clearTimeout(
        doneTimer
      )
    }
  }, [])


  /* ============================================
     FINAL TRANSITION POSITION
  ============================================ */

  const updateFinishPoint = () => {
    const screen =
      screenRef.current

    const button =
      nextButtonRef.current

    if (!screen || !button) {
      return
    }

    const screenRect =
      screen.getBoundingClientRect()

    const buttonRect =
      button.getBoundingClientRect()

    setFinishPoint({
      x: `${
        buttonRect.left -
        screenRect.left +
        buttonRect.width / 2
      }px`,
      y: `${
        buttonRect.top -
        screenRect.top +
        buttonRect.height / 2
      }px`,
    })
  }


  useEffect(() => {
    const frame =
      window.requestAnimationFrame(
        updateFinishPoint
      )

    const handleResize = () => {
      updateFinishPoint()
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    return () => {
      window.cancelAnimationFrame(
        frame
      )

      window.removeEventListener(
        'resize',
        handleResize
      )
    }
  }, [])


  /* ============================================
     SLIDE NAVIGATION

     Mascot flow:
     mascot → collapse → liquid dot → pop → mascot
  ============================================ */

  const goToSlide = (
    nextIndex
  ) => {
    if (
      isFinishing ||
      isChangingSlide ||
      nextIndex < 0 ||
      nextIndex > lastSlideIndex ||
      nextIndex === slideIndex
    ) {
      return
    }

    const goingForward =
      nextIndex > slideIndex

    setIsChangingSlide(true)
    setButtonPulse(true)

    setCopyMotion(
      goingForward
        ? 'exitForward'
        : 'exitBackward'
    )

    setMorphPhase(
      'collapse'
    )


    /* 1. Mascot collapses into local visual dot. */

    queue(
      () => {
        setMorphPhase(
          'liquid'
        )
      },
      260
    )


    /* 2. Swap content while mascot is hidden. */

    queue(
      () => {
        setSlideIndex(
          nextIndex
        )

        setCopyMotion(
          goingForward
            ? 'enterForward'
            : 'enterBackward'
        )
      },
      430
    )


    /* 3. Local dot pops into new mascot. */

    queue(
      () => {
        setMorphPhase(
          'pop'
        )
      },
      500
    )


    queue(
      () => {
        setMorphPhase(
          'settle'
        )
      },
      820
    )


    queue(
      () => {
        setMorphPhase(
          'idle'
        )

        setCopyMotion(
          'idle'
        )

        setIsChangingSlide(
          false
        )

        setButtonPulse(
          false
        )
      },
      980
    )
  }


  /* ============================================
     NEXT / FINISH
  ============================================ */

  const startFinishTransition = () => {
    if (
      isFinishing ||
      isChangingSlide
    ) {
      return
    }

    updateFinishPoint()

    setButtonPulse(true)
    setIsFinishing(true)

    queue(
      () => {
        onStart?.()
      },
      900
    )
  }


  const handleNext = () => {
    if (
      isFinishing ||
      isChangingSlide
    ) {
      return
    }

    if (!isLastSlide) {
      goToSlide(
        slideIndex + 1
      )
      return
    }

    startFinishTransition()
  }


  /* ============================================
     SWIPE
  ============================================ */

  const handlePointerDown = (
    event
  ) => {
    if (
      isFinishing ||
      isChangingSlide
    ) {
      return
    }

    pointerStartXRef.current =
      event.clientX

    event.currentTarget
      .setPointerCapture?.(
        event.pointerId
      )
  }


  const handlePointerUp = (
    event
  ) => {
    if (
      isFinishing ||
      isChangingSlide ||
      pointerStartXRef.current === null
    ) {
      pointerStartXRef.current = null
      return
    }

    const deltaX =
      event.clientX -
      pointerStartXRef.current

    pointerStartXRef.current = null

    if (Math.abs(deltaX) < 48) {
      return
    }

    if (
      deltaX < 0 &&
      slideIndex < lastSlideIndex
    ) {
      goToSlide(
        slideIndex + 1
      )
      return
    }

    if (
      deltaX > 0 &&
      slideIndex > 0
    ) {
      goToSlide(
        slideIndex - 1
      )
    }
  }


  const handlePointerCancel = () => {
    pointerStartXRef.current = null
  }


  /* ============================================
     CLASS HELPERS
  ============================================ */

  const copyMotionClass =
    copyMotion === 'entryHidden'
      ? styles.copyEntryHidden
      : copyMotion === 'intro'
        ? styles.copyIntro
        : copyMotion === 'exitForward'
          ? styles.copyExitForward
          : copyMotion === 'exitBackward'
            ? styles.copyExitBackward
            : copyMotion === 'enterForward'
              ? styles.copyEnterForward
              : copyMotion === 'enterBackward'
                ? styles.copyEnterBackward
                : styles.copyIdle


  const mascotMorphClass =
    entryActive
      ? entryPhase === 'pop'
        ? styles.mascotPop
        : entryPhase === 'settle'
          ? styles.mascotSettle
          : styles.mascotHidden

      : morphPhase === 'collapse'
        ? styles.mascotCollapse

        : morphPhase === 'liquid'
          ? styles.mascotHidden

          : morphPhase === 'pop'
            ? styles.mascotPop

            : morphPhase === 'settle'
              ? styles.mascotSettle

              : ''


  const morphDotClass =
    morphPhase === 'liquid'
      ? styles.morphDotLiquid
      : morphPhase === 'pop'
        ? styles.morphDotPop
        : ''


  const entryDotClass =
    entryPhase === 'glide'
      ? styles.entryHandoffGlide
      : entryPhase === 'pop'
        ? styles.entryHandoffPop
        : entryPhase === 'settle'
          ? styles.entryHandoffGone
          : styles.entryHandoffHold


  /* ============================================
     RENDER
  ============================================ */

  return (
    <main
      ref={screenRef}
      className={`
        ${styles.screen}
        ${
          entryActive
            ? styles.screenEntry
            : ''
        }
        ${
          isFinishing
            ? styles.screenFinishing
            : ''
        }
      `}
      style={{
        '--finish-x': finishPoint.x,
        '--finish-y': finishPoint.y,
        '--entry-target-x': entryTarget.x,
        '--entry-target-y': entryTarget.y,
      }}
    >
      {/* HOME → INTRO HANDOFF DOT
          Coordinates are relative to the full screen. */}
      {entryActive && (
        <div
          className={`
            ${styles.entryHandoffDot}
            ${entryDotClass}
          `}
          aria-hidden="true"
        />
      )}

      <section
        className={styles.slide}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* PROGRESS — TOP */}
        <div
          className={styles.dots}
          aria-label="Onboarding progress"
        >
          {slides.map(
            (item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  goToSlide(index)
                }
                disabled={
                  isFinishing ||
                  isChangingSlide
                }
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  index === slideIndex
                    ? 'step'
                    : undefined
                }
                className={`
                  ${styles.dot}
                  ${
                    index === slideIndex
                      ? styles.dotActive
                      : ''
                  }
                `}
              />
            )
          )}
        </div>

        {/* MASCOT STAGE */}
        <div
          ref={visualRef}
          className={`
            ${styles.visual}
            ${styles[slide.motionClass]}
          `}
          aria-hidden="true"
        >
          <img
            src={slide.asset}
            alt=""
            draggable={false}
            className={`
              ${styles.mascot}
              ${mascotMorphClass}
            `}
          />

          {/* Mascot 1 → 2 → 3 local morph dot only. */}
          <div
            className={`
              ${styles.morphDot}
              ${morphDotClass}
            `}
          />
        </div>

        {/* COPY */}
        <div
          className={`
            ${styles.copy}
            ${copyMotionClass}
          `}
          aria-live="polite"
        >
          <p className={styles.eyebrow}>
            {slide.eyebrow}
          </p>

          <h1 className={styles.title}>
            {slide.title}
          </h1>

          <p className={styles.description}>
            {slide.description}
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <Button
          ref={nextButtonRef}
          type="button"
          size="lg"
          onClick={handleNext}
          disabled={
            isFinishing ||
            isChangingSlide
          }
          className={`
            ${styles.nextButton}
            ${
              buttonPulse
                ? styles.nextButtonPulse
                : ''
            }
          `}
        >
          <span className={styles.nextLabel}>
            {slideIndex === 0
              ? 'Get Started'
              : slideIndex === 1
                ? 'Continue'
                : 'Start my profile'}
          </span>
        </Button>
      </footer>

      {isFinishing && (
        <div
          className={styles.finishLayer}
          aria-hidden="true"
        >
          <div
            className={styles.finishDot}
          />
        </div>
      )}
    </main>
  )
}
