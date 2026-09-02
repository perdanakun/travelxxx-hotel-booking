'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  formatPrice,
  getFinalPrice,
} from '@/lib/formatPrice'

export default function HotelCard({
  hotel,
  badge,
  currency = 'USD',
  href,
  compared = false,
  onCompare,
}) {
  const router = useRouter()

  const openHotel = () => {
    router.push(
      href ?? `/hotel/${hotel.id}`
    )
  }

  const badgeStyles = {
    'Best match':
      'bg-primary text-primary-foreground',

    Recommended:
      'bg-secondary text-secondary-foreground',

    'Great value':
      'bg-background/90 text-foreground backdrop-blur',

    'Top rated':
      'bg-background/90 text-foreground backdrop-blur',
  }

  const images =
    hotel.gallery?.length > 0
      ? hotel.gallery
      : [hotel.image]

  const [activeImage, setActiveImage] =
    useState(0)

  const [favorite, setFavorite] =
    useState(false)

  const [touchStart, setTouchStart] =
    useState(null)

  const finalPrice =
    getFinalPrice(
      hotel.pricing
    )

  const priceTextSize =
    currency === 'IDR'
      ? 'text-lg'
      : 'text-2xl'

  const breakdownTextSize =
    currency === 'IDR'
      ? 'text-[10px]'
      : 'text-xs'

  const showPreviousImage = () => {
    setActiveImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    )
  }

  const showNextImage = () => {
    setActiveImage((current) =>
      current ===
      images.length - 1
        ? 0
        : current + 1
    )
  }

  const handleTouchStart = (
    event
  ) => {
    setTouchStart(
      event.touches[0].clientX
    )
  }

  const handleTouchEnd = (
    event
  ) => {
    if (
      touchStart === null
    ) {
      return
    }

    const touchEnd =
      event.changedTouches[0]
        .clientX

    const distance =
      touchStart - touchEnd

    const minimumSwipe = 50

    if (
      distance >
      minimumSwipe
    ) {
      showNextImage()
    }

    if (
      distance <
      -minimumSwipe
    ) {
      showPreviousImage()
    }

    setTouchStart(null)
  }

  const nearbyLabels =
    hotel.nearby
      ?.map(
        (place) =>
          place.type
      )
      .filter(
        (
          type,
          index,
          array
        ) =>
          array.indexOf(
            type
          ) === index
      )
      .slice(0, 3)

  const nearbySummary =
    nearbyLabels?.length >
    0
      ? `Near ${nearbyLabels.join(
          ' · '
        )}`
      : null

  return (
    <article
      onClick={
        openHotel
      }
      className="cursor-pointer overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
    >
      {/* IMAGE */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-muted"
        onTouchStart={
          handleTouchStart
        }
        onTouchEnd={
          handleTouchEnd
        }
      >
        <img
          src={
            images[
              activeImage
            ]
          }
          alt={
            hotel.title
          }
          className="size-full object-cover"
        />

        {/* BADGE */}
        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
              badgeStyles[
                badge
              ] ??
              'bg-background/90 text-foreground backdrop-blur'
            }`}
          >
            {badge}
          </span>
        )}

        {/* FAVORITE */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={
            favorite
              ? 'Remove from favorites'
              : 'Add to favorites'
          }
          aria-pressed={
            favorite
          }
          onClick={(
            event
          ) => {
            event.stopPropagation()

            setFavorite(
              (current) =>
                !current
            )
          }}
          className="absolute right-3 top-3 border-white/40 bg-background/90 shadow-sm backdrop-blur"
        >
          <Heart
            className={`size-4 ${
              favorite
                ? 'fill-current text-primary'
                : ''
            }`}
          />
        </Button>

        {/* IMAGE DOTS */}
        {images.length >
          1 && (
          <div
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
            aria-label={`Image ${
              activeImage +
              1
            } of ${
              images.length
            }`}
          >
            {images.map(
              (
                _,
                index
              ) => (
                <button
                  key={
                    index
                  }
                  type="button"
                  aria-label={`Show image ${
                    index +
                    1
                  }`}
                  onClick={(
                    event
                  ) => {
                    event.stopPropagation()

                    setActiveImage(
                      index
                    )
                  }}
                  className={`size-1.5 rounded-full transition-all ${
                    activeImage ===
                    index
                      ? 'w-4 bg-white'
                      : 'bg-white/60'
                  }`}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-tight">
              {
                hotel.title
              }
            </h3>

            <p className="mt-1 text-xs font-medium text-secondary">
              {
                hotel.area
              }
              ,{' '}
              {
                hotel.destination
              }
            </p>
          </div>

          <span className="shrink-0 text-sm font-semibold">
            {
              hotel.rating
            }{' '}
            ★
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {
            hotel.description
          }
        </p>

        {nearbySummary && (
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            {
              nearbySummary
            }
          </p>
        )}

        {/* PRICE + COMPARE */}
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Final price
            </p>

            <div className="mt-0.5 flex items-baseline gap-1">
              <strong
                className={`font-bold ${priceTextSize} text-primary`}
              >
                {formatPrice(
                  finalPrice,
                  {
                    fromCurrency:
                      hotel
                        .pricing
                        .currency,
                    currency,
                  }
                )}
              </strong>

              <span className="text-xs text-muted-foreground">
                / night
              </span>
            </div>

            <p
              className={`mt-1 text-muted-foreground ${breakdownTextSize}`}
            >
              {formatPrice(
                hotel
                  .pricing
                  .base,
                {
                  fromCurrency:
                    hotel
                      .pricing
                      .currency,
                  currency,
                }
              )}{' '}
              base +{' '}
              {formatPrice(
                hotel
                  .pricing
                  .taxes,
                {
                  fromCurrency:
                    hotel
                      .pricing
                      .currency,
                  currency,
                }
              )}{' '}
              taxes
            </p>
          </div>

          <Button
            type="button"
            variant={
              compared
                ? 'selected'
                : 'outline'
            }
            onClick={(
              event
            ) => {
              event.stopPropagation()

              onCompare?.()
            }}
            aria-pressed={
              compared
            }
            className="shrink-0 rounded-xl"
          >
            {compared && (
              <Check className="size-4" />
            )}

            {compared
              ? 'Added'
              : 'Compare'}
          </Button>
        </div>
      </div>
    </article>
  )
}