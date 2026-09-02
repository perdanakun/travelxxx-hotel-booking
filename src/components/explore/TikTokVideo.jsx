'use client'

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

export default function TikTokVideo({
  videoId,
  poster,
  title,
}) {
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const element = containerRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(
          entry.isIntersecting &&
            entry.intersectionRatio >= 0.6
        )
      },
      {
        threshold: [0, 0.25, 0.6, 0.8, 1],
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  const playerUrl =
    `https://www.tiktok.com/player/v1/${videoId}` +
    `?autoplay=1` +
    `&loop=1` +
    `&controls=0` +
    `&progress_bar=0` +
    `&play_button=0` +
    `&volume_control=0` +
    `&fullscreen_button=0` +
    `&music_info=0` +
    `&description=0`

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-muted"
    >
      {isActive ? (
        <iframe
          key={videoId}
          src={playerUrl}
          title={title}
          allow="autoplay; fullscreen"
          loading="eager"
          className="
            absolute
            left-1/2
            top-1/2
            h-full
            w-full
            -translate-x-1/2
            -translate-y-1/2
            border-0
          "
        />
      ) : (
        <>
          <img
            src={poster}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="flex size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
              <Play
                className="ml-0.5 size-5"
                fill="currentColor"
              />
            </span>
          </div>
        </>
      )}
    </div>
  )
}