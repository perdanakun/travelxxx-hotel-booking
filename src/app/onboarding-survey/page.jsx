'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  Compass,
  Sparkles,
} from 'lucide-react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import AppHeader from '@/components/AppHeader'

const sections = [
  {
    eyebrow: 'STEP 1 OF 5',
    title: "What's your budget per night?",
    copy: 'A starting point helps us surface stays that fit comfortably.',
    options: ['Under $50', '$50–100', '$100–200', '$200+'],
    multi: false,
  },
  {
    eyebrow: 'STEP 2 OF 5',
    title: "What's your kind of stay?",
    copy: 'Pick the moods that feel most like your trip.',
    options: [
      'Quiet & relaxing',
      'Lively & social',
      'Local & authentic',
      'Stylish & trendy',
    ],
    multi: true,
  },
  {
    eyebrow: 'STEP 3 OF 5',
    title: 'What do you want nearby?',
    copy: 'Choose the things that make a place worth exploring.',
    options: [
      'Food & cafés',
      'Shopping',
      'Nightlife',
      'Culture & sights',
      'Nature & outdoors',
    ],
    multi: true,
  },
  {
    eyebrow: 'STEP 4 OF 5',
    title: 'What matters about the area?',
    copy: 'Tell us what makes a neighborhood feel right.',
    options: [
      'Walkable',
      'Near public transport',
      'Close to attractions',
      'Local neighborhood',
      'Central location',
    ],
    multi: true,
  },
  {
    eyebrow: 'STEP 5 OF 5',
    title: 'Where do you want to go?',
    copy: 'Pick a destination that matches the kind of trip you have in mind.',
    options: [
      'Yogyakarta',
      'Jakarta',
      'Bali',
      'Singapore',
      'Kuala Lumpur',
      'Bangkok',
      'Tokyo',
      'Seoul',
      'Sydney',
      'Other',
    ],
    multi: false,
  },
]

function Choice({ label, selected, onClick }) {
  return (
    <Button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      variant={selected ? 'secondary' : 'outline'}
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
      <span className="flex-1 text-left">
        {label}
      </span>

      {selected ? (
        <Check
          aria-hidden="true"
          className="size-5 shrink-0"
        />
      ) : (
        <span
          aria-hidden="true"
          className="size-5 shrink-0 rounded-full border border-border"
        />
      )}
    </Button>
  )
}


function Intro({ onStart }) {
  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-background text-foreground md:mx-auto md:max-w-md">

<AppHeader
  showBack
  backHref="/"
  sticky={false}
/>

      <section className="flex flex-1 flex-col justify-center px-5 pb-32 pt-12">
        <div className="mb-10 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-[2rem] bg-secondary text-secondary-foreground shadow-sm">
            <Compass className="size-10" />
          </div>

          <div className="relative rounded-2xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed shadow-sm">
            <span className="absolute -left-2 top-5 size-3 rotate-45 border-b border-l border-border bg-surface" />

            Hi, I&apos;m here to help you find your kind of stay.
          </div>
        </div>

        <p className="text-xs font-bold tracking-[0.18em] text-primary">
          TRAVELXXX MATCHES
        </p>

        <h1 className="mt-5 max-w-sm text-4xl font-bold leading-[1.06] tracking-tight text-balance">
          Let&apos;s find your kind of stay.
        </h1>

        <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
          Tell us what your trip looks like, and we&apos;ll help narrow down
          the stays and areas that fit.
        </p>
      </section>

      <footer className="shrink-0 bg-background px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4">
<Button
  type="button"
  size="lg"
  onClick={onStart}
  className="w-full font-bold"
>
  Let&apos;s go

  <ArrowRight className="size-5" />
</Button>
      </footer>
    </div>
  )
}

function Matching() {
  const router = useRouter()

  const [message, setMessage] = useState(
    'Reading your travel style...'
  )

  useEffect(() => {
    const messages = [
      'Reading your travel style...',
      'Finding places with the right energy...',
      'Matching stays and areas for you...',
    ]

    let index = 0

    const messageTimer = setInterval(() => {
      index = (index + 1) % messages.length
      setMessage(messages[index])
    }, 900)

    const redirectTimer = setTimeout(() => {
      router.push('/search-personalize')
    }, 2800)

    return () => {
      clearInterval(messageTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center text-foreground md:mx-auto md:max-w-md">
      <div className="relative mb-8 flex size-28 items-center justify-center rounded-[2.5rem] bg-secondary text-secondary-foreground animate-pulse">
        <Sparkles
          className="size-12 animate-spin"
          style={{
            animationDuration: '3s',
          }}
        />

        <span className="absolute -right-2 -top-2 size-4 rounded-full bg-primary animate-bounce" />

        <span className="absolute -bottom-1 -left-2 size-3 rounded-full bg-primary/70 animate-bounce" />
      </div>

      <p className="text-xs font-bold tracking-[0.18em] text-primary">
        TRAVELXXX MATCHES
      </p>

      <h1 className="mt-5 text-3xl font-bold tracking-tight">
        Finding your matches...
      </h1>

      <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
        {message}
      </p>

      <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-surface">
        <div className="h-full w-1/2 rounded-full bg-primary animate-pulse" />
      </div>
    </main>
  )
}

export default function Page() {
  const [screen, setScreen] = useState('intro')
  const [step, setStep] = useState(0)

  const [answers, setAnswers] = useState([
    [],
    [],
    [],
    [],
    [],
  ])

  const current = sections[step]
  const selected = answers[step]

  const toggle = (option) => {
    setAnswers((all) =>
      all.map((answer, index) => {
        if (index !== step) {
          return answer
        }

        if (current.multi) {
          return answer.includes(option)
            ? answer.filter((item) => item !== option)
            : [...answer, option]
        }

        return [option]
      })
    )
  }

  const next = () => {
    if (step === sections.length - 1) {
      setScreen('matching')
    } else {
      setStep((value) => value + 1)
    }
  }

  const back = () => {
    setStep((value) => Math.max(value - 1, 0))
  }

  if (screen === 'intro') {
    return <Intro onStart={() => setScreen('survey')} />
  }

  if (screen === 'matching') {
    return <Matching />
  }

  return (
    <main className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-background text-foreground md:mx-auto md:max-w-md">
      {/* HEADER */}
      
<AppHeader
  showBack
  onBack={step > 0 ? back : undefined}
  backHref="/"
  trailing={`${step + 1} / ${sections.length}`}
  sticky={false}
/>

      {/* QUESTION */}
      <div className="shrink-0 px-5 pb-5 pt-8">
        {/* Progress bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${((step + 1) / sections.length) * 100}%`,
            }}
          />
        </div>

        <p className="mt-10 text-xs font-bold tracking-[0.18em] text-primary">
          {current.eyebrow}
        </p>

        <h1 className="mt-5 max-w-sm text-4xl font-bold leading-[1.06] tracking-tight text-balance">
          {current.title}
        </h1>

        <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
          {current.copy}
        </p>
      </div>

      {/* OPTIONS */}
      <section
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overscroll-contain
          px-5
          pb-6
          pt-6
          flex
          flex-col
          gap-3
        "
        aria-label={current.title}
      >
        {current.options.map((option) => (
          <Choice
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => toggle(option)}
          />
        ))}
      </section>

      {/* FOOTER */}
      <footer className="shrink-0 border-t border-border bg-background px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4">
      <Button
        type="button"
        size="lg"
        onClick={next}
        disabled={selected.length === 0}
        className="w-full font-bold"
      >
        {step === sections.length - 1 ? (
          <>
            <Sparkles className="size-5" />
            Find my matches
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="size-5" />
          </>
        )}
      </Button>

      <Button
        type="button"
        variant="link"
        onClick={() => setScreen('matching')}
        className="
          mt-2
          h-auto
          min-h-11
          w-full
          p-0
          text-sm
          font-normal
          text-muted-foreground
        "
      >
        Skip for now
      </Button>
      </footer>
    </main>
  )
}
