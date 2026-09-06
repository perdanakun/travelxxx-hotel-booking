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
import LoadingScreen from '@/components/LoadingScreen'

import DestinationSection from '@/components/explore/DestinationSection'
import ExploreDiscoveryBar from '@/components/explore/ExploreDiscoveryBar'

import {
  explorePlaces,
} from '@/data/explorePlaces'

import {
  useFavorite,
} from '@/context/FavoriteContext'

import {
  useCompare,
} from '@/context/CompareContext'


export default function ExplorePage() {
  const feedRef =
    useRef(null)

  const router =
    useRouter()

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  const [
    muted,
    setMuted,
  ] = useState(true)

  /*
   * SEARCH LOADING
   */
  const [
    searchLoading,
    setSearchLoading,
  ] = useState(false)

  const [
    searchQuery,
    setSearchQuery,
  ] = useState('')

  const activePlace =
    explorePlaces[
      activeIndex
    ]


  const handleSearch = (
    query
  ) => {
    const trimmedQuery =
      query.trim()

    if (!trimmedQuery) {
      return
    }

    /*
     * Store query so LoadingScreen
     * can show what is being searched.
     */
    setSearchQuery(
      trimmedQuery
    )

    setSearchLoading(
      true
    )

    const params =
      new URLSearchParams({
        q: trimmedQuery,
      })

    /*
     * Short artificial transition
     * for the prototype.
     */
    window.setTimeout(
      () => {
        router.push(
          `/explore/search?${params.toString()}`
        )
      },
      1200
    )
  }


  const handlePersonalize =
    () => {
      router.push(
        '/onboarding-survey'
      )
    }


  const {
  isDestinationFavorite,
  toggleDestinationFavorite,
  isHotelFavorite,
  toggleHotelFavorite,
} = useFavorite()

const {
  comparedIds,
  count: compareCount,
  toggleCompare,
  maxCompare,
} = useCompare()

  /*
   * SEARCH TRANSITION
   *
   * Because this return happens
   * before the Explore UI below,
   * the whole screen is replaced
   * by our shared LoadingScreen.
   */
  if (searchLoading) {
    return (
      <LoadingScreen
        title={`Exploring ${searchQuery}`}
        messages={[
          'Finding places...',
          'Looking for inspiration...',
          'Preparing your results...',
        ]}
        interval={400}
      />
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
  key={place.id}
  place={place}
  active={
    activeIndex === index
  }
  muted={muted}
  index={index}
  onActiveChange={
    setActiveIndex
  }
  feedRef={feedRef}

  favorite={
    isDestinationFavorite(
      place.id
    )
  }
  onFavorite={() =>
    toggleDestinationFavorite(
      place.id
    )
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
    toggleCompare
  }

  isHotelFavorite={
    isHotelFavorite
  }
  onToggleHotelFavorite={
    toggleHotelFavorite
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
            right-4
            top-[70px]
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