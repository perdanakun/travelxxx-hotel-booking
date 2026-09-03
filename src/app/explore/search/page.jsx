'use client'

import {
  Suspense,
  useMemo,
  useState,
} from 'react'

import {
  MapPin,
  Play,
  Search,
  X,
} from 'lucide-react'

import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import {
  explorePlaces,
} from '@/data/explorePlaces'

import {
  destinations,
} from '@/data/destinations'

import {
  useFavorite,
} from '@/context/FavoriteContext'

import TikTokVideo from '@/components/explore/TikTokVideo'

import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import FavoriteButton from '@/components/FavoriteButton'

import {
  Button,
} from '@/components/ui/button'


const placeholderPhotos = [
  'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85',
]


function getPhotoIndex(
  placeId,
  offset = 0
) {
  const seed = [
    ...placeId,
  ].reduce(
    (
      total,
      character
    ) =>
      total +
      character.charCodeAt(
        0
      ),
    0
  )

  return (
    seed + offset
  ) %
    placeholderPhotos.length
}


function ExploreSearchContent() {
  const router =
    useRouter()

  const searchParams =
    useSearchParams()

  const initialQuery =
    searchParams.get('q') ?? ''

  const [
    query,
    setQuery,
  ] = useState(
    initialQuery
  )

  const {
    toggleFavoriteDestination,
    isFavoriteDestination,
  } = useFavorite()

  const results =
    useMemo(() => {
      const normalizedQuery =
        initialQuery
          .trim()
          .toLowerCase()

      if (!normalizedQuery) {
        return explorePlaces
      }

      return explorePlaces.filter(
        (place) => {
          const searchableValues = [
            place.place,
            place.destination,
            place.caption,
            ...(place.tags ?? []),
          ]

          return searchableValues.some(
            (value) =>
              value
                ?.toLowerCase()
                .includes(
                  normalizedQuery
                )
          )
        }
      )
    }, [initialQuery])

  const submitSearch = (
    event
  ) => {
    event.preventDefault()

    const trimmed =
      query.trim()

    if (!trimmed) {
      return
    }

    const params =
      new URLSearchParams({
        q: trimmed,
      })

    router.replace(
      `/explore/search?${params.toString()}`
    )
  }

  const clearSearch =
    () => {
      setQuery('')

      router.replace(
        '/explore/search'
      )
    }

  const openHotels =
    (place) => {
      const matchedDestination =
        destinations.find(
          (destination) =>
            destination.name
              ?.toLowerCase() ===
            place.destination
              ?.toLowerCase()
        )

      const destinationId =
        matchedDestination?.id ??
        place.destination

      const params =
        new URLSearchParams({
          destination:
            destinationId,
          area:
            place.place,
        })

      router.push(
        `/search?${params.toString()}`
      )
    }

  return (
    <main
      className="
        min-h-screen
        bg-background
        pb-28
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      {/* APP HEADER */}
      <AppHeader
        showBack
        onBack={() =>
          router.back()
        }
      />

      {/* SEARCH */}
      <div
        className="
          sticky
          top-16
          z-40
          border-b
          border-border
          bg-background/95
          px-5
          py-3
          backdrop-blur
        "
      >
        <form
          onSubmit={
            submitSearch
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-border
            bg-surface
            px-3
          "
        >
          <Search
            className="
              size-4
              shrink-0
              text-muted-foreground
            "
          />

          <input
            type="search"
            value={query}
            onChange={(
              event
            ) =>
              setQuery(
                event.target
                  .value
              )
            }
            placeholder="Search destination or area"
            className="
              min-w-0
              flex-1
              bg-transparent
              py-3
              text-sm
              text-foreground
              outline-none
              placeholder:text-muted-foreground
            "
          />

          {query && (
            <button
              type="button"
              onClick={
                clearSearch
              }
              aria-label="Clear search"
              className="
                flex
                size-7
                shrink-0
                items-center
                justify-center
                rounded-full
                text-muted-foreground
                transition
                active:scale-[0.95]
              "
            >
              <X
                className="size-4"
              />
            </button>
          )}
        </form>
      </div>

      {/* RESULT INTRO */}
      <section
        className="
          px-5
          pb-0
          pt-6
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.18em]
            text-secondary
          "
        >
          Explore
        </p>

        <h1
          className="
            mt-1
            text-xl
            font-bold
            leading-tight
          "
        >
          {initialQuery
            ? `Places matching “${initialQuery}”`
            : 'Discover places'}
        </h1>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          Explore destinations
          and neighborhoods before
          choosing where to stay.
        </p>
      </section>

      {/* RESULTS */}
      {results.length > 0 ? (
        <div>
          {results.map(
            (
              place,
              index
            ) => (
              <div
                key={
                  place.id
                }
              >
                <PlaceResult
                  place={
                    place
                  }
                  favorite={
                    isFavoriteDestination(
                      place.id
                    )
                  }
                  onFavorite={() =>
                    toggleFavoriteDestination(
                      place.id
                    )
                  }
                  onHotels={() =>
                    openHotels(
                      place
                    )
                  }
                />

                {index <
                  results.length -
                    1 && (
                  <div
                    className="
                      h-2
                      bg-surface
                    "
                  />
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <EmptyResults
          onClear={
            clearSearch
          }
        />
      )}

      <BottomNav
        active="explore"
      />
    </main>
  )
}


function PlaceResult({
  place,
  favorite,
  onFavorite,
  onHotels,
}) {
  const media =
    place.videos ?? []

  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null)

  const videoItems =
    media
      .slice(0, 3)
      .map(
        (
          item,
          index
        ) => ({
          id:
            item.id ??
            `${place.id}-video-${index}`,
          type: 'video',
          videoId: item.id,
          poster: item.poster,
          alt: `${place.place} travel video`,
        })
      )

  const photoItems = [
    0,
    1,
    2,
    3,
    4,
    5,
  ].map(
    (offset) => ({
      id: `${place.id}-photo-${offset}`,
      type: 'photo',
      src:
        placeholderPhotos[
          getPhotoIndex(
            place.id,
            offset
          )
        ],
      alt: `${place.place} travel inspiration`,
    })
  )

  const galleryItems = [
    ...videoItems,
    ...photoItems,
  ].slice(0, 9)

  return (
    <>
      <section
        className="
          px-5
          py-7
        "
      >
        {/* PLACE */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              min-w-0
              flex-1
              items-start
              gap-2
            "
          >
            <MapPin
              className="
                mt-0.5
                size-4
                shrink-0
                text-secondary
              "
            />

            <div
              className="
                min-w-0
              "
            >
              <h2
                className="
                  truncate
                  text-lg
                  font-bold
                  leading-tight
                "
              >
                {place.place}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >
                {
                  place.destination
                }
              </p>
            </div>
          </div>

          <FavoriteButton
            active={
              favorite
            }
            onToggle={
              onFavorite
            }
          />
        </div>

        {/* TAGS */}
        {place.tags?.length >
          0 && (
          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            {place.tags.map(
              (tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    bg-muted
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-foreground
                  "
                >
                  {tag}
                </span>
              )
            )}
          </div>
        )}

        {/* INSTAGRAM-LIKE GRID */}
        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-1
          "
        >
          {galleryItems.map(
            (item) => (
              <GalleryTile
                key={
                  item.id
                }
                item={
                  item
                }
                onClick={() =>
                  setSelectedItem(
                    item
                  )
                }
              />
            )
          )}
        </div>

        {/* DESCRIPTION */}
        {place.caption && (
          <p
            className="
              mt-4
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            {place.caption}
          </p>
        )}

        {/* CTA */}
        <Button
          type="button"
          onClick={
            onHotels
          }
          className="
            mt-5
            w-full
            rounded-full
          "
        >
          See hotels around{' '}
          {place.place}
        </Button>
      </section>

      {/* MEDIA POPUP */}
      {selectedItem && (
        <GalleryModal
          item={
            selectedItem
          }
          place={
            place
          }
          onClose={() =>
            setSelectedItem(
              null
            )
          }
        />
      )}
    </>
  )
}


function GalleryTile({
  item,
  onClick,
}) {
  const thumbnail =
    item.type === 'video'
      ? item.poster
      : item.src

  return (
    <button
      type="button"
      onClick={
        onClick
      }
      aria-label={
        item.type === 'video'
          ? 'Open video'
          : 'Open photo'
      }
      className="
        group
        relative
        aspect-square
        overflow-hidden
        bg-muted
        text-left
        touch-manipulation
      "
    >
      <img
        src={
          thumbnail
        }
        alt={
          item.alt
        }
        loading="lazy"
        className="
          size-full
          object-cover
          transition-transform
          duration-200
          group-active:scale-[0.98]
        "
      />

      {item.type ===
        'video' && (
        <>
          <div
            className="
              absolute
              inset-0
              bg-black/5
            "
          />

          <span
            className="
              absolute
              left-1/2
              top-1/2
              flex
              size-9
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-black/45
              text-white
              backdrop-blur-sm
            "
          >
            <Play
              className="
                ml-0.5
                size-4
                fill-current
              "
            />
          </span>
        </>
      )}
    </button>
  )
}


function GalleryModal({
  item,
  place,
  onClose,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[80]
        flex
        items-center
        justify-center
        bg-foreground/70
        px-4
        py-6
        backdrop-blur-sm
      "
    >
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close media"
        onClick={
          onClose
        }
        className="
          absolute
          inset-0
          cursor-default
        "
      />

      {/* MODAL */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-background
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-border
            bg-background
            px-4
            py-3
          "
        >
          <div
            className="
              min-w-0
            "
          >
            <p
              className="
                truncate
                text-sm
                font-bold
              "
            >
              {place.place}
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                text-muted-foreground
              "
            >
              {
                place.destination
              }
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close media"
            onClick={
              onClose
            }
            className="
              size-9
              shrink-0
              rounded-full
            "
          >
            <X
              className="size-4"
            />
          </Button>
        </div>

        {/* MEDIA */}
        <div
          className="
            relative
            aspect-[4/5]
            w-full
            overflow-hidden
            bg-black
          "
        >
          {item.type ===
          'video' ? (
            <TikTokVideo
              videoId={
                item.videoId
              }
              poster={
                item.poster
              }
              title={
                item.alt
              }
              variant="preview"
            />
          ) : (
            <img
              src={
                item.src
              }
              alt={
                item.alt
              }
              className="
                size-full
                object-contain
              "
            />
          )}
        </div>
      </div>
    </div>
  )
}


function EmptyResults({
  onClear,
}) {
  return (
    <section
      className="
        px-5
        py-16
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
          rounded-xl
          bg-surface
        "
      >
        <Search
          className="
            size-5
            text-muted-foreground
          "
        />
      </div>

      <h2
        className="
          mt-4
          text-lg
          font-bold
        "
      >
        No places found
      </h2>

      <p
        className="
          mx-auto
          mt-2
          max-w-xs
          text-sm
          leading-relaxed
          text-muted-foreground
        "
      >
        Try another
        destination,
        neighborhood, or
        travel interest.
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={
          onClear
        }
        className="
          mt-5
          rounded-xl
        "
      >
        Explore all places
      </Button>
    </section>
  )
}


function ExploreSearchFallback() {
  return (
    <main
      className="
        min-h-screen
        bg-background
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      <div
        className="
          px-5
          py-8
        "
      >
        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          Loading places...
        </p>
      </div>
    </main>
  )
}


export default function Page() {
  return (
    <Suspense
      fallback={
        <ExploreSearchFallback />
      }
    >
      <ExploreSearchContent />
    </Suspense>
  )
}