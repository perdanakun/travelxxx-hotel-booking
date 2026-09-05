'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Compass,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function AppHeader({
  showBack = false,
  backHref = '/',
  onBack,
  trailing,
  sticky = true,

  currency,
  onCurrencyChange,
}) {
const backButtonClasses = `
  flex
  size-8
  shrink-0
  items-center
  justify-center
  text-foreground
  transition
  touch-manipulation
  hover:opacity-70
  active:scale-[0.92]
`

  const showCurrencySwitcher =
    currency &&
    onCurrencyChange

  return (
<header
  className={`
    ${
      sticky
        ? 'sticky top-0 z-50'
        : 'shrink-0'
    }
    flex
    h-16
    items-center
    justify-between
    gap-3
    border-b
    border-border
    bg-background/95
    px-5
    backdrop-blur
  `}
>
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-3">
        {showBack &&
          (onBack ? (
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
          ))}

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

      {/* RIGHT */}
      <div className="flex shrink-0 items-center gap-2">
        {showCurrencySwitcher && (
          <Button
            type="button"
            variant="outline-none"
            onClick={() =>
              onCurrencyChange(
                currency === 'USD'
                  ? 'IDR'
                  : 'USD'
              )
            }
            aria-label={`Change currency from ${currency}`}
            className="h-9 min-w-[58px] rounded-xl px-3 text-xs font-semibold"
          >
            {currency}
          </Button>
        )}

        {trailing}
      </div>
    </header>
  )
}