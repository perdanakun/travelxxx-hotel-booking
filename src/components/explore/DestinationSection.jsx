'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import {
  MapPin,
  Heart,
} from 'lucide-react'

import DestinationVideoCarousel from '@/components/explore/DestinationVideoCarousel'

export default function DestinationSection({
  place,
  active,
  muted,
  index,
  onActiveChange,
  feedRef,

  favorite = false,
  onFavorite,

  comparedIds = [],
  compareCount = 0,
  maxCompare = 3,
  onToggleCompare,

  isHotelFavorite,
  onToggleHotelFavorite,
}) {
  const router =
    useRouter()

  const sectionRef =
    useRef(null)

  const [
    detailsVisible,
    setDetailsVisible,
  ] = useState(false)

  const [
    activeVideoIndex,
    setActiveVideoIndex,
  ] = useState(0)

  useEffect(() => {
    const section =
      sectionRef.current

    const feed =
      feedRef.current

    if (
      !section ||
      !feed
    ) {
      return
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >=
              0.7
          ) {
            onActiveChange(
              index
            )
          }
        },
        {
          root: feed,

          threshold: [
            0.5,
            0.7,
            0.9,
          ],
        }
      )

    observer.observe(
      section
    )

    return () => {
      observer.disconnect()
    }
  }, [
    feedRef,
    index,
    onActiveChange,
  ])

  const toggleDetails = (
    event
  ) => {
    event.stopPropagation()

    setDetailsVisible(
      (current) =>
        !current
    )
  }

  const openDestinationHotels = (
    event
  ) => {
    event.stopPropagation()

    const params =
      new URLSearchParams({
        destination:
          place.destination,

        area:
          place.place,
      })

    router.push(
      `/search?${params.toString()}`
    )
  }

  return (
    <section
      ref={
        sectionRef
      }
      data-explore-item
      data-index={
        index
      }
      className="
        relative
        h-full
        w-full
        snap-start
        snap-always
        overflow-hidden
        bg-black
        text-white
      "
    >
<DestinationVideoCarousel
  videos={place.videos}
  destinationName={place.place}
  hotelIds={place.hotelIds}
  active={active}
  muted={muted}
  onVideoIndexChange={
    setActiveVideoIndex
  }

  comparedIds={
    comparedIds
  }
  compareCount={
    compareCount
  }
  maxCompare={
    maxCompare
  }
  onToggleCompare={
    onToggleCompare
  }

  isHotelFavorite={
    isHotelFavorite
  }
  onToggleHotelFavorite={
    onToggleHotelFavorite
  }
/>

      {/* VIDEO GRADIENT */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-gradient-to-t
          from-black/90
          via-black/5
          to-black/20
        "
      />

      {/* DESTINATION INFO */}
      <div
        className="
          absolute
          inset-x-0
          bottom-[68px]
          z-20
          p-5
          pb-3
          pr-20
        "
      >
        {/* VIDEO SLIDER INDICATOR */}
        {place.videos?.length >
          1 && (
          <div
            className="
              mb-2
              flex
              items-center
              gap-1.5
            "
          >
            {place.videos.map(
              (
                video,
                videoIndex
              ) => (
                <span
                  key={
                    video.id
                  }
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-200

                    ${
                      videoIndex ===
                      activeVideoIndex
                        ? `
                          w-5
                          bg-white
                        `
                        : `
                          w-1.5
                          bg-white/40
                        `
                    }
                  `}
                />
              )
            )}
          </div>
        )}

{/* DESTINATION HEADER */}
<div
  className="
    flex
    items-center
    justify-between
    gap-3
  "
>
  {/* DESTINATION LINK */}
  <button
    type="button"
    onClick={
      openDestinationHotels
    }
    className="
      min-w-0
      text-left
      transition-opacity
      active:opacity-70
    "
  >
    <div
      className="
        flex
        min-w-0
        items-center
        gap-1.5
      "
    >
      <MapPin
        className="
          size-4
          shrink-0
        "
      />

      <h2
        className="
          truncate
          text-lg
          font-bold
        "
      >
        {place.place}
      </h2>

      <p
        className="
          shrink-0
          text-xs
          text-white/70
        "
      >
        {place.destination}
      </p>
    </div>
  </button>

  {/* FAVORITE DESTINATION */}
  <button
    type="button"
    onClick={(event) => {
      event.stopPropagation()
      onFavorite?.()
    }}
    aria-label={
      favorite
        ? `Remove ${place.place} from favorites`
        : `Save ${place.place}`
    }
    aria-pressed={
      favorite
    }
    className="
      flex
      size-9
      shrink-0
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



 {/* CAPTION */}
<button
  type="button"
  onClick={toggleDetails}
  className="
    mt-1
    block
    max-w-[300px]
    text-left
    text-sm
    leading-relaxed
    text-white/90
    transition-opacity
    active:opacity-70
  "
>
  <span
    className={
      detailsVisible
        ? 'block'
        : 'block truncate'
    }
  >
    {place.caption}
  </span>
</button>

        {/* EXPANDED DETAILS */}
        {detailsVisible && (
          <div
            className="
              mt-2
              flex
              flex-wrap
              gap-1.5
            "
          >
            {place.tags.map(
              (
                tag
              ) => (
                <span
                  key={
                    tag
                  }
                  className="
                    rounded-full
                    bg-white/15
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    backdrop-blur-sm
                  "
                >
                  {
                    tag
                  }
                </span>
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}