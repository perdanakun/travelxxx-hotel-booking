'use client'

import { Button } from '@/components/ui/button'

const sortOptions = [
  'Best match',
  'Lowest price',
  'Top rated',
]

export default function SortControls({
  value,
  onChange,
}) {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
      {sortOptions.map((option) => {
        const active = value === option

        return (
          <Button
            key={option}
            type="button"
            size="sm"
            variant={
              active
                ? 'secondary'
                : 'outline'
            }
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`
              shrink-0
              rounded-full
              ${
                active
                  ? ''
                  : 'text-muted-foreground'
              }
            `}
          >
            {option}
          </Button>
        )
      })}
    </div>
  )
}