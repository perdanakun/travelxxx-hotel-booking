'use client'

import Link from 'next/link'
import {
  ArrowLeft,
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
        bg-background/95
        px-5
        backdrop-blur
      `}
    >
      {/* LEFT */}
      <div className="flex min-w-0 items-center">
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
