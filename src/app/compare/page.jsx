'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  X,
} from 'lucide-react'

import { useCompare } from '@/context/CompareContext'

import { hotels } from '@/data/hotels'
import { formatPrice } from '@/lib/formatPrice'

import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'

export default function ComparePage() {
  const router = useRouter()

  const {
    comparedIds,
    addToCompare,
    removeFromCompare,
  } = useCompare()

  const [currency, setCurrency] =
    useState('IDR')

  const comparedHotels = hotels.filter(
    (hotel) =>
      comparedIds.includes(hotel.id)
  )

  const recommendations = hotels
    .filter(
      (hotel) =>
        !comparedIds.includes(hotel.id)
    )
    .slice(0, 3)

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
    <main className="min-h-screen bg-background pb-28 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      {/* HEADER */}
      <AppHeader
        showBack
        onBack={() => router.back()}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* PAGE INTRO */}
      <section className="px-5 pb-5 pt-6">
        <h1 className="text-xl font-bold">
          Compare hotels
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Compare the details that matter
          before choosing your stay.
        </p>

        <p className="mt-2 text-xs font-medium text-secondary">
          {comparedHotels.length} of 3 hotels selected
        </p>
      </section>

      {/* COMPARISON */}
      <section>
        {comparedHotels.length === 0 ? (
          <div className="mx-5 rounded-2xl bg-surface p-5 text-center">
            <p className="font-semibold">
              No hotels selected
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add hotels from Explore to
              compare them here.
            </p>
          </div>
        ) : (
          <div
            className="
              overflow-x-auto
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div className="w-max min-w-full">
              {/* TABLE HEADER */}
              <div
                className="
                  grid
                  grid-cols-[180px_170px_190px_220px_300px_130px]
                  border-y
                  border-border
                  bg-surface
                  px-5
                  text-xs
                  font-semibold
                  text-muted-foreground
                "
              >
                {/* STICKY HOTEL HEADER */}
                <div
                  className="
                    sticky
                    left-0
                    z-20
                    border-r
                    border-border
                    bg-surface
                    py-3
                    pr-4
                    shadow-[6px_0_10px_-10px_rgba(0,0,0,0.25)]
                  "
                >
                  Hotel
                </div>

                <div className="px-4 py-3">
                  Price
                </div>

                <div className="border-l border-border px-4 py-3">
                  Location
                </div>

                <div className="border-l border-border px-4 py-3">
                  Amenities
                </div>

                <div className="border-l border-border px-4 py-3">
                  About
                </div>

                <div className="border-l border-border px-4 py-3">
                  Action
                </div>
              </div>

              {/* HOTEL ROWS */}
              {comparedHotels.map(
                (hotel) => {
                  const total =
                    hotel.pricing.base +
                    hotel.pricing.taxes

                  return (
                    <div
                      key={hotel.id}
                      className="
                        grid
                        grid-cols-[180px_170px_190px_220px_300px_130px]
                        border-b
                        border-border
                        px-5
                      "
                    >
                      {/* HOTEL — STICKY */}
                      <div
                        className="
                          sticky
                          left-0
                          z-10
                          border-r
                          border-border
                          bg-background
                          py-4
                          pr-4
                          shadow-[6px_0_10px_-10px_rgba(0,0,0,0.25)]
                        "
                      >
                        {/* IMAGE */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                          <img
                            src={hotel.image}
                            alt={hotel.title}
                            className="size-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCompare(
                                hotel.id
                              )
                            }
                            aria-label={`Remove ${hotel.title} from comparison`}
                            className="
                              absolute
                              right-2
                              top-2
                              flex
                              size-8
                              items-center
                              justify-center
                              rounded-full
                              bg-background/90
                              text-foreground
                              shadow-sm
                              backdrop-blur
                              transition
                              active:scale-[0.96]
                            "
                          >
                            <X className="size-4" />
                          </button>
                        </div>

                        {/* HOTEL NAME */}
                        <h2 className="mt-3 text-sm font-bold leading-snug">
                          {hotel.title}
                        </h2>

                        {/* RATING */}
                        <p className="mt-1.5 text-xs font-medium">
                          ★ {hotel.rating}
                        </p>
                      </div>

                      {/* PRICE */}
                      <div className="px-4 py-4">
                        {/* TOTAL FIRST */}
                        <p className="text-[11px] leading-snug text-muted-foreground">
                          Total incl. taxes & fees
                        </p>

                        <p className="mt-1 text-lg font-bold leading-tight text-primary">
                          {formatPrice(
                            total,
                            {
                              fromCurrency:
                                hotel.pricing
                                  .currency,
                              currency,
                            }
                          )}
                        </p>

                        {/* PER NIGHT SECONDARY */}
                        <div className="mt-4 border-t border-border pt-3">
                          <p className="text-[11px] text-muted-foreground">
                            Per night
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {formatPrice(
                              hotel.pricing
                                .base,
                              {
                                fromCurrency:
                                  hotel.pricing
                                    .currency,
                                currency,
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      {/* LOCATION */}
                      <div className="border-l border-border px-4 py-4">
                        <p className="text-sm font-semibold">
                          {hotel.area}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {hotel.destination}
                        </p>

                        <p className="mt-3 text-xs font-medium text-secondary">
                          Near {hotel.area}
                        </p>

                        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                          Distance from your
                          trip area coming
                          later
                        </p>
                      </div>

                      {/* AMENITIES */}
                      <div className="border-l border-border px-4 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {hotel.amenities
                            ?.slice(0, 4)
                            .map(
                              (
                                amenity
                              ) => (
                                <span
                                  key={
                                    amenity.id
                                  }
                                  className="
                                    rounded-full
                                    bg-surface
                                    px-2
                                    py-1
                                    text-[11px]
                                    font-medium
                                  "
                                >
                                  {
                                    amenity.label
                                  }
                                </span>
                              )
                            )}
                        </div>

                        {hotel.amenities
                          ?.length >
                          4 && (
                          <p className="mt-2 text-[11px] text-muted-foreground">
                            +
                            {hotel
                              .amenities
                              .length -
                              4}{' '}
                            more
                          </p>
                        )}
                      </div>

                      {/* ABOUT */}
                      <div className="border-l border-border px-4 py-4">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {hotel.description ??
                            'Stay information will be available here.'}
                        </p>
                      </div>

                      {/* ACTION */}
                      <div className="border-l border-border px-4 py-4">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() =>
                            openHotel(
                              hotel
                            )
                          }
                          className="w-full rounded-full"
                        >
                          View
                          <ArrowRight className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        )}
      </section>

      {/* OTHER RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <>
          <div className="mt-6 h-2 bg-surface" />

          <section className="px-5 py-6">
            <h2 className="text-lg font-bold">
              Other stays you might like
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add another stay to compare.
            </p>

            <div className="mt-4 space-y-3">
              {recommendations.map(
                (hotel) => (
                  <article
                    key={hotel.id}
                    className="flex gap-3 rounded-2xl border border-border p-3"
                  >
                    {/* IMAGE */}
                    <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={hotel.image}
                        alt={hotel.title}
                        className="size-full object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">
                        {hotel.area},{' '}
                        {hotel.destination}
                      </p>

                      <h3 className="mt-1 line-clamp-2 text-sm font-semibold">
                        {hotel.title}
                      </h3>

                      <p className="mt-2 text-base font-bold text-primary">
                        {formatPrice(
                          hotel.pricing
                            .base +
                            hotel.pricing
                              .taxes,
                          {
                            fromCurrency:
                              hotel.pricing
                                .currency,
                            currency,
                          }
                        )}
                      </p>

                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        total incl. taxes & fees
                      </p>

                      <button
                        type="button"
                        disabled={
                          comparedIds.length >=
                          3
                        }
                        onClick={() =>
                          addToCompare(
                            hotel.id
                          )
                        }
                        className="
                          mt-3
                          text-sm
                          font-semibold
                          text-secondary
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        {comparedIds.length >=
                        3
                          ? 'Compare full'
                          : 'Add to compare'}
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        </>
      )}

      {/* BOTTOM NAV */}
      <BottomNav active="compare" />
    </main>
  )
}