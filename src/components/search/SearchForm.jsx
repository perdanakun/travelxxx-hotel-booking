'use client'

import {
  CalendarDays,
  Minus,
  Plus,
} from 'lucide-react'

import {
  useState,
} from 'react'

import {
  Button,
} from '@/components/ui/button'

import DestinationInput from '@/components/search/DestinationInput'
import DateRangeSheet from '@/components/search/DateRangeSheet'


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
          disabled={
            value <= min
          }
          onClick={() =>
            onChange(
              Math.max(
                min,
                value - 1
              )
            )
          }
        >
          <Minus className="size-4" />
        </Button>

        <span
          className="
            min-w-6
            text-center
            text-sm
            font-bold
          "
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
            onChange(
              value + 1
            )
          }
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  )
}


function formatDate(
  value
) {
  if (!value) {
    return null
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      day: 'numeric',
      month: 'short',
    }
  ).format(
    new Date(
      `${value}T00:00:00`
    )
  )
}


export default function SearchForm({
  value,
  onChange,
  onSubmit,
  submitLabel = 'Search your hotel',
}) {
  const [
    calendarOpen,
    setCalendarOpen,
  ] = useState(false)


  const update = (
    key,
    nextValue
  ) => {
    onChange({
      ...value,
      [key]:
        nextValue,
    })
  }


  const dateLabel =
    value.checkIn &&
    value.checkOut
      ? `${formatDate(
          value.checkIn
        )} – ${formatDate(
          value.checkOut
        )}`
      : 'Choose your dates'


  return (
    <>
      <div className="flex flex-col gap-3">
        {/* DESTINATION */}
        <div>
          <DestinationInput
            value={
              value.destination
            }
            onChange={(
              destination
            ) =>
              update(
                'destination',
                destination
              )
            }
          />
        </div>


        {/* DATE RANGE */}
        <div>
          <label className="mb-1.5 block text-[11px] text-muted-foreground">
            Stay dates
          </label>

          <button
            type="button"
            onClick={() =>
              setCalendarOpen(
                true
              )
            }
            className="
              flex
              min-h-12
              w-full
              items-center
              gap-3
              rounded-xl
              border
              border-border
              bg-background
              px-3
              py-3
              text-left
              transition

              focus:border-primary
              focus:outline-none
              active:bg-surface
            "
          >
            <span
              className="
                flex
                size-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-surface
              "
            >
              <CalendarDays className="size-4" />
            </span>

            <span className="min-w-0 flex-1">
              <span
                className="
                  block
                  text-[11px]
                  text-muted-foreground
                "
              >
                Check-in · Check-out
              </span>

              <strong
                className="
                  mt-0.5
                  block
                  truncate
                  text-sm
                "
              >
                {dateLabel}
              </strong>
            </span>
          </button>
        </div>


        {/* GUESTS & ROOMS */}
        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            Who&apos;s staying?
          </p>

          <div className="rounded-xl border border-border bg-background px-3">
            <Counter
              label="Guests"
              value={
                value.guests
              }
              onChange={(
                guests
              ) =>
                update(
                  'guests',
                  guests
                )
              }
            />

            <div className="border-t border-border" />

            <Counter
              label="Rooms"
              value={
                value.rooms
              }
              onChange={(
                rooms
              ) =>
                update(
                  'rooms',
                  rooms
                )
              }
            />
          </div>
        </div>


        {/* SUBMIT */}
        <Button
          type="button"
          size="lg"
          onClick={
            onSubmit
          }
          disabled={
            !value.destination ||
            !value.checkIn ||
            !value.checkOut
          }
          className="
            mt-1
            w-full
            text-sm
            font-bold
          "
        >
          {submitLabel}
        </Button>
      </div>


      {/* DATE RANGE SHEET */}
      <DateRangeSheet
        open={
          calendarOpen
        }

        checkIn={
          value.checkIn
        }

        checkOut={
          value.checkOut
        }

        onClose={() =>
          setCalendarOpen(
            false
          )
        }

        onApply={({
          checkIn,
          checkOut,
        }) => {
          onChange({
            ...value,
            checkIn,
            checkOut,
          })

          setCalendarOpen(
            false
          )
        }}
      />
    </>
  )
}