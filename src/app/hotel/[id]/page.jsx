'use client'

import {
  Suspense,
  useState,
} from 'react'

import {
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation'

import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
  Wifi,
  Waves,
  X,
} from 'lucide-react'

import { hotels } from '@/data/hotels'
import { destinations } from '@/data/destinations'

import {
  formatPrice,
} from '@/lib/formatPrice'

import AppHeader from '@/components/AppHeader'
import FavoriteButton from '@/components/FavoriteButton'
import { Button } from '@/components/ui/button'

import SearchSummary from '@/components/search/SearchSummary'
import EditSearchSheet from '@/components/search/EditSearchSheet'

import Facilities from '@/components/hotel/Facilities'

function SectionTitle({
  eyebrow,
  title,
  action,
  onAction,
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            {eyebrow}
          </p>
        )}

        <h2 className="text-s font-bold leading-tight">
          {title}
        </h2>
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-secondary"
        >
          {action}
          <ArrowRight className="size-4" />
        </button>
      )}
    </div>
  )
}

function HotelPreviewContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()

const destinationId =
  searchParams.get('destination') ??
  'yogyakarta'

const initialDestination =
  destinations.find(
    (destination) =>
      destination.id === destinationId
  ) ?? destinations[0]

const [search, setSearch] = useState({
  destination: initialDestination,
  checkIn:
    searchParams.get('checkIn') ??
    '2026-09-22',
  checkOut:
    searchParams.get('checkOut') ??
    '2026-09-26',
  guests: Number(
    searchParams.get('guests') ?? 2
  ),
  rooms: Number(
    searchParams.get('rooms') ?? 1
  ),
})

const [currency, setCurrency] = useState(
  searchParams.get('currency') ?? 'USD'
)

const [draftSearch, setDraftSearch] =
  useState(search)

const [editSearchOpen, setEditSearchOpen] =
  useState(false)

  const hotel = hotels.find(
    (item) => item.id === params.id
  )

  const [activeImage, setActiveImage] =
    useState(0)

  const [compared, setCompared] =
    useState(false)

  const [favorite, setFavorite] =
    useState(false)

  const [selectedRoom, setSelectedRoom] =
    useState(0)

  const [facilitiesOpen, setFacilitiesOpen] =
  useState(false)

  if (!hotel) {
    return (
      <main className="min-h-screen bg-background text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
        <div className="px-5 py-16 text-center">
          <h1 className="text-2xl font-bold">
            Hotel not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This stay may no longer be available.
          </p>

          <button
            type="button"
            onClick={() => router.push('/search')}
            className="mt-6 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold"
          >
            Back to search
          </button>
        </div>
      </main>
    )
  }

  const gallery =
    hotel.gallery?.length > 0
      ? hotel.gallery
      : [hotel.image]

  /*
   * Temporary room data for prototype.
   * Later this can move into hotels.js.
   */
  const rooms = [
    {
      name: 'Deluxe King Room',
      detail:
        '1 king bed · 32 m² · City view',
      price: hotel.pricing.base,
      image:
        gallery[1] ?? gallery[0],
    },
    {
      name: 'Premier Pool View',
      detail:
        '1 king bed · 38 m² · Pool view',
      price:
        hotel.pricing.base + 25,
      image:
        gallery[2] ?? gallery[0],
    },
    {
      name: 'Family Suite',
      detail:
        '2 beds · 48 m² · Garden view',
      price:
        hotel.pricing.base + 50,
      image:
        gallery[3] ?? gallery[0],
    },
  ]

  const room =
    rooms[selectedRoom]

        const checkInDate = new Date(
        `${search.checkIn}T00:00:00`
        )

        const checkOutDate = new Date(
        `${search.checkOut}T00:00:00`
        )

        const nights = Math.max(
        1,
        Math.round(
            (checkOutDate - checkInDate) /
            (1000 * 60 * 60 * 24)
        )
        )

const guests = search.guests

  const roomSubtotal =
    room.price * nights

  const taxes =
    hotel.pricing.taxes * nights

  const total =
    roomSubtotal + taxes

    const formatStayDate = (dateString) => {
    return new Intl.DateTimeFormat(
        'en-GB',
        {
        day: 'numeric',
        month: 'short',
        }
    ).format(
        new Date(`${dateString}T00:00:00`)
    )
    }

    const stayDates = `${formatStayDate(
    search.checkIn
    )}–${formatStayDate(
    search.checkOut
    )}`

  const showPreviousImage = () => {
    setActiveImage((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1
    )
  }

  const showNextImage = () => {
    setActiveImage((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    )
  }

  const openEditSearch = () => {
  setDraftSearch(search)
  setEditSearchOpen(true)
}

const closeEditSearch = () => {
  setEditSearchOpen(false)
}

const applySearch = () => {
  if (!draftSearch.destination) {
    return
  }

  setSearch(draftSearch)

  const query = new URLSearchParams({
    destination:
      draftSearch.destination.id,
    checkIn: draftSearch.checkIn,
    checkOut: draftSearch.checkOut,
    guests: String(
      draftSearch.guests
    ),
    rooms: String(
      draftSearch.rooms
    ),
    currency,
  })

  router.replace(
    `/hotel/${hotel.id}?${query.toString()}`
  )

  setEditSearchOpen(false)
}

  return (
    <main className="min-h-screen bg-background pb-32 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">

                {/* HEADER */}
            <AppHeader
            showBack
            onBack={() => router.back()}
            trailing={
                <>
                <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    aria-label="Share hotel"
                    className="size-10 rounded-full"
                >
                    <Share2 className="size-4" />
                </Button>

            <FavoriteButton
            active={favorite}
            onToggle={() =>
                setFavorite((current) => !current)
            }
            />
                </>
            }
            />

      {/* GALLERY */}
      <section
        aria-label="Hotel photos"
        className="w-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={gallery[activeImage]}
            alt={`${hotel.title} photo ${
              activeImage + 1
            }`}
            className="size-full object-cover"
          />

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Previous photo"
                className="
                  absolute
                  left-3
                  top-1/2
                  flex
                  size-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-background/90
                  shadow-sm
                  backdrop-blur
                  transition-transform
                  active:scale-[0.94]
                "
              >
                <ArrowLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                aria-label="Next photo"
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  size-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-background/90
                  shadow-sm
                  backdrop-blur
                  transition-transform
                  active:scale-[0.94]
                "
              >
                <ArrowRight className="size-4" />
              </button>

              <span className="absolute bottom-3 right-3 rounded-full bg-foreground/75 px-2.5 py-1 text-[10px] font-medium text-background backdrop-blur">
                {activeImage + 1} /{' '}
                {gallery.length}
              </span>
            </>
          )}
        </div>

        {/* THUMBNAILS */}
        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map(
              (
                src,
                index
              ) => (
                <button
                  key={`${hotel.id}-${index}`}
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      index
                    )
                  }
                  aria-label={`View photo ${
                    index + 1
                  }`}
                  className={`
                    h-14
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    border-2
                    ${
                      activeImage ===
                      index
                        ? 'border-primary'
                        : 'border-transparent'
                    }
                  `}
                >
                  <img
                    src={src}
                    alt=""
                    className="size-full object-cover"
                  />
                </button>
              )
            )}
          </div>
        )}
      </section>

      <div className="w-full">

        {/* INTRO */}
        <section className="px-5 pb-7 pt-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
              Best match
            </span>

            <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
              Free cancellation
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-tight">
                {hotel.title}
              </h1>

              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-secondary">
                <MapPin className="size-4 shrink-0" />

                {hotel.area},{' '}
                {hotel.destination}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className="flex items-center justify-end gap-1">
                <strong className="text-lg">
                  {hotel.rating}
                </strong>

                <Star className="size-4 fill-primary text-primary" />
              </div>

              <span className="text-[11px] text-muted-foreground">
                128 reviews
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {hotel.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-xs font-medium">
              <ShieldCheck className="size-4 text-secondary" />
              Great for couples
            </span>

            <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-xs font-medium">
              <Wifi className="size-4 text-secondary" />
              Free Wi-Fi
            </span>

            <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-xs font-medium">
              <Waves className="size-4 text-secondary" />
              Outdoor pool
            </span>
          </div>
        </section>

        <div className="h-2 bg-surface" />

        {/* HOTEL DATE */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur">
        <SearchSummary
            search={search}
            onEdit={openEditSearch}
            variant="hotel"
        />
        </div>



{/* FACILITIES */}
<section className="px-5 py-7">
  <SectionTitle
    title="Everything you need"
  />

  <div className="mt-5">
<Facilities
  amenities={hotel.amenities}
  variant="carousel"
  initialLimit={3}
  onSeeAll={() =>
    setFacilitiesOpen(true)
  }
/>
  </div>
</section>

        <div className="h-2 bg-surface" />

        {/* REVIEWS */}
        <section className="px-5 py-7">
          <SectionTitle
            title="Guest Reviews"
            action="Read all"
          />

          <div className="mt-5 flex items-center gap-4">
            <strong className="text-4xl">
              {hotel.rating}
            </strong>

            <div>
              <div className="text-sm tracking-wide text-primary">
                ★★★★★
              </div>

              <span className="text-xs text-muted-foreground">
                Excellent · 128 reviews
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              ['Cleanliness', 92],
              ['Location', 88],
              ['Comfort', 90],
              ['Value', 86],
            ].map(
              ([
                label,
                value,
              ]) => (
                <div
                  key={label}
                  className="grid grid-cols-[80px_1fr_28px] items-center gap-3"
                >
                  <span className="text-xs text-muted-foreground">
                    {label}
                  </span>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${value}%`,
                      }}
                    />
                  </div>

                  <strong className="text-xs">
                    {(
                      value /
                      20
                    ).toFixed(
                      1
                    )}
                  </strong>
                </div>
              )
            )}
          </div>

          <blockquote className="mt-6 rounded-2xl bg-surface p-4 text-sm leading-relaxed">
            “A calm little base for exploring
            the neighborhood. The staff made
            everything easy, and breakfast was
            a highlight.”

            <cite className="mt-3 block text-xs not-italic text-muted-foreground">
              — Maya, Singapore
            </cite>
          </blockquote>
        </section>

        <div className="h-2 bg-surface" />

        {/* ROOMS */}
        <section className="px-5 py-7">
          <SectionTitle
            eyebrow="Rooms for your dates"
            title="Choose your room"
          />

          <div className="mt-5 space-y-4">
            {rooms.map(
              (
                item,
                index
              ) => {
                const isSelected =
                  selectedRoom ===
                  index

                return (
                  <article
                    key={item.name}
                    className={`
                      overflow-hidden
                      rounded-2xl
                      border
                      bg-background
                      shadow-sm

                      ${
                        isSelected
                          ? 'border-primary ring-1 ring-primary'
                          : 'border-border'
                      }
                    `}
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={
                          item.image
                        }
                        alt={`${item.name} at ${hotel.title}`}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold">
                          {
                            item.name
                          }
                        </h3>


                      </div>

                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {
                          item.detail
                        }
                      </p>

                      <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
                        <div>
                          <span className="block text-[11px] text-muted-foreground">
                            From
                          </span>

                          <strong className="text-xl">
                            $
                            {
                              item.price
                            }

                            <span className="text-xs font-medium text-muted-foreground">
                              /night
                            </span>
                          </strong>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRoom(
                              index
                            )
                          }
                          className={
                            isSelected
                              ? 'rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground'
                              : 'rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold'
                          }
                        >
                          {isSelected
                            ? 'Selected'
                            : 'Choose room'}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              }
            )}
          </div>
        </section>
      </div>


      {/* STICKY BOOKING */}
      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-50
          border-t
          border-border
          bg-background/95
          backdrop-blur

          md:left-1/2
          md:right-auto
          md:w-full
          md:max-w-md
          md:-translate-x-1/2
          md:border-x
        "
      >
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3">
        <button
        type="button"
        onClick={openEditSearch}
        className="min-w-0 text-left active:opacity-70"
        aria-label="Change stay details"
        >
        <span className="block text-[11px] text-muted-foreground">
            {nights} nights · {guests}{' '}
            {guests === 1 ? 'guest' : 'guests'}
        </span>

<strong className="block text-lg">
  {formatPrice(
    total,
    {
      fromCurrency:
        hotel.pricing.currency,
      currency,
    }
  )}

  <span className="ml-1 text-[11px] font-medium text-muted-foreground">
    total
  </span>
</strong>
        </button>

<button
  type="button"
  onClick={() => {
    const query = new URLSearchParams({
      hotel: hotel.id,
      roomName: room.name,
      roomDetail: room.detail,
      roomPrice: String(room.price),
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      guests: String(search.guests),
      rooms: String(search.rooms),
      currency,
    })

    router.push(
      `/checkout?${query.toString()}`
    )
  }}
  className="
    flex
    min-h-11
    items-center
    justify-center
    gap-2
    rounded-full
    bg-primary
    px-6
    text-sm
    font-semibold
    text-primary-foreground
    transition-transform
    active:scale-[0.98]
  "
>
  Book now
  <ArrowRight className="size-4" />
</button>
        </div>
      </div>

{/* EDIT SEARCH SHEET */}
<EditSearchSheet
  open={editSearchOpen}
  value={draftSearch}
  onChange={setDraftSearch}
  onApply={applySearch}
  onClose={closeEditSearch}
/> 

{/* FACILITIES */}{facilitiesOpen && (
  <div className="fixed inset-0 z-[70]">
    {/* BACKDROP */}
    <button
      type="button"
      aria-label="Close facilities"
      onClick={() =>
        setFacilitiesOpen(false)
      }
      className="absolute inset-0 bg-foreground/30 backdrop-blur-[1px]"
    />

    {/* SHEET */}
    <div
      className="
        absolute
        inset-x-0
        bottom-0
        mx-auto
        max-h-[88vh]
        max-w-md
        overflow-y-auto
        rounded-t-3xl
        border-x
        border-t
        border-border
        bg-background
        shadow-2xl
      "
    >
      {/* HANDLE */}
      <div className="flex justify-center pt-2.5">
        <div className="h-1 w-10 rounded-full bg-border" />
      </div>

      {/* HEADER */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-5 py-4">
        <div>
          <h2 className="text-lg font-bold">
            All facilities
          </h2>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {hotel.amenities.length} facilities available
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close facilities"
          onClick={() =>
            setFacilitiesOpen(false)
          }
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-5">
        <Facilities
          amenities={hotel.amenities}
          variant="grid"
        />
      </div>
    </div>
  </div>
)}

    </main>
  )
}

function HotelPreviewFallback() {
  return (
    <main className="min-h-screen bg-background text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      <div className="px-5 py-8">
        <p className="text-sm text-muted-foreground">
          Loading stay...
        </p>
      </div>
    </main>
  )
}

export default function HotelPreview() {
  return (
    <Suspense
      fallback={
        <HotelPreviewFallback />
      }
    >
      <HotelPreviewContent />
    </Suspense>
  )
}