'use client'

import Link from 'next/link'
import {
  Compass,
  Heart,
  MapPin,
} from 'lucide-react'

export default function BottomNav({
  active = 'explore',
}) {
  const itemClass = (name) =>
    `
      flex
      flex-col
      items-center
      gap-1
      text-xs
      ${
        active === name
          ? 'font-semibold text-secondary'
          : 'text-muted-foreground'
      }
    `

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-md justify-around border-t border-border bg-background/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <Link
        href="/"
        className={itemClass('explore')}
      >
        <Compass className="size-4" />
        Explore
      </Link>

      <button
        type="button"
        className={itemClass('saved')}
      >
        <Heart className="size-4" />
        Saved
      </button>

      <button
        type="button"
        className={itemClass('trips')}
      >
        <MapPin className="size-4" />
        Trips
      </button>

      <button
        type="button"
        className={itemClass('profile')}
      >
        <span className="flex size-4 items-center justify-center rounded-full border border-current text-[9px]">
          D
        </span>

        Profile
      </button>
    </nav>
  )
}