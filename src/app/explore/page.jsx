'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bookmark,
  MapPin,
  Plus,
  Share2,
  Star,
} from 'lucide-react'

import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import TikTokVideo from '@/components/explore/TikTokVideo'

import { Button } from '@/components/ui/button'
import { useCompare } from '@/context/CompareContext'

import { hotels } from '@/data/hotels'
import { formatPrice } from '@/lib/formatPrice'

const explorePlaces = [
  {
    id: 'prawirotaman',
    place: 'Prawirotaman',
    destination: 'Yogyakarta',

    tiktokId: '7656286713408441620',

    tags: [
      'Food',
      'Walkable',
      'Local',
    ],

    caption:
      'Coffee first, then a slow walk through the neighborhood. Stay somewhere with a little character and plenty to explore nearby.',

    poster:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',

    hotelIds: [
      'saffron',
      'lotus',
    ],
  },

  {
    id: 'gunung-kidul',
    place: 'Gunung Kidul',
    destination: 'Yogyakarta',

    tiktokId: '7604803941439655189',

    tags: [
      'Beach',
      'Nature',
      'Slow',
    ],

    caption:
      'A quiet stretch of blue water, warm sand, and nowhere else to be. Save this one for your next slow morning.',

    poster:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85',

    hotelIds: [],
  },

  {
    id: 'ubud',
    place: 'Ubud',
    destination: 'Bali',

    tiktokId: '7624746365830089992',

    tags: [
      'Quiet',
      'Green',
      'Culture',
    ],

    caption:
      'Rice fields, late breakfasts, and a little more room to breathe. The kind of trip that makes Monday feel far away.',

    poster:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',

    hotelIds: [],
  },
]

export default function ExplorePage() {
  const router = useRouter()

  const {
    comparedIds,
    toggleCompare,
    isCompared,
    maxCompare,
  } = useCompare()

  const [currency, setCurrency] =
    useState('IDR')

  const [
    savedPlaces,
    setSavedPlaces,
  ] = useState([])

  const toggleSaved = (placeId) => {
    setSavedPlaces((current) =>
      current.includes(placeId)
        ? current.filter(
            (id) =>
              id !== placeId
          )
        : [
            ...current,
            placeId,
          ]
    )
  }

  const openHotel = (hotel) => {
    const params =
      new URLSearchParams({
        currency,
      })

    router.push(
      `/hotel/${hotel.id}?${params.toString()}`
    )
  }

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      {/* HEADER */}
      <AppHeader
        currency={currency}
        onCurrencyChange={
          setCurrency
        }
      />

      {/* PAGE INTRO */}
      <section className="px-5 pb-5 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          For you
        </p>

        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Explore by feeling
            </h1>

            <p className="mt-1 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              Discover places
              first, then find
              stays that fit the
              trip.
            </p>
          </div>

          {comparedIds.length >
            0 && (
            <button
              type="button"
              onClick={() =>
                router.push(
                  '/compare'
                )
              }
              className="shrink-0 text-xs font-semibold text-secondary"
            >
              {
                comparedIds.length
              }{' '}
              compared
            </button>
          )}
        </div>
      </section>

      {/* DISCOVERY FEED */}
      <div>
        {explorePlaces.map(
          (place) => {
            const nearbyHotels =
              place.hotelIds
                .length > 0
                ? hotels.filter(
                    (hotel) =>
                      place.hotelIds.includes(
                        hotel.id
                      )
                  )
                : hotels
                    .filter(
                      (
                        hotel
                      ) =>
                        hotel.destination ===
                        place.destination
                    )
                    .slice(
                      0,
                      3
                    )

            const isSaved =
              savedPlaces.includes(
                place.id
              )

            return (
              <section
                key={
                  place.id
                }
                className="border-t border-border"
              >
                {/* VIDEO FEED */}
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <TikTokVideo
                    videoId={
                      place.tiktokId
                    }
                    poster={
                      place.poster
                    }
                    title={`TikTok travel video about ${place.place}`}
                  />

                  {/* GRADIENT */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/10
                      to-black/10
                    "
                  />

                  {/* SAVE + SHARE */}
                  <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        toggleSaved(
                          place.id
                        )
                      }
                      aria-label={
                        isSaved
                          ? `Remove ${place.place} from saved places`
                          : `Save ${place.place}`
                      }
                      className="
                        flex
                        size-10
                        items-center
                        justify-center
                        rounded-full
                        bg-black/40
                        text-white
                        backdrop-blur-sm
                        transition
                        active:scale-[0.96]
                      "
                    >
                      <Bookmark
                        className="size-5"
                        fill={
                          isSaved
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>

                    <button
                      type="button"
                      aria-label={`Share ${place.place}`}
                      className="
                        flex
                        size-10
                        items-center
                        justify-center
                        rounded-full
                        bg-black/40
                        text-white
                        backdrop-blur-sm
                        transition
                        active:scale-[0.96]
                      "
                    >
                      <Share2 className="size-5" />
                    </button>
                  </div>

                  {/* CONTENT OVERLAY */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4 shrink-0" />

                      <p className="text-base font-bold">
                        {
                          place.place
                        }
                      </p>
                    </div>

                    <p className="mt-1 text-xs text-white/70">
                      {
                        place.destination
                      }
                    </p>

                    {/* TAGS */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {place.tags.map(
                        (tag) => (
                          <span
                            key={
                              tag
                            }
                            className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm"
                          >
                            {
                              tag
                            }
                          </span>
                        )
                      )}
                    </div>

                    <p className="mt-3 max-w-[330px] text-sm leading-relaxed text-white/90">
                      {
                        place.caption
                      }
                    </p>
                  </div>
                </div>

                {/* NEARBY HOTELS */}
                <div className="bg-background py-5">
                  <div className="flex items-end justify-between gap-4 px-5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                        Stay nearby
                      </p>

                      <h2 className="mt-1 text-lg font-bold">
                        Hotels near{' '}
                        {
                          place.place
                        }
                      </h2>
                    </div>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      {
                        nearbyHotels.length
                      }{' '}
                      stays
                    </span>
                  </div>

                  {/* HOTEL STRIP */}
                  {nearbyHotels.length >
                  0 ? (
                    <div
                      className="
                        mt-4
                        flex
                        gap-3
                        overflow-x-auto
                        px-5
                        pb-1
                        overscroll-x-contain
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                      "
                    >
                      {nearbyHotels.map(
                        (
                          hotel
                        ) => {
                          const total =
                            hotel
                              .pricing
                              .base +
                            hotel
                              .pricing
                              .taxes

                          const compared =
                            isCompared(
                              hotel.id
                            )

                          const compareFull =
                            comparedIds.length >=
                              maxCompare &&
                            !compared

                          return (
                            <article
                              key={
                                hotel.id
                              }
                              className="
                                w-[260px]
                                shrink-0
                                overflow-hidden
                                rounded-2xl
                                border
                                border-border
                                bg-background
                              "
                            >
                              {/* IMAGE */}
                              <button
                                type="button"
                                onClick={() =>
                                  openHotel(
                                    hotel
                                  )
                                }
                                className="block w-full text-left"
                              >
                                <div className="aspect-[16/10] overflow-hidden bg-muted">
                                  <img
                                    src={
                                      hotel.image
                                    }
                                    alt={
                                      hotel.title
                                    }
                                    className="size-full object-cover"
                                  />
                                </div>
                              </button>

                              <div className="p-3.5">
                                {/* HOTEL DETAILS */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    openHotel(
                                      hotel
                                    )
                                  }
                                  className="block w-full text-left"
                                >
                                  <h3 className="line-clamp-2 text-sm font-bold leading-snug">
                                    {
                                      hotel.title
                                    }
                                  </h3>

                                  <div className="mt-1.5 flex items-center justify-between gap-2">
                                    <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                                      <MapPin className="size-3 shrink-0" />

                                      <span className="truncate">
                                        {
                                          hotel.area
                                        }
                                      </span>
                                    </p>

                                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium">
                                      <Star
                                        className="size-3"
                                        fill="currentColor"
                                      />

                                      {
                                        hotel.rating
                                      }
                                    </span>
                                  </div>

                                  {/* PRICE */}
                                  <div className="mt-3">
                                    <p className="text-base font-bold text-primary">
                                      {formatPrice(
                                        total,
                                        {
                                          fromCurrency:
                                            hotel
                                              .pricing
                                              .currency,
                                          currency,
                                        }
                                      )}
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                                      total
                                      incl.
                                      taxes
                                      & fees
                                    </p>
                                  </div>
                                </button>

                                {/* COMPARE */}
                                <Button
                                  type="button"
                                  variant={
                                    compared
                                      ? 'selected'
                                      : 'secondary'
                                  }
                                  disabled={
                                    compareFull
                                  }
                                  onClick={() =>
                                    toggleCompare(
                                      hotel.id
                                    )
                                  }
                                  className="mt-3 h-9 w-full rounded-xl text-xs"
                                >
                                  {!compared && (
                                    <Plus className="size-3.5" />
                                  )}

                                  {compared
                                    ? 'Added to compare'
                                    : compareFull
                                      ? 'Compare full'
                                      : 'Compare'}
                                </Button>
                              </div>
                            </article>
                          )
                        }
                      )}
                    </div>
                  ) : (
                    <div className="mx-5 mt-4 rounded-2xl bg-surface p-4">
                      <p className="text-sm text-muted-foreground">
                        No nearby
                        stays
                        available
                        yet.
                      </p>
                    </div>
                  )}
                </div>

                {/* SEPARATOR */}
                <div className="h-2 bg-surface" />
              </section>
            )
          }
        )}
      </div>

      <BottomNav active="explore" />
    </main>
  )
}