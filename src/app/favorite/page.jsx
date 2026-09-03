'use client'

import { useState } from 'react'
import {
  Heart,
  MapPin,
  Star,
} from 'lucide-react'

import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'

const favoriteHotels = [
  {
    id: 'saffron',
    title: 'Saffron Boutique Hotel',
    area: 'Prawirotaman',
    destination: 'Yogyakarta',
    rating: 4.8,
    price: 'Rp1.280.000',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'lotus',
    title: 'Lotus Heritage Stay',
    area: 'Malioboro',
    destination: 'Yogyakarta',
    rating: 4.6,
    price: 'Rp980.000',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85',
  },
]

const favoriteDestinations = [
  {
    id: 'prawirotaman',
    title: 'Prawirotaman',
    location: 'Yogyakarta, Indonesia',
    tags: ['Food', 'Walkable', 'Local'],
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'ubud',
    title: 'Ubud',
    location: 'Bali, Indonesia',
    tags: ['Quiet', 'Green', 'Culture'],
    image:
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=85',
  },
]

export default function FavoritePage() {
  const [activeTab, setActiveTab] =
    useState('hotels')

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      <AppHeader />

      <section className="px-5 pb-5 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Your saved picks
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Favorite
        </h1>

        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Keep hotels and destinations you want to come back to.
        </p>
      </section>

      <section className="px-5">
        <div className="grid grid-cols-2 rounded-xl bg-surface p-1">
          <button
            type="button"
            onClick={() =>
              setActiveTab('hotels')
            }
            className={`
              rounded-lg
              px-3
              py-2
              text-sm
              font-semibold
              transition
              ${
                activeTab === 'hotels'
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground'
              }
            `}
          >
            Hotels
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab('destinations')
            }
            className={`
              rounded-lg
              px-3
              py-2
              text-sm
              font-semibold
              transition
              ${
                activeTab === 'destinations'
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground'
              }
            `}
          >
            Destinations
          </button>
        </div>
      </section>

      <section className="mt-5 px-5">
        {activeTab === 'hotels' ? (
          <div className="flex flex-col gap-4">
            {favoriteHotels.map((hotel) => (
              <article
                key={hotel.id}
                className="overflow-hidden rounded-2xl border border-border bg-background"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={hotel.image}
                    alt={hotel.title}
                    className="size-full object-cover"
                  />

                  <button
                    type="button"
                    aria-label={`Remove ${hotel.title} from favorites`}
                    className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur"
                  >
                    <Heart className="size-4 fill-primary text-primary" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-bold">
                        {hotel.title}
                      </h2>

                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {hotel.area},{' '}
                        {hotel.destination}
                      </p>
                    </div>

                    <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
                      <Star
                        className="size-3.5"
                        fill="currentColor"
                      />
                      {hotel.rating}
                    </span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-bold text-primary">
                        {hotel.price}
                      </p>

                      <p className="text-[11px] text-muted-foreground">
                        total incl. taxes & fees
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="secondary"
                      className="h-9 rounded-xl px-4 text-xs"
                    >
                      View hotel
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favoriteDestinations.map(
              (destination) => (
                <article
                  key={destination.id}
                  className="overflow-hidden rounded-2xl border border-border bg-background"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="size-full object-cover"
                    />

                    <button
                      type="button"
                      aria-label={`Remove ${destination.title} from favorites`}
                      className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur"
                    >
                      <Heart className="size-4 fill-primary text-primary" />
                    </button>
                  </div>

                  <div className="p-3">
                    <h2 className="text-sm font-bold">
                      {destination.title}
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {destination.location}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {destination.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-surface px-2 py-1 text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      <BottomNav active="favorite" />
    </main>
  )
}