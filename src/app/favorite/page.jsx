'use client'

import {
  useState,
} from 'react'

import {
  Heart,
  MapPin,
} from 'lucide-react'

import {
  useRouter,
} from 'next/navigation'

import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import HotelCard from '@/components/HotelCard'

import {
  Button,
} from '@/components/ui/button'

import {
  useFavorite,
} from '@/context/FavoriteContext'

import {
  useCompare,
} from '@/context/CompareContext'

import {
  hotels,
} from '@/data/hotels'

import {
  explorePlaces,
} from '@/data/explorePlaces'


/* -------------------------------------------------
   DESTINATION CARD
-------------------------------------------------- */

function FavoriteDestinationCard({
  place,
  onRemove,
}) {
  const router =
    useRouter()

  const firstVideo =
    place.videos?.[0]

  const image =
    firstVideo?.poster ??
    place.poster ??
    place.image

  const title =
    place.place ??
    place.title ??
    place.name ??
    'Destination'

  const destination =
    place.destination ??
    'Yogyakarta'

  const tags =
    place.tags?.slice(
      0,
      3
    ) ?? []

  const openDestination =
    () => {
      const params =
        new URLSearchParams({
          q: title,
        })

      router.push(
        `/explore/search?${params.toString()}`
      )
    }

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-background
      "
    >
      {/* IMAGE */}
      <button
        type="button"
        onClick={
          openDestination
        }
        className="
          relative
          block
          aspect-[4/5]
          w-full
          overflow-hidden
          bg-muted
          text-left
        "
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="
              size-full
              object-cover
            "
          />
        )}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-transparent
            to-transparent
          "
        />

        <span
          className="
            absolute
            bottom-2.5
            left-2.5
            flex
            max-w-[80%]
            items-center
            gap-1
            rounded-full
            bg-black/40
            px-2.5
            py-1.5
            text-[10px]
            font-medium
            text-white
            backdrop-blur-md
          "
        >
          <MapPin
            className="
              size-3
              shrink-0
            "
          />

          <span className="truncate">
            {destination}
          </span>
        </span>

        {/* REMOVE FAVORITE */}
        <button
          type="button"
          onClick={(
            event
          ) => {
            event.stopPropagation()

            onRemove()
          }}
          aria-label={`Remove ${title} from favorites`}
          className="
            absolute
            right-2.5
            top-2.5
            flex
            size-8
            items-center
            justify-center
            rounded-full
            bg-background/90
            text-foreground
            shadow-sm
            backdrop-blur
            transition
            active:scale-[0.94]
          "
        >
          <Heart
            className="
              size-4
              fill-primary
              text-primary
            "
          />
        </button>
      </button>

      {/* CONTENT */}
      <button
        type="button"
        onClick={
          openDestination
        }
        className="
          block
          w-full
          p-3
          text-left
        "
      >
        <h2
          className="
            text-sm
            font-bold
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            text-xs
            text-muted-foreground
          "
        >
          {destination}
        </p>

        {tags.length >
          0 && (
          <div
            className="
              mt-2
              flex
              flex-wrap
              gap-1
            "
          >
            {tags.map(
              (tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    bg-surface
                    px-2
                    py-1
                    text-[10px]
                    text-muted-foreground
                  "
                >
                  {tag}
                </span>
              )
            )}
          </div>
        )}
      </button>
    </article>
  )
}


/* -------------------------------------------------
   EMPTY STATE
-------------------------------------------------- */

function EmptyState({
  title,
  description,
  action,
  onAction,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-6
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          size-12
          items-center
          justify-center
          rounded-full
          bg-background
        "
      >
        <Heart
          className="
            size-5
            text-muted-foreground
          "
        />
      </div>

      <h2
        className="
          mt-4
          font-bold
        "
      >
        {title}
      </h2>

      <p
        className="
          mx-auto
          mt-1
          max-w-[260px]
          text-sm
          leading-relaxed
          text-muted-foreground
        "
      >
        {description}
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={
          onAction
        }
        className="
          mt-4
          rounded-xl
        "
      >
        {action}
      </Button>
    </div>
  )
}


/* -------------------------------------------------
   PAGE
-------------------------------------------------- */

export default function FavoritePage() {
  const router =
    useRouter()

  const [
    activeTab,
    setActiveTab,
  ] = useState(
    'hotels'
  )

  const {
    favoriteHotelIds,
    favoriteDestinationIds,

    toggleHotelFavorite,
    toggleDestinationFavorite,

    isHotelFavorite,
  } = useFavorite()

  const {
    comparedIds,
    toggleCompare,
    count: compareCount,
    maxCompare,
  } = useCompare()


  /* -------------------------------------------------
     RESOLVE FAVORITE DATA
  -------------------------------------------------- */

  const favoriteHotels =
    hotels.filter(
      (hotel) =>
        favoriteHotelIds.includes(
          hotel.id
        )
    )

  const favoriteDestinations =
    explorePlaces.filter(
      (place) =>
        favoriteDestinationIds.includes(
          place.id
        )
    )


  /* -------------------------------------------------
     PAGE
  -------------------------------------------------- */

  return (
    <main
      className="
        min-h-screen
        bg-background
        pb-24
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      <AppHeader />


      {/* INTRO */}
      <section
        className="
          px-5
          pb-5
          pt-6
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.10em]
            text-primary
          "
        >
          Your saved picks
        </p>

        <p
          className="
            mt-1
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Keep hotels and destinations
          you want to come back to.
        </p>
      </section>


      {/* TABS */}
      <section
        className="
          px-5
        "
      >
        <div
          className="
            grid
            grid-cols-2
            rounded-xl
            bg-surface
            p-1
          "
        >
          <button
            type="button"
            onClick={() =>
              setActiveTab(
                'hotels'
              )
            }
            className={`
              rounded-lg
              px-3
              py-2
              text-sm
              font-semibold
              transition

              ${
                activeTab ===
                'hotels'
                  ? `
                    bg-background
                    shadow-sm
                  `
                  : `
                    text-muted-foreground
                  `
              }
            `}
          >
            Hotels
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab(
                'destinations'
              )
            }
            className={`
              rounded-lg
              px-3
              py-2
              text-sm
              font-semibold
              transition

              ${
                activeTab ===
                'destinations'
                  ? `
                    bg-background
                    shadow-sm
                  `
                  : `
                    text-muted-foreground
                  `
              }
            `}
          >
            Destinations
          </button>
        </div>
      </section>


      {/* CONTENT */}
      <section
        className="
          mt-5
          px-5
        "
      >
        {activeTab ===
        'hotels' ? (
          /*
           * ======================
           * FAVORITE HOTELS
           * ======================
           */
          favoriteHotels.length >
          0 ? (
            <div
              className="
                flex
                flex-col
                gap-4
              "
            >
              {favoriteHotels.map(
                (
                  hotel
                ) => (
                  <HotelCard
                    key={
                      hotel.id
                    }
                    hotel={
                      hotel
                    }
                    currency="IDR"

                    favorite={
                      isHotelFavorite(
                        hotel.id
                      )
                    }

                    onFavorite={() =>
                      toggleHotelFavorite(
                        hotel.id
                      )
                    }

                    compared={
                      comparedIds.includes(
                        hotel.id
                      )
                    }

                    onCompare={() =>
                      toggleCompare(
                        hotel.id
                      )
                    }

                    compareDisabled={
                      compareCount >=
                        maxCompare &&
                      !comparedIds.includes(
                        hotel.id
                      )
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptyState
              title="No saved hotels yet"
              description="Tap the heart on a hotel you want to keep."
              action="Explore hotels"
              onAction={() =>
                router.push(
                  '/hotels'
                )
              }
            />
          )
        ) : (
          /*
           * ======================
           * FAVORITE DESTINATIONS
           * ======================
           */
          favoriteDestinations.length >
          0 ? (
            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >
              {favoriteDestinations.map(
                (
                  place
                ) => (
                  <FavoriteDestinationCard
                    key={
                      place.id
                    }
                    place={
                      place
                    }
                    onRemove={() =>
                      toggleDestinationFavorite(
                        place.id
                      )
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptyState
              title="No saved destinations yet"
              description="Save places from Explore and they'll appear here."
              action="Explore places"
              onAction={() =>
                router.push(
                  '/explore'
                )
              }
            />
          )
        )}
      </section>


      <BottomNav
        active="favorite"
      />
    </main>
  )
}