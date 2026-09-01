'use client'

import {
  Check,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Utensils,
  Waves,
  Wifi,
  Wind,
} from 'lucide-react'

const facilityIcons = {
  wifi: Wifi,
  pool: Waves,
  breakfast: Utensils,
  'air-conditioning': Wind,
  'front-desk': ShieldCheck,
  'airport-transfer': MapPin,
}

export default function Facilities({
  amenities = [],
  variant = 'carousel',
  initialLimit = 6,
  onSeeAll,
}) {
  const isCarousel =
    variant === 'carousel'

  const isCompact =
    variant === 'compact'

  const isGrid =
    variant === 'grid'

  if (!amenities.length) {
    return null
  }

  if (isCarousel) {
    const visibleAmenities =
      amenities.slice(0, initialLimit)

    return (
      <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-3 pb-1">
          {visibleAmenities.map(
            (amenity) => {
              const Icon =
                facilityIcons[
                  amenity.id
                ] ?? Check

              return (
                <div
                  key={amenity.id}
                  className="
                    w-28
                    shrink-0
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    p-3
                  "
                >
                  <Icon className="mb-3 size-5 text-secondary" />

                  <p className="text-xs font-medium leading-snug">
                    {amenity.label}
                  </p>
                </div>
              )
            }
          )}

          {amenities.length >
            initialLimit && (
            <button
              type="button"
              onClick={onSeeAll}
              className="
                w-28
                shrink-0
                rounded-2xl
                border
                border-border
                bg-background
                p-3
                text-left
                transition-colors
                hover:bg-muted
              "
            >
              <div className="mb-3 flex size-8 items-center justify-center rounded-full bg-muted">
                <ChevronRight className="size-4 text-secondary" />
              </div>

              <p className="text-xs font-semibold">
                See all
              </p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                {amenities.length}{' '}
                facilities
              </p>
            </button>
          )}
        </div>
      </div>
    )
  }

  if (isGrid) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {amenities.map((amenity) => {
        const Icon =
          facilityIcons[amenity.id] ??
          Check

        return (
          <div
            key={amenity.id}
            className="
              flex
              min-h-16
              items-center
              gap-3
              rounded-2xl
              bg-surface
              p-3
            "
          >
            <Icon className="size-5 shrink-0 text-secondary" />

            <span className="text-sm font-medium leading-snug">
              {amenity.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
  return null
}