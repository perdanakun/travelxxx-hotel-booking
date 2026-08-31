'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Compass,
  SlidersHorizontal,
} from 'lucide-react'

export default function AppHeader({
  showBack = false,
  backHref = '/',
  onBack,
  action,
  onAction,
  trailing,
  sticky = true,
}) {
  const backButtonClasses = `
    flex
    min-h-11
    min-w-11
    shrink-0
    items-center
    justify-center
    rounded-full
    border
    border-border
    bg-background
    text-foreground
    transition-all
    touch-manipulation
    hover:bg-surface
    active:scale-[0.96]
  `

  return (
    <header
      className={`
        ${
          sticky
            ? 'sticky top-0 z-50'
            : 'shrink-0'
        }
        flex
        items-center
        justify-between
        border-b
        border-border
        bg-background/95
        px-5
        py-4
        backdrop-blur
      `}
    >
      <div className="flex min-w-0 items-center gap-3">
        {showBack && (
          onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className={backButtonClasses}
            >
              <ArrowLeft className="size-5" />
            </button>
          ) : (
            <Link
              href={backHref}
              aria-label="Go back"
              className={backButtonClasses}
            >
              <ArrowLeft className="size-5" />
            </Link>
          )
        )}

        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Compass className="size-5" />
          </span>

          <div className="min-w-0">
            <p className="truncate font-bold tracking-tight">
              TravelXXX
            </p>

            <p className="truncate text-xs text-muted-foreground">
              Find your kind of stay
            </p>
          </div>
        </div>
      </div>

    </header>
  )
}