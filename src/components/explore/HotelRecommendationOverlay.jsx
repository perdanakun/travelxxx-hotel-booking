'use client'

import Link from 'next/link'

import {
  MapPin,
  Star,
  X,
} from 'lucide-react'

import { formatPrice } from '@/lib/formatPrice'

export default function HotelRecommendationOverlay({
  destination,
  hotels = [],
  currency = 'IDR',
  onClose,
}) {
  if (!hotels.length) {
    return null
  }

  const hotel =
    hotels[0]

  const totalPrice =
    (hotel.basePrice ?? 0) +
    (hotel.taxes ?? 0)

  return (
<div
className="
  absolute
  left-4
  bottom-62
  z-30
  w-[60%]
  max-w-[320px]
"
>
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-white
          text-foreground
          shadow-xl
        "
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()

            onClose?.()
          }}
          aria-label="Close hotel recommendation"
          className="
            absolute
            right-2
            top-2
            z-20
            flex
            size-8
            items-center
            justify-center
            rounded-full
            bg-black/50
            text-white
            backdrop-blur-sm
            transition
            active:scale-[0.95]
          "
        >
          <X className="size-4" />
        </button>

        {/* HOTEL */}
        <Link
          href={`/hotel/${hotel.id}?currency=${currency}`}
          className="
            flex
            gap-3
            p-3
          "
        >
          {/* IMAGE */}
          <div
            className="
              size-24
              shrink-0
              overflow-hidden
              rounded-xl
              bg-muted
            "
          >
            {hotel.image && (
              <img
                src={
                  hotel.image
                }
                alt={
                  hotel.name
                }
                className="
                  size-full
                  object-cover
                "
              />
            )}
          </div>

          {/* CONTENT */}
          <div
            className="
              min-w-0
              flex-1
              pr-6
            "
          >
            <p
              className="
                text-[11px]
                font-medium
                text-primary
              "
            >
              Recommended stay
            </p>

            <h3
              className="
                mt-1
                line-clamp-1
                text-sm
                font-semibold
              "
            >
              {hotel.name}
            </h3>

            <div
              className="
                mt-1
                flex
                items-center
                gap-1
                text-xs
                text-muted-foreground
              "
            >
              <MapPin className="size-3.5 shrink-0" />

              <span className="truncate">
                {hotel.area ??
                  destination}
              </span>
            </div>

            <div
              className="
                mt-2
                flex
                items-end
                justify-between
                gap-2
              "
            >
              {hotel.rating && (
                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                  "
                >
                  <Star
                    className="size-3.5"
                    fill="currentColor"
                  />

                  <span>
                    {
                      hotel.rating
                    }
                  </span>
                </div>
              )}

              {totalPrice > 0 && (
                <div className="ml-auto text-right">
                  <p
                    className="
                      text-[10px]
                      text-muted-foreground
                    "
                  >
                    incl. taxes & fees
                  </p>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-primary
                    "
                  >
                    {formatPrice(
                      totalPrice,
                      currency
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}