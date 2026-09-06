'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  MapPin,
  Sparkles,
} from 'lucide-react'

const areas = [
  {
    id: 'sleman',
    label: 'Sleman',
    x: '18%',
    y: '21%',
  },
  {
    id: 'malioboro',
    label: 'Malioboro',
    x: '45%',
    y: '42%',
  },
  {
    id: 'prawirotaman',
    label: 'Prawirotaman',
    x: '58%',
    y: '65%',
  },
  {
    id: 'kotagede',
    label: 'Kotagede',
    x: '75%',
    y: '57%',
  },
  {
    id: 'bantul',
    label: 'Bantul',
    x: '70%',
    y: '81%',
  },
]

const destinationMapConfig = {
  yogyakarta: {
    zoom: 1.42,
    translateX: '-3%',
    translateY: '-3%',
    pinX: '52%',
    pinY: '49%',
  },
}

const preferenceLabels = {
  'food-cafes': 'Food & cafés',
  walkable: 'Walkable',
  quiet: 'Quiet',
  culture: 'Culture',
  nature: 'Nature',
  lively: 'Lively',
}

export default function DestinationMapCard({
  destination,
  preferences = [],
  emptyLabel = 'Select a destination',
  heightClass = 'h-[280px]',
}) {
  const [
    focused,
    setFocused,
  ] = useState(false)

  const [
    showPin,
    setShowPin,
  ] = useState(false)

  const [
    showCard,
    setShowCard,
  ] = useState(false)

  const destinationId =
    destination?.id ?? null

  const config =
    destinationMapConfig[
      destinationId
    ] ?? {
      zoom: 1.3,
      translateX: '0%',
      translateY: '0%',
      pinX: '50%',
      pinY: '50%',
    }

  const city =
    destination?.city ??
    destination?.name ??
    ''

  const country =
    destination?.country ??
    ''

  const visiblePreferences =
    useMemo(
      () =>
        preferences
          .slice(0, 3)
          .map(
            (preference) =>
              preferenceLabels[
                preference
              ] ?? preference
          ),
      [preferences]
    )

  useEffect(() => {
    let focusTimer
    let pinTimer
    let cardTimer

    if (!destination) {
      setFocused(false)
      setShowPin(false)
      setShowCard(false)

      return
    }

    setFocused(false)
    setShowPin(false)
    setShowCard(false)

    focusTimer =
      window.setTimeout(
        () => {
          setFocused(true)
        },
        80
      )

    pinTimer =
      window.setTimeout(
        () => {
          setShowPin(true)
        },
        520
      )

    cardTimer =
      window.setTimeout(
        () => {
          setShowCard(true)
        },
        760
      )

    return () => {
      window.clearTimeout(
        focusTimer
      )

      window.clearTimeout(
        pinTimer
      )

      window.clearTimeout(
        cardTimer
      )
    }
  }, [destinationId])

  return (
    <section
      className={`
        relative
        ${heightClass}
        min-h-[220px]
        shrink-0
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-[#dfe8e2]
      `}
    >
      {/* MAP CAMERA */}
      <div
        className="
          absolute
          inset-[-16%]
          origin-center
          transition-transform
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          will-change-transform
        "
        style={{
          transform: focused
            ? `
              scale(${config.zoom})
              translate(
                ${config.translateX},
                ${config.translateY}
              )
            `
            : `
              scale(1)
              translate(0, 0)
            `,
        }}
      >
        {/* BASE */}
        <div
          className="
            absolute
            inset-0
            bg-[#dfe8e2]
          "
        />

        {/* MAP BLOCKS */}
        <div
          className="
            absolute
            -left-[5%]
            -top-[5%]
            h-[42%]
            w-[47%]
            rotate-[10deg]
            rounded-[42%]
            bg-[#edf2e9]
          "
        />

        <div
          className="
            absolute
            right-[1%]
            top-[8%]
            h-[35%]
            w-[40%]
            -rotate-[8deg]
            rounded-[44%]
            bg-[#edf2e9]
          "
        />

        <div
          className="
            absolute
            bottom-[2%]
            left-[12%]
            h-[37%]
            w-[55%]
            -rotate-[5deg]
            rounded-[45%]
            bg-[#e9efe7]
          "
        />

        {/* GREEN AREAS */}
        <div
          className="
            absolute
            left-[7%]
            top-[16%]
            h-[18%]
            w-[23%]
            rotate-[12deg]
            rounded-[45%]
            bg-[#cdddc9]
          "
        />

        <div
          className="
            absolute
            bottom-[12%]
            right-[8%]
            h-[22%]
            w-[28%]
            -rotate-[15deg]
            rounded-[45%]
            bg-[#cdddc9]
          "
        />

        {/* WATER */}
        <div
          className="
            absolute
            -bottom-[18%]
            -left-[8%]
            h-[34%]
            w-[120%]
            rotate-[4deg]
            rounded-[50%]
            bg-[#c9deea]
          "
        />

        {/* MAIN ROADS */}
        <div
          className="
            absolute
            left-[2%]
            top-[31%]
            h-[5px]
            w-[98%]
            rotate-[11deg]
            rounded-full
            bg-white/90
          "
        />

        <div
          className="
            absolute
            left-[5%]
            top-[55%]
            h-[5px]
            w-[96%]
            -rotate-[9deg]
            rounded-full
            bg-white/90
          "
        />

        <div
          className="
            absolute
            left-[36%]
            top-[-8%]
            h-[116%]
            w-[5px]
            rotate-[8deg]
            rounded-full
            bg-white/90
          "
        />

        <div
          className="
            absolute
            left-[69%]
            top-[-8%]
            h-[116%]
            w-[5px]
            -rotate-[13deg]
            rounded-full
            bg-white/90
          "
        />

        {/* SECONDARY ROADS */}
        <div
          className="
            absolute
            left-[18%]
            top-[43%]
            h-[2px]
            w-[72%]
            -rotate-[18deg]
            rounded-full
            bg-white/65
          "
        />

        <div
          className="
            absolute
            left-[28%]
            top-[70%]
            h-[2px]
            w-[60%]
            rotate-[14deg]
            rounded-full
            bg-white/65
          "
        />

        {/* AREA LABELS */}
        {areas.map(
          (area) => (
            <span
              key={area.id}
              className="
                absolute
                -translate-x-1/2
                -translate-y-1/2
                whitespace-nowrap
                text-[10px]
                font-medium
                text-foreground/45
              "
              style={{
                left: area.x,
                top: area.y,
              }}
            >
              {area.label}
            </span>
          )
        )}

        {/* PIN */}
        {destination &&
          showPin && (
            <div
              className="
                absolute
                z-20
                -translate-x-1/2
                -translate-y-1/2
                animate-in
                fade-in
                zoom-in-75
                duration-300
              "
              style={{
                left: config.pinX,
                top: config.pinY,
              }}
            >
              <div
                className="
                  relative
                  flex
                  flex-col
                  items-center
                "
              >
                <span
                  className="
                    absolute
                    bottom-[-5px]
                    size-4
                    rotate-45
                    rounded-[3px]
                    bg-primary
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-primary-foreground
                    shadow-lg
                    ring-4
                    ring-white/70
                  "
                >
                  <MapPin
                    className="size-5"
                  />
                </span>
              </div>
            </div>
          )}
      </div>

      {/* EMPTY */}
      {!destination && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            flex
            items-center
            justify-center
          "
        >
          <span
            className="
              rounded-full
              border
              border-border
              bg-background/90
              px-3
              py-2
              text-xs
              font-medium
              text-muted-foreground
              shadow-sm
              backdrop-blur-md
            "
          >
            {emptyLabel}
          </span>
        </div>
      )}

      {/* CONTEXT CARD */}
      {destination &&
        showCard && (
          <div
            className="
              absolute
              inset-x-3
              bottom-3
              z-30
              animate-in
              fade-in
              slide-in-from-bottom-3
              duration-300
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-border
                bg-background/95
                p-3
                shadow-lg
                backdrop-blur-md
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
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
                    bg-primary/10
                    text-primary
                  "
                >
                  <MapPin
                    className="size-4"
                  />
                </span>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <p
                    className="
                      truncate
                      text-sm
                      font-bold
                    "
                  >
                    {city}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-muted-foreground
                    "
                  >
                    {country}
                  </p>

                  {visiblePreferences.length >
                    0 && (
                    <div
                      className="
                        mt-3
                        border-t
                        border-border
                        pt-3
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          font-medium
                        "
                      >
                        <Sparkles
                          className="
                            size-3.5
                            text-primary
                          "
                        />

                        Matches your trip style
                      </div>

                      <div
                        className="
                          mt-2
                          flex
                          flex-wrap
                          gap-1.5
                        "
                      >
                        {visiblePreferences.map(
                          (
                            preference
                          ) => (
                            <span
                              key={
                                preference
                              }
                              className="
                                rounded-full
                                bg-surface
                                px-2
                                py-1
                                text-[10px]
                                font-medium
                                text-muted-foreground
                              "
                            >
                              {
                                preference
                              }
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  )
}