'use client'

import {
  ChevronRight,
  Heart,
  MapPin,
  Settings2,
  User,
  WalletCards,
} from 'lucide-react'

import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'

const travelerPreferences = [
  'Local food',
  'Walkable',
  'Quiet',
  'Culture',
]

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background pb-24 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      <AppHeader />

      <section className="px-5 pb-5 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Your profile
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Profile
        </h1>
      </section>

      <section className="px-5">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-bold">
              Dinda
            </h2>

            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              dinda@example.com
            </p>
          </div>

          <ChevronRight className="size-5 text-muted-foreground" />
        </div>
      </section>

      <section className="mt-7 px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Traveler Profile
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Relaxed Explorer
            </h2>
          </div>

          <Button
            type="button"
            variant="link"
            className="h-auto min-h-0 p-0 text-sm"
          >
            Edit
          </Button>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          You tend to enjoy slower trips,
          local experiences, and places
          that are easy to explore on foot.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {travelerPreferences.map(
            (preference) => (
              <span
                key={preference}
                className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium"
              >
                {preference}
              </span>
            )
          )}
        </div>
      </section>

      <section className="mt-7 px-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border p-4">
            <WalletCards className="size-5 text-primary" />

            <p className="mt-4 text-xs text-muted-foreground">
              Typical budget
            </p>

            <p className="mt-1 text-sm font-bold">
              Rp800k–1.5m
            </p>

            <p className="text-xs text-muted-foreground">
              per night
            </p>
          </div>

          <div className="rounded-2xl border border-border p-4">
            <MapPin className="size-5 text-primary" />

            <p className="mt-4 text-xs text-muted-foreground">
              Preferred area
            </p>

            <p className="mt-1 text-sm font-bold">
              Local neighborhoods
            </p>

            <p className="text-xs text-muted-foreground">
              over tourist centers
            </p>
          </div>
        </div>
      </section>

      <section className="mt-7 px-5">
        <h2 className="text-lg font-bold">
          Travel preferences
        </h2>

        <div className="mt-3 overflow-hidden rounded-2xl border border-border">
          <ProfileRow
            icon={Heart}
            label="Travel style"
            value="Relaxed"
          />

          <ProfileRow
            icon={User}
            label="Usually travels"
            value="Couple"
          />

          <ProfileRow
            icon={Settings2}
            label="Personalization"
            value="On"
            last
          />
        </div>
      </section>

      <section className="mt-7 px-5">
        <Button
          type="button"
          variant="secondary"
          className="w-full rounded-xl"
        >
          Edit traveler profile
        </Button>
      </section>

      <BottomNav active="profile" />
    </main>
  )
}

function ProfileRow({
  icon: Icon,
  label,
  value,
  last = false,
}) {
  return (
    <button
      type="button"
      className={`
        flex
        w-full
        items-center
        gap-3
        px-4
        py-4
        text-left
        ${last ? '' : 'border-b border-border'}
      `}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface">
        <Icon className="size-4" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">
          {label}
        </span>

        <span className="mt-0.5 block text-xs text-muted-foreground">
          {value}
        </span>
      </span>

      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  )
}