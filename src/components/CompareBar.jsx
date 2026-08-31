'use client'

import { Button } from '@/components/ui/button'

export default function CompareBar({
  count = 0,
  onCompare,
}) {
  if (count === 0) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-[67px] z-40 mx-auto max-w-md px-5">
      <Button
        type="button"
        variant="secondary"
        onClick={onCompare}
        className="
          min-h-12
          w-full
          justify-between
          px-5
          text-sm
          font-semibold
          shadow-lg
        "
      >
        <span>
          {count}{' '}
          {count === 1
            ? 'stay'
            : 'stays'}{' '}
          selected
        </span>

        <span>Compare now →</span>
      </Button>
    </div>
  )
}