'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Heart,
  MapPin,
} from 'lucide-react'

import TikTokVideo from '@/components/explore/TikTokVideo'

export default function DestinationCard({
  place,
  favorite = false,
  onFavorite,
  onClick,
}) {
  const cardRef =
    useRef(null)

  const [
    videoActive,
    setVideoActive,
  ] = useState(false)

  const firstVideo =
    place.videos?.[0]

  const image =
    firstVideo?.poster ??
    place.poster ??
    place.image ??
    'https://images.unsplash.com/vector-1769320708315-bb087339e19f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const placeName =
    place.place ??
    place.title ??
    place.name ??
    'Explore'

  const destination =
    place.destination ??
    'Yogyakarta'

  const description =
    place.caption ??
    place.description ??
    'Discover places, neighborhoods, and stays nearby.'

  const tags =
    place.tags?.slice(
      0,
      3
    ) ?? []


  /* -------------------------------------------------
     VIDEO VISIBILITY
  -------------------------------------------------- */

  useEffect(() => {
    const card =
      cardRef.current

    if (!card) {
      return
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setVideoActive(
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.6
          )
        },
        {
          threshold: [
            0,
            0.25,
            0.6,
            0.8,
            1,
          ],
        }
      )

    observer.observe(
      card
    )

    return () => {
      observer.disconnect()
    }
  }, [])


  return (
    <article
      ref={cardRef}
      className="
        w-[230px]
        shrink-0
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-background
        shadow-sm
      "
    >
      {/* VIDEO / IMAGE */}
      <div
        className="
          relative
          aspect-[4/5]
          overflow-hidden
          bg-muted
        "
      >
        <button
          type="button"
          onClick={onClick}
          className="
            absolute
            inset-0
            size-full
            text-left
          "
        >
          {firstVideo?.id ? (
            <TikTokVideo
              videoId={
                firstVideo.id
              }
              poster={
                firstVideo.poster ??
                image
              }
              title={`${placeName} travel preview`}
              active={
                videoActive
              }
              muted
              variant="preview"
            />
          ) : (
            <img
              src={image}
              alt={placeName}
              className="
                absolute
                inset-0
                size-full
                object-cover
              "
            />
          )}

          {/* GRADIENT */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/70
              via-black/5
              to-black/10
            "
          />

          {/* DESTINATION INFO */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              p-3
              pr-12
              text-white
            "
          >
            <div
              className="
                flex
                items-center
                gap-1
              "
            >
              <MapPin
                className="
                  size-3.5
                  shrink-0
                "
              />

              <h3
                className="
                  truncate
                  text-sm
                  font-bold
                "
              >
                {placeName}
              </h3>
            </div>

            <p
              className="
                mt-0.5
                text-[11px]
                text-white/75
              "
            >
              {destination}
            </p>
          </div>
        </button>

        {/* FAVORITE */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()

            onFavorite?.()
          }}
          aria-label={
            favorite
              ? `Remove ${placeName} from favorites`
              : `Save ${placeName}`
          }
          aria-pressed={
            favorite
          }
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            size-9
            items-center
            justify-center
            rounded-full
            bg-black/35
            text-white
            backdrop-blur-md
            transition
            active:scale-[0.94]
          "
        >
          <Heart
            className={`
              size-4

              ${
                favorite
                  ? 'fill-current'
                  : ''
              }
            `}
          />
        </button>
      </div>

      {/* CONTENT */}
      <button
        type="button"
        onClick={onClick}
        className="
          block
          w-full
          p-3
          text-left
        "
      >
        <p
          className="
            line-clamp-2
            text-sm
            leading-relaxed
          "
        >
          {description}
        </p>

        {tags.length > 0 && (
          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-1.5
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
                    font-medium
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