'use client'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

const priceOptions = [
  {
    label: 'Any price',
    value: null,
  },
  {
    label: 'Under $80',
    value: 80,
  },
  {
    label: 'Under $100',
    value: 100,
  },
  {
    label: 'Under $120',
    value: 120,
  },
]

const ratingOptions = [
  {
    label: 'Any rating',
    value: null,
  },
  {
    label: '4.0+',
    value: 4,
  },
  {
    label: '4.5+',
    value: 4.5,
  },
]

export default function FilterSheet({
  open,
  filters,
  onChange,
  onApply,
  onReset,
  onClose,
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-[1px]"
      />

      {/* SHEET */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className="
          relative
          z-10
          max-h-[85dvh]
          w-full
          max-w-md
          overflow-y-auto
          rounded-t-[2rem]
          bg-background
          px-5
          pb-[calc(1.5rem+env(safe-area-inset-bottom))]
          pt-5
          shadow-2xl
        "
      >
        <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-border" />

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Refine results
            </p>

            <h2
              id="filter-title"
              className="mt-1 text-2xl font-bold"
            >
              Filters
            </h2>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close filters"
            onClick={onClose}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* PRICE */}
        <div className="mt-7">
          <h3 className="font-bold">
            Final price per night
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Filter using the price including taxes.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {priceOptions.map((option) => {
              const active =
                filters.maxPrice === option.value

              return (
                <Button
                  key={option.label}
                  type="button"
                  size="sm"
                  variant={
                    active
                      ? 'secondary'
                      : 'outline'
                  }
                  aria-pressed={active}
                  onClick={() =>
                    onChange({
                      ...filters,
                      maxPrice: option.value,
                    })
                  }
                  className="rounded-full"
                >
                  {option.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* RATING */}
        <div className="mt-7 border-t border-border pt-6">
          <h3 className="font-bold">
            Guest rating
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {ratingOptions.map((option) => {
              const active =
                filters.minRating === option.value

              return (
                <Button
                  key={option.label}
                  type="button"
                  size="sm"
                  variant={
                    active
                      ? 'secondary'
                      : 'outline'
                  }
                  aria-pressed={active}
                  onClick={() =>
                    onChange({
                      ...filters,
                      minRating: option.value,
                    })
                  }
                  className="rounded-full"
                >
                  {option.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex gap-2 border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="flex-1 rounded-xl"
          >
            Reset
          </Button>

          <Button
            type="button"
            onClick={onApply}
            className="flex-[1.5]"
          >
            Show results
          </Button>
        </div>
      </section>
    </div>
  )
}