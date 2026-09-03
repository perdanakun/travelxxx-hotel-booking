'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { MapPin } from 'lucide-react'

import DestinationVideoCarousel from '@/components/explore/DestinationVideoCarousel'
import HotelRecommendationOverlay from '@/components/explore/HotelRecommendationOverlay'

export default function DestinationSection({
  place,
  active,
  muted,
  index,
  onActiveChange,
  feedRef,
  showHotelRecommendation = false,
  recommendedHotels = [],
}) {
  const sectionRef =
    useRef(null)

  const [
    hotelRecommendationOpen,
    setHotelRecommendationOpen,
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

  return (
    <section
      ref={sectionRef}
      data-explore-item
      data-index={index}
      className="
        relative
        h-full
        w-full
        snap-start
        snap-always
        overflow-hidden
        bg-black
      "
    >
      {/* VIDEO */}
      <DestinationVideoCarousel
        videos={place.videos}
        destinationName={
          place.place
        }
        active={active}
        muted={muted}
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

      {/* DESTINATION CONTENT */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-[68px]
          z-20
          p-5
          pr-20
          pb-7
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
            {place.place}
          </h2>
        </div>

        <p
          className="
            mt-1
            text-xs
            text-white/70
          "
        >
          {place.destination}
        </p>

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-1.5
          "
        >
          {place.tags.map(
            (tag) => (
              <span
                key={tag}
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
                {tag}
              </span>
            )
          )}
        </div>

        <p
          className="
            mt-3
            line-clamp-3
            max-w-[300px]
            text-sm
            leading-relaxed
            text-white/90
          "
        >
          {place.caption}
        </p>
      </div>

      {/* HOTEL RECOMMENDATION */}
      {active &&
        showHotelRecommendation &&
        hotelRecommendationOpen &&
        recommendedHotels.length >
          0 && (
          <HotelRecommendationOverlay
            destination={
              place.place
            }
            hotels={
              recommendedHotels
            }
            currency="IDR"
            onClose={() =>
              setHotelRecommendationOpen(
                false
              )
            }
          />
        )}
    </section>
  )
}