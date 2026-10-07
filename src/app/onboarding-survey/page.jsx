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
const BUDGET_STEP = 5




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

function SwipeStep({
  progressFrom,
  onBack,
  liked,
  onLikedChange,
  currentIndex,
  onIndexChange,
  onComplete,
}) {
  const [
    dragX,
    setDragX,
  ] = useState(0)

  const [
    dragging,
    setDragging,
  ] = useState(false)

  const [
    exiting,
    setExiting,
  ] = useState(null)

  const [
    cardReady,
    setCardReady,
  ] = useState(true)

  const startXRef =
    useRef(0)

  const currentCard =
    preferenceCards[
      currentIndex
    ]

  const nextCard =
    preferenceCards[
      currentIndex + 1
    ]

  useEffect(() => {
    if (!currentCard) {
      return
    }

    /*
     * Every newly promoted active card
     * must start from the exact center
     * with transition temporarily disabled.
     *
     * This prevents the previous card's
     * dragX / exit transform from leaking
     * into the new active card and causing
     * the extra left-to-center bounce.
     */
    setCardReady(false)

    setDragX(0)
    setDragging(false)
    setExiting(null)

    const frame =
      window.requestAnimationFrame(
        () => {
          setCardReady(true)
        }
      )

    return () => {
      window.cancelAnimationFrame(
        frame
      )
    }
  }, [currentIndex])

  const choose = (
    likedCard
  ) => {
    if (
      !currentCard ||
      exiting
    ) {
      return
    }

    let nextLiked =
      liked

    if (
      likedCard &&
      !liked.includes(
        currentCard.id
      )
    ) {
      nextLiked = [
        ...liked,
        currentCard.id,
      ]

      onLikedChange(
        nextLiked
      )
    }

    setDragging(false)

    const direction =
      likedCard
        ? 'right'
        : 'left'

    setExiting({
      direction,
      cardId:
        currentCard.id,
    })

    setDragX(
      likedCard
        ? 620
        : -620
    )

    window.setTimeout(
      () => {
        const nextIndex =
          currentIndex + 1

        if (
          nextIndex >=
          preferenceCards.length
        ) {
          onComplete(
            nextLiked
          )

          return
        }

        onIndexChange(
          nextIndex
        )
      },
      260
    )
  }

  const handlePointerDown = (
    event
  ) => {
    if (
      exiting ||
      !cardReady
    ) {
      return
    }

    setDragging(true)

    startXRef.current =
      event.clientX

    event.currentTarget
      .setPointerCapture?.(
        event.pointerId
      )
  }

  const handlePointerMove = (
    event
  ) => {
    if (
      !dragging ||
      exiting
    ) {
      return
    }

    const delta =
      event.clientX -
      startXRef.current

    setDragX(
      Math.max(
        -520,
        Math.min(
          520,
          delta
        )
      )
    )
  }

  const handlePointerUp =
    () => {
      if (
        !dragging ||
        exiting
      ) {
        return
      }

      if (
        dragX > 90
      ) {
        choose(true)

        return
      }

      if (
        dragX < -90
      ) {
        choose(false)

        return
      }

      setDragging(false)
      setDragX(0)
    }

  if (!currentCard) {
    return null
  }

  const rotation =
    dragX / 22

  const rightStrength =
    Math.min(
      Math.max(
        dragX / 140,
        0
      ),
      1
    )

  const leftStrength =
    Math.min(
      Math.max(
        -dragX / 140,
        0
      ),
      1
    )

  const currentIsExiting =
    exiting?.cardId ===
    currentCard.id

  return (
    <SurveyShell
      progressFrom={progressFrom}
      step={3}
      total={5}
      onBack={onBack}
      progressOverride={
        (
          2 +
          (
            currentIndex + 1
          ) /
            preferenceCards.length
        ) /
        5
      }
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
          pb-5
          pt-7
        "
      >
        <div className="shrink-0">
          <h1
            className={`${styles.motionItem} text-2xl font-bold leading-tight tracking-tight`}
            style={{ '--survey-delay': '90ms' }}
          >
            What feels like your
            kind of trip?
          </h1>

          <p
            className={`${styles.motionItem} mt-1 text-sm leading-relaxed text-muted-foreground`}
            style={{ '--survey-delay': '145ms' }}
          >
            Swipe right on what you
            like. Swipe left to skip.
          </p>
        </div>

        <div
          className={`${styles.motionItem} relative mt-5 flex min-h-[420px] flex-1 items-center justify-center`}
          style={{ '--survey-delay': '205ms' }}
        >
          {nextCard && (
            <div
              key={nextCard.id}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-0
                w-full
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-background
                shadow-md
                will-change-transform
              "
              style={{
                transform:
                  currentIsExiting
                    ? `
                        translate(-50%, -50%)
                        translateY(0px)
                        scale(1)
                      `
                    : `
                        translate(-50%, -50%)
                        translateY(14px)
                        scale(0.92)
                      `,
                opacity:
                  currentIsExiting
                    ? 1
                    : 0.84,
                transition: `
                  transform 280ms
                  cubic-bezier(
                    0.22,
                    1,
                    0.36,
                    1
                  ),
                  opacity 240ms ease
                `,
              }}
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  bg-muted
                "
              >
                <img
                  src={nextCard.image}
                  alt=""
                  draggable={false}
                  className="
                    size-full
                    object-cover
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/85
                    via-black/5
                    to-black/5
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black
                    transition-opacity
                    duration-200
                  "
                  style={{
                    opacity:
                      currentIsExiting
                        ? 0
                        : 0.12,
                  }}
                />

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-5
                    text-white
                  "
                >
                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    {nextCard.label}
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      leading-relaxed
                      text-white/85
                    "
                  >
                    {
                      nextCard.description
                    }
                  </p>

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {nextCard.tags.map(
                      (tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full
                            bg-white/15
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            backdrop-blur-sm
                          "
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            key={currentCard.id}
            onPointerDown={
              handlePointerDown
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerUp={
              handlePointerUp
            }
            onPointerCancel={
              handlePointerUp
            }
            className="
              relative
              z-10
              w-full
              touch-none
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-background
              shadow-xl
              select-none
              will-change-transform
            "
            style={{
              transform:
                currentIsExiting ||
                dragging
                  ? `
                      translateX(${dragX}px)
                      rotate(${rotation}deg)
                    `
                  : `
                      translateX(0px)
                      rotate(0deg)
                    `,
              transition:
                !cardReady ||
                dragging ||
                (
                  exiting &&
                  !currentIsExiting
                )
                  ? 'none'
                  : `
                      transform
                      260ms
                      cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                      )
                    `,
            }}
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                bg-muted
              "
            >
              <img
                src={currentCard.image}
                alt={currentCard.label}
                draggable={false}
                className="
                  size-full
                  object-cover
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/85
                  via-black/5
                  to-black/5
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-primary
                "
                style={{
                  opacity:
                    rightStrength *
                    0.38,
                }}
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-red-500
                "
                style={{
                  opacity:
                    leftStrength *
                    0.34,
                }}
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  left-5
                  top-5
                  rotate-[-8deg]
                  rounded-xl
                  border-2
                  border-white
                  bg-primary
                  px-3
                  py-1.5
                  text-sm
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                  shadow-sm
                "
                style={{
                  opacity:
                    rightStrength,
                }}
              >
                Like
              </div>

              <div
                className="
                  pointer-events-none
                  absolute
                  right-5
                  top-5
                  rotate-[8deg]
                  rounded-xl
                  border-2
                  border-white
                  bg-red-500
                  px-3
                  py-1.5
                  text-sm
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                  shadow-sm
                "
                style={{
                  opacity:
                    leftStrength,
                }}
              >
                Skip
              </div>

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  p-5
                  text-white
                "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {
                    currentCard.label
                  }
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-relaxed
                    text-white/85
                  "
                >
                  {
                    currentCard.description
                  }
                </p>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {currentCard.tags.map(
                    (tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          bg-white/15
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          backdrop-blur-sm
                        "
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.motionItem} mt-5 flex items-center justify-center gap-5`}
          style={{ '--survey-delay': '285ms' }}
        >
          <button
            type="button"
            onClick={() =>
              choose(false)
            }
            disabled={Boolean(exiting)}
            aria-label="Skip preference"
            className="
              flex
              size-14
              items-center
              justify-center
              rounded-full
              border
              border-red-200
              bg-red-50
              text-red-500
              shadow-sm
              transition
              active:scale-[0.94]
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <X className="size-6" />
          </button>

          <span
            className="
              min-w-12
              text-center
              text-xs
              text-muted-foreground
            "
          >
            {currentIndex + 1}
            {' / '}
            {
              preferenceCards.length
            }
          </span>

          <button
            type="button"
            onClick={() =>
              choose(true)
            }
            disabled={Boolean(exiting)}
            aria-label="Like preference"
            className="
              flex
              size-14
              items-center
              justify-center
              rounded-full
              bg-primary
              text-primary-foreground
              shadow-sm
              transition
              active:scale-[0.94]
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <Heart
              className="
                size-6
                fill-current
              "
            />
          </button>
        </div>
      </div>
    </SurveyShell>
  )
}


/* -------------------------------------------------
   BUDGET
-------------------------------------------------- */

/* -------------------------------------------------
   BUDGET COUNTER

   The visible number eases toward the slider value so
   dragging feels more like a rolling counter than a
   hard text replacement.
-------------------------------------------------- */
function BudgetCounter({
  value,
}) {
  const [
    displayValue,
    setDisplayValue,
  ] = useState(value)

  const displayValueRef =
    useRef(value)

  const frameRef =
    useRef(null)

  useEffect(() => {
    const target =
      Number(value) || 0

    if (frameRef.current) {
      window.cancelAnimationFrame(
        frameRef.current
      )
    }

    const animate = () => {
      const current =
        displayValueRef.current

      const distance =
        target - current

      if (
        Math.abs(distance) <
        0.5
      ) {
        displayValueRef.current =
          target

        setDisplayValue(
          target
        )

        frameRef.current =
          null

        return
      }

      const next =
        current +
        distance * 0.24

      displayValueRef.current =
        next

      setDisplayValue(
        next
      )

      frameRef.current =
        window.requestAnimationFrame(
          animate
        )
    }

    frameRef.current =
      window.requestAnimationFrame(
        animate
      )

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(
          frameRef.current
        )
      }
    }
  }, [value])

  const roundedValue =
    Math.round(
      displayValue
    )

  return (
    <div
      className="
        flex
        items-baseline
        justify-center
        font-bold
        tracking-[-0.04em]
        tabular-nums
      "
      aria-live="polite"
    >
      <span
        className="
          text-5xl
          leading-none
        "
      >
        ${roundedValue}
      </span>

      {roundedValue >=
        BUDGET_MAX && (
        <span
          className="
            ml-1
            text-3xl
            leading-none
            text-primary
          "
        >
          +
        </span>
      )}
    </div>
  )
}


function BudgetStep({
  progressFrom,
  name,
  selected,
  onChange,
  onBack,
  onNext,
}) {
  const displayName =
    name.trim() || 'traveler'

  const numericBudget =
    Number.isFinite(
      Number(selected)
    )
      ? Math.max(
          BUDGET_MIN,
          Math.min(
            BUDGET_MAX,
            Number(selected)
          )
        )
      : BUDGET_MIN

  const budgetProgress =
    (
      numericBudget -
      BUDGET_MIN
    ) /
    (
      BUDGET_MAX -
      BUDGET_MIN
    )

  const handleBudgetChange = (
    event
  ) => {
    onChange(
      Number(
        event.target.value
      )
    )
  }

  return (
    <SurveyShell
      progressFrom={progressFrom}
      step={4}
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
          overscroll-contain
          px-5
          pb-6
          pt-7
        "
      >
        <h1
          className={`${styles.motionItem} text-2xl font-bold tracking-tight`}
          style={{
            '--survey-delay':
              '90ms',
          }}
        >
          What&apos;s your budget, {displayName}?
        </h1>

        <div
          className={`${styles.motionItem} mt-8 flex flex-1 flex-col justify-center`}
          style={{
            '--survey-delay':
              '205ms',
          }}
        >
          {/* HOTEL ART PLACEHOLDER */}
          <div
            className="
              mx-auto
              flex
              h-44
              w-full
              max-w-[280px]
              items-center
              justify-center
              rounded-[2rem]
              border
              border-dashed
              border-border
              bg-surface/50
              px-6
              text-center
            "
            aria-hidden="true"
          >

          </div>

          {/* LIVE COUNTER */}
          <div
            className="
              mt-8
              text-center
            "
          >
            <BudgetCounter
              value={
                numericBudget
              }
            />

            <p
              className="
                mt-2
                text-sm
                text-muted-foreground
              "
            >
              per night
            </p>
          </div>

          {/* CONTINUOUS SLIDER */}
          <div
            className="
              mt-9
              px-1
            "
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  top-1/2
                  h-1.5
                  -translate-y-1/2
                  rounded-full
                  bg-surface
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-1/2
                  h-1.5
                  -translate-y-1/2
                  rounded-full
                  bg-primary
                "
                style={{
                  width:
                    `${budgetProgress * 100}%`,
                }}
              />

              <input
                type="range"
                min={
                  BUDGET_MIN
                }
                max={
                  BUDGET_MAX
                }
                step={
                  BUDGET_STEP
                }
                value={
                  numericBudget
                }
                onChange={
                  handleBudgetChange
                }
                aria-label="Nightly hotel budget"
                aria-valuemin={
                  BUDGET_MIN
                }
                aria-valuemax={
                  BUDGET_MAX
                }
                aria-valuenow={
                  numericBudget
                }
                aria-valuetext={
                  numericBudget >=
                  BUDGET_MAX
                    ? '$500 or more per night'
                    : `$${numericBudget} per night`
                }
                className="
                  relative
                  z-10
                  h-12
                  w-full
                  cursor-pointer
                  appearance-none
                  bg-transparent

                  [&::-webkit-slider-runnable-track]:h-1.5
                  [&::-webkit-slider-runnable-track]:bg-transparent

                  [&::-webkit-slider-thumb]:mt-[-7px]
                  [&::-webkit-slider-thumb]:size-5
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:border-[3px]
                  [&::-webkit-slider-thumb]:border-background
                  [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:shadow-md

                  [&::-moz-range-track]:h-1.5
                  [&::-moz-range-track]:bg-transparent

                  [&::-moz-range-thumb]:size-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-[3px]
                  [&::-moz-range-thumb]:border-background
                  [&::-moz-range-thumb]:bg-primary
                  [&::-moz-range-thumb]:shadow-md
                "
              />
            </div>

            <div
              className="
                mt-1
                flex
                items-center
                justify-between
                text-xs
                font-medium
                text-muted-foreground
              "
            >
              <span>
                $0
              </span>

              <span>
                $500+
              </span>
            </div>
          </div>
        </div>
      </section>

      <SurveyFooter>
        <Button
          type="button"
          size="lg"
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