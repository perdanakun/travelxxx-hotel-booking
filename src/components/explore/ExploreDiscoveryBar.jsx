'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  ChevronDown,
  Search,
  Sparkles,
  X,
} from 'lucide-react'

export default function ExploreDiscoveryBar({
  onSearch,
  onPersonalize,
  profileLabel = 'Personalize',
}) {
  const [expanded, setExpanded] =
    useState(false)

  const [searching, setSearching] =
    useState(false)

  const [query, setQuery] =
    useState('')

  const inputRef = useRef(null)

  /*
   * Auto-collapse only while the
   * normal discovery controls are open.
   *
   * Never collapse while the user
   * is typing a search.
   */
  useEffect(() => {
    if (
      !expanded ||
      searching
    ) {
      return
    }

    const timer = setTimeout(() => {
      setExpanded(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
    }
  }, [
    expanded,
    searching,
  ])

  /*
   * Focus input immediately after
   * entering search mode.
   */
  useEffect(() => {
    if (!searching) {
      return
    }

    inputRef.current?.focus()
  }, [searching])

  const openControls = () => {
    setExpanded(true)
  }

  const openSearch = () => {
    setSearching(true)
  }

  const closeSearch = () => {
    setSearching(false)
    setQuery('')
  }

  const submitSearch = (
    event
  ) => {
    event.preventDefault()

    const trimmed =
      query.trim()

    if (!trimmed) {
      return
    }

    onSearch?.(trimmed)
  }

  return (
    <div
      className="
        absolute
        inset-x-0
        top-0
        z-50
      "
    >
      {/* COLLAPSED */}
      {!expanded && (
        <div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
          "
        >
          <button
            type="button"
            onClick={
              openControls
            }
            aria-label="Open discovery controls"
            className="
              flex
              h-7
              min-w-12
              items-center
              justify-center
              rounded-b-xl
              bg-black/40
              px-3
              text-white
              backdrop-blur-md
              transition
              active:scale-[0.96]
            "
          >
            <ChevronDown
              className="size-4"
            />
          </button>
        </div>
      )}

      {/* EXPANDED */}
      <div
        className={`
          px-4
          pt-4
          transition-all
          duration-300
          ease-out

          ${
            expanded
              ? `
                translate-y-0
                opacity-100
              `
              : `
                pointer-events-none
                -translate-y-full
                opacity-0
              `
          }
        `}
      >
        {searching ? (
          /* SEARCH INPUT MODE */
          <form
            onSubmit={
              submitSearch
            }
            className="
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-2
                rounded-full
                bg-black/40
                px-4
                backdrop-blur-md
              "
            >
              <Search
                className="
                  size-4
                  shrink-0
                  text-white
                "
              />

              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(
                  event
                ) =>
                  setQuery(
                    event.target
                      .value
                  )
                }
                placeholder="Search destination or area"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/65
                "
              />
            </div>

            <button
              type="button"
              onClick={
                closeSearch
              }
              aria-label="Cancel search"
              className="
                flex
                size-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-black/40
                text-white
                backdrop-blur-md
                transition
                active:scale-[0.96]
              "
            >
              <X
                className="size-4"
              />
            </button>
          </form>
        ) : (
          /* DISCOVERY CONTROLS */
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <button
              type="button"
              onClick={
                openSearch
              }
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-2
                rounded-full
                bg-black/40
                px-4
                py-3
                text-left
                text-sm
                text-white
                backdrop-blur-md
                transition
                active:scale-[0.99]
              "
            >
              <Search
                className="
                  size-4
                  shrink-0
                "
              />

              <span
                className="
                  truncate
                  text-white/85
                "
              >
                Search places
              </span>
            </button>

            <button
              type="button"
              onClick={
                onPersonalize
              }
              className="
                flex
                shrink-0
                items-center
                gap-2
                rounded-full
                bg-white
                px-4
                py-3
                text-sm
                font-medium
                text-black
                transition
                active:scale-[0.98]
              "
            >
              <Sparkles
                className="
                  size-4
                  shrink-0
                "
              />

              <span
                className="
                  hidden
                  sm:inline
                "
              >
                {profileLabel}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}