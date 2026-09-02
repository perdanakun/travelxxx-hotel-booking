'use client'

import { Suspense, useState } from 'react'
import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import {
  getDefaultStayDates,
} from '@/lib/defaultStayDates'

import { useCompare } from '@/context/CompareContext'

import { Button } from '@/components/ui/button'

import { hotels } from '@/data/hotels'
import { destinations } from '@/data/destinations'

import AppHeader from '@/components/AppHeader'
import HotelCard from '@/components/HotelCard'
import CompareBar from '@/components/CompareBar'

import SearchSummary from '@/components/search/SearchSummary'
import FilterSheet from '@/components/search/FilterSheet'
import EditSearchSheet from '@/components/search/EditSearchSheet'
import SortControls from '@/components/search/SortControls'



function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const defaultStayDates = getDefaultStayDates()

  const {
  comparedIds,
  toggleCompare,
  isCompared,
} = useCompare()

  const destinationId =
    searchParams.get('destination') ??
    'yogyakarta'

  const initialDestination =
    destinations.find(
      (destination) =>
        destination.id === destinationId
    ) ?? destinations[0]

    const [search, setSearch] = useState({
      destination: initialDestination,
      checkIn:
        searchParams.get('checkIn') ??
        defaultStayDates.checkIn,
      checkOut:
        searchParams.get('checkOut') ??
        defaultStayDates.checkOut,
      guests: Number(
        searchParams.get('guests') ?? 2
      ),
      rooms: Number(
        searchParams.get('rooms') ?? 1
      ),
    })

  const [draftSearch, setDraftSearch] =
    useState(search)

  const [editSearchOpen, setEditSearchOpen] =
    useState(false)

  const [filterOpen, setFilterOpen] =
    useState(false)

  const [filters, setFilters] = useState({
    maxPrice: null,
    minRating: null,
  })

  const [activeSort, setActiveSort] =
    useState('Best match')


  const [currency, setCurrency] = useState(
    searchParams.get('currency') ?? 'IDR'
  )

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
      currency,
    })

    router.replace(
      `/search?${params.toString()}`
    )

    setEditSearchOpen(false)
  }

  const changeCurrency = (nextCurrency) => {
  setCurrency(nextCurrency)

  const params = new URLSearchParams({
    destination: search.destination.id,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    guests: String(search.guests),
    rooms: String(search.rooms),
    currency: nextCurrency,
  })

  router.replace(
    `/search?${params.toString()}`
  )
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


  const getHotelHref = (hotelId) => {
  const params = new URLSearchParams({
    destination: search.destination.id,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    guests: String(search.guests),
    rooms: String(search.rooms),
    currency,
  })

  return `/hotel/${hotelId}?${params.toString()}`
}

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      {/* HEADER */}
      <AppHeader
        showBack
        backHref="/"
        currency={currency}
        onCurrencyChange={changeCurrency}
      />

      {/* SEARCH SUMMARY */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur">
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
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <p className="mt-2 text-sm text-muted-foreground">
              Stays available for your search.
            </p>
          </div>

          <span className="shrink-0 text-xs text-muted-foreground">
            {comparedIds.length}{' '}
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
  aria-label="Hotel results"
>
  {sortedHotels.length > 0 ? (
    sortedHotels.map((hotel) => {
      const finalPrice =
        hotel.pricing.base +
        hotel.pricing.taxes

      let badge = null

      if (hotel.rating >= 4.7) {
        badge = 'Top rated'
      } else if (
        finalPrice <= 60
      ) {
        badge = 'Great value'
      }

      return (
    <HotelCard
      key={hotel.id}
      hotel={hotel}
      badge={badge}
      currency={currency}
      href={getHotelHref(hotel.id)}
      compared={isCompared(hotel.id)}
      onCompare={() => toggleCompare(hotel.id)}
    />
      )
    })
  ) : (
    <div className="rounded-2xl border border-border bg-surface p-5 text-center">
      <p className="font-bold">
        No stays match these filters.
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        Try adjusting your price or rating filters.
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
        count={comparedIds.length}
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

function SearchFallback() {
  return (
    <main className="min-h-screen bg-background text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      <div className="px-5 py-8">
        <p className="text-sm text-muted-foreground">
          Loading stays...
        </p>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <SearchFallback />
      }
    >
      <SearchContent />
    </Suspense>
  )
}