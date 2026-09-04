'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  hotels,
} from '@/data/hotels'

import TikTokVideo from '@/components/explore/TikTokVideo'
import DraggableHotelRecommendation from '@/components/explore/DraggableHotelRecommendation'

export default function DestinationVideoCarousel({
  videos = [],
  destinationName,
  hotelIds = [],
  active,
  muted,
  onVideoIndexChange,
}) {
  const carouselRef =
    useRef(null)

  const [
    activeVideoIndex,
    setActiveVideoIndex,
  ] = useState(0)

  const [
    recommendationVideoIndex,
  ] = useState(() => {
    if (!videos.length) {
      return null
    }

    return Math.floor(
      Math.random() *
        videos.length
    )
  })

  const [
    recommendationOpen,
    setRecommendationOpen,
  ] = useState(true)

  const [
    recommendationVisible,
    setRecommendationVisible,
  ] = useState(false)

  const recommendedHotels =
    hotelIds
      .map((hotelId) =>
        hotels.find(
          (hotel) =>
            hotel.id ===
            hotelId
        )
      )
      .filter(Boolean)

  const recommendedHotel =
    recommendedHotels[0]

  /*
   * Detect active horizontal slide.
   */
  useEffect(() => {
    const carousel =
      carouselRef.current

    if (!carousel) {
      return
    }

    const slides =
      carousel.querySelectorAll(
        '[data-video-slide]'
      )

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting &&
                entry.intersectionRatio >=
                  0.7
              ) {
                const index =
                  Number(
                    entry.target
                      .dataset
                      .videoIndex
                  )

                setActiveVideoIndex(index)
                onVideoIndexChange?.(index)
              }
            }
          )
        },
        {
          root: carousel,
          threshold: [
            0.5,
            0.7,
            0.9,
          ],
        }
      )

    slides.forEach(
      (slide) => {
        observer.observe(
          slide
        )
      }
    )

    return () => {
      observer.disconnect()
    }
  }, [])

  /*
   * Delayed hotel recommendation.
   */
  useEffect(() => {
    const isRecommendationVideo =
      active &&
      activeVideoIndex ===
        recommendationVideoIndex &&
      recommendationOpen &&
      recommendedHotel

    if (
      !isRecommendationVideo
    ) {
      setRecommendationVisible(
        false
      )

      return
    }

    const delay =
      3000 +
      Math.random() *
        2000

    const timer =
      setTimeout(() => {
        setRecommendationVisible(
          true
        )
      }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [
    active,
    activeVideoIndex,
    recommendationVideoIndex,
    recommendationOpen,
    recommendedHotel,
  ])

  if (!videos.length) {
    return (
      <div
        className="
          absolute
          inset-0
          bg-black
        "
      />
    )
  }

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-black
      "
    >
      {/* HORIZONTAL VIDEO SLIDER */}
      <div
        ref={carouselRef}
        className="
          flex
          h-full
          w-full
          snap-x
          snap-mandatory
          overflow-x-auto
          overflow-y-hidden
          overscroll-x-contain
          scroll-smooth
          touch-pan-x
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {videos.map(
          (
            video,
            index
          ) => {
            const videoIsActive =
              active &&
              activeVideoIndex ===
                index

            return (
              <div
                key={
                  video.id
                }
                data-video-slide
                data-video-index={
                  index
                }
                className="
                  relative
                  h-full
                  min-w-full
                  shrink-0
                  snap-start
                  snap-always
                  overflow-hidden
                  bg-black
                "
              >
                <TikTokVideo
                  videoId={
                    video.id
                  }
                  poster={
                    video.poster
                  }
                  title={`Video ${
                    index + 1
                  } about ${destinationName}`}
                  active={
                    videoIsActive
                  }
                  muted={
                    muted
                  }
                />
              </div>
            )
          }
        )}
      </div>

      {/* HOTEL RECOMMENDATION */}
      {recommendationVisible &&
        recommendedHotel && (
          <DraggableHotelRecommendation
            hotel={
              recommendedHotel
            }
            currency="IDR"
            onClose={() => {
              setRecommendationOpen(
                false
              )

              setRecommendationVisible(
                false
              )
            }}
          />
        )}
    </div>
  )
}