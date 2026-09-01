'use client'

import { Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'

function formatSearchDates(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return 'Select dates'
  }

  const start = new Date(
    `${checkIn}T00:00:00`
  )

  const end = new Date(
    `${checkOut}T00:00:00`
  )

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()

  const startDay = start.getDate()
  const endDay = end.getDate()

  const startMonth =
    start.toLocaleDateString('en-US', {
      month: 'short',
    })

  const endMonth =
    end.toLocaleDateString('en-US', {
      month: 'short',
    })

  if (sameMonth) {
    return `${startDay}–${endDay} ${endMonth}`
  }

  return `${startDay} ${startMonth}–${endDay} ${endMonth}`
}

export default function SearchSummary({
  search,
  filterCount = 0,
  onEdit,
  onOpenFilters,
  variant = 'search',
}) {
  const dateLabel = formatSearchDates(
    search.checkIn,
    search.checkOut
  )

  const isHotel = variant === 'hotel'

  return (
    <section className="border-border px-5 pb-0 pt-4">
      <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">

          <button
            type="button"
            onClick={onEdit}
            className="
              min-w-0
              flex-1
              text-left
              active:opacity-70
            "
            aria-label={
              isHotel
                ? 'Change stay details'
                : 'Edit search'
            }
          >
            <p className="truncate text-xs font-medium text-muted-foreground">
              {search.destination?.label}
            </p>

            <p className="mt-1 text-sm font-bold">
              {dateLabel} · {search.guests}{' '}
              {search.guests === 1
                ? 'guest'
                : 'guests'}{' '}
              · {search.rooms}{' '}
              {search.rooms === 1
                ? 'room'
                : 'rooms'}
            </p>
          </button>

          {isHotel ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="shrink-0 rounded-full"
            >
              Change
            </Button>
          ) : (
            <Button
              type="button"
              variant={
                filterCount > 0
                  ? 'secondary'
                  : 'outline'
              }
              size="sm"
              onClick={onOpenFilters}
              className="shrink-0 rounded-full"
            >
              <Filter className="size-3.5" />

              Filter

              {filterCount > 0 && (
                <span>{filterCount}</span>
              )}
            </Button>
          )}

        </div>
      </div>
    </section>
  )
}