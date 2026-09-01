'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FavoriteButton({
  active = false,
  onToggle,
  size = 'sm',
  className = '',
}) {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant="outline"
      aria-label={
        active
          ? 'Remove from wishlist'
          : 'Add to wishlist'
      }
      aria-pressed={active}
      onClick={onToggle}
      className={`
        rounded-full
        ${size === 'sm' ? 'size-10' : 'size-11'}
        ${className}
      `}
    >
      <Heart
        className={`size-4 ${
          active
            ? 'fill-primary text-primary'
            : ''
        }`}
      />
    </Button>
  )
}