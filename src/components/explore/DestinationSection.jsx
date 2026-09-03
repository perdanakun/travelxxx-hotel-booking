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
} from 'lucide-react'

import DestinationVideoCarousel from '@/components/explore/DestinationVideoCarousel'

export default function DestinationSection({
  place,
  active,
  muted,
  index,
  onActiveChange,
  feedRef,
}) {
  const router =
    useRouter()

  const sectionRef =
    useRef(null)

  const [
    detailsVisible,
    setDetailsVisible,
  ] = useState(true)

  useEffect(() => {
    const section =
      sectionRef.current

    const feed =
      feedRef.current

    if (!section || !feed) {
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

  const toggleDetails =
    () => {
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
      ref={sectionRef}
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
        videos={
          place.videos
        }
        destinationName={
          place.place
        }
        hotelIds={
          place.hotelIds
        }
        active={
          active
        }
        muted={
          muted
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
        onClick={
          toggleDetails
        }
        className="
          absolute
          inset-x-0
          bottom-[68px]
          z-20
          cursor-pointer
          p-5
          pr-20
          pb-3
        "
      >
        {/* DESTINATION LINK */}
        <button
          type="button"
          onClick={
            openDestinationHotels
          }
          className="
            block
            max-w-full
            text-left
            transition-opacity
            active:opacity-70
          "
        >
          <div
            className="
              flex
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
                text-lg
                font-bold
              "
            >
              {
                place.place
              }
            </h2>

            <p
            className="
              mt-0
              text-xs
              text-white/70
            "
          >
            {
              place.destination
            }
          </p>
          </div>


        </button>

        {/* EXPANDED DETAILS */}
        {detailsVisible && (
          <>
            {/* TAGS */}
            <div
              className="
                mt-1.5
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

            {/* CAPTION */}
            <p
              className="
                mt-1
                line-clamp-3
                max-w-[300px]
                text-sm
                leading-relaxed
                text-white/90
              "
            >
              {
                place.caption
              }
            </p>
          </>
        )}
      </div>
    </section>
  )
}