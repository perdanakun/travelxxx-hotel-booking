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
  MapPin,
  Sparkles,
  X,
} from 'lucide-react'

import {
  useRouter,
} from 'next/navigation'

import {
  Button,
} from '@/components/ui/button'

import AppHeader from '@/components/AppHeader'

import {
  saveTravelerProfile,
} from '@/lib/travelerProfile'


/* -------------------------------------------------
   DATA
-------------------------------------------------- */

const preferenceCards = [
  {
    id: 'food-cafes',
    label: 'Food & cafés',
    description:
      'Street food, coffee spots, bakeries, and places worth lingering around.',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=85',
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
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85',
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
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85',
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
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
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
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
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
      'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=900&q=85',
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


/* -------------------------------------------------
   TRAVEL BUDDY
-------------------------------------------------- */
function TravelBuddy({
  size = 'md',
}) {
  const sizes = {
    sm: {
      body: 'size-12',
      eye: 'h-4 w-3',
      pupil: 'size-1.5',
      gap: 'gap-1.5',
      pupilOffset: 'bottom-1',
    },

    md: {
      body: 'size-20',
      eye: 'h-6 w-[18px]',
      pupil: 'size-2',
      gap: 'gap-2',
      pupilOffset: 'bottom-1.5',
    },

    lg: {
      body: 'size-28',
      eye: 'h-8 w-6',
      pupil: 'size-2.5',
      gap: 'gap-2.5',
      pupilOffset: 'bottom-2',
    },
  }

  const current =
    sizes[size] ?? sizes.md

  return (
    <div
      className={`
        relative
        ${current.body}
        shrink-0
        rounded-full
        bg-primary
        shadow-sm
        animate-[buddyBob_2.8s_ease-in-out_infinite]
      `}
    >
      {/* EYES */}
      <div
        className={`
          absolute
          left-1/2
          top-1/2
          flex
          -translate-x-1/2
          -translate-y-1/2
          items-center
          ${current.gap}
        `}
      >
        {/* LEFT EYE */}
 <div
  className={`
    relative
    ${current.eye}
    rounded-full
    bg-white
    overflow-hidden
    origin-center
    animate-[buddyBlink_4s_ease-in-out_infinite]
  `}
>
          <span
            className={`
              absolute
              ${current.pupilOffset}
              right-[20%]
              ${current.pupil}
              rounded-full
              bg-foreground
            `}
          />
        </div>

        {/* RIGHT EYE */}
<div
  className={`
    relative
    ${current.eye}
    rounded-full
    bg-white
    overflow-hidden
    origin-center
    animate-[buddyBlink_4s_ease-in-out_infinite]
  `}
>
          <span
            className={`
              absolute
              ${current.pupilOffset}
              left-[20%]
              ${current.pupil}
              rounded-full
              bg-foreground
            `}
          />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------
   SPEECH BUBBLE
-------------------------------------------------- */

function BuddyMessage({
  children,
  align = 'left',
}) {
  return (
    <div
      className={`
        relative
        max-w-[240px]
        rounded-2xl
        border
        border-border
        bg-background
        px-4
        py-3
        text-sm
        font-medium
        leading-relaxed
        text-foreground
        shadow-sm

        animate-in
        fade-in
        slide-in-from-bottom-2
        duration-500

        ${
          align === 'center'
            ? 'text-center'
            : ''
        }
      `}
    >
      {children}

      <span
        className="
          absolute
          -bottom-1.5
          left-8
          size-3
          rotate-45
          border-b
          border-r
          border-border
          bg-background
        "
      />
    </div>
  )
}




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
        {/* GUIDE */}
        <div
          className="
            flex
            flex-col
            items-center
          "
        >
          <BuddyMessage
            align="center"
          >
            Hi! I&apos;ll help you
            find your kind of trip.
          </BuddyMessage>

          <div className="mt-5">
            <TravelBuddy
              size="lg"
            />
          </div>
        </div>

        {/* BRAND */}
        <p
          className="
            mt-10
            text-xs
            font-bold
            tracking-[0.18em]
            text-primary
          "
        >
          TRAVELXXX
        </p>

        <h1
          className="
            mt-3
            max-w-sm
            text-3xl
            font-bold
            leading-[1.08]
            tracking-tight
            text-balance
          "
        >
          Discover where to go.
          Find where to stay.
        </h1>

        <p
          className="
            mt-4
            max-w-xs
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Travel inspiration with
          hotel options you can
          actually book.
        </p>
      </section>

      <footer
        className="
          shrink-0
          bg-background
          px-5
          pb-[calc(1.5rem+env(safe-area-inset-bottom))]
          pt-4
        "
      >
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
      </footer>

      <BuddyKeyframes />
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
      total={4}
      onBack={onBack}
    >
      <GuideRow>
        <TravelBuddy
          size="sm"
        />

        <BuddyMessage>
          What should I call you?
        </BuddyMessage>
      </GuideRow>

      <div
        className="
          flex
          flex-1
          flex-col
          px-5
          pt-8
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          Your name
        </h1>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          We&apos;ll use it to
          personalize your TravelXXX
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
            rounded-2xl
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
  onBack,
  onNext,
}) {
  return (
    <SurveyShell
      step={2}
      total={4}
      onBack={onBack}
    >
      <GuideRow>
        <TravelBuddy
          size="sm"
        />

        <BuddyMessage>
          Let&apos;s start with
          somewhere fun to explore.
        </BuddyMessage>
      </GuideRow>

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          px-5
          pt-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          Where do you want to
          explore?
        </h1>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          This prototype starts
          with Yogyakarta.
        </p>

        <button
          type="button"
          onClick={onNext}
          className="
            mt-7
            overflow-hidden
            rounded-2xl
            border
            border-primary
            bg-background
            text-left
            shadow-sm
            ring-1
            ring-primary
            transition
            active:scale-[0.99]
          "
        >
          <div
            className="
              relative
              aspect-[16/9]
              overflow-hidden
              bg-muted
            "
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85"
              alt="Yogyakarta"
              className="
                size-full
                object-cover
              "
            />

            <span
              className="
                absolute
                right-3
                top-3
                flex
                size-9
                items-center
                justify-center
                rounded-full
                bg-background/90
                text-primary
                shadow-sm
                backdrop-blur
              "
            >
              <Check
                className="size-4"
              />
            </span>
          </div>

          <div className="p-4">
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <MapPin
                className="
                  size-4
                  text-secondary
                "
              />

              <h2
                className="
                  text-lg
                  font-bold
                "
              >
                Yogyakarta
              </h2>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-muted-foreground
              "
            >
              Food, culture, nature,
              neighborhoods and stays.
            </p>
          </div>
        </button>
      </div>

      <SurveyFooter>
        <Button
          type="button"
          size="lg"
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

  const startXRef =
    useRef(0)

  const currentCard =
    preferenceCards[
      currentIndex
    ]

  const choose = (
    likedCard
  ) => {
    let nextLiked =
      liked

    if (
      likedCard &&
      currentCard &&
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

    setDragX(0)
    setDragging(false)

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
  }

  const handlePointerDown = (
    event
  ) => {
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
    if (!dragging) {
      return
    }

    const delta =
      event.clientX -
      startXRef.current

    setDragX(
      Math.max(
        -160,
        Math.min(
          160,
          delta
        )
      )
    )
  }

  const handlePointerUp =
    () => {
      if (!dragging) {
        return
      }

      if (dragX > 80) {
        choose(true)
        return
      }

      if (dragX < -80) {
        choose(false)
        return
      }

      setDragX(0)
      setDragging(false)
    }

  if (!currentCard) {
    return null
  }

  const rotation =
    dragX / 18

  const likeOpacity =
    Math.min(
      Math.max(
        dragX / 90,
        0
      ),
      1
    )

  const skipOpacity =
    Math.min(
      Math.max(
        -dragX / 90,
        0
      ),
      1
    )

  return (
    <SurveyShell
      step={3}
      total={4}
      onBack={onBack}
      progressOverride={
        (currentIndex + 1) /
        preferenceCards.length
      }
    >
      <GuideRow>
        <TravelBuddy
          size="sm"
          mood="thinking"
        />

        <BuddyMessage>
          Swipe right on what feels
          like you.
        </BuddyMessage>
      </GuideRow>

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          px-5
          pb-5
          pt-4
        "
      >
        <div
          className="
            relative
            flex
            min-h-0
            flex-1
            items-center
            justify-center
          "
        >
          {currentIndex + 1 <
            preferenceCards.length && (
            <div
              className="
                absolute
                inset-x-5
                bottom-3
                top-3
                scale-[0.96]
                rounded-3xl
                border
                border-border
                bg-surface
              "
            />
          )}

          <div
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
            "
            style={{
              transform: `
                translateX(${dragX}px)
                rotate(${rotation}deg)
              `,
              transition:
                dragging
                  ? 'none'
                  : 'transform 220ms ease',
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
                src={
                  currentCard.image
                }
                alt={
                  currentCard.label
                }
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

              {/* LIKE */}
              <div
                className="
                  absolute
                  left-4
                  top-4
                  rounded-xl
                  border-2
                  border-white
                  px-3
                  py-1.5
                  text-sm
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                "
                style={{
                  opacity:
                    likeOpacity,
                }}
              >
                Like
              </div>

              {/* SKIP */}
              <div
                className="
                  absolute
                  right-4
                  top-4
                  rounded-xl
                  border-2
                  border-white
                  px-3
                  py-1.5
                  text-sm
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                "
                style={{
                  opacity:
                    skipOpacity,
                }}
              >
                Skip
              </div>

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
                  {
                    currentCard.label
                  }
                </h2>

                <p
                  className="
                    mt-2
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
                    (
                      tag
                    ) => (
                      <span
                        key={
                          tag
                        }
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
                        {
                          tag
                        }
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
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
            className="
              flex
              size-14
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-background
              text-muted-foreground
              shadow-sm
              transition
              active:scale-[0.94]
            "
          >
            <X
              className="size-6"
            />
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
      step={4}
      total={4}
      onBack={onBack}
    >
      <GuideRow>
        <TravelBuddy
          size="sm"
        />

        <BuddyMessage>
          Last one. What matters
          most in a stay?
        </BuddyMessage>
      </GuideRow>

      <section
        className="
          flex
          min-h-0
          flex-1
          flex-col
          gap-3
          overflow-y-auto
          px-5
          pb-6
          pt-6
        "
      >
        <h1
          className="
            mb-2
            text-3xl
            font-bold
            tracking-tight
          "
        >
          Choose your priorities
        </h1>

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
   MATCHING
-------------------------------------------------- */

function Matching({
  name,
}) {
  const router =
    useRouter()

  const [
    message,
    setMessage,
  ] = useState(
    'Reading your travel style...'
  )

  useEffect(() => {
    const messages = [
      'Reading your travel style...',
      'Finding neighborhoods...',
      'Matching stays...',
      'Preparing your recommendations...',
    ]

    let index = 0

    const messageTimer =
      setInterval(() => {
        index =
          (index + 1) %
          messages.length

        setMessage(
          messages[index]
        )
      }, 600)

    const redirectTimer =
      setTimeout(() => {
        router.replace(
          '/explore'
        )
      }, 2200)

    return () => {
      clearInterval(
        messageTimer
      )

      clearTimeout(
        redirectTimer
      )
    }
  }, [router])

  return (
    <main
      className="
        flex
        h-[100dvh]
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-background
        px-5
        text-center
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      <BuddyMessage
        align="center"
      >
        Almost there,
        {' '}
        {name}!
      </BuddyMessage>

      <div className="mt-6">
        <TravelBuddy
          size="lg"
        />
      </div>

      <p
        className="
          mt-9
          text-xs
          font-bold
          tracking-[0.18em]
          text-primary
        "
      >
        TRAVELXXX
      </p>

      <h1
        className="
          mt-3
          text-3xl
          font-bold
          tracking-tight
        "
      >
        Finding your kind of trip...
      </h1>

      <p
        className="
          mt-3
          max-w-xs
          text-sm
          leading-relaxed
          text-muted-foreground
        "
      >
        {message}
      </p>

      <div
        className="
          mt-7
          flex
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

      <BuddyKeyframes />
    </main>
  )
}


/* -------------------------------------------------
   SHARED
-------------------------------------------------- */

function GuideRow({
  children,
}) {
  return (
    <div
      className="
        shrink-0
        px-5
        pt-5
      "
    >
      <div
        className="
          flex
          items-end
          gap-3
        "
      >
        {children}
      </div>
    </div>
  )
}


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
        trailing={`${step} / ${total}`}
        sticky={false}
      />

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

      <BuddyKeyframes />
    </main>
  )
}


function SurveyFooter({
  children,
}) {
  return (
    <footer
      className="
        shrink-0
        border-t
        border-border
        bg-background
        px-5
        pb-[calc(1.5rem+env(safe-area-inset-bottom))]
        pt-4
      "
    >
      {children}
    </footer>
  )
}


function BuddyKeyframes() {
  return (
    <style jsx global>{`
      @keyframes buddyBob {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-4px);
        }
      }

      @keyframes buddyBlink {
        0%,
        44%,
        48%,
        100% {
          transform: scaleY(1);
        }

        46% {
          transform: scaleY(0.08);
        }
      }
    `}</style>
  )
}


/* -------------------------------------------------
   PAGE
-------------------------------------------------- */

export default function Page() {
  const [
    screen,
    setScreen,
  ] = useState('intro')

  const [
    name,
    setName,
  ] = useState('')

  const [
    likedPreferences,
    setLikedPreferences,
  ] = useState([])

  const [
    swipeIndex,
    setSwipeIndex,
  ] = useState(0)

  const [
    priorities,
    setPriorities,
  ] = useState([])

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

      const profile = {
        name:
          name.trim(),

        destination: {
          id: 'yogyakarta',
          name: 'Yogyakarta',
          country:
            'Indonesia',
        },

        preferences:
          likedPreferences,

        preferenceLabels:
          preferenceDetails.map(
            (item) =>
              item.label
          ),

        stayPriorities:
          priorities,

        profileLabel:
          getProfileLabel(
            likedPreferences
          ),

        createdAt:
          new Date()
            .toISOString(),
      }

      saveTravelerProfile(
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
        onChange={setName}
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
        onBack={() =>
          setScreen(
            'name'
          )
        }
        onNext={() =>
          setScreen(
            'swipe'
          )
        }
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
            'priority'
          )
        }}
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
            'swipe'
          )
        }
        onFinish={
          finishOnboarding
        }
      />
    )
  }

  return (
    <Matching
      name={
        name.trim() ||
        'traveler'
      }
    />
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