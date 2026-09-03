'use client'

import { useEffect, useMemo, useState } from 'react'
import { MapPin, Search } from 'lucide-react'

import { destinations } from '@/data/destinations'

export default function DestinationInput({
  value,
  onChange,
}) {
  const [query, setQuery] = useState(
    value?.label ?? ''
  )

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setQuery(value?.label ?? '')
  }, [value])

  const suggestions = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase()

    if (!normalizedQuery) {
      return destinations.slice(0, 5)
    }

    return destinations.filter((destination) =>
      destination.label
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [query])

  const selectDestination = (destination) => {
    setQuery(destination.label)
    onChange(destination)
    setOpen(false)
  }

  return (
    <div className="relative">

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          id="search-destination"
          type="text"
          value={query}
          placeholder="Where do you want to go?"
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value)

            // Typed text is not yet a valid selected destination.
            onChange(null)

            setOpen(true)
          }}
          className="
            min-h-12
            w-full
            rounded-xl
            border
            border-border
            bg-background
            py-3
            pl-10
            pr-3
            text-sm
            outline-none
            transition
            focus:border-primary
          "
        />
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
          <div className="border-b border-border px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">
              {query
                ? 'Matching destinations'
                : 'Popular destinations'}
            </p>
          </div>

          <div className="p-1.5">
            {suggestions.length > 0 ? (
              suggestions.map((destination) => (
                <button
                  key={destination.id}
                  type="button"
                  onClick={() =>
                    selectDestination(destination)
                  }
                  className="
                    flex
                    min-h-12
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2
                    text-left
                    transition
                    hover:bg-surface
                    active:bg-surface
                  "
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface">
                    <MapPin className="size-4 text-secondary" />
                  </span>

                  <span>
                    <span className="block text-sm font-semibold">
                      {destination.city}
                    </span>

                    <span className="block text-xs text-muted-foreground">
                      {destination.country}
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4">
                <p className="text-sm font-medium">
                  No destination found
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Try another city or destination.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}