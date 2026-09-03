'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import TikTokVideo from '@/components/explore/TikTokVideo'

export default function DestinationVideoCarousel({
  videos = [],
  destinationName,
  active,
  muted,
}) {
  const carouselRef =
    useRef(null)

  const [activeVideoIndex, setActiveVideoIndex] =
    useState(0)

  useEffect(() => {
    const carousel =
      carouselRef.current

    if (!carousel) return

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

                setActiveVideoIndex(
                  index
                )
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

    slides.forEach((slide) => {
      observer.observe(slide)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const goToVideo = (index) => {
    const carousel =
      carouselRef.current

    if (!carousel) return

    const slides =
      carousel.querySelectorAll(
        '[data-video-slide]'
      )

    const target =
      slides[index]

    if (!target) return

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  const goPrevious = () => {
    if (activeVideoIndex <= 0)
      return

    goToVideo(
      activeVideoIndex - 1
    )
  }

  const goNext = () => {
    if (
      activeVideoIndex >=
      videos.length - 1
    ) {
      return
    }

    goToVideo(
      activeVideoIndex + 1
    )
  }

  if (!videos.length) {
    return (
      <div className="absolute inset-0 bg-black" />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* HORIZONTAL VIDEO FEED */}
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
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {videos.map(
          (video, index) => {
            const videoIsActive =
              active &&
              activeVideoIndex ===
                index

            return (
              <div
                key={video.id}
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
                  title={`Video ${index + 1} about ${destinationName}`}
                  active={
                    videoIsActive
                  }
                  muted={muted}
                />
              </div>
            )
          }
        )}
      </div>

      {/* LEFT ARROW */}
      {videos.length > 1 &&
        activeVideoIndex > 0 && (
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous video"
            className="
              absolute
              left-3
              top-1/2
              z-20
              flex
              size-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-black/35
              text-white
              backdrop-blur-sm
              transition
              active:scale-[0.96]
            "
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

      {/* RIGHT ARROW */}
      {videos.length > 1 &&
        activeVideoIndex <
          videos.length - 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next video"
            className="
              absolute
              right-3
              top-1/2
              z-20
              flex
              size-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-black/35
              text-white
              backdrop-blur-sm
              transition
              active:scale-[0.96]
            "
          >
            <ChevronRight className="size-5" />
          </button>
        )}

      {/* PAGINATION DOTS */}
      {videos.length > 1 && (
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-5
            z-20
            flex
            -translate-x-1/2
            gap-1.5
          "
        >
          {videos.map(
            (video, index) => (
              <span
                key={video.id}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  ${
                    index ===
                    activeVideoIndex
                      ? 'w-5 bg-white'
                      : 'w-1.5 bg-white/50'
                  }
                `}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}