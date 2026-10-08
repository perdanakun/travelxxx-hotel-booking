'use client'

import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  ArrowRight,
  Check,
  Heart,
  Sparkles,
  X,
} from 'lucide-react'

import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import {
  Button,
} from '@/components/ui/button'

import AppHeader from '@/components/AppHeader'
import LoadingScreen from '@/components/LoadingScreen'
import DestinationInput from '@/components/search/DestinationInput'
import DestinationMapCard from '@/components/search/DestinationMapCard'
import Intro from './Intro'
import styles from './OnboardingSurvey.module.css'
import { motion, animate, AnimatePresence, useMotionValue, useTransform, useSpring, useReducedMotion } from 'motion/react'

import {
  useTravelerProfile,
} from '@/context/TravelerProfileContext'

import {
  getTravelerProfile,
} from '@/lib/travelerProfile'

import {
  destinations,
} from '@/data/destinations'




/* -------------------------------------------------
   ONBOARDING LOADING
-------------------------------------------------- */
function OnboardingLoading({
  name,
  editMode = false,
}) {
  const router = useRouter()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace(
        editMode
          ? '/hotels'
          : '/explore'
      )
    }, 2200)

    return () => {
      window.clearTimeout(timer)
    }
  }, [
    router,
    editMode,
  ])

  return (
    <LoadingScreen
      title={
        editMode
          ? `Updating your trip, ${name}.`
          : `Finding your kind of trip, ${name}.`
      }
      messages={
        editMode
          ? [
              'Refreshing your travel style...',
              'Updating neighborhood matches...',
              'Updating stay recommendations...',
              'Saving your preferences...',
            ]
          : [
              'Reading your travel style...',
              'Finding neighborhoods...',
              'Matching stays...',
              'Preparing your Explore feed...',
            ]
      }
      interval={600}
    />
  )
}

/* -------------------------------------------------
   DATA
-------------------------------------------------- */

const preferenceCards = [
  {
    id: 'food-cafes',

    label:
      'Food & cafés',

    description:
      'Street food, coffee spots, bakeries, and places worth lingering around.',

    image:
      'https://images.unsplash.com/photo-1710572093946-3ac18aefff1a?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    tags: [
      'Food',
      'Cafés',
      'Local',
    ],
  },

  {
    id: 'walkable',

    label:
      'Walkable neighborhoods',

    description:
      'Areas where you can explore, eat, and wander without planning every move.',

    image:
      'https://images.unsplash.com/photo-1743485754201-2b438484b033?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    tags: [
      'Walkable',
      'Easy',
      'Neighborhood',
    ],
  },

  {
    id: 'quiet',

    label:
      'Quiet & relaxing',

    description:
      'A slower pace, calmer streets, and somewhere you can actually unwind.',

    image:
      'https://images.unsplash.com/photo-1709210974061-1dddba2dfc25?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    tags: [
      'Quiet',
      'Relaxed',
      'Slow',
    ],
  },

  {
    id: 'culture',

    label:
      'Culture & local life',

    description:
      'Places with history, crafts, neighborhoods, and a stronger sense of place.',

    image:
      'https://images.unsplash.com/photo-1590084505160-eb05e888643a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    tags: [
      'Culture',
      'Local',
      'Heritage',
    ],
  },

  {
    id: 'nature',

    label:
      'Nature nearby',

    description:
      'Greenery, cooler air, scenery, and easy access to outdoor escapes.',

    image:
      'https://images.unsplash.com/photo-1704287994766-3d76e0ca3264?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    tags: [
      'Nature',
      'Outdoors',
      'Scenic',
    ],
  },

  {
    id: 'lively',

    label:
      'Lively & social',

    description:
      'Busier streets, nightlife, popular spots, and plenty happening around you.',

    image:
      'https://images.unsplash.com/photo-1687677345376-ae90d26f6374?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    tags: [
      'Lively',
      'Social',
      'Nightlife',
    ],
  },
]


const stayPriorities = [
  'Location',
  'Price',
  'Comfort',
  'Local atmosphere',
]

const BUDGET_MIN = 0
const BUDGET_MAX = 500
const BUDGET_STEP = 10




/* -------------------------------------------------
   NAME
-------------------------------------------------- */

function NameStep({
  progressFrom,
  entryHandoff = false,
  name,
  onChange,
  onBack,
  onNext,
}) {
  const inputRef =
    useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const valid =
    name.trim().length > 0

  return (
    <SurveyShell
      progressFrom={progressFrom}
      entryHandoff={entryHandoff}
      step={1}
      total={5}
      onBack={onBack}
    >
      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          overflow-y-auto
          overscroll-contain
          px-5
          pb-6
          pt-8
        "
      >
        <h1
          className={`${styles.motionItem} text-2xl font-bold tracking-tight`}
          style={{ '--survey-delay': entryHandoff ? '360ms' : '140ms' }}
        >
          Hi, traveler!
        </h1>

        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(
            event
          ) =>
            onChange(
              event.target.value
            )
          }
          onKeyDown={(
            event
          ) => {
            if (
              event.key ===
                'Enter' &&
              valid
            ) {
              onNext()
            }
          }}
          placeholder="What should we call you?"
          className={`${styles.motionItem} mt-8 w-full rounded-xl border border-border bg-background px-4 py-4 text-lg font-medium outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15`}
          style={{ '--survey-delay': entryHandoff ? '460ms' : '220ms' }}
        />

        <p
          className={`${styles.motionItem} mt-3 text-xs text-muted-foreground`}
          style={{ '--survey-delay': entryHandoff ? '545ms' : '285ms' }}
        >
          Don't worry, you can change this later.
        </p>
      </div>

      <SurveyFooter delay={entryHandoff ? '650ms' : '360ms'}>
          <Button
            type="button"
            size="lg"
            disabled={!valid}
            onClick={onNext}
            className="w-full font-bold"
          >
            <span className="flex items-center justify-center gap-2">
              {valid
                ? "That’s me!"
                : "Continue"}
              <ArrowRight className="size-5" />
            </span>
          </Button>
      </SurveyFooter>
    </SurveyShell>
  )
}


/* -------------------------------------------------
   DESTINATION
-------------------------------------------------- */
function DestinationStep({
  progressFrom,
  name,
  destination,
  onDestinationChange,
  onBack,
  onNext,
}) {
  const displayName =
    name.trim() || 'traveler'

  return (
    <SurveyShell
      progressFrom={progressFrom}
      step={2}
      total={5}
      onBack={onBack}
    >
      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          overflow-y-auto
          overscroll-contain
          px-5
          pb-6
          pt-7
        "
      >
        <h1
          key={
            destination?.id
              ? `destination-${destination.id}`
              : 'destination-empty'
          }
          className={`${styles.motionItem} text-2xl font-bold tracking-tight`}
          style={{ '--survey-delay': '90ms' }}
        >
          {destination
            ? `That's great choice!`
            : `Hey, ${displayName}. Where to?`}
        </h1>

{/* MAP */}
<div
  className={`${styles.motionItem} mt-5`}
  style={{ '--survey-delay': '160ms' }}
>
  <DestinationMapCard
    destination={
      destination
    }
  />
</div>


        {/* DESTINATION SEARCH */}
<div
  className={`${styles.motionItem} relative z-30 mt-6`}
  style={{ '--survey-delay': '230ms' }}
>
  <DestinationInput
    id="onboarding-destination"
    value={destination}
    onChange={
      onDestinationChange
    }
    placeholder="Search city or destination"
  />
</div>

<p
  className={`${styles.motionItem} mt-2 text-xs text-muted-foreground`}
  style={{ '--survey-delay': '285ms' }}
>
  Currently only Yogyakarta
  is available in this prototype.
</p>




      </div>

      <SurveyFooter>
          <Button
            type="button"
            size="lg"
            disabled={!destination}
            onClick={onNext}
            className="w-full font-bold"
          >
            <span className="flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="size-5" />
            </span>
          </Button>
      </SurveyFooter>
    </SurveyShell>
  )
}


/* -------------------------------------------------
   SWIPE
-------------------------------------------------- */

// All gesture / timing knobs live here. Durations are in seconds (Motion API).
const SWIPE_MOTION = {
  threshold: 90,
  velocityThreshold: 650, // px/s, fast flick also counts
  dragElastic: 0.16,
  dragLimit: 280,
  tiltDegrees: 9,
  labelStart: 22,
  labelFull: 115,
  tossDistance: 1.8, // viewport width multiplier; card fully clears the frame
  tossLift: 110,
  tossRotation: 24,
  tossDuration: 0.48,
  tossEdgeTime: 0.78, // stay legible until the card has crossed the frame edge
  tossEndScale: 0.42, // subtle crumple only AFTER leaving the frame
  nextDelay: 0.17,
  nextDuration: 0.38,
  nextScale: 0.94,
  nextOffsetY: 16,
  nextOpacity: 0.78,
  releaseSpring: { type: 'spring', stiffness: 360, damping: 25, mass: 0.85 },
  nextSpring: { type: 'spring', stiffness: 260, damping: 27, mass: 0.9 },
  reduceDuration: 0.16,
}

function SwipeStep({
  progressFrom,
  onBack,
  liked,
  onLikedChange,
  currentIndex,
  onIndexChange,
  onComplete,
}) {
  const currentCard = preferenceCards[currentIndex]
  const nextCard = preferenceCards[currentIndex + 1]
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const [dragging, setDragging] = useState(false)
  const [exiting, setExiting] = useState(null)
  const pendingRef = useRef(null)
  const busyRef = useRef(false)

  // Gesture → tilt / feedback. These update outside React renders.
  const rotate = useTransform(x, [-SWIPE_MOTION.dragLimit, 0, SWIPE_MOTION.dragLimit],
    [-SWIPE_MOTION.tiltDegrees, 0, SWIPE_MOTION.tiltDegrees])
  const likeOpacity = useTransform(x, [SWIPE_MOTION.labelStart, SWIPE_MOTION.labelFull], [0, 1])
  const skipOpacity = useTransform(x, [-SWIPE_MOTION.labelFull, -SWIPE_MOTION.labelStart], [1, 0])
  const likeScale = useTransform(x, [0, SWIPE_MOTION.labelFull], [0.85, 1])
  const skipScale = useTransform(x, [-SWIPE_MOTION.labelFull, 0], [1, 0.85])
  const nextProgress = useTransform(x, value => Math.min(Math.abs(value) / 145, 1))
  const nextScaleTarget = useTransform(nextProgress, [0, 1], [SWIPE_MOTION.nextScale, 0.985])
  const nextYTarget = useTransform(nextProgress, [0, 1], [SWIPE_MOTION.nextOffsetY, 3])
  const nextScale = useSpring(nextScaleTarget, SWIPE_MOTION.nextSpring)
  const nextY = useSpring(nextYTarget, SWIPE_MOTION.nextSpring)

  // EXIT (480ms): 0-~375ms throw the almost full-size card outside the frame;
  // only the last ~105ms shrinks/fades it once fully off-screen.
  // Direction follows the swipe; next card starts lifting after 170ms.
  const tossVariant = (payload) => {
    const sign = payload?.direction ?? 1
    const start = x.get()
    const speed = Math.abs(payload?.velocity ?? 0)
    const viewport = typeof window !== 'undefined' ? window.innerWidth : 440
    const distance = Math.max(viewport, 440) * SWIPE_MOTION.tossDistance
    const edgeX = sign * distance * SWIPE_MOTION.tossEdgeTime

    if (reduceMotion) {
      return {
        x: sign * distance,
        opacity: [1, 1, 0],
        transition: { duration: SWIPE_MOTION.reduceDuration, ease: 'easeOut' },
      }
    }

    return {
      x: [start, start + sign * 35, edgeX, sign * distance],
      y: [0, -12, -SWIPE_MOTION.tossLift, -SWIPE_MOTION.tossLift + 25],
      rotate: [Math.max(-SWIPE_MOTION.tiltDegrees, Math.min(SWIPE_MOTION.tiltDegrees, start / 30)),
        sign * 12, sign * (SWIPE_MOTION.tossRotation + Math.min(speed / 160, 9)), sign * 35],
      scaleX: [1, 1.025, 0.96, SWIPE_MOTION.tossEndScale],
      scaleY: [1, 0.985, 0.96, SWIPE_MOTION.tossEndScale * 0.84],
      opacity: [1, 1, 1, 0],
      transition: {
        duration: SWIPE_MOTION.tossDuration,
        times: [0, 0.12, SWIPE_MOTION.tossEdgeTime, 1],
        ease: ['easeOut', [0.25, 0.8, 0.3, 1], 'easeIn'],
      },
    }
  }

  const choose = (isLike, velocity = 0) => {
    if (!currentCard || busyRef.current) return
    busyRef.current = true
    setDragging(false)
    const nextLiked = isLike && !liked.includes(currentCard.id)
      ? [...liked, currentCard.id]
      : liked
    if (nextLiked !== liked) onLikedChange(nextLiked)
    pendingRef.current = { nextLiked, nextIndex: currentIndex + 1 }
    setExiting({ direction: isLike ? 1 : -1, velocity })
  }

  const handleDragEnd = (_, info) => {
    setDragging(false)
    const released = x.get()
    const speed = info.velocity.x
    const passed = Math.abs(released) >= SWIPE_MOTION.threshold ||
      Math.abs(speed) >= SWIPE_MOTION.velocityThreshold
    if (passed) {
      // Fast flick direction follows velocity; deliberate drag follows displacement.
      const direction = Math.abs(speed) >= SWIPE_MOTION.velocityThreshold
        ? Math.sign(speed)
        : Math.sign(released)
      choose(direction > 0, speed)
    }
    // Otherwise Motion dragSnapToOrigin returns it using the soft spring below.
  }

  const handleExitComplete = () => {
    const pending = pendingRef.current
    if (!pending) return
    pendingRef.current = null
    x.set(0)
    setExiting(null)
    if (pending.nextIndex >= preferenceCards.length) {
      onComplete(pending.nextLiked)
    } else {
      // Promotion is centered; no outgoing transform is carried to the new card.
      onIndexChange(pending.nextIndex)
      busyRef.current = false
    }
  }

  const renderPhoto = (card, front) => (
    <div className={styles.swipePhotoFrame}>
      <img src={card.image} alt={front ? card.label : ''} draggable={false} className={styles.swipePhoto} />
      <div className={styles.swipePhotoGradient} aria-hidden="true" />
      <div className={styles.swipeCardCopy}>
        <h2 className="text-2xl font-bold">{card.label}</h2>
        <p className="mt-1 text-sm leading-relaxed text-white/85">{card.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {card.tags.map(tag => (
            <span key={tag} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  if (!currentCard) return null
  const active = dragging || Boolean(exiting)

  return (
    <SurveyShell
      progressFrom={progressFrom}
      step={3}
      total={5}
      onBack={onBack}
      progressOverride={(2 + (currentIndex + 1) / preferenceCards.length) / 5}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-5 pt-7">
        <div className="shrink-0">
          <h1 className={`${styles.motionItem} text-2xl font-bold leading-tight tracking-tight`} style={{ '--survey-delay': '90ms' }}>
            What feels like your kind of trip?
          </h1>
          <p className={`${styles.motionItem} mt-1 text-sm leading-relaxed text-muted-foreground`} style={{ '--survey-delay': '145ms' }}>
            Swipe right on what you like. Swipe left to skip.
          </p>
        </div>
        <div className={`${styles.motionItem} ${styles.swipeStage} relative mt-5 flex min-h-[420px] flex-1 items-center justify-center`} style={{ '--survey-delay': '205ms' }}>
          {nextCard && (
            <motion.div
              key={`next-${nextCard.id}`}
              className={styles.swipeNextCard}
              style={{ scale: exiting ? undefined : nextScale, y: exiting ? undefined : nextY }}
              initial={{ scale: SWIPE_MOTION.nextScale, y: SWIPE_MOTION.nextOffsetY, opacity: SWIPE_MOTION.nextOpacity }}
              animate={exiting
                ? { scale: 1, y: 0, opacity: 1 }
                : { opacity: SWIPE_MOTION.nextOpacity }}
              transition={reduceMotion
                ? { duration: SWIPE_MOTION.reduceDuration }
                : { ...SWIPE_MOTION.nextSpring, delay: exiting ? SWIPE_MOTION.nextDelay : 0 }}
              aria-hidden="true"
            >
              {renderPhoto(nextCard, false)}
            </motion.div>
          )}
          <AnimatePresence custom={exiting} onExitComplete={handleExitComplete} initial={false}>
            {!exiting && (
              <motion.div
                key={currentCard.id}
                className={styles.swipeActiveCard}
                role="group"
                aria-label={`Travel style ${currentIndex + 1} of ${preferenceCards.length}: ${currentCard.label}`}
                style={{ x, rotate: reduceMotion ? 0 : rotate, touchAction: 'none' }}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 1, scale: SWIPE_MOTION.nextScale, y: SWIPE_MOTION.nextOffsetY }}
                animate={{ opacity: 1, scale: 1, y: 0, scaleX: 1, scaleY: 1 }}
                variants={{ exit: tossVariant }}
                exit="exit"
                transition={reduceMotion
                  ? { duration: SWIPE_MOTION.reduceDuration }
                  : SWIPE_MOTION.nextSpring}
                drag="x"
                dragMomentum={false}
                dragSnapToOrigin
                dragTransition={SWIPE_MOTION.releaseSpring}
                dragElastic={SWIPE_MOTION.dragElastic}
                dragConstraints={{ left: -SWIPE_MOTION.dragLimit, right: SWIPE_MOTION.dragLimit }}
                onDragStart={() => setDragging(true)}
                onDragEnd={handleDragEnd}
                whileDrag={reduceMotion ? undefined : { scale: 1.012, y: -5 }}
              >
                {renderPhoto(currentCard, true)}
                <motion.div className={`${styles.swipeFeedback} ${styles.swipeFeedbackLike}`}
                  style={{ opacity: likeOpacity, scale: likeScale }} aria-hidden="true">
                  <Heart size={16} fill="currentColor" /> My vibe
                </motion.div>
                <motion.div className={`${styles.swipeFeedback} ${styles.swipeFeedbackSkip}`}
                  style={{ opacity: skipOpacity, scale: skipScale }} aria-hidden="true">
                  <X size={16} /> Not for me
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={`${styles.motionItem} mt-5 flex items-center justify-center gap-5`} style={{ '--survey-delay': '285ms' }}>
          <button type="button" onClick={() => choose(false)} disabled={active}
            aria-label="Skip preference"
            className="flex size-14 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm active:scale-[0.94] disabled:pointer-events-none disabled:opacity-50">
            <X className="size-6" />
          </button>
          <span className="min-w-12 text-center text-xs text-muted-foreground" aria-live="polite">
            {currentIndex + 1} / {preferenceCards.length}
          </span>
          <button type="button" onClick={() => choose(true)} disabled={active}
            aria-label="Like preference"
            className="flex size-14 items-center justify-center rounded-full text-white shadow-sm active:scale-[0.94] disabled:pointer-events-none disabled:opacity-50"
            style={{ backgroundColor: '#2F98EA' }}>
            <Heart className="size-6 fill-current" />
          </button>
        </div>
      </div>
    </SurveyShell>
  )
}


/* -------------------------------------------------
   BUDGET / HOTEL POP — GSAP, WHOLE SVG ONLY
-------------------------------------------------- */
// All tunable values live here. Stage boundaries follow the original specification.
const HOTEL_POP = {
  groundY: 0.877,
  stableMs: 180, // Slider must stay in the same stage before switching
  blankGap: 0.19, // Intentional empty beat AFTER complete deflation
  interruptedGap: 0.12,
  overshootUp: 1.075,
  overshootDown: 1.045,
  out: { duration: 0.31, ease: 'power2.in', stretchX: 1.06 },
  inflate: { duration: 0.46, ease: 'power2.out', startX: 0.74, endX: 0.965 },
  squash: { duration: 0.16, ease: 'sine.inOut', x: 1.025, y: 0.975 },
  settle: { duration: 0.42, ease: 'back.out(1.5)' },
  wobble: { start: 0.85, mid: -0.65 },
  idle: { duration: 2.2, y: 1.012, x: 0.994, ease: 'sine.inOut' },
  stageScale: { min: 0.96, max: 1, duration: 0.18 },
  crossfade: 0.2,
  // Half-open stage intervals: $50 belongs to 2, $160 to 3, $320 to 4.
  stages: [
    { stage: 1, min: 0, max: 49, name: 'Gubuk', fallback: '#B5E2FF' },
    { stage: 2, min: 50, max: 159, name: 'Homestay', fallback: '#82C9FA' },
    { stage: 3, min: 160, max: 319, name: 'Hotel Modern', fallback: '#559FE8' },
    { stage: 4, min: 320, max: 500, name: 'Resort Mewah', fallback: '#2F98EA' },
  ],
}

const stageForBudget = value =>
  HOTEL_POP.stages.find(item => value >= item.min && value <= item.max)
    ?? HOTEL_POP.stages[0]

// Load the same GSAP 3 runtime used by the standalone prototype, once per page.
let hotelGSAPPromise
function loadHotelGSAP() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Browser required'))
  if (window.gsap) return Promise.resolve(window.gsap)
  if (!hotelGSAPPromise) {
    hotelGSAPPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
      script.async = true
      script.onload = () => window.gsap ? resolve(window.gsap) : reject(new Error('GSAP unavailable'))
      script.onerror = () => reject(new Error('GSAP CDN failed to load'))
      document.head.appendChild(script)
    }).catch(error => { hotelGSAPPromise = null; throw error })
  }
  return hotelGSAPPromise
}

function hotelFallback(stage) {
  const fill = HOTEL_POP.stages[stage - 1].fallback
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254" width="1254" height="1254" role="img" aria-label="Hotel placeholder">
    <rect x="247" y="410" width="760" height="690" rx="84" fill="${fill}"/>
    <rect x="345" y="535" width="155" height="180" rx="26" fill="#FFFFFF" opacity=".85"/>
    <rect x="550" y="535" width="155" height="180" rx="26" fill="#FFFFFF" opacity=".85"/>
    <rect x="755" y="535" width="155" height="180" rx="26" fill="#FFFFFF" opacity=".85"/>
    <rect x="550" y="810" width="155" height="290" rx="28" fill="#FFFFFF" opacity=".85"/>
  </svg>`
}

function BudgetStep({ progressFrom, name, selected, onChange, onBack, onNext }) {
  const displayName = name.trim() || 'traveler'
  const numericBudget = Number.isFinite(Number(selected))
    ? Math.max(BUDGET_MIN, Math.min(BUDGET_MAX, Number(selected)))
    : BUDGET_MIN
  const targetStage = stageForBudget(numericBudget)
  const stageCopy = {
    1: `I feel you, ${displayName} Small budget, big adventure!`,
    2: `Keeping it cozy, ${displayName}? Love that!`,
    3: `Ooh, ${displayName}! Comfort looks good on you.`,
    4: `Wow, ${displayName}, you're living the luxe life! ✨`,
  }[targetStage.stage]
  const progress = (numericBudget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)
  const stageBoxRef = useRef(null)
  const priceRef = useRef(null)
  const thumbRef = useRef(null)
  const engineRef = useRef(null)
  const budgetRef = useRef(numericBudget)
  const [assetErrors, setAssetErrors] = useState([])
  const [scriptError, setScriptError] = useState('')
  const [assetsReady, setAssetsReady] = useState(false)

  budgetRef.current = numericBudget

  // 1. Fetch whole, untouched SVG strings; never animate internal SVG elements.
  useEffect(() => {
    let cancelled = false
    Promise.all(HOTEL_POP.stages.map(async item => {
      try {
        const response = await fetch(`/assets/mascots/stage-${item.stage}.svg`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const markup = await response.text()
        if (!/<svg[\s>]/i.test(markup)) throw new Error('Invalid SVG')
        return { stage: item.stage, markup, failed: false }
      } catch (error) {
        return { stage: item.stage, markup: hotelFallback(item.stage), failed: true }
      }
    })).then(items => {
      if (cancelled || !stageBoxRef.current) return
      items.forEach(item => {
        const idle = stageBoxRef.current.querySelector(`[data-stage="${item.stage}"] .${styles.hotelIdle}`)
        if (idle) idle.innerHTML = item.markup
      })
      setAssetErrors(items.filter(item => item.failed).map(item => item.stage))
      setAssetsReady(true)
    })
    return () => { cancelled = true }
  }, [])

  // 2. Initialise timeline engine after assets are in the DOM.
  useEffect(() => {
    if (!assetsReady) return
    let disposed = false
    loadHotelGSAP().then(gsap => {
      if (disposed || !stageBoxRef.current) return
      const root = stageBoxRef.current
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
      const elements = HOTEL_POP.stages.map(({ stage }) => {
        const el = root.querySelector(`[data-stage="${stage}"]`)
        return { stage: el, pop: el.querySelector(`.${styles.hotelPop}`), idle: el.querySelector(`.${styles.hotelIdle}`) }
      })
      const engine = {
        gsap, elements, reduce, visible: stageForBudget(budgetRef.current).stage,
        requested: stageForBudget(budgetRef.current).stage,
        timeline: null, timer: null, idleTween: null, scales: [],
        counter: { value: budgetRef.current }, priceTween: null,
      }
      engineRef.current = engine
      root.style.setProperty('--ground', `${HOTEL_POP.groundY * 100}%`)
      const reset = (activeStage = null) => {
        elements.forEach((element, index) => {
          gsap.killTweensOf([element.pop, element.idle])
          gsap.set(element.pop, { clearProps: 'transform' })
          gsap.set(element.idle, { clearProps: 'transform' })
          gsap.set(element.stage, { autoAlpha: activeStage === index + 1 ? 1 : 0 })
        })
      }
      reset(engine.visible)
      elements.forEach(element => {
        engine.scales.push(gsap.quickTo(element.stage, 'scale', {
          duration: HOTEL_POP.stageScale.duration, ease: 'power1.out',
        }))
      })
      const stopIdle = () => {
        engine.idleTween?.kill()
        engine.idleTween = null
      }
      const startIdle = stage => {
        stopIdle()
        if (engine.reduce.matches || stage == null) return
        const idle = elements[stage - 1].idle
        gsap.set(idle, { scaleX: 1, scaleY: 1 })
        engine.idleTween = gsap.to(idle, {
          scaleY: HOTEL_POP.idle.y, scaleX: HOTEL_POP.idle.x,
          duration: HOTEL_POP.idle.duration, ease: HOTEL_POP.idle.ease, repeat: -1, yoyo: true,
        })
      }
      engine.startIdle = startIdle

      // Single timeline per change. No overlap: old hotel completely vanishes,
      // short empty beat, then new hotel inflates from the SAME ground pivot.
      engine.transition = (to) => {
        const from = engine.visible
        if (from === to && !engine.timeline) return
        stopIdle()
        const interrupted = Boolean(engine.timeline)
        if (interrupted) engine.timeline.kill()
        engine.timeline = null
        // Interrupted hotel must NOT snap back to full height before deflating.
        // Clear everything to ground, then enter from an intentional blank frame.
        reset(interrupted ? null : from)
        const outgoing = interrupted ? null : elements[from - 1]
        const incoming = elements[to - 1]
        const outTime = outgoing ? HOTEL_POP.out.duration : 0
        const enterAt = outTime + (interrupted ? HOTEL_POP.interruptedGap : HOTEL_POP.blankGap)
        const tl = gsap.timeline({ onComplete: () => {
          engine.timeline = null
          engine.visible = to
          reset(to)
          const stage = stageForBudget(budgetRef.current)
          const t = Math.max(0, Math.min(1, (budgetRef.current - stage.min) / Math.max(1, stage.max - stage.min)))
          engine.scales[to - 1](HOTEL_POP.stageScale.min + t * (HOTEL_POP.stageScale.max - HOTEL_POP.stageScale.min))
          startIdle(to)
        } })
        engine.timeline = tl
        if (engine.reduce.matches) {
          if (outgoing) tl.to(outgoing.stage, { autoAlpha: 0, duration: HOTEL_POP.crossfade }, 0)
          tl.set(incoming.stage, { autoAlpha: 1 }, 0)
            .fromTo(incoming.stage, { opacity: 0 }, { opacity: 1, duration: HOTEL_POP.crossfade }, 0)
          return
        }
        // 1. OUT — deflate downward into y=87.7% ground.
        if (outgoing) tl.to(outgoing.pop, {
          scaleY: 0, scaleX: HOTEL_POP.out.stretchX,
          duration: HOTEL_POP.out.duration, ease: HOTEL_POP.out.ease,
        }, 0).set(outgoing.stage, { autoAlpha: 0 }, outTime)
        // 2. GAP — both SVGs hidden; smooth temporal handoff.
        tl.set(incoming.pop, { scaleX: HOTEL_POP.inflate.startX, scaleY: 0, rotation: HOTEL_POP.wobble.start }, enterAt)
          .set(incoming.stage, { autoAlpha: 1 }, enterAt)
          // 3a. Inflate from ground.
          .to(incoming.pop, {
            scaleX: HOTEL_POP.inflate.endX,
            scaleY: to > from ? HOTEL_POP.overshootUp : HOTEL_POP.overshootDown,
            duration: HOTEL_POP.inflate.duration, ease: HOTEL_POP.inflate.ease,
          }, enterAt)
          // 3b. Gentle squash.
          .to(incoming.pop, {
            scaleX: HOTEL_POP.squash.x, scaleY: HOTEL_POP.squash.y,
            duration: HOTEL_POP.squash.duration, ease: HOTEL_POP.squash.ease,
          })
          // 3c. Settle, then idle.
          .to(incoming.pop, {
            scaleX: 1, scaleY: 1, duration: HOTEL_POP.settle.duration,
            ease: HOTEL_POP.settle.ease,
          })
          // 3d. Tiny parallel wobble, rotating the WHOLE SVG only.
          .to(incoming.pop, {
            rotation: HOTEL_POP.wobble.mid, duration: HOTEL_POP.inflate.duration + HOTEL_POP.squash.duration,
            ease: 'sine.inOut',
          }, enterAt)
          .to(incoming.pop, {
            rotation: 0, duration: HOTEL_POP.settle.duration, ease: 'sine.out',
          }, enterAt + HOTEL_POP.inflate.duration + HOTEL_POP.squash.duration)
      }
      engine.sync = value => {
        const target = stageForBudget(value)
        const changed = engine.requested !== target.stage
        engine.requested = target.stage
        // Grow only the stage currently visible; don't scale an invisible incoming SVG.
        if (engine.visible === target.stage && !engine.timeline) {
          const t = Math.max(0, Math.min(1, (value - target.min) / Math.max(1, target.max - target.min)))
          if (!engine.reduce.matches) engine.scales[target.stage - 1](HOTEL_POP.stageScale.min + t * (HOTEL_POP.stageScale.max - HOTEL_POP.stageScale.min))
        }
        if (!changed) return
        clearTimeout(engine.timer)
        engine.timer = setTimeout(() => {
          engine.timer = null
          if (engine.requested === engine.visible && !engine.timeline) return
          engine.transition(engine.requested)
        }, HOTEL_POP.stableMs)
      }
      engine.sync(budgetRef.current)
      startIdle(engine.visible)
    }).catch(error => { if (!disposed) setScriptError(error.message) })
    return () => {
      disposed = true
      const engine = engineRef.current
      if (!engine) return
      clearTimeout(engine.timer)
      engine.timeline?.kill()
      engine.idleTween?.kill()
      engine.priceTween?.kill()
      engineRef.current = null
    }
  }, [assetsReady])

  // 9. Every slider input updates the budget immediately; visual stage waits 120ms.
  useEffect(() => {
    const engine = engineRef.current
    if (!engine) {
      if (priceRef.current) priceRef.current.textContent = `$${numericBudget}`
      return
    }
    engine.priceTween?.kill()
    if (engine.reduce.matches) {
      engine.counter.value = numericBudget
      if (priceRef.current) priceRef.current.textContent = `$${numericBudget}`
    } else {
      engine.priceTween = engine.gsap.to(engine.counter, {
        value: numericBudget, duration: 0.28, ease: 'power2.out',
        onUpdate: () => {
          if (priceRef.current) priceRef.current.textContent = `$${Math.round(engine.counter.value)}`
        },
      })
    }
    engine.sync(numericBudget)
  }, [numericBudget, assetsReady])

  const handleBudgetChange = event => {
    const value = Number(event.target.value)
    const stage = stageForBudget(value).stage
    onChange(value)
    window.dispatchEvent(new CustomEvent('budgetchange', { detail: { value, stage } }))
  }

  useEffect(() => {
    window.getBudget = () => ({ value: budgetRef.current, stage: stageForBudget(budgetRef.current).stage })
    return () => { delete window.getBudget }
  }, [])

  const thumbDown = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      thumbRef.current?.classList.add(styles.hotelDragging)
    }
  }
  const thumbUp = () => thumbRef.current?.classList.remove(styles.hotelDragging)

  return (
    <SurveyShell progressFrom={progressFrom} step={4} total={5} onBack={onBack}>
      <section className={`${styles.budgetViewport} flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-3 pt-5`}>
        <h1 className={`${styles.motionItem} shrink-0 text-2xl font-bold tracking-tight`} style={{ '--survey-delay': '90ms' }}>
          What&apos;s your budget, {displayName}?
        </h1>
        <div className={`${styles.motionItem} ${styles.budgetContent} mt-2 flex min-h-0 flex-1 flex-col justify-center`} style={{ '--survey-delay': '205ms' }}>
          {/* 10. Strict stacking: .stage > .pop > .idle > SVG (injected unchanged). */}
          <div ref={stageBoxRef} id="stage-box" className={styles.hotelStageBox}
            style={{ '--ground': `${HOTEL_POP.groundY * 100}%` }} aria-hidden="true">
            {HOTEL_POP.stages.map(item => (
              <div key={item.stage} className={styles.hotelStage} data-stage={item.stage}
                style={{ visibility: item.stage === targetStage.stage ? 'visible' : 'hidden' }}>
                <div className={styles.hotelPop}>
                  <div className={styles.hotelIdle} />
                </div>
              </div>
            ))}
          </div>
          {assetErrors.length > 0 && (
            <p role="alert" className={styles.hotelAssetError}>
              SVG tidak bisa dimuat: {assetErrors.map(n => `stage-${n}.svg`).join(', ')}. Placeholder ditampilkan.
            </p>
          )}
          {scriptError && <p role="alert" className={styles.hotelAssetError}>Animasi tidak tersedia: {scriptError}</p>}
          <div className="mt-1 text-center">
            <div ref={priceRef} className="text-5xl font-bold leading-none tracking-[-0.04em] tabular-nums">${numericBudget}</div>
            <p className="mt-2 text-base font-semibold text-foreground" aria-live="polite">
              {targetStage.name}
            </p>
            <p className="mt-1 min-h-10 px-2 text-sm leading-5 text-muted-foreground" aria-live="polite">{stageCopy}</p>
          </div>
          <div className="mt-4 shrink-0 px-1">
            <div className="relative">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface" />
              <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
              <div ref={thumbRef} className={styles.hotelRangeWrap}>
                <input type="range" min={BUDGET_MIN} max={BUDGET_MAX} step={BUDGET_STEP}
                  value={numericBudget} onChange={handleBudgetChange}
                  onPointerDown={thumbDown} onPointerUp={thumbUp} onPointerCancel={thumbUp}
                  onBlur={thumbUp} aria-label="Nightly hotel budget"
                  aria-valuetext={`$${numericBudget} per night, ${targetStage.name}`}
                  className={styles.hotelRange} />
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>$0</span><span>$500</span>
            </div>
          </div>
        </div>
      </section>
      <SurveyFooter>
        <Button type="button" size="lg" onClick={onNext} className="w-full font-bold">
          <span className="flex items-center justify-center gap-2">Continue <ArrowRight className="size-5" /></span>
        </Button>
      </SurveyFooter>
    </SurveyShell>
  )
}

/* -------------------------------------------------
   PRIORITY
-------------------------------------------------- */

function PriorityStep({
  progressFrom,
  selected,
  onToggle,
  onBack,
  onFinish,
}) {
  return (
    <SurveyShell
      progressFrom={progressFrom}
      step={5}
      total={5}
      onBack={onBack}
    >
      <section
        className="
          flex
          min-h-0
          flex-1
          flex-col
          overflow-y-auto
          px-5
          pb-6
          pt-7
        "
      >
        <h1
          className={`${styles.motionItem} text-2xl font-bold tracking-tight`}
          style={{ '--survey-delay': '90ms' }}
        >
          What matters most in a stay?
        </h1>

        <div
          className="mt-7 flex flex-col gap-3"
        >
          {stayPriorities.map(
            (
              option
            ) => {
              const active =
                selected.includes(
                  option
                )

              return (
                <Button
                  key={
                    option
                  }
                  type="button"
                  variant={
                    active
                      ? 'secondary'
                      : 'outline'
                  }
                  onClick={() =>
                    onToggle(
                      option
                    )
                  }
                  className={`${styles.motionItem} min-h-16 w-full justify-between rounded-2xl px-4 text-left text-base font-medium whitespace-normal active:scale-[0.99]`}
                  style={{ '--survey-delay': `${165 + stayPriorities.indexOf(option) * 55}ms` }}
                >
                  <span
                    className="
                      flex-1
                      text-left
                    "
                  >
                    {option}
                  </span>

                  {active ? (
                    <Check
                      className="
                        size-5
                        shrink-0
                      "
                    />
                  ) : (
                    <span
                      className="
                        size-5
                        shrink-0
                        rounded-full
                        border
                        border-border
                      "
                    />
                  )}
                </Button>
              )
            }
          )}
        </div>
      </section>

      <SurveyFooter>
          <Button
            type="button"
            size="lg"
            disabled={selected.length === 0}
            onClick={onFinish}
            className="w-full font-bold"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="size-5" />
              Build my trip
            </span>
          </Button>
      </SurveyFooter>
    </SurveyShell>
  )
}





/* -------------------------------------------------
   SHARED
-------------------------------------------------- */
function SurveyShell({
  step,
  total,
  onBack,
  progressFrom,
  entryHandoff = false,
  progressOverride,
  children,
}) {
  const progress =
    progressOverride ??
    step / total

  const [displayedProgress, setDisplayedProgress] =
    useState(
      entryHandoff
        ? 0
        : progressFrom ?? progress
    )

  useEffect(() => {
    if (entryHandoff) {
      /*
       * Paint the handoff seed at 0 first, then let CSS grow
       * it slowly to the Identity target (20%). Two frames make
       * sure the browser commits the starting state.
       */
      let secondFrame

      const firstFrame =
        window.requestAnimationFrame(() => {
          secondFrame =
            window.requestAnimationFrame(() => {
              setDisplayedProgress(progress)
            })
        })

      return () => {
        window.cancelAnimationFrame(firstFrame)

        if (secondFrame) {
          window.cancelAnimationFrame(secondFrame)
        }
      }
    }

    const frame =
      window.requestAnimationFrame(() => {
        setDisplayedProgress(progress)
      })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [progress, entryHandoff])

  return (
    <main
      className="
        flex
        h-[100dvh]
        max-h-[100dvh]
        min-h-0
        flex-col
        overflow-hidden
        bg-background
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      <div
        className={`${styles.shellHeader} ${entryHandoff ? styles.shellHeaderHandoff : ''}`}
        style={{ '--survey-delay': entryHandoff ? '0ms' : '40ms' }}
      >
        <AppHeader
          showBack
          onBack={onBack}
          sticky={false}
        />
      </div>

      {/* PROGRESS */}
      <div
        className={`${styles.progressStage} ${entryHandoff ? styles.progressStageHandoff : ''} shrink-0 px-5 pt-4`}
        style={{ '--survey-delay': entryHandoff ? '500ms' : '85ms' }}
      >
        <div
          className="
            h-1.5
            overflow-hidden
            rounded-full
            bg-surface
          "
        >
          <div
            className={`${styles.progressFill} ${entryHandoff ? styles.progressFillHandoff : ''} h-full rounded-full bg-primary`}
            style={{
              width: `${
                Math.max(
                  0,
                  Math.min(
                    1,
                    displayedProgress
                  )
                ) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {children}
    </main>
  )
}

function SurveyFooter({
  children,
  delay = '340ms',
}) {
  return (
    <footer
      className={`${styles.motionItem} sticky bottom-0 z-40 shrink-0 border-t border-border bg-background px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4`}
      style={{ '--survey-delay': delay }}
    >
      {children}
    </footer>
  )
}


/* -------------------------------------------------
   PAGE
-------------------------------------------------- */
function OnboardingSurveyContent() {
  const router =
    useRouter()

  const searchParams =
    useSearchParams()

  const {
  setProfile,
} = useTravelerProfile()

  const editPreferences =
    searchParams.get(
      'mode'
    ) === 'preferences'

  const existingProfile =
    getTravelerProfile()

  const [
    screen,
    setScreen,
  ] = useState(
    editPreferences
      ? 'destination'
      : 'intro'
  )

  const [
    transitionFromProgress,
    setTransitionFromProgress,
  ] = useState(0)

  const [
    entryHandoff,
    setEntryHandoff,
  ] = useState(false)

  const [
    name,
    setName,
  ] = useState(
    editPreferences
      ? existingProfile?.name ?? ''
      : ''
  )

const [
  destination,
  setDestination,
] = useState(() => {
  if (
    editPreferences &&
    existingProfile?.destination
  ) {
    return (
      destinations.find(
        (item) =>
          item.id ===
          existingProfile
            .destination.id
      ) ?? null
    )
  }

  return null
})

  /*
   * Swipe preferences are intentionally
   * restarted when editing.
   *
   * This prevents old likes from remaining
   * selected when the user swipes left.
   */
  const [
    likedPreferences,
    setLikedPreferences,
  ] = useState([])

  const [
    swipeIndex,
    setSwipeIndex,
  ] = useState(0)

  const [
    budget,
    setBudget,
  ] = useState(() => {
    if (
      editPreferences &&
      existingProfile?.budget
    ) {
      if (
        typeof
          existingProfile.budget.amount ===
        'number'
      ) {
        return Math.max(
          BUDGET_MIN,
          Math.min(
            BUDGET_MAX,
            existingProfile
              .budget
              .amount
          )
        )
      }

      /*
       * Compatibility with the previous
       * four-tier budget prototype.
       */
      const legacyBudgetMap = {
        budget: 300,
        value: 650,
        comfort: 450,
        premium: 500,
      }

      return (
        legacyBudgetMap[
          existingProfile
            .budget
            .id
        ] ??
        BUDGET_MIN
      )
    }

    return BUDGET_MIN
  })

  const [
    priorities,
    setPriorities,
  ] = useState(
    editPreferences
      ? existingProfile?.stayPriorities ?? []
      : []
  )

  const getCurrentProgress = () => {
    if (screen === 'name') {
      return 1 / 5
    }

    if (screen === 'destination') {
      return 2 / 5
    }

    if (screen === 'swipe') {
      return (
        2 +
        (swipeIndex + 1) /
          preferenceCards.length
      ) / 5
    }

    if (screen === 'budget') {
      return 4 / 5
    }

    if (screen === 'priority') {
      return 1
    }

    return 0
  }

  const goToScreen = (nextScreen) => {
    setTransitionFromProgress(
      getCurrentProgress()
    )

    setScreen(nextScreen)
  }


  const togglePriority = (
    option
  ) => {
    setPriorities(
      (current) =>
        current.includes(
          option
        )
          ? current.filter(
              (item) =>
                item !==
                option
            )
          : [
              ...current,
              option,
            ]
    )
  }

  const finishOnboarding =
    () => {
      const preferenceDetails =
        preferenceCards.filter(
          (item) =>
            likedPreferences.includes(
              item.id
            )
        )

      const selectedBudget =
        Math.max(
          BUDGET_MIN,
          Math.min(
            BUDGET_MAX,
            Number(budget) || 0
          )
        )

      const now =
        new Date()
          .toISOString()

      const profile = {
        name:
          name.trim(),

destination: {
  id: destination.id,
  name: destination.city,
  country:
    destination.country,
  label:
    destination.label,
},

        preferences:
          likedPreferences,

        preferenceLabels:
          preferenceDetails.map(
            (item) =>
              item.label
          ),

        budget: {
          amount:
            selectedBudget,

          label:
            selectedBudget >=
            BUDGET_MAX
              ? '$500+'
              : `$${selectedBudget}`,

          currency:
            'USD',

          unit:
            'night',
        },

        stayPriorities:
          priorities,

        profileLabel:
          getProfileLabel(
            likedPreferences
          ),

        createdAt:
          existingProfile?.createdAt ??
          now,

        updatedAt:
          now,
      }

setProfile(
  profile
)

setScreen(
  'matching'
)
    }

  if (
    screen === 'intro'
  ) {
    return (
      <Intro
        onStart={() => {
          /*
           * Intro already visually morphs into the first
           * survey progress state. Identity mounts directly
           * at 20% and keeps the handoff state stable for the
           * whole first screen to avoid a mid-screen restart.
           */
          setEntryHandoff(true)
          setTransitionFromProgress(0)
          setScreen('name')
        }}
      />
    )
  }

  if (
    screen === 'name'
  ) {
    return (
      <NameStep
        progressFrom={transitionFromProgress}
        entryHandoff={entryHandoff}
        name={name}
        onChange={
          setName
        }
        onBack={() => {
          setEntryHandoff(false)
          goToScreen('intro')
        }}
        onNext={() => {
          setEntryHandoff(false)
          goToScreen('destination')
        }}
      />
    )
  }

  if (
    screen ===
    'destination'
  ) {
    return (
<DestinationStep
        progressFrom={transitionFromProgress}
  name={name}
  destination={
    destination
  }
  onDestinationChange={
    setDestination
  }
  onBack={() => {
    if (editPreferences) {
      router.back()
      return
    }

    goToScreen('name')
  }}
  onNext={() => {
    setSwipeIndex(0)
    setLikedPreferences([])

    goToScreen('swipe')
  }}
/>
    )
  }

  if (
    screen === 'swipe'
  ) {
    return (
      <SwipeStep
        progressFrom={transitionFromProgress}
        liked={
          likedPreferences
        }
        onLikedChange={
          setLikedPreferences
        }
        currentIndex={
          swipeIndex
        }
        onIndexChange={
          setSwipeIndex
        }
        onBack={() =>
          goToScreen(
            'destination'
          )
        }
        onComplete={(
          liked
        ) => {
          setLikedPreferences(
            liked
          )

          goToScreen(
            'budget'
          )
        }}
      />
    )
  }

  if (
    screen === 'budget'
  ) {
    return (
      <BudgetStep
        progressFrom={transitionFromProgress}
        name={name}
        selected={
          budget
        }
        onChange={
          setBudget
        }
        onBack={() => {
          /*
           * Going back to swipe means
           * making a fresh set of choices.
           */
          setSwipeIndex(0)
          setLikedPreferences([])

          goToScreen(
            'swipe'
          )
        }}
        onNext={() =>
          goToScreen('priority')
        }
      />
    )
  }

  if (
    screen ===
    'priority'
  ) {
    return (
      <PriorityStep
        progressFrom={transitionFromProgress}
        selected={
          priorities
        }
        onToggle={
          togglePriority
        }
        onBack={() =>
          goToScreen(
            'budget'
          )
        }
        onFinish={finishOnboarding}
      />
    )
  }

  if (
    screen ===
    'matching'
  ) {
    return (
      <OnboardingLoading
        name={
          name.trim() ||
          'traveler'
        }
        editMode={
          editPreferences
        }
      />
    )
  }

  return null
}


/* -------------------------------------------------
   INTRO ROUTE HANDOFF FALLBACK

   Keep the last Home Opening frame visually alive while
   Suspense hydrates this route. This avoids inserting a
   generic LoadingScreen between the centered opening dot
   and Intro's first handoff frame.
-------------------------------------------------- */
function IntroRouteFallback() {
  return (
    <main
      className="
        relative
        grid
        h-dvh
        min-h-svh
        w-full
        place-items-center
        overflow-hidden
        bg-background

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
      aria-label="Opening TravelXXX"
    >
      <span
        aria-hidden="true"
        className="
          block
          size-[18px]
          rounded-full
          bg-primary
          shadow-[0_10px_26px_color-mix(in_srgb,var(--primary)_24%,transparent)]
        "
      />
    </main>
  )
}


/* -------------------------------------------------
   PROFILE LABEL
-------------------------------------------------- */

function getProfileLabel(
  preferences
) {
  if (
    preferences.includes(
      'quiet'
    ) &&
    preferences.includes(
      'walkable'
    )
  ) {
    return 'Relaxed explorer'
  }

  if (
    preferences.includes(
      'food-cafes'
    ) &&
    preferences.includes(
      'culture'
    )
  ) {
    return 'Local explorer'
  }

  if (
    preferences.includes(
      'nature'
    )
  ) {
    return 'Nature seeker'
  }

  if (
    preferences.includes(
      'lively'
    )
  ) {
    return 'Social explorer'
  }

  return 'Curious traveler'
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <IntroRouteFallback />
      }
    >
      <OnboardingSurveyContent />
    </Suspense>
  )
}