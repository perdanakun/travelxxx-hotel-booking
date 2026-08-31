'use client'

import { Suspense, useState } from 'react'
import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { Button } from '@/components/ui/button'

import { hotels } from '@/data/hotels'
import { destinations } from '@/data/destinations'

import AppHeader from '@/components/AppHeader'
import AreaMatch from '@/components/search-personalize/AreaMatch'
import HolidayProfile from '@/components/search-personalize/HolidayProfile'
import HotelCard from '@/components/HotelCard'
import CompareBar from '@/components/CompareBar'
import SearchSummary from '@/components/search/SearchSummary'
import FilterSheet from '@/components/search/FilterSheet'
import EditSearchSheet from '@/components/search/EditSearchSheet'
import SortControls from '@/components/search/SortControls'

const profileTags = [
  '$50–100 / night',
  'Quiet & relaxing',
  'Food & cafés',
  'Walkable',
]

const areaMatch = {
  area: 'Prawirotaman',
  city: 'Yogyakarta',
  description:
    'A relaxed, walkable pocket with local cafés, galleries, and an easy neighborhood rhythm.',
  tags: [
    'Cafés nearby',
    'Local feel',
    'Walkable',
  ],
}

function SearchPersonalizeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const destinationId =
    searchParams.get('destination') ??
    'yogyakarta'

  const initialDestination =
    destinations.find(
      (destination) =>
        destination.id === destinationId
    ) ?? destinations[0]

  const [compared, setCompared] = useState([])

  const [activeSort, setActiveSort] =
    useState('Best match')

  const [search, setSearch] = useState({
    destination: initialDestination,

    checkIn:
      searchParams.get('checkIn') ??
      '2026-09-22',

    checkOut:
      searchParams.get('checkOut') ??
      '2026-09-26',

    guests: Number(
      searchParams.get('guests') ?? 2
    ),

    rooms: Number(
      searchParams.get('rooms') ?? 1
    ),
  })

  const [editSearchOpen, setEditSearchOpen] =
    useState(false)

  const [draftSearch, setDraftSearch] =
    useState(search)

  const [filterOpen, setFilterOpen] =
    useState(false)

  const [filters, setFilters] = useState({
    maxPrice: null,
    minRating: null,
  })

  const activeFilterCount = [
    filters.maxPrice,
    filters.minRating,
  ].filter(
    (value) => value !== null
  ).length

  const openEditSearch = () => {
    setDraftSearch(search)
    setEditSearchOpen(true)
  }

  const closeEditSearch = () => {
    setEditSearchOpen(false)
  }

  const applySearch = () => {
    if (!draftSearch.destination) {
      return
    }

    setSearch(draftSearch)

    const params = new URLSearchParams({
      destination:
        draftSearch.destination.id,
      checkIn: draftSearch.checkIn,
      checkOut: draftSearch.checkOut,
      guests: String(
        draftSearch.guests
      ),
      rooms: String(
        draftSearch.rooms
      ),
    })

    router.replace(
      `/search-personalize?${params.toString()}`
    )

    setEditSearchOpen(false)
  }

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

  const filteredHotels = hotels.filter(
    (hotel) => {
      const finalPrice =
        hotel.pricing.base +
        hotel.pricing.taxes

      const matchesPrice =
        filters.maxPrice === null ||
        finalPrice <= filters.maxPrice

      const matchesRating =
        filters.minRating === null ||
        hotel.rating >=
          filters.minRating

      return (
        matchesPrice &&
        matchesRating
      )
    }
  )

  const sortedHotels = [
    ...filteredHotels,
  ].sort((a, b) => {
    if (
      activeSort ===
      'Lowest price'
    ) {
      const aPrice =
        a.pricing.base +
        a.pricing.taxes

      const bPrice =
        b.pricing.base +
        b.pricing.taxes

      return aPrice - bPrice
    }

    if (
      activeSort ===
      'Top rated'
    ) {
      return b.rating - a.rating
    }

    return 0
  })

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      {/* HEADER */}
      <AppHeader
        showBack
        backHref="/"
      />

      {/* AREA MATCH */}
      <AreaMatch
        area={areaMatch.area}
        city={areaMatch.city}
        description={
          areaMatch.description
        }
        tags={areaMatch.tags}
      />

      {/* HOLIDAY PROFILE */}
      <HolidayProfile
        tags={profileTags}
      />

      {/* SEARCH SUMMARY */}
      <div className="sticky top-[73px] z-40 bg-background/95 pb-4 backdrop-blur">
        <SearchSummary
          search={search}
          filterCount={
            activeFilterCount
          }
          onEdit={openEditSearch}
          onOpenFilters={() => {
            setFilterOpen(true)
          }}
        />
      </div>

      {/* HOTEL RESULTS HEADER */}
      <section className="px-5">
        <div className="mt-0 flex items-end justify-between gap-4">
          <div>
            <p className="mt-0 text-sm text-muted-foreground">
              Ranked around your
              trip preferences.
            </p>
          </div>

          <span className="shrink-0 text-xs text-muted-foreground">
            {compared.length}{' '}
            selected
          </span>
        </div>

        {/* SORT */}
        <SortControls
          value={activeSort}
          onChange={
            setActiveSort
          }
        />
      </section>

      {/* HOTEL LIST */}
      <section
        className="mt-4 flex flex-col gap-3 px-5"
        aria-label="Recommended hotels"
      >
        {sortedHotels.length >
        0 ? (
          sortedHotels.map(
            (hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                compared={compared.includes(
                  hotel.id
                )}
                onCompare={() =>
                  toggleCompare(
                    hotel.id
                  )
                }
              />
            )
          )
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <p className="font-bold">
              No stays match
              these filters.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your
              price or rating
              filters.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFilters({
                  maxPrice: null,
                  minRating: null,
                })
              }
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {/* SPACE FOR FIXED UI */}
      <div className="h-8" />

      {/* COMPARE BAR */}
      <div className="[&>div]:!bottom-[5px]">
        <CompareBar
          count={
            compared.length
          }
          onCompare={() => {
            console.log(
              'Open comparison'
            )
          }}
        />
      </div>

      {/* FILTER SHEET */}
      <FilterSheet
        open={filterOpen}
        filters={filters}
        onChange={setFilters}
        onApply={() => {
          setFilterOpen(false)
        }}
        onReset={() => {
          setFilters({
            maxPrice: null,
            minRating: null,
          })
        }}
        onClose={() => {
          setFilterOpen(false)
        }}
      />

      {/* EDIT SEARCH SHEET */}
      <EditSearchSheet
        open={editSearchOpen}
        value={draftSearch}
        onChange={
          setDraftSearch
        }
        onApply={applySearch}
        onClose={closeEditSearch}
      />
    </main>
  )
}

function SearchPersonalizeFallback() {
  return (
    <main className="min-h-screen bg-background text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      <div className="px-5 py-8">
        <p className="text-sm text-muted-foreground">
          Loading your matches...
        </p>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <SearchPersonalizeFallback />
      }
    >
      <SearchPersonalizeContent />
    </Suspense>
  )
}