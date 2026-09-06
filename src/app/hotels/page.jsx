'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import Image from 'next/image'

import {
  ArrowRight,
  Heart,
  MapPin,
} from 'lucide-react'

import {
  useRouter,
} from 'next/navigation'



import heroHotels from '@/assets/images/hero-hotels.jpg'

import {
  Button,
} from '@/components/ui/button'

import BottomNav from '@/components/BottomNav'
import CompareBar from '@/components/CompareBar'
import HotelCard from '@/components/HotelCard'
import LoadingScreen from '@/components/LoadingScreen'
import SearchForm from '@/components/search/SearchForm'
import FeaturedTripCard from '@/components/FeaturedTripCard'
import DestinationCard from '@/components/explore/DestinationCard'

import {
  useTravelerProfile,
} from '@/context/TravelerProfileContext'

import {
  hotels,
} from '@/data/hotels'

import {
  trips,
} from '@/data/trips'

import {
  explorePlaces,
} from '@/data/explorePlaces'

import {
  getDefaultStayDates,
} from '@/lib/defaultStayDates'



import {
  useCompare,
} from '@/context/CompareContext'

import {
  useFavorite,
} from '@/context/FavoriteContext'


/* -------------------------------------------------
   PREFERENCE COPY
-------------------------------------------------- */

const preferenceCopy = {
  'food-cafes':
    'local food and cafés',

  walkable:
    'walkable neighborhoods',

  quiet:
    'quiet, slower places',

  culture:
    'culture and local life',

  nature:
    'nature nearby',

  lively:
    'lively, social areas',
}



/* -------------------------------------------------
   HOTELS PAGE
-------------------------------------------------- */

export default function Page() {
  const router =
    useRouter()

  const {
  profile: travelerProfile,
  ready: travelerProfileReady,
} = useTravelerProfile()

  const defaultStayDates =
    getDefaultStayDates()



  /* -------------------------------------------------
     HOTEL SEARCH
  -------------------------------------------------- */

  const [
    search,
    setSearch,
  ] = useState({
    destination: {
      id: 'yogyakarta',
      city:
        'Yogyakarta',
      country:
        'Indonesia',
      label:
        'Yogyakarta, Indonesia',
    },

    checkIn:
      defaultStayDates.checkIn,

    checkOut:
      defaultStayDates.checkOut,

    guests: 2,

    rooms: 1,
  })


  useEffect(() => {
  if (
    !travelerProfileReady ||
    !travelerProfile?.destination
  ) {
    return
  }

  const destination =
    travelerProfile.destination

  setSearch(
    (current) => ({
      ...current,

      destination: {
        id:
          destination.id,

        city:
          destination.name,

        country:
          destination.country,

        label:
          destination.label,
      },
    })
  )
}, [
  travelerProfileReady,
  travelerProfile?.destination,
])

  /* -------------------------------------------------
     SEARCH LOADING
  -------------------------------------------------- */

  const [
    searchLoading,
    setSearchLoading,
  ] = useState(false)

const [
  loadingDestination,
  setLoadingDestination,
] = useState(
  'your destination'
)

  /* -------------------------------------------------
     GLOBAL COMPARE and FAVORITE CART
  -------------------------------------------------- */

  const {
    comparedIds,
    count: compareCount,
    toggleCompare,
    maxCompare,
  } = useCompare()

const {
  isHotelFavorite,
  toggleHotelFavorite,
  isDestinationFavorite,
  toggleDestinationFavorite,
} = useFavorite()

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

  const profileDestination =
    travelerProfile
      ?.destination
      ?.name ??
    'your destination'

  const profileBudget =
    travelerProfile
      ?.budget
      ?.shortLabel ??
    travelerProfile
      ?.budget
      ?.label ??
    null

  const preferences =
    travelerProfile
      ?.preferences ??
    []

  const profilePreferenceText =
    useMemo(
      () => {
        if (
          preferences.length ===
          0
        ) {
          return 'places and stays that fit your travel style'
        }

        const labels =
          preferences
            .map(
              (
                id
              ) =>
                preferenceCopy[
                  id
                ]
            )
            .filter(
              Boolean
            )
            .slice(
              0,
              3
            )

        if (
          labels.length ===
          0
        ) {
          return 'places and stays that fit your travel style'
        }

        if (
          labels.length ===
          1
        ) {
          return labels[0]
        }

        if (
          labels.length ===
          2
        ) {
          return `${labels[0]} and ${labels[1]}`
        }

        return `${labels[0]}, ${labels[1]}, and ${labels[2]}`
      },
      [
        preferences,
      ]
    )


  /* -------------------------------------------------
     CURATED EXPLORE PLACES
  -------------------------------------------------- */

  const curatedPlaces =
    useMemo(
      () => {
        if (
          !explorePlaces
            ?.length
        ) {
          return []
        }

        /*
         * For now we reuse the same
         * Explore feed source.
         *
         * Later this can actually sort
         * according to the traveler profile.
         */
        return explorePlaces
          .slice(
            0,
            6
          )
      },
      []
    )


  /* -------------------------------------------------
     HOTEL SEARCH ACTION
  -------------------------------------------------- */

  const searchHotels =
    () => {
      const destinationName =
        search.destination
          ?.city ??
        search.destination
          ?.name ??
        search.destination
          ?.label ??
        'your destination'

      setLoadingDestination(
        destinationName
      )

      setSearchLoading(
        true
      )

      const params =
        new URLSearchParams({
          destination:
            search.destination.id,

          checkIn:
            search.checkIn,

          checkOut:
            search.checkOut,

          guests:
            String(
              search.guests
            ),

          rooms:
            String(
              search.rooms
            ),
        })

      window.setTimeout(
        () => {
          router.push(
            `/search?${params.toString()}`
          )
        },
        1400
      )
    }


  /* -------------------------------------------------
     SEARCH LOADING SCREEN
  -------------------------------------------------- */

if (!travelerProfileReady) {
  return (
    <LoadingScreen
      title="Loading your trip..."
      message="Preparing your personalized stay recommendations."
    />
  )
}

  if (searchLoading) {
    return (
      <LoadingScreen
        titles={[
          `Finding stays in ${loadingDestination}...`,
          'Checking your trip details...',
          'Preparing hotel options...',
        ]}
        message="Finding stays that fit your trip."
        interval={450}
      />
    )
  }


  /* -------------------------------------------------
     PAGE
  -------------------------------------------------- */

  return (
    <main
      className="
        min-h-screen
        bg-background
        pb-24
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      {/* -------------------------------------------------
          HERO + HOTEL SEARCH
      -------------------------------------------------- */}

      <section
        className="
          relative
        "
      >
        {/* HERO IMAGE */}
        <div
          className="
            relative
            h-[200px]
            overflow-hidden
          "
        >
          <Image
            src={
              heroHotels
            }
            alt="Hotels"
            fill
            priority
            className="
              object-cover
              object-bottom
            "
          />

          {/* FADE */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[110px]
              bg-gradient-to-t
              from-background
              via-background/80
              to-transparent
            "
          />
        </div>


        {/* SEARCH CARD */}
        <div
          className="
            relative
            z-10
            mx-5
            -mt-24
          "
        >
          <section
            className="
              rounded-2xl
              border
              border-border
              bg-background
              p-4
              shadow-md
            "
          >
            <div>
              <p
           className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.1em]
            text-secondary
                "
              >
                Hello, {travelerName}!
              </p>

              <h1
                className="
                  mb-2
                  mt-1
                  font-bold
                "
              >
                Where will you stay
                next?
              </h1>
            </div>

            <SearchForm
              value={
                search
              }
              onChange={
                setSearch
              }
              onSubmit={
                searchHotels
              }
            />
          </section>
        </div>
      </section>


      {/* -------------------------------------------------
          TRAVELER PROFILE
      -------------------------------------------------- */}

      <section
        className="
          mt-8
          px-5
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.1em]
            text-secondary
          "
        >
          About you
        </p>


        {/* PROFILE CARD */}
        <div
          className="
            mt-4
            rounded-2xl
            border
            border-border
            bg-background
            p-4
            shadow-sm
          "
        >
          <p
            className="
              font-bold
            "
          >
            {profileLabel}

            <span
              className="
                font-normal
                text-muted-foreground
              "
            >
              {' '}
              · {profileDestination}

              {profileBudget && (
                <>
                  {' '}
                  · {profileBudget}/night
                </>
              )}
            </span>
          </p>

          <p
            className="
              mt-2
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            {travelerName}, we&apos;re
            matching places and stays
            to your interest in{' '}
            {profilePreferenceText}.
          </p>
        </div>
      </section>


      {/* -------------------------------------------------
          EXPLORE BY FEELING
      -------------------------------------------------- */}

      <section
        className="
          mt-10
        "
      >
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
            px-5
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.1em]
                text-secondary
              "
            >
              Explore by feeling
            </p>

            <p
              className="
                mt-1
                max-w-xs
                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Places from Explore
              that might fit your
              travel style.
            </p>
          </div>

          <Button
            type="button"
            variant="link"
            onClick={() =>
              router.push(
                '/explore'
              )
            }
            className="
              h-auto
              min-h-0
              shrink-0
              p-0
              text-sm
              font-medium
              text-secondary
              no-underline
            "
          >
            See all
          </Button>
        </div>

{/* EXPLORE CARDS */}
<div
  className="
    mt-4
    ml-5
    flex
    snap-x
    snap-mandatory
    gap-3
    overflow-x-auto
    px-5
    pb-2


    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  "
>
  {curatedPlaces.map(
    (place) => (
      <div
        key={place.id}
        className="
          snap-start
        "
      >
        <DestinationCard
          place={place}

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

          onClick={() => {
            const params =
              new URLSearchParams({
                q:
                  place.place ??
                  place.name ??
                  '',
              })

            router.push(
              `/explore/search?${params.toString()}`
            )
          }}
        />
      </div>
    )
  )}
</div>
      </section>


      {/* -------------------------------------------------
          COMPARE
      -------------------------------------------------- */}

      <section
        className="
          mx-5
          mt-6
        "
      >
 
        {/* EDIT PREFERENCES */}
        <button
          type="button"
          onClick={() =>
            router.push(
              '/onboarding-survey?mode=preferences'
            )
          }
          className="
            mt-4
            flex
            min-h-16
            w-full
            items-center
            gap-3
            rounded-2xl
            bg-secondary
            px-4
            py-3.5
            text-left
            text-secondary-foreground
            shadow-sm
            transition-transform
            touch-manipulation
            active:scale-[0.99]
          "
        >
          <span
            className="
              flex
              size-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-background/10
              text-xl
            "
          >
            ✦
          </span>

          <span
            className="
              min-w-0
              flex-1
            "
          >
            <strong
              className="
                block
                text-sm
              "
            >
              Edit preferences
            </strong>

            <span
              className="
                mt-0.5
                block
                text-xs
                leading-relaxed
                opacity-80
              "
            >
              Update what matters for
              your stay.
            </span>
          </span>

          <ArrowRight
            className="
              size-4
              shrink-0
            "
          />
        </button>
      </section>


      {/* -------------------------------------------------
          HOTELS
      -------------------------------------------------- */}

      <section
        className="
          mt-9
          px-5
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.1em]
            text-secondary
          "
        >
          Transparent stays
        </p>

        <div
          className="
            mt-1
            flex
            items-baseline
            justify-between
            gap-4
          "
        >
          <h2
            className="
              text-1xl
              font-bold
            "
          >
            Stay somewhere that fits
          </h2>
        </div>


        {/* HOTEL CARDS */}
        <div
          className="
            mt-4
            flex
            flex-col
            gap-3
          "
        >
          {hotels
            .slice(
              0,
              3
            )
            .map(
              (
                hotel
              ) => (
 <HotelCard
  key={hotel.id}
  hotel={hotel}
  currency="IDR"

  compared={
    comparedIds.includes(
      hotel.id
    )
  }

  onCompare={() =>
    toggleCompare(
      hotel.id
    )
  }

  compareDisabled={
    compareCount >= maxCompare &&
    !comparedIds.includes(
      hotel.id
    )
  }

  favorite={
    isHotelFavorite(
      hotel.id
    )
  }

  onFavorite={() =>
    toggleHotelFavorite(
      hotel.id
    )
  }
/>
              )
            )}
        </div>


        {/* SEE ALL */}
        <div
          className="
            mt-4
          "
        >
          <Button
            type="button"
            variant="outline"
            className="
              w-full
            "
            onClick={
              searchHotels
            }
          >
            See all stays
          </Button>
        </div>
      </section>


  




      {/* -------------------------------------------------
          BOTTOM NAV
      -------------------------------------------------- */}

      <BottomNav
        active="hotels"
      />
    </main>
  )
}