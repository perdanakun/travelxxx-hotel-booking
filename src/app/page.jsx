'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Heart,
  MapPin,
  Compass,
  Play,
  Share2,
} from 'lucide-react'

import Link from 'next/link'

const feelings = [
  {
    title: 'Prawirotaman',
    location: 'Yogyakarta, Indonesia',
    activity: 'Street food, slow walks, local cafés',
    creator: '@rani.travels',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85',
    video: true,
    ratio: 'aspect-[4/5]',
  },
  {
    title: 'Ubud',
    location: 'Bali, Indonesia',
    activity: 'Yoga mornings, rice fields, soft adventures',
    creator: '@slowstays',
    image:
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=700&q=85',
    video: false,
    ratio: 'aspect-[9/16]',
  },
  {
    title: 'Kaliurang',
    location: 'Yogyakarta, Indonesia',
    activity: 'Cool air, forest trails, quiet views',
    creator: '@weekendroamer',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=85',
    video: false,
    ratio: 'aspect-[4/5]',
  },
  {
    title: 'Jalan Kaliurang',
    location: 'Yogyakarta, Indonesia',
    activity: 'Trendy cafés and local evening crowds',
    creator: '@citywalks',
    image:
      'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=700&q=85',
    video: true,
    ratio: 'aspect-[9/16]',
  },
]

const trips = [
  [
    'Scooter route',
    'Lisbon, Portugal',
    'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=160&q=80',
  ],
  [
    'Yoga retreat',
    'Ubud, Bali',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=160&q=80',
  ],
  [
    'Oktoberfest',
    'Munich, Germany',
    'https://images.unsplash.com/photo-1508170754725-6e9a5cf3e8c1?auto=format&fit=crop&w=160&q=80',
  ],
]

const hotels = [
  {
    title: 'Saffron Boutique Hotel',
    city: 'Prawirotaman, Yogyakarta',
    rating: '4.3',
    description:
      'A boutique stay close to cafés and neighborhood life.',
    base: 75,
    taxes: 12,
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=85',
  },
  {
    title: 'Lotus City Inn',
    city: 'Malioboro, Yogyakarta',
    rating: '3.9',
    description:
      'Simple rooms, great breakfast options nearby.',
    base: 60,
    taxes: 10,
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=500&q=85',
  },
  {
    title: 'Heritage Stay',
    city: 'Kotagede, Yogyakarta',
    rating: '4.6',
    description:
      'Comfort-forward rooms with quiet courtyards.',
    base: 110,
    taxes: 18,
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=85',
  },
]

function Chip({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        shrink-0
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-medium
        transition-all
        touch-manipulation
        active:scale-[0.98]

        ${
          active
            ? 'border-secondary bg-secondary text-secondary-foreground'
            : 'border-border bg-background text-muted-foreground hover:bg-surface'
        }
      `}
    >
      {children}
    </button>
  )
}

function FeelingCard({ item }) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="w-[230px] shrink-0 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className={`relative ${item.ratio}`}>
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 size-full object-cover"
        />

        {item.video && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-semibold text-background">
            <Play className="size-3 fill-current" />
            Video
          </span>
        )}

        <button
          type="button"
          aria-label={`Save ${item.title}`}
          onClick={() => setSaved(!saved)}
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
            shadow-sm
            backdrop-blur
            transition-transform
            active:scale-[0.94]
          "
        >
          <Heart
            className={`size-4 ${
              saved ? 'fill-primary text-primary' : ''
            }`}
          />
        </button>

        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px]">
          See original
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold">
              {item.title}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {item.location}
            </p>
          </div>

          <Share2 className="mt-1 size-3.5 text-muted-foreground" />
        </div>

        <p className="mt-3 text-sm leading-relaxed">
          {item.activity}
        </p>

        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{item.creator}</span>
          <span>Food + local life</span>
        </div>
      </div>
    </article>
  )
}

function HotelCard({ hotel, onCompare }) {
  const [compared, setCompared] = useState(false)

  const handleCompare = () => {
    if (!compared) {
      onCompare()
    }

    setCompared(!compared)
  }

  return (
    <article className="rounded-2xl border border-border bg-background p-3 shadow-sm">
      <div className="flex gap-3">
        <img
          src={hotel.image}
          alt={hotel.title}
          className="size-24 shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-2">
            <h3 className="font-bold leading-tight">
              {hotel.title}
            </h3>

            <span className="shrink-0 text-sm">
              {hotel.rating} ★
            </span>
          </div>

          <p className="mt-1 text-xs font-medium text-secondary">
            {hotel.city}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {hotel.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-2 text-xs text-muted-foreground">
        <span>Base ${hotel.base}</span>
        <span>+ Taxes ${hotel.taxes}</span>

        <strong className="text-sm text-foreground">
          Final ${hotel.base + hotel.taxes}
        </strong>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleCompare}
          className={`
            min-h-11
            flex-1
            rounded-xl
            border
            px-3
            py-2
            text-sm
            font-medium
            transition-all
            touch-manipulation
            active:scale-[0.98]

            ${
              compared
                ? 'border-secondary bg-secondary-muted text-secondary'
                : 'border-border bg-background hover:bg-surface'
            }
          `}
        >
          {compared
            ? 'Added to compare'
            : 'Add to compare'}
        </button>

        <button
          type="button"
          className="
            min-h-11
            rounded-full
            bg-primary
            px-5
            py-2
            text-sm
            font-semibold
            text-primary-foreground
            shadow-sm
            transition-transform
            touch-manipulation
            active:scale-[0.98]
          "
        >
          Book now
        </button>
      </div>
    </article>
  )
}

export default function Page() {
  const [activeTag, setActiveTag] = useState(
    'For your profile'
  )

  const [compared, setCompared] = useState(0)

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">

      {/* HEADER */}
<header
  className="
    sticky
    top-0
    z-50
    flex
    items-center
    justify-between
    border-b
    border-border
    bg-background/95
    px-5
    py-4
    backdrop-blur
  "
>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Compass className="size-5" />
          </span>

          <div>
            <p className="font-bold tracking-tight">
              TravelXXX
            </p>

            <p className="text-xs text-muted-foreground">
              Find your kind of stay
            </p>
          </div>
        </div>

        <button
          type="button"
          className="
            flex
            min-h-11
            min-w-11
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-background
            text-foreground
            transition-all
            touch-manipulation
            hover:bg-surface
            active:scale-[0.96]
          "
          aria-label="Open filters"
        >
          ☷
        </button>
      </header>

      {/* HERO */}
      <section className="px-5 pb-0 pt-0">

<Link
  href="/onboarding-survey"
  className="
    mt-5
    flex
    min-h-16
    w-full
    items-center
    gap-3
    rounded-2xl
    bg-secondary
    px-4
    py-3.5
    text-left
    text-secondary-foreground
    shadow-sm
    transition-transform
    touch-manipulation
    active:scale-[0.99]
  "
>
  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background/10 text-xl">
    ✦
  </span>

  <span className="flex-1">
    <strong className="block text-sm">
      Magic trip match planner
    </strong>
  </span>

  <ArrowRight className="size-4" />
</Link>
      </section>

      {/* SEARCH */}
      <section className="mx-5 mt-7 rounded-2xl border border-border bg-background p-4 shadow-sm">
        <h2 className="text-lg font-bold">
          Search stays
        </h2>

        <p className="text-sm text-muted-foreground">
          Compare the full price before you book.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <select className="min-h-12 rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary">
            <option>
              Where do you want to go?
            </option>

            <option>
              Yogyakarta, Indonesia
            </option>

            <option>
              Bali, Indonesia
            </option>

            <option>
              Lisbon, Portugal
            </option>
          </select>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              defaultValue="2026-09-22"
              className="min-h-12 rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />

            <input
              type="date"
              defaultValue="2026-09-26"
              className="min-h-12 rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="flex min-h-12 items-center justify-between rounded-xl border border-border px-3 py-2.5 text-sm">
            <span>2 guests, 1 room</span>

            <span className="text-muted-foreground">
              − &nbsp; +
            </span>
          </div>

          <button
            type="button"
            className="
              mt-1
              flex
              min-h-14
              w-full
              items-center
              justify-center
              rounded-full
              bg-primary
              px-5
              text-sm
              font-bold
              text-primary-foreground
              shadow-sm
              transition-transform
              touch-manipulation
              active:scale-[0.98]
            "
          >
            Search hotels
          </button>
        </div>
      </section>

      {/* ACTIVE PROFILE */}
      <section className="mt-8 px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Your active trip profile
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Explore places with a point of view
            </h2>
          </div>

          <button
            type="button"
            className="shrink-0 text-sm font-medium underline underline-offset-4"
          >
            Edit profile
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-background p-4 shadow-sm">
          <p className="font-bold">
            Relaxed explorer{' '}
            <span className="font-normal text-muted-foreground">
              · Yogyakarta · $60–120/night
            </span>
          </p>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Matched to your love of local food,
            walkable neighborhoods, and a little
            breathing room.
          </p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {[
            'For your profile',
            'Walkable',
            'Local food',
            'Quiet nature',
            'Wellness',
          ].map((tag) => (
            <Chip
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Chip>
          ))}
        </div>
      </section>

      {/* EXPLORE BY FEELING */}
      <section className="mt-9">
        <div className="flex items-end justify-between px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Curated for you
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Explore by feeling
            </h2>
          </div>

          <button
            type="button"
            className="text-sm font-medium text-secondary"
          >
            See all
          </button>
        </div>

        <div className="mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
          {feelings.map((item) => (
            <FeelingCard
              key={item.title}
              item={item}
            />
          ))}
        </div>
      </section>

      {/* COMPARE */}
      <section className="mx-5 mt-8 rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Your shortlist
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Compare stays
            </h2>
          </div>

          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
            {compared} selected
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Keep your favorite prices together before
          deciding.
        </p>

        <button
          type="button"
          className="
            mt-4
            min-h-12
            w-full
            rounded-full
            border
            border-secondary
            bg-background
            px-4
            py-2.5
            text-sm
            font-semibold
            text-secondary
            transition-all
            touch-manipulation
            hover:bg-secondary-muted
            active:scale-[0.98]
          "
        >
          View comparison
        </button>
      </section>

      {/* HOTELS */}
      <section className="mt-9 px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          Transparent stays
        </p>

        <div className="mt-1 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold">
            Stay somewhere that fits
          </h2>

          <span className="shrink-0 text-xs text-muted-foreground">
            {compared} selected
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.title}
              hotel={hotel}
              onCompare={() =>
                setCompared((value) => value + 1)
              }
            />
          ))}
        </div>
      </section>

      {/* FEATURED TRIPS */}
      <section className="mt-10 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Featured trips
          </h2>

          <button
            type="button"
            className="text-sm font-medium text-secondary"
          >
            See all
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {trips.map(([title, location, image]) => (
            <article
              key={title}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-border
                bg-background
                p-2
                shadow-sm
                transition-transform
                active:scale-[0.99]
              "
            >
              <img
                src={image}
                alt=""
                className="size-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-bold">
                  {title}
                </h3>

                <p className="text-xs text-muted-foreground">
                  {location}
                </p>
              </div>

              <ArrowRight className="mr-2 size-4 text-secondary" />
            </article>
          ))}
        </div>
      </section>

      {/* BOTTOM NAV */}
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md justify-around border-t border-border bg-background/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <span className="text-center text-xs font-semibold text-secondary">
          ⌕
          <br />
          Explore
        </span>

        <span className="text-center text-xs text-muted-foreground">
          ♡
          <br />
          Saved
        </span>

        <span className="text-center text-xs text-muted-foreground">
          ⌖
          <br />
          Trips
        </span>

        <span className="text-center text-xs text-muted-foreground">
          ♙
          <br />
          Profile
        </span>
      </nav>
    </main>
  )
}