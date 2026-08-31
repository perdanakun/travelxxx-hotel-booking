'use client'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function HotelCard({
  hotel,
  compared = false,
  onCompare,
}) {
  return (
    <article className="rounded-2xl border border-border bg-background p-3 shadow-sm">
      <div className="flex gap-3">
        <img
          src={hotel.image}
          alt={hotel.title}
          className="size-24 shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-2">
            <h3 className="font-bold leading-tight">
              {hotel.title}
            </h3>

            <span className="shrink-0 text-sm">
              {hotel.rating} ★
            </span>
          </div>

          <p className="mt-1 text-xs font-medium text-secondary">
            {hotel.area}, {hotel.destination}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {hotel.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-2 text-xs text-muted-foreground">
        <span>
          Base ${hotel.pricing.base}
        </span>

        <span>
          + Taxes ${hotel.pricing.taxes}
        </span>

        <strong className="text-sm text-foreground">
          Final $
          {hotel.pricing.base +
            hotel.pricing.taxes}
        </strong>
      </div>

      <div className="mt-3 flex gap-2">
<Button
  variant={compared ? 'selected' : 'outline'}
  onClick={onCompare}
  aria-pressed={compared}
  className="flex-1 rounded-xl"
>
  {compared && (
    <Check className="size-4" />
  )}

  {compared
    ? 'Added to compare'
    : 'Add to compare'}
</Button>

<Button>
  Book now
</Button>
      </div>
    </article>
  )
}