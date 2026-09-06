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

import {
  useTravelerProfile,
} from '@/context/TravelerProfileContext'


export default function ExplorePage() {
  const feedRef =
    useRef(null)

  const router =
    useRouter()


  /* -------------------------------------------------
     TRAVELER PROFILE
  -------------------------------------------------- */

  const {
    profile: travelerProfile,
    ready: travelerProfileReady,
  } = useTravelerProfile()


  /* -------------------------------------------------
     FEED STATE
  -------------------------------------------------- */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  const [
    muted,
    setMuted,
  ] = useState(true)


  /* -------------------------------------------------
     SEARCH LOADING
  -------------------------------------------------- */

  const [
    searchLoading,
    setSearchLoading,
  ] = useState(false)

  const [
    searchQuery,
    setSearchQuery,
  ] = useState('')


  /* -------------------------------------------------
     GLOBAL FAVORITE
  -------------------------------------------------- */

  const {
    isDestinationFavorite,
    toggleDestinationFavorite,
    isHotelFavorite,
    toggleHotelFavorite,
  } = useFavorite()


  /* -------------------------------------------------
     GLOBAL COMPARE
  -------------------------------------------------- */

  const {
    comparedIds,
    count: compareCount,
    toggleCompare,
    maxCompare,
  } = useCompare()


  /* -------------------------------------------------
     PROFILE DERIVED DATA
  -------------------------------------------------- */

  const travelerName =
    travelerProfile?.name ??
    'Traveler'

  const profileLabel =
    travelerProfile
      ?.profileLabel ??
    'Curious traveler'

  const destinationName =
    travelerProfile
      ?.destination
      ?.name ??
    'your destination'

  const preferences =
    travelerProfile
      ?.preferences ??
    []

  const preferenceLabels =
    travelerProfile
      ?.preferenceLabels ??
    []


  /* -------------------------------------------------
     ACTIVE PLACE
  -------------------------------------------------- */

  const activePlace =
    explorePlaces[
      activeIndex
    ]


  /* -------------------------------------------------
     SEARCH
  -------------------------------------------------- */

  const handleSearch = (
    query
  ) => {
    const trimmedQuery =
      query.trim()

    if (!trimmedQuery) {
      return
    }

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


  /* -------------------------------------------------
     PERSONALIZE / EDIT PROFILE
  -------------------------------------------------- */

  const handlePersonalize =
    () => {
      if (travelerProfile) {
        router.push(
          '/onboarding-survey?mode=preferences'
        )

        return
      }

      router.push(
        '/onboarding-survey'
      )
    }


  /* -------------------------------------------------
     PROFILE LOADING
  -------------------------------------------------- */

  if (!travelerProfileReady) {
    return (
      <LoadingScreen
        title="Preparing Explore..."
        message="Loading your traveler profile."
      />
    )
  }


  /* -------------------------------------------------
     SEARCH TRANSITION
  -------------------------------------------------- */

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


  /* -------------------------------------------------
     PAGE
  -------------------------------------------------- */

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
      {/* -------------------------------------------------
          DESTINATION FEED
      -------------------------------------------------- */}

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

              travelerProfile={
                travelerProfile
              }
            />
          )
        )}
      </div>


      {/* -------------------------------------------------
          SEARCH + PERSONALIZATION
      -------------------------------------------------- */}

      <ExploreDiscoveryBar
        onSearch={
          handleSearch
        }

        onPersonalize={
          handlePersonalize
        }

        profileLabel={
          travelerProfile
            ? profileLabel
            : 'Personalize'
        }
      />


      {/* -------------------------------------------------
          SOUND
      -------------------------------------------------- */}

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


      {/* -------------------------------------------------
          BOTTOM NAV
      -------------------------------------------------- */}

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