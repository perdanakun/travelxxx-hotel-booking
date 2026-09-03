'use client'

import {
  Search,
  Sparkles,
} from 'lucide-react'

export default function ExploreDiscoveryBar({
  onSearch,
  onPersonalize,
  profileLabel = 'Personalize',
}) {
  return (
    <div
      className="
        absolute
        inset-x-0
        top-0
        z-50
        px-4
        pt-4
      "
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSearch}
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
          <Search className="size-4 shrink-0" />

          <span className="truncate text-white/85">
            Search places
          </span>
        </button>

        <button
          type="button"
          onClick={onPersonalize}
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
          <Sparkles className="size-4" />

          <span className="hidden sm:inline">
            {profileLabel}
          </span>
        </button>
      </div>
    </div>
  )
}