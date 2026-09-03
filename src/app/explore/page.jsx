'use client'

import {
  useRef,
  useState,
} from 'react'

import {
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
} from 'lucide-react'

import BottomNav from '@/components/BottomNav'
import DestinationSection from '@/components/explore/DestinationSection'
import ExploreDiscoveryBar from '@/components/explore/ExploreDiscoveryBar'

import { hotels } from '@/data/hotels'
import { explorePlaces } from '@/data/explorePlaces'

export default function ExplorePage() {
  const feedRef = useRef(null)

  const [activeIndex, setActiveIndex] =
    useState(0)

  // Explore opens muted
  // so autoplay has a better chance
  // to work on mobile browsers.
  const [muted, setMuted] =
    useState(true)

  const [savedPlaces, setSavedPlaces] =
    useState([])

  const activePlace =
    explorePlaces[activeIndex]

  const isActivePlaceSaved =
    activePlace
      ? savedPlaces.includes(
          activePlace.id
        )
      : false

  const getHotelsForPlace = (
    place
  ) => {
    if (
      !place?.hotelIds?.length
    ) {
      return []
    }

    return place.hotelIds
      .map((hotelId) =>
        hotels.find(
          (hotel) =>
            hotel.id === hotelId
        )
      )
      .filter(Boolean)
  }

  const toggleSaved = () => {
    if (!activePlace) return

    setSavedPlaces((current) =>
      current.includes(
        activePlace.id
      )
        ? current.filter(
            (id) =>
              id !== activePlace.id
          )
        : [
            ...current,
            activePlace.id,
          ]
    )
  }

  const handleShare =
    async () => {
      if (!activePlace) return

      const shareData = {
        title: `${activePlace.place}, ${activePlace.destination}`,
        text: activePlace.caption,
        url: window.location.href,
      }

      try {
        if (navigator.share) {
          await navigator.share(
            shareData
          )
        }
      } catch {
        // User cancelled share.
      }
    }

  const handleSearch = () => {
    console.log(
      'Open Explore search'
    )
  }

  const handlePersonalize = () => {
    console.log(
      'Open personalization'
    )
  }

  return (
    <main
      className="
        relative
        h-[100dvh]
        overflow-hidden
        bg-black
        text-white
        md:mx-auto
        md:max-w-md
      "
    >
      {/* DESTINATION FEED */}
      <div
        ref={feedRef}
        className="
          h-[100dvh]
          snap-y
          snap-mandatory
          overflow-y-auto
          overscroll-y-contain
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {explorePlaces.map(
          (place, index) => {
            const recommendedHotels =
              getHotelsForPlace(
                place
              )

            return (
              <DestinationSection
                key={place.id}
                place={place}
                active={
                  activeIndex ===
                  index
                }
                muted={muted}
                index={index}
                onActiveChange={
                  setActiveIndex
                }
                feedRef={
                  feedRef
                }
                showHotelRecommendation={
                  index === 1
                }
                recommendedHotels={
                  recommendedHotels
                }
              />
            )
          }
        )}
      </div>

      {/* SEARCH + PERSONALIZE */}
      <ExploreDiscoveryBar
        onSearch={handleSearch}
        onPersonalize={
          handlePersonalize
        }
        profileLabel="Personalize"
      />

      {/* GLOBAL EXPLORE CONTROLS */}
      {activePlace && (
        <div
          className="
            absolute
            bottom-40
            right-4
            z-50
            flex
            flex-col
            gap-3
          "
        >
          {/* SOUND */}
          <button
            type="button"
            onClick={() =>
              setMuted(
                (current) =>
                  !current
              )
            }
            aria-label={
              muted
                ? 'Turn sound on'
                : 'Mute video'
            }
            className="
              flex
              size-11
              items-center
              justify-center
              rounded-full
              bg-black/40
              text-white
              backdrop-blur-sm
              transition
              active:scale-[0.96]
            "
          >
            {muted ? (
              <VolumeX className="size-5" />
            ) : (
              <Volume2 className="size-5" />
            )}
          </button>

          {/* FAVORITE */}
          <button
            type="button"
            onClick={toggleSaved}
            aria-label={
              isActivePlaceSaved
                ? `Remove ${activePlace.place} from favorites`
                : `Favorite ${activePlace.place}`
            }
            className="
              flex
              size-11
              items-center
              justify-center
              rounded-full
              bg-black/40
              text-white
              backdrop-blur-sm
              transition
              active:scale-[0.96]
            "
          >
            <Bookmark
              className="size-5"
              fill={
                isActivePlaceSaved
                  ? 'currentColor'
                  : 'none'
              }
            />
          </button>

          {/* SHARE */}
          <button
            type="button"
            onClick={
              handleShare
            }
            aria-label={`Share ${activePlace.place}`}
            className="
              flex
              size-11
              items-center
              justify-center
              rounded-full
              bg-black/40
              text-white
              backdrop-blur-sm
              transition
              active:scale-[0.96]
            "
          >
            <Share2 className="size-5" />
          </button>
        </div>
      )}

      {/* BOTTOM NAV OVERLAY */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-50
        "
      >
        <BottomNav active="explore" />
      </div>
    </main>
  )
}