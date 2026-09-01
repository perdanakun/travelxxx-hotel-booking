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

import {
  getDefaultStayDates,
} from '@/lib/defaultStayDates'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { hotels } from '@/data/hotels'
import { trips } from '@/data/trips'
import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import HotelCard from '@/components/HotelCard'
import CompareBar from '@/components/CompareBar'
import SearchForm from '@/components/search/SearchForm'
import FeaturedTripCard from '@/components/FeaturedTripCard'


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

function Chip({ children, active, onClick }) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? 'secondary' : 'outline'}
      onClick={onClick}
      className={`
        shrink-0
        rounded-full
        px-3
        py-1.5
        font-medium

        ${
          active
            ? ''
            : 'text-muted-foreground'
        }
      `}
    >
      {children}
    </Button>
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

<Button
  type="button"
  size="icon-sm"
  variant="ghost"
  aria-label={`Save ${item.title}`}
  onClick={() => setSaved(!saved)}
  className="
    absolute
    right-3
    top-3
    size-9
    rounded-full
    bg-background/90
    shadow-sm
    backdrop-blur
    hover:bg-background
    active:scale-[0.94]
  "
>
  <Heart
    className={`size-4 ${
      saved
        ? 'fill-primary text-primary'
        : ''
    }`}
  />
</Button>

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


export default function Page() {

  const router = useRouter()

  const defaultStayDates =
  getDefaultStayDates()

  const [search, setSearch] = useState({
    destination: {
      id: 'yogyakarta',
      city: 'Yogyakarta',
      country: 'Indonesia',
      label: 'Yogyakarta, Indonesia',
    },
    checkIn:
      defaultStayDates.checkIn,
    checkOut:
      defaultStayDates.checkOut,
    guests: 2,
    rooms: 1,
  })

  const [activeTag, setActiveTag] = useState(
    'For your profile'
  )

  const [compared, setCompared] = useState([])

  const toggleCompare = (id) => {
  setCompared((current) => {
    if (current.includes(id)) {
      return current.filter(
        (item) => item !== id
      )
    }

    if (current.length >= 3) {
      return current
    }

    return [...current, id]
  })
}
  return (
    <main className="min-h-screen bg-background pb-24 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">

      {/* HEADER */}
      
<AppHeader action="filter" />

{/* HERO + SEARCH */}
<section className="relative">
 {/* HERO */}
<div className="relative h-[200px] overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Travel destination"
    className="w-full h-full object-cover object-bottom"
  />

  {/* Contrast overlay */}
  <div className="absolute inset-0 bg-black/0" />

  {/* Fade into page background */}
  <div className="absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-background via-background/80 to-transparent" />
</div>

  {/* SEARCH */}
  <div className="relative z-10 mx-5 -mt-24">
    <section className="rounded-2xl border border-border bg-background p-4 shadow-md">

            <div>
            <p className="text-xs font-semibold text-secondary">
              Where will you stay next?
            </p>

            <h2 className="mt-1 text-2xl font-bold mb-4">
              Find your perfect stay
            </h2>
          </div>
          
      <SearchForm
        value={search}
        onChange={setSearch}
        onSubmit={() => {
          const params = new URLSearchParams({
            destination: search.destination.id,
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            guests: String(search.guests),
            rooms: String(search.rooms),
          })

          router.push(
            `/search?${params.toString()}`
          )
        }}
      />
    </section>
  </div>
</section>

      {/* ACTIVE PROFILE */}
      <section className="mt-8 px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Discover your journey.
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Where will you go next?
            </h2>
          </div>

<Button
  type="button"
  variant="link"
  className="
    h-auto
    min-h-0
    shrink-0
    p-0
    text-sm
    font-medium
    text-foreground
  "
>
  Edit profile
</Button>
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

     {/* MAGIC TRIP RECOMENDATION  */}      
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
            Help me decide where to go!
          </strong>
        </span>

        <ArrowRight className="size-4" />
      </Link>
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

          <Button
            type="button"
            variant="link"
            className="
              h-auto
              min-h-0
              p-0
              text-sm
              font-medium
              text-secondary
              no-underline
            "
          >
            See all
          </Button>
        </div>

        
        <div className="mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

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
            {compared.length} selected
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Keep your favorite prices together before
          deciding.
        </p>
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
            {compared.length} selected
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {hotels.slice(0, 5).map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              compared={compared.includes(hotel.id)}
              onCompare={() =>
                toggleCompare(hotel.id)
              }
            />
          ))}
        </div>

        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              const params = new URLSearchParams({
                destination: search.destination.id,
                checkIn: search.checkIn,
                checkOut: search.checkOut,
                guests: String(search.guests),
                rooms: String(search.rooms),
              })

              router.push(
                `/search?${params.toString()}`
              )
            }}
          >
            See all stays
          </Button>
        </div>
      </section>

      {/* COMPARE BAR */}   
      <CompareBar
        count={compared.length}
        onCompare={() => {
          console.log('Open comparison')
        }}
      />

      {/* FEATURED TRIPS */}
      <section className="mt-10 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Featured trips
          </h2>

      <Button
        type="button"
        variant="link"
        className="
          h-auto
          min-h-0
          p-0
          text-sm
          font-medium
          text-secondary
          no-underline
        "
      >
        See all
      </Button>
        </div>

    {/* FEATURED TRIP */}
    <div className="mt-4 flex flex-col gap-3">
      {trips.slice(0, 4).map((trip) => (
        <FeaturedTripCard
          key={trip.id}
          trip={trip}
        />
      ))}
    </div>
      </section>

      {/* BOTTOM NAV */}
<BottomNav active="explore" />
    </main>
  )
}