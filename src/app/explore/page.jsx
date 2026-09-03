'use client'

import {
  useRef,
  useState,
} from 'react'

import {
  Volume2,
  VolumeX,
} from 'lucide-react'

import {
  useRouter,
} from 'next/navigation'

import BottomNav from '@/components/BottomNav'
import DestinationSection from '@/components/explore/DestinationSection'
import ExploreDiscoveryBar from '@/components/explore/ExploreDiscoveryBar'

import {
  explorePlaces,
} from '@/data/explorePlaces'

export default function ExplorePage() {
  const feedRef =
    useRef(null)

  const router = useRouter()

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  const [
    muted,
    setMuted,
  ] = useState(true)

  const activePlace =
    explorePlaces[
      activeIndex
    ]

const handleSearch = (
  query
) => {
  const params =
    new URLSearchParams({
      q: query,
    })

  router.push(
    `/explore/search?${params.toString()}`
  )
}

const handlePersonalize =
  () => {
    router.push(
      '/onboarding-survey'
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
          (
            place,
            index
          ) => (
            <DestinationSection
              key={
                place.id
              }
              place={
                place
              }
              active={
                activeIndex ===
                index
              }
              muted={
                muted
              }
              index={
                index
              }
              onActiveChange={
                setActiveIndex
              }
              feedRef={
                feedRef
              }
            />
          )
        )}
      </div>

      {/* SEARCH + PERSONALIZE */}
      <ExploreDiscoveryBar
        onSearch={
          handleSearch
        }
        onPersonalize={
          handlePersonalize
        }
        profileLabel="Personalize"
      />

      {/* SOUND */}
      {activePlace && (
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
            absolute
            right-3
            top-[92px]
            z-50
            flex
            size-9
            items-center
            justify-center
            rounded-full
            bg-black/40
            text-white
            backdrop-blur-md
            transition
            active:scale-[0.96]
          "
        >
          {muted ? (
            <VolumeX
              className="size-5"
            />
          ) : (
            <Volume2
              className="size-5"
            />
          )}
        </button>
      )}

      {/* BOTTOM NAV */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-50
        "
      >
        <BottomNav
          active="explore"
        />
      </div>
    </main>
  )
}