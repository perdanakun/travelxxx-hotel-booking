'use client'

import Link from 'next/link'

import {
  BedDouble,
  Compass,
  CopyPlus,
  Heart,
  User,
} from 'lucide-react'

import {
  useCompare,
} from '@/context/CompareContext'

const navItems = [
  {
    name: 'explore',
    label: 'Explore',
    href: '/explore',
    icon: Compass,
  },
  {
    name: 'hotels',
    label: 'Hotels',
    href: '/hotels',
    icon: BedDouble,
  },
  {
    name: 'compare',
    label: 'Compare',
    href: '/compare',
    icon: CopyPlus,
  },
  {
    name: 'favorite',
    label: 'Favorite',
    href: '/favorite',
    icon: Heart,
  },
  {
    name: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
]

export default function BottomNav({
  active = 'home',
}) {
  const {
    count: compareCount,
  } = useCompare()

  const itemClass = (name) =>
    `
      flex
      min-w-0
      flex-1
      flex-col
      items-center
      justify-center
      gap-1
      text-[11px]
      transition-colors
      ${
        active === name
          ? 'font-semibold text-secondary'
          : 'text-muted-foreground'
      }
    `

  return (
    <nav
      className="
        fixed
        inset-x-0
        bottom-0
        z-30
        mx-auto
        flex
        w-full
        max-w-md
        border-t
        border-border
        bg-background/95
        px-2
        pb-[calc(0.75rem+env(safe-area-inset-bottom))]
        pt-3
        backdrop-blur
      "
    >
      {navItems.map((item) => {
        const Icon = item.icon

        const showCompareBadge =
          item.name === 'compare' &&
          compareCount > 0

        return (
          <Link
            key={item.name}
            href={item.href}
            className={itemClass(item.name)}
            aria-current={
              active === item.name
                ? 'page'
                : undefined
            }
          >
            <span
              className="
                relative
                inline-flex
              "
            >
              <Icon className="size-4" />

              {showCompareBadge && (
                <span
                  aria-label={`${compareCount} hotels selected for comparison`}
                  className="
                    absolute
                    -right-2.5
                    -top-2
                    flex
                    min-w-4
                    h-4
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    px-1
                    text-[9px]
                    font-bold
                    leading-none
                    text-primary-foreground
                    shadow-sm
                  "
                >
                  {compareCount}
                </span>
              )}
            </span>

            <span>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
