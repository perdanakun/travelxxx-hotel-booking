'use client'

import {
  Suspense,
} from 'react'

import {
  ArrowRight,
  CalendarDays,
  Check,
  Copy,
  Home,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react'

import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { hotels } from '@/data/hotels'
import { formatPrice } from '@/lib/formatPrice'
import { getDefaultStayDates } from '@/lib/defaultStayDates'

import { Button } from '@/components/ui/button'


function SummaryRow({
  label,
  value,
  strong = false,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span
        className={
          strong
            ? 'text-right text-sm font-bold'
            : 'text-right text-sm font-medium'
        }
      >
        {value}
      </span>
    </div>
  )
}


function BookingConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const defaultDates =
    getDefaultStayDates()

  const hotelId =
    searchParams.get('hotel') ??
    hotels[0]?.id

  const hotel =
    hotels.find(
      (item) => item.id === hotelId
    ) ?? hotels[0]

  const checkIn =
    searchParams.get('checkIn') ??
    defaultDates.checkIn

  const checkOut =
    searchParams.get('checkOut') ??
    defaultDates.checkOut

  const guests = Number(
    searchParams.get('guests') ?? 2
  )

  const roomsCount = Number(
    searchParams.get('rooms') ?? 1
  )

  const currency =
    searchParams.get('currency') ??
    'USD'

  const roomName =
    searchParams.get('roomName') ??
    'Deluxe King Room'

  const roomDetail =
    searchParams.get('roomDetail') ??
    '1 king bed · 32 m² · City view'

  const roomPrice = Number(
    searchParams.get('roomPrice') ??
      hotel?.pricing?.base ??
      80
  )

  const guestName =
    searchParams.get('guestName') ??
    'Guest'

  const guestEmail =
    searchParams.get('guestEmail') ??
    'your email'

  const nights = Math.max(
    1,
    Math.round(
      (
        new Date(
          `${checkOut}T00:00:00`
        ) -
        new Date(
          `${checkIn}T00:00:00`
        )
      ) /
        (1000 * 60 * 60 * 24)
    )
  )

  const roomSubtotal =
    roomPrice * nights

  const taxes =
    (hotel?.pricing?.taxes ?? 0) *
    nights

  const total =
    roomSubtotal + taxes

  /*
   * Stable demo booking reference.
   * Later this would come from backend.
   */
  const bookingId =
    'TRV-240922-1842'

  const formatStayDate = (
    dateString
  ) => {
    return new Intl.DateTimeFormat(
      'en-GB',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    ).format(
      new Date(
        `${dateString}T00:00:00`
      )
    )
  }

  const copyBookingId = async () => {
    try {
      await navigator.clipboard.writeText(
        bookingId
      )
    } catch {
      // Clipboard may be unavailable
      // in some preview environments.
    }
  }

  if (!hotel) {
    return null
  }

  return (
    <main className="min-h-screen bg-background pb-8 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      {/* SUCCESS */}
      <section className="px-5 pb-7 pt-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary">
          <Check className="size-6 text-primary-foreground" />
        </div>

        <h1 className="mt-5 text-2xl font-bold">
          Your stay is confirmed
        </h1>

        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          You're all set for your trip to{' '}
          {hotel.destination}.
        </p>
      </section>

      {/* BOOKING ID */}
      <section className="px-5 pb-6">
        <div className="rounded-2xl bg-surface p-4">
          <p className="text-xs text-muted-foreground">
            Booking ID
          </p>

          <div className="mt-1 flex items-center justify-between gap-3">
            <strong className="text-base">
              {bookingId}
            </strong>

            <button
              type="button"
              onClick={copyBookingId}
              className="flex size-9 items-center justify-center rounded-xl bg-background"
              aria-label="Copy booking ID"
            >
              <Copy className="size-4 text-secondary" />
            </button>
          </div>
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* HOTEL */}
      <section className="px-5 py-7">
        <div className="flex gap-4">
          <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
            <img
              src={hotel.image}
              alt={hotel.title}
              className="size-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground">
              Confirmed stay
            </p>

            <h2 className="mt-1 text-base font-bold leading-snug">
              {hotel.title}
            </h2>

            <p className="mt-2 flex items-center gap-1.5 text-xs text-secondary">
              <MapPin className="size-3.5 shrink-0" />

              {hotel.area},{' '}
              {hotel.destination}
            </p>

            <p className="mt-2 text-xs font-medium">
              ★ {hotel.rating}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-surface p-4">
          <p className="text-sm font-semibold">
            {roomName}
          </p>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {roomDetail}
          </p>
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* STAY DETAILS */}
      <section className="px-5 py-7">
        <h2 className="text-lg font-bold">
          Your stay
        </h2>

        <div className="mt-6 space-y-5">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <CalendarDays className="size-4 text-secondary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                {formatStayDate(
                  checkIn
                )}{' '}
                –{' '}
                {formatStayDate(
                  checkOut
                )}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {nights}{' '}
                {nights === 1
                  ? 'night'
                  : 'nights'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <Users className="size-4 text-secondary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                {guests}{' '}
                {guests === 1
                  ? 'guest'
                  : 'guests'}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {roomsCount}{' '}
                {roomsCount === 1
                  ? 'room'
                  : 'rooms'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* PRICE */}
      <section className="px-5 py-7">
        <div>
          <h2 className="text-lg font-bold">
            Payment summary
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Final amount paid for this booking.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <SummaryRow
            label={`${formatPrice(
              roomPrice,
              {
                fromCurrency:
                  hotel.pricing.currency,
                currency,
              }
            )} × ${nights} ${
              nights === 1
                ? 'night'
                : 'nights'
            }`}
            value={formatPrice(
              roomSubtotal,
              {
                fromCurrency:
                  hotel.pricing.currency,
                currency,
              }
            )}
          />

          <SummaryRow
            label="Taxes & fees"
            value={formatPrice(
              taxes,
              {
                fromCurrency:
                  hotel.pricing.currency,
                currency,
              }
            )}
          />

          <div className="border-t border-border pt-4">
            <SummaryRow
              label="Total paid"
              value={formatPrice(
                total,
                {
                  fromCurrency:
                    hotel.pricing.currency,
                  currency,
                }
              )}
              strong
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3 rounded-2xl bg-surface p-4">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-secondary" />

          <div>
            <p className="text-xs font-semibold">
              Price confirmed
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Your final payment matches
              the total shown at checkout.
            </p>
          </div>
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* NEXT STEPS */}
      <section className="px-5 py-7">
        <h2 className="text-lg font-bold">
          What's next
        </h2>

        <div className="mt-5 space-y-5">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <Mail className="size-4 text-secondary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Confirmation sent
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                We've sent the booking
                details to {guestEmail}.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <ShieldCheck className="size-4 text-secondary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Free cancellation
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Your booking includes
                free cancellation within
                the selected policy.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <MapPin className="size-4 text-secondary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Hotel location
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {hotel.area},{' '}
                {hotel.destination}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* ACTIONS */}
      <section className="px-5 py-7">
        <Button
          type="button"
          size="lg"
          className="w-full rounded-full"
          onClick={() => {
            /*
             * Booking detail route
             * can be added later.
             */
          }}
        >
          View booking
          <ArrowRight className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-3 w-full rounded-full"
          onClick={() =>
            router.push('/')
          }
        >
          <Home className="size-4" />
          Back to home
        </Button>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Booking for {guestName}
        </p>
      </section>
    </main>
  )
}


function BookingConfirmationFallback() {
  return (
    <main className="min-h-screen bg-background text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      <div className="px-5 py-8">
        <p className="text-sm text-muted-foreground">
          Confirming your stay...
        </p>
      </div>
    </main>
  )
}


export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <BookingConfirmationFallback />
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  )
}