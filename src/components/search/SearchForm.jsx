'use client'

import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import DestinationInput from '@/components/search/DestinationInput'

function Counter({
  label,
  value,
  min = 1,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm font-medium">
        {label}
      </span>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Remove ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() =>
            onChange(Math.max(min, value - 1))
          }
        >
          <Minus className="size-4" />
        </Button>

        <span
          className="min-w-6 text-center text-sm font-bold"
          aria-live="polite"
        >
          {value}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Add ${label.toLowerCase()}`}
          onClick={() =>
            onChange(value + 1)
          }
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default function SearchForm({
  value,
  onChange,
  onSubmit,
  submitLabel = 'Search your hotel',
}) {
  const update = (key, nextValue) => {
    onChange({
      ...value,
      [key]: nextValue,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {/* DESTINATION */}
      <div>
        <DestinationInput
        value={value.destination}
        onChange={(destination) =>
            update('destination', destination)
        }
        />
      </div>

{/* DATES */}
<div className="min-w-0">
  <div className="grid min-w-0 grid-cols-2 gap-2">
    <div className="min-w-0">
      <label
        htmlFor="search-check-in"
        className="mb-1.5 block text-[11px] text-muted-foreground"
      >
        Check-in
      </label>

      <input
        id="search-check-in"
        type="date"
        value={value.checkIn}
        onChange={(event) => {
          const nextCheckIn = event.target.value

          const shouldResetCheckout =
            value.checkOut &&
            nextCheckIn > value.checkOut

          onChange({
            ...value,
            checkIn: nextCheckIn,
            checkOut: shouldResetCheckout
              ? ''
              : value.checkOut,
          })
        }}
        className="
          box-border
          block
          min-h-12
          min-w-0
          w-full
          max-w-full
          appearance-none
          rounded-xl
          border
          border-border
          bg-background
          px-3
          py-3
          text-sm
          outline-none
          transition
          focus:border-primary
        "
      />
    </div>

    <div className="min-w-0">
      <label
        htmlFor="search-check-out"
        className="mb-1.5 block text-[11px] text-muted-foreground"
      >
        Check-out
      </label>

      <input
        id="search-check-out"
        type="date"
        value={value.checkOut}
        min={value.checkIn}
        onChange={(event) =>
          update('checkOut', event.target.value)
        }
        className="
          box-border
          block
          min-h-12
          min-w-0
          w-full
          max-w-full
          appearance-none
          rounded-xl
          border
          border-border
          bg-background
          px-3
          py-3
          text-sm
          outline-none
          transition
          focus:border-primary
        "
      />
    </div>
  </div>
</div>


      {/* GUESTS & ROOMS */}
      <div>
        <p className="mb-2 text-xs font-semibold text-muted-foreground">
          Who&apos;s staying?
        </p>

        <div className="rounded-xl border border-border bg-background px-3">
          <Counter
            label="Guests"
            value={value.guests}
            onChange={(guests) =>
              update('guests', guests)
            }
          />

          <div className="border-t border-border" />

          <Counter
            label="Rooms"
            value={value.rooms}
            onChange={(rooms) =>
              update('rooms', rooms)
            }
          />
        </div>
      </div>

      {/* SUBMIT */}
      <Button
        type="button"
        size="lg"
        onClick={onSubmit}
        disabled={
          !value.destination ||
          !value.checkIn ||
          !value.checkOut
        }
        className="mt-1 w-full text-sm font-bold"
      >
        {submitLabel}
      </Button>
    </div>
  )
}