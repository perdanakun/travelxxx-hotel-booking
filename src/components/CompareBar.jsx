'use client'

import { ArrowRight, GitCompare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CompareBar({
  count = 0,
  onCompare,
}) {
  if (count === 0) {
    return null
  }

  return (
<div className="fixed bottom-[67px] left-1/2 z-40 -translate-x-1/2">
  <Button
    type="button"
    variant="secondary"
    onClick={onCompare}
    className="
      flex
      h-11
      w-auto
      items-center
      gap-2
      rounded-full
      px-4
      text-sm
      font-semibold
      shadow-lg
    "
  >
    <span className="relative flex items-center justify-center">
      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
        {count}
      </span>
    </span>

    <span className="flex items-center gap-1.5">
      Compare now
      <ArrowRight className="h-4 w-4" />
    </span>
  </Button>
</div>

  )
}
