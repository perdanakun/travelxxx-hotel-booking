'use client'

import {
  ChevronRight,
  Compass,
  MapPin,
  Settings2,
  Sparkles,
  User,
  Wallet,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'

import {
  Button,
} from '@/components/ui/button'

import {
  getTravelerProfile,
} from '@/lib/travelerProfile'

import {
  useTravelerProfile,
} from '@/context/TravelerProfileContext'


/* -------------------------------------------------
   PROFILE DESCRIPTION
-------------------------------------------------- */

function getProfileDescription(
  profileLabel
) {
  switch (profileLabel) {
    case 'Relaxed explorer':
      return 'You tend to enjoy slower trips, calmer places, and neighborhoods that are easy to explore on foot.'

    case 'Local explorer':
      return 'You enjoy discovering local food, culture, and neighborhoods with a stronger sense of place.'

    case 'Nature seeker':
      return 'You prefer trips with greenery, scenery, and easy access to outdoor escapes.'

    case 'Social explorer':
      return 'You enjoy lively places, popular spots, and neighborhoods with plenty happening around you.'

    default:
      return 'You like keeping your options open and discovering places that match the way you want to travel.'
  }
}


/* -------------------------------------------------
   PAGE
-------------------------------------------------- */

export default function ProfilePage() {
  const router =
    useRouter()

  const {
    profile,
    ready,
  } = useTravelerProfile()

  /*
   * Avoid rendering fake fallback content
   * before localStorage has been read.
   */
  if (!ready) {
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
        <AppHeader />

        <section
          className="
            px-5
            py-8
          "
        >
          <div
            className="
              h-6
              w-28
              animate-pulse
              rounded-lg
              bg-surface
            "
          />

          <div
            className="
              mt-6
              h-28
              animate-pulse
              rounded-2xl
              bg-surface
            "
          />
        </section>

        <BottomNav
          active="profile"
        />
      </main>
    )
  }


  /*
   * User somehow reaches Profile
   * before completing onboarding.
   */
  if (!profile) {
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
        <AppHeader />

        <section
          className="
            flex
            min-h-[70vh]
            flex-col
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <span
            className="
              flex
              size-14
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
            "
          >
            <Compass
              className="size-6"
            />
          </span>

          <h1
            className="
              mt-5
              text-xl
              font-bold
            "
          >
            Build your traveler profile
          </h1>

          <p
            className="
              mt-2
              max-w-xs
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            Tell us how you like to
            travel so TravelXXX can
            personalize what you see.
          </p>

          <Button
            type="button"
            className="
              mt-6
              rounded-full
              px-6
              font-bold
            "
            onClick={() =>
              router.push(
                '/onboarding-survey'
              )
            }
          >
            Get started
          </Button>
        </section>

        <BottomNav
          active="profile"
        />
      </main>
    )
  }


  const name =
    profile.name ||
    'Traveler'

  const profileLabel =
    profile.profileLabel ||
    'Curious traveler'

  const description =
    getProfileDescription(
      profileLabel
    )

  const preferences =
    profile.preferenceLabels ??
    []

  const destination =
    profile.destination?.label ??
    [
      profile.destination?.name,
      profile.destination?.country,
    ]
      .filter(Boolean)
      .join(', ')

  const budget =
    profile.budget?.shortLabel ??
    profile.budget?.label ??
    'Not set'

  const priorities =
    profile.stayPriorities ??
    []


  const editProfile = () => {
    router.push(
      '/onboarding-survey?mode=preferences'
    )
  }


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
      <AppHeader />


      {/* ---------------------------------------------
          PAGE TITLE
      ---------------------------------------------- */}


      {/* ---------------------------------------------
          TRAVELER PROFILE
      ---------------------------------------------- */}

      <section
        className="
          mt-8
          px-5
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-primary
              "
            >
              Traveler profile
            </p>

            <h2
              className="
                mt-1
                text-xl
                font-bold
              "
            >
              {profileLabel}
            </h2>
          </div>

          <Button
            type="button"
            variant="link"
            onClick={
              editProfile
            }
            className="
              h-auto
              min-h-0
              p-0
              text-sm
            "
          >
            Edit
          </Button>
        </div>

        
      {/* ---------------------------------------------
          USER
      ---------------------------------------------- */}


        <div
          className="
          mt-2
          mb-2
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-border
            bg-background
            p-4
          "
        >
          <div
            className="
              flex
              size-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
            "
          >
            <User
              className="size-6"
            />
          </div>

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <h2
              className="
                truncate
                font-bold
              "
            >
              {name}
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-sm
                capitalize
                text-muted-foreground
              "
            >
              {profileLabel}
            </p>
          </div>
        </div>

        
{/* PREFERENCE CHIPS */}
{preferences.length > 0 && (
  <div
    className="
      mt-4
      flex
      flex-nowrap
      gap-2
      overflow-x-auto
      [scrollbar-width:none]
      [-ms-overflow-style:none]
      [&::-webkit-scrollbar]:hidden
    "
  >
    {preferences.map((preference) => (
      <span
        key={preference}
        className="
          shrink-0
          rounded-full
          bg-surface
          px-3
          py-1.5
          text-xs
          font-medium
        "
      >
        {preference}
      </span>
    ))}
  </div>
)}

        <p
          className="
            mt-4
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          {description}
        </p>

      </section>

{/* ---------------------------------------------
    TRIP SETUP
---------------------------------------------- */}

<section className="mt-4 px-5">
  <div className="mt-3 flex flex-col gap-3">

    {/* DESTINATION */}
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-border
        p-4
      "
    >
      <MapPin
        className="
          size-5
          shrink-0
          text-primary
        "
      />

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          Destination
        </p>

        <p className="mt-1 truncate text-sm font-bold">
          {destination || 'Not set'}
        </p>
      </div>
    </div>

{/* BUDGET */}
<div
  className="
    flex
    items-center
    gap-4
    rounded-2xl
    border
    border-border
    p-4
  "
>
  <Wallet
    className="
      size-5
      shrink-0
      text-primary
    "
  />

  <div className="min-w-0">
    <p className="text-xs text-muted-foreground">
      Typical budget
    </p>

    <div className="mt-1 flex items-baseline gap-1.5">
      <p className="text-sm font-bold">
        {budget}
      </p>

      {profile.budget && (
        <span className="text-xs text-muted-foreground">
          per night
        </span>
      )}
    </div>
  </div>
</div>


  </div>
</section>



      {/* ---------------------------------------------
          STAY PRIORITIES
      ---------------------------------------------- */}

      <section
        className="
          mt-2
          px-5
        "
      >
                <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              What TravelXXX should
              prioritize for you.
            </p>
          </div>
        </div>
         {priorities.length >
        0 ? (
          <div
            className="
              mt-3
              overflow-hidden
              rounded-2xl
              border
              border-border
            "
          >
            {priorities.map(
              (
                priority,
                index
              ) => (
                <PreferenceRow
                  key={
                    priority
                  }
                  icon={
                    Sparkles
                  }
                  label={
                    priority
                  }
                  last={
                    index ===
                    priorities.length -
                      1
                  }
                />
              )
            )}
          </div>
        ) : (
          <div
            className="
              mt-3
              rounded-2xl
              border
              border-border
              p-4
              text-sm
              text-muted-foreground
            "
          >
            No stay priorities
            selected yet.
          </div>
        )}
      </section>


      {/* ---------------------------------------------
          EDIT CTA
      ---------------------------------------------- */}

      <section
        className="
          mt-7
          px-5
        "
      >
        <Button
          type="button"
          variant="secondary"
          onClick={
            editProfile
          }
          className="
            w-full
            rounded-xl
          "
        >
          Edit preferences profile

          <ChevronRight
            className="size-4"
          />
        </Button>
      </section>


      <BottomNav
        active="profile"
      />
    </main>
  )
}


/* -------------------------------------------------
   PRIORITY ROW
-------------------------------------------------- */

function PreferenceRow({
  icon: Icon,
  label,
  last = false,
}) {
  return (
    <div
      className={`
        flex
        w-full
        items-center
        gap-3
        px-4
        py-4

        ${
          last
            ? ''
            : 'border-b border-border'
        }
      `}
    >
      <span
        className="
          flex
          size-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-surface
        "
      >
        <Icon
          className="size-4"
        />
      </span>

      <span
        className="
          min-w-0
          flex-1
          text-sm
          font-medium
        "
      >
        {label}
      </span>
    </div>
  )
}