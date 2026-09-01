'use client'

import {
  Suspense,
  useMemo,
  useState,
} from 'react'

import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react'

import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { hotels } from '@/data/hotels'
import { formatPrice } from '@/lib/formatPrice'
import { getDefaultStayDates } from '@/lib/defaultStayDates'

import { Button } from '@/components/ui/button'
import Facilities from '@/components/hotel/Facilities'


function SectionTitle({
  title,
  description,
}) {
  return (
    <div>
      <h2 className="text-lg font-bold">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}


function InfoRow({
  label,
  value,
  action,
  onAction,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold">
          {label}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {value}
        </p>
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-sm font-semibold text-secondary"
        >
          {action}
        </button>
      )}
    </div>
  )
}


function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const defaultDates =
    getDefaultStayDates()

  /*
   * Checkout context.
   *
   * Later Hotel Preview will send these
   * through the booking flow.
   */
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

  const [guestDetails, setGuestDetails] =
    useState({
      fullName: '',
      email: '',
      phone: '',
    })

  const [paymentMethod] =
    useState({
      brand: 'Visa',
      lastFour: '4242',
    })

  const nights = useMemo(() => {
    const start = new Date(
      `${checkIn}T00:00:00`
    )

    const end = new Date(
      `${checkOut}T00:00:00`
    )

    return Math.max(
      1,
      Math.round(
        (end - start) /
          (1000 * 60 * 60 * 24)
      )
    )
  }, [checkIn, checkOut])

  const roomSubtotal =
    roomPrice * nights

  /*
   * Same prototype pricing logic
   * as Hotel Preview.
   */
  const taxes =
    (hotel?.pricing?.taxes ?? 0) *
    nights

  const total =
    roomSubtotal + taxes

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

  const updateGuest = (
    field,
    value
  ) => {
    setGuestDetails((current) => ({
      ...current,
      [field]: value,
    }))
  }

const confirmBooking = () => {
  const query =
    new URLSearchParams({
      hotel: hotel.id,
      roomName,
      roomDetail,
      roomPrice: String(roomPrice),
      checkIn,
      checkOut,
      guests: String(guests),
      rooms: String(roomsCount),
      currency,
      guestName:
        guestDetails.fullName,
      guestEmail:
        guestDetails.email,
    })

  router.push(
    `/booking-confirmation?${query.toString()}`
  )
}

  if (!hotel) {
    return null
  }

  return (
    <main className="min-h-screen bg-background pb-32 text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="relative flex min-h-16 items-center px-4">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Back"
            onClick={() =>
              router.back()
            }
            className="absolute left-4"
          >
            <ArrowLeft className="size-5" />
          </Button>

          <h1 className="w-full text-center text-base font-bold">
            Checkout
          </h1>
        </div>
      </header>

      {/* HOTEL + ROOM SUMMARY */}
      <section className="px-5 py-6">
        <article className="overflow-hidden rounded-2xl border border-border bg-background">
          <div className="flex gap-4 p-4">
            <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
              <img
                src={hotel.image}
                alt={hotel.title}
                className="size-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">
                {hotel.area},{' '}
                {hotel.destination}
              </p>

              <h2 className="mt-1 line-clamp-2 text-base font-bold leading-snug">
                {hotel.title}
              </h2>

              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className="font-semibold">
                  ★ {hotel.rating}
                </span>

                <span className="text-muted-foreground">
                  · Selected stay
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-surface px-4 py-4">
            <p className="text-sm font-semibold">
              {roomName}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {roomDetail}
            </p>
          </div>
        </article>
      </section>

      <div className="h-2 bg-surface" />

      {/* YOUR TRIP */}
      <section className="px-5 py-7">
        <SectionTitle
          title="Your trip"
          description="Review your stay details before confirming."
        />

        <div className="mt-6 space-y-6">
          <InfoRow
            label="Dates"
            value={`${formatStayDate(
              checkIn
            )} – ${formatStayDate(
              checkOut
            )}`}
            action="Edit"
            onAction={() =>
              router.back()
            }
          />

          <InfoRow
            label="Guests"
            value={`${guests} ${
              guests === 1
                ? 'guest'
                : 'guests'
            } · ${roomsCount} ${
              roomsCount === 1
                ? 'room'
                : 'rooms'
            }`}
            action="Edit"
            onAction={() =>
              router.back()
            }
          />
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* GUEST DETAILS */}
      <section className="px-5 py-7">
        <SectionTitle
          title="Guest details"
          description="We'll send your booking confirmation to these contact details."
        />

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium">
              Full name
            </span>

            <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border px-3">
              <User className="size-4 shrink-0 text-muted-foreground" />

              <input
                type="text"
                value={
                  guestDetails.fullName
                }
                onChange={(event) =>
                  updateGuest(
                    'fullName',
                    event.target.value
                  )
                }
                placeholder="Your full name"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium">
              Email
            </span>

            <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border px-3">
              <Mail className="size-4 shrink-0 text-muted-foreground" />

              <input
                type="email"
                value={
                  guestDetails.email
                }
                onChange={(event) =>
                  updateGuest(
                    'email',
                    event.target.value
                  )
                }
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium">
              Phone number
            </span>

            <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border px-3">
              <Phone className="size-4 shrink-0 text-muted-foreground" />

              <span className="border-r border-border pr-3 text-sm text-muted-foreground">
                +62
              </span>

              <input
                type="tel"
                value={
                  guestDetails.phone
                }
                onChange={(event) =>
                  updateGuest(
                    'phone',
                    event.target.value
                  )
                }
                placeholder="812 3456 7890"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </label>
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* STAY HIGHLIGHTS */}
      <section className="px-5 py-7">
        <SectionTitle
          title="Stay highlights"
          description="Included with your selected stay."
        />

        <div className="mt-5">
          <Facilities
            amenities={
              hotel.amenities
            }
            variant="compact"
            initialLimit={3}
          />
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* CANCELLATION */}
      <section className="px-5 py-7">
        <SectionTitle title="Booking conditions" />

        <div className="mt-5 space-y-5">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <ShieldCheck className="size-4 text-secondary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Free cancellation
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Cancel before your
                cancellation deadline for
                a full refund.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <Check className="size-4 text-secondary" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Pay now
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Your selected payment
                method will be charged
                after you confirm the
                booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-surface" />

      {/* PAYMENT */}
      <section className="px-5 py-7">
        <SectionTitle title="Payment method" />

        <button
          type="button"
          className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-border p-4 text-left"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <CreditCard className="size-5 text-secondary" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              {
                paymentMethod.brand
              }{' '}
              ending in{' '}
              {
                paymentMethod.lastFour
              }
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Default payment method
            </p>
          </div>

          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </section>

      <div className="h-2 bg-surface" />

      {/* PRICE DETAILS */}
      <section className="px-5 py-7">
        <SectionTitle
          title="Price details"
          description="The same total shown before checkout."
        />

        <div className="mt-6 space-y-4">
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-muted-foreground">
              {formatPrice(
                roomPrice,
                {
                  fromCurrency:
                    hotel.pricing
                      .currency,
                  currency,
                }
              )}{' '}
              × {nights}{' '}
              {nights === 1
                ? 'night'
                : 'nights'}
            </span>

            <span className="font-medium">
              {formatPrice(
                roomSubtotal,
                {
                  fromCurrency:
                    hotel.pricing
                      .currency,
                  currency,
                }
              )}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-muted-foreground">
              Taxes & fees
            </span>

            <span className="font-medium">
              {formatPrice(
                taxes,
                {
                  fromCurrency:
                    hotel.pricing
                      .currency,
                  currency,
                }
              )}
            </span>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-bold">
                  Total
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Including taxes and
                  fees
                </p>
              </div>

              <strong className="text-xl">
                {formatPrice(
                  total,
                  {
                    fromCurrency:
                      hotel.pricing
                        .currency,
                    currency,
                  }
                )}
              </strong>
            </div>
          </div>
        </div>

        {/* PRICE TRANSPARENCY */}
        <div className="mt-5 flex gap-3 rounded-2xl bg-surface p-4">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-secondary" />

          <div>
            <p className="text-xs font-semibold">
              No surprise fees
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              This total matches the
              price shown before
              checkout.
            </p>
          </div>
        </div>
      </section>

      {/* STICKY CHECKOUT BAR */}
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
        <div className="px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <CreditCard className="size-4 shrink-0 text-secondary" />

              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground">
                  {
                    paymentMethod.brand
                  }{' '}
                  ••••{' '}
                  {
                    paymentMethod.lastFour
                  }
                </p>

                <strong className="block text-lg leading-tight">
                  {formatPrice(
                    total,
                    {
                      fromCurrency:
                        hotel.pricing
                          .currency,
                      currency,
                    }
                  )}
                </strong>
              </div>
            </div>

            <span className="text-[11px] text-muted-foreground">
              Total
            </span>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={
              confirmBooking
            }
            className="w-full rounded-full"
          >
            Confirm booking
          </Button>
        </div>
      </div>
    </main>
  )
}


function CheckoutFallback() {
  return (
    <main className="min-h-screen bg-background text-foreground md:mx-auto md:max-w-md md:border-x md:border-border">
      <div className="px-5 py-8">
        <p className="text-sm text-muted-foreground">
          Preparing checkout...
        </p>
      </div>
    </main>
  )
}


export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <CheckoutFallback />
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}