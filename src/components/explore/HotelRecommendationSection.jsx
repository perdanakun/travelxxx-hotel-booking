'use client'

import Link from 'next/link'

import {
  ArrowRight,
  MapPin,
  Star,
} from 'lucide-react'

import { formatPrice } from '@/lib/formatPrice'

export default function HotelRecommendationSection({
  destination,
  hotels = [],
  currency = 'IDR',
}) {
  if (!hotels.length) return null

  return (
    <section
      className="
        bg-white
        px-4
        py-6
        text-foreground
      "
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Recommended stays
          </p>

          <h2 className="mt-1 text-lg font-bold">
            Stay near {destination}
          </h2>
        </div>

        <Link
          href="/hotels"
          className="
            flex
            shrink-0
            items-center
            gap-1
            text-sm
            font-medium
            text-primary
          "
        >
          See all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-1
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {hotels.map((hotel) => {
          const totalPrice =
            hotel.basePrice +
            (hotel.taxes ?? 0)

          return (
            <Link
              key={hotel.id}
              href={`/hotel/${hotel.id}?currency=${currency}`}
              className="
                w-[76%]
                max-w-[280px]
                shrink-0
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-white
              "
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="
                    size-full
                    object-cover
                  "
                />
              </div>

              <div className="p-3">
                <h3 className="line-clamp-1 text-sm font-semibold">
                  {hotel.name}
                </h3>

                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />

                  <span className="line-clamp-1">
                    {hotel.area ??
                      destination}
                  </span>
                </div>

                {hotel.rating && (
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Star
                      className="size-3.5"
                      fill="currentColor"
                    />

                    <span className="font-medium">
                      {hotel.rating}
                    </span>
                  </div>
                )}

                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">
                    Total incl. taxes & fees
                  </p>

                  <p className="mt-0.5 font-semibold text-primary">
                    {formatPrice(
                      totalPrice,
                      currency
                    )}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}