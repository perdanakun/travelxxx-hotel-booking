'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  ArrowRight,
  Check,
  Compass,
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

const budgetOptions = [
  {
    id: 'budget',
    label: 'Under Rp500K',
    shortLabel: '< Rp500K',
    min: 0,
    max: 500000,
  },
  {
    id: 'value',
    label: 'Rp500K – 800K',
    shortLabel: 'Rp500K–800K',
    min: 500000,
    max: 800000,
  },
  {
    id: 'comfort',
    label: 'Rp800K – 1.5M',
    shortLabel: 'Rp800K–1.5M',
    min: 800000,
    max: 1500000,
  },
  {
    id: 'premium',
    label: 'Rp1.5M+',
    shortLabel: 'Rp1.5M+',
    min: 1500000,
    max: null,
  },
]
/* -------------------------------------------------
   INTRO
-------------------------------------------------- */

function Intro({
  onStart,
}) {
  return (
    <main
      className="
        flex
        h-[100dvh]
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
      <section
        className="
          flex
          flex-1
          flex-col
          items-center
          justify-center
          px-5
          pb-10
          text-center
        "
      >
        {/* BRAND MARK */}
        <div
          className="
            flex
            size-22
            items-center
            justify-center
            rounded-full
            bg-primary
            text-secondary-foreground
          "
        >
          <Compass
            className="
              size-14
              animate-[spin_4s_linear_infinite]
            "
          />
        </div>

        {/* BRAND */}
        <h1
          className="
            mt-6
            max-w-sm
            text-2xl
            font-bold
            leading-[1.08]
            tracking-tight
            text-balance
          "
        >
          TravelXXX
        </h1>

        <p
          className="
            mt-1
            max-w-xs
            text-base
            leading-relaxed
            text-muted-foreground
          "
        >
          Discover where to go,
          find where to stay.
        </p>
      </section>

      <SurveyFooter>
        <Button
          type="button"
          size="lg"
          onClick={onStart}
          className="
            w-full
            font-bold
          "
        >
          Get started

          <ArrowRight
            className="size-5"
          />
        </Button>
      </SurveyFooter>
    </main>
  )
}


/* -------------------------------------------------
   NAME
-------------------------------------------------- */

function NameStep({
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
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          What should we call you?
        </h1>

        <p
          className="
            mt-1
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          We&apos;ll use your name
          across your TravelXXX
          experience.
        </p>

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
          placeholder="e.g. Dinda"
          className="
            mt-8
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-4
            py-4
            text-lg
            font-medium
            outline-none
            transition

            focus:border-primary
            focus:ring-2
            focus:ring-primary/15
          "
        />

        <p
          className="
            mt-3
            text-xs
            text-muted-foreground
          "
        >
          You can change this later
          from Profile.
        </p>
      </div>

      <SurveyFooter>
        <Button
          type="button"
          size="lg"
          disabled={!valid}
          onClick={onNext}
          className="
            w-full
            font-bold
          "
        >
          Continue

          <ArrowRight
            className="size-5"
          />
        </Button>
      </SurveyFooter>
    </SurveyShell>
  )
}


/* -------------------------------------------------
   DESTINATION
-------------------------------------------------- */
function DestinationStep({
  destination,
  onDestinationChange,
  onBack,
  onNext,
}) {
  const destinationSelected =
    Boolean(destination)

  return (
    <SurveyShell
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
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          Where to explore?
        </h1>

        <p
          className="
            mt-1
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Choose a destination to
          personalizing your profile.
        </p>

{/* MAP */}
<div className="mt-5">
  <DestinationMapCard
    destination={
      destination
    }
  />
</div>


        {/* DESTINATION SEARCH */}
<div className="relative z-30 mt-6">
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
  className="
    mt-2
    text-xs
    text-muted-foreground
  "
>
 Curently only Yogyakarta, Indonesia
  available in this prototype.
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
  Continue
  <ArrowRight className="size-5" />
</Button>
      </SurveyFooter>
    </SurveyShell>
  )
}


/* -------------------------------------------------
   SWIPE
-------------------------------------------------- */

function SwipeStep({
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
            className="
              text-2xl
              font-bold
              leading-tight
              tracking-tight
            "
          >
            What feels like your
            kind of trip?
          </h1>

          <p
            className="
              mt-1
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            Swipe right on what you
            like. Swipe left to skip.
          </p>
        </div>

        <div
          className="
            relative
            mt-5
            flex
            min-h-[420px]
            flex-1
            items-center
            justify-center
          "
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
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-5
          "
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

function BudgetStep({
  selected,
  onChange,
  onBack,
  onNext,
}) {
  return (
    <SurveyShell
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
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          What&apos;s your budget?
        </h1>

        <p
          className="
            mt-1
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Pick your usual budget for one night.
          We&apos;ll use it to find stays that fit.
        </p>

        <div
          className="
            mt-7
            flex
            flex-col
            gap-3
          "
        >
          {budgetOptions.map(
            (option) => {
              const active =
                selected === option.id

              return (
                <Button
                  key={option.id}
                  type="button"
                  variant={
                    active
                      ? 'secondary'
                      : 'outline'
                  }
                  onClick={() =>
                    onChange(option.id)
                  }
                  className="
                    min-h-16
                    w-full
                    justify-between
                    rounded-2xl
                    px-4
                    text-left
                    text-base
                    font-medium
                    whitespace-normal
                    active:scale-[0.99]
                  "
                >
                  <div>
                    <span
                      className="
                        block
                        font-semibold
                      "
                    >
                      {option.label}
                    </span>

                    <span
                      className="
                        mt-0.5
                        block
                        text-xs
                        font-normal
                        text-muted-foreground
                      "
                    >
                      per night
                    </span>
                  </div>

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
          disabled={!selected}
          onClick={onNext}
          className="
            w-full
            font-bold
          "
        >
          Continue

          <ArrowRight
            className="size-5"
          />
        </Button>
      </SurveyFooter>
    </SurveyShell>
  )
}

/* -------------------------------------------------
   PRIORITY
-------------------------------------------------- */

function PriorityStep({
  selected,
  onToggle,
  onBack,
  onFinish,
}) {
  return (
    <SurveyShell
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
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          What matters most in a
          stay?
        </h1>

        <p
          className="
            mt-1
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Choose what matters most
          when you pick a hotel.
        </p>

        <div
          className="
            mt-7
            flex
            flex-col
            gap-3
          "
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
                  className="
                    min-h-16
                    w-full
                    justify-between
                    rounded-2xl
                    px-4
                    text-left
                    text-base
                    font-medium
                    whitespace-normal
                    active:scale-[0.99]
                  "
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
          disabled={
            selected.length ===
            0
          }
          onClick={onFinish}
          className="
            w-full
            font-bold
          "
        >
          <Sparkles
            className="size-5"
          />

          Build my trip
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
  progressOverride,
  children,
}) {
  const progress =
    progressOverride ??
    step / total

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
      <AppHeader
        showBack
        onBack={onBack}
        sticky={false}
      />

      {/* PROGRESS */}
      <div
        className="
          shrink-0
          px-5
          pt-4
        "
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
            className="
              h-full
              rounded-full
              bg-primary
              transition-all
              duration-500
            "
            style={{
              width: `${
                Math.max(
                  0,
                  Math.min(
                    1,
                    progress
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
}) {
  return (
    <footer
      className="
        sticky
        bottom-0
        z-40
        shrink-0
        border-t
        border-border
        bg-background
        px-5
        pb-[calc(1rem+env(safe-area-inset-bottom))]
        pt-4
      "
    >
      {children}
    </footer>
  )
}


/* -------------------------------------------------
   PAGE
-------------------------------------------------- */
export default function Page() {
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
  ] = useState(
    editPreferences
      ? existingProfile?.budget?.id ?? ''
      : ''
  )

  const [
    priorities,
    setPriorities,
  ] = useState(
    editPreferences
      ? existingProfile?.stayPriorities ?? []
      : []
  )

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
        budgetOptions.find(
          (option) =>
            option.id === budget
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

        budget:
          selectedBudget
            ? {
                id:
                  selectedBudget.id,

                label:
                  selectedBudget.label,

                shortLabel:
                  selectedBudget.shortLabel,

                min:
                  selectedBudget.min,

                max:
                  selectedBudget.max,

                currency:
                  'IDR',

                unit:
                  'night',
              }
            : null,

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
        onStart={() =>
          setScreen(
            'name'
          )
        }
      />
    )
  }

  if (
    screen === 'name'
  ) {
    return (
      <NameStep
        name={name}
        onChange={
          setName
        }
        onBack={() =>
          setScreen(
            'intro'
          )
        }
        onNext={() =>
          setScreen(
            'destination'
          )
        }
      />
    )
  }

  if (
    screen ===
    'destination'
  ) {
    return (
<DestinationStep
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

    setScreen('name')
  }}
  onNext={() => {
    setSwipeIndex(0)
    setLikedPreferences([])

    setScreen('swipe')
  }}
/>
    )
  }

  if (
    screen === 'swipe'
  ) {
    return (
      <SwipeStep
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
          setScreen(
            'destination'
          )
        }
        onComplete={(
          liked
        ) => {
          setLikedPreferences(
            liked
          )

          setScreen(
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

          setScreen(
            'swipe'
          )
        }}
        onNext={() =>
          setScreen(
            'priority'
          )
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
        selected={
          priorities
        }
        onToggle={
          togglePriority
        }
        onBack={() =>
          setScreen(
            'budget'
          )
        }
        onFinish={
          finishOnboarding
        }
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