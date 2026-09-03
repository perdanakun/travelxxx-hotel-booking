'use client'

import Link from 'next/link'
import {
  Compass,
  CopyPlus,
  Heart,
  House,
  User,
  Sparkles,
  BedDouble,
  ShoppingBag
} from 'lucide-react'

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
            <Icon className="size-4" />

            <span>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}