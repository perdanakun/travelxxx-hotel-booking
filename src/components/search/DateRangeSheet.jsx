'use client'

import {
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  Button,
} from '@/components/ui/button'


function toDateString(
  date
) {
  const year =
    date.getFullYear()

  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      '0'
    )

  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      '0'
    )

  return `${year}-${month}-${day}`
}


function fromDateString(
  value
) {
  if (!value) {
    return null
  }

  return new Date(
    `${value}T00:00:00`
  )
}


function isSameDay(
  first,
  second
) {
  if (
    !first ||
    !second
  ) {
    return false
  }

  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  )
}


function isBeforeDay(
  first,
  second
) {
  return (
    first.getTime() <
    second.getTime()
  )
}


function isBetween(
  date,
  start,
  end
) {
  if (
    !start ||
    !end
  ) {
    return false
  }

  const time =
    date.getTime()

  return (
    time >
      start.getTime() &&
    time <
      end.getTime()
  )
}


function getMonthDays(
  monthDate
) {
  const year =
    monthDate.getFullYear()

  const month =
    monthDate.getMonth()

  const firstDay =
    new Date(
      year,
      month,
      1
    )

  const lastDay =
    new Date(
      year,
      month + 1,
      0
    )

  const leadingEmpty =
    firstDay.getDay()

  const days = []

  for (
    let index = 0;
    index < leadingEmpty;
    index += 1
  ) {
    days.push(null)
  }

  for (
    let day = 1;
    day <=
    lastDay.getDate();
    day += 1
  ) {
    days.push(
      new Date(
        year,
        month,
        day
      )
    )
  }

  return days
}


function formatShortDate(
  date
) {
  if (!date) {
    return 'Select'
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      day: 'numeric',
      month: 'short',
    }
  ).format(
    date
  )
}


export default function DateRangeSheet({
  open,
  checkIn,
  checkOut,
  onApply,
  onClose,
}) {
  const today =
    useMemo(
      () => {
        const now =
          new Date()

        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        )
      },
      []
    )


  const initialMonth =
    fromDateString(
      checkIn
    ) ?? today


  const [
    visibleMonth,
    setVisibleMonth,
  ] = useState(
    new Date(
      initialMonth.getFullYear(),
      initialMonth.getMonth(),
      1
    )
  )


  const [
    draftCheckIn,
    setDraftCheckIn,
  ] = useState(
    fromDateString(
      checkIn
    )
  )


  const [
    draftCheckOut,
    setDraftCheckOut,
  ] = useState(
    fromDateString(
      checkOut
    )
  )


  if (!open) {
    return null
  }


  const days =
    getMonthDays(
      visibleMonth
    )


  const monthLabel =
    new Intl.DateTimeFormat(
      'en-US',
      {
        month: 'long',
        year: 'numeric',
      }
    ).format(
      visibleMonth
    )


  const chooseDate = (
    date
  ) => {
    if (
      isBeforeDay(
        date,
        today
      )
    ) {
      return
    }


    /*
     * Start a new range.
     *
     * This happens when:
     * - no check-in exists
     * - a complete range already exists
     * - user selects a date before check-in
     */
    if (
      !draftCheckIn ||
      draftCheckOut ||
      isBeforeDay(
        date,
        draftCheckIn
      )
    ) {
      setDraftCheckIn(
        date
      )

      setDraftCheckOut(
        null
      )

      return
    }


    /*
     * Don't allow same-day checkout.
     */
    if (
      isSameDay(
        date,
        draftCheckIn
      )
    ) {
      return
    }


    /*
     * Second valid selection
     * becomes checkout.
     */
    setDraftCheckOut(
      date
    )
  }


  const goPreviousMonth =
    () => {
      const previous =
        new Date(
          visibleMonth.getFullYear(),
          visibleMonth.getMonth() -
            1,
          1
        )

      const currentMonth =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        )

      if (
        previous <
        currentMonth
      ) {
        return
      }

      setVisibleMonth(
        previous
      )
    }


  const goNextMonth =
    () => {
      setVisibleMonth(
        new Date(
          visibleMonth.getFullYear(),
          visibleMonth.getMonth() +
            1,
          1
        )
      )
    }


  const applyDates =
    () => {
      if (
        !draftCheckIn ||
        !draftCheckOut
      ) {
        return
      }

      onApply({
        checkIn:
          toDateString(
            draftCheckIn
          ),

        checkOut:
          toDateString(
            draftCheckOut
          ),
      })
    }


  return (
    <div className="fixed inset-0 z-[80]">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close calendar"
        onClick={
          onClose
        }
        className="
          absolute
          inset-0
          bg-foreground/30
          backdrop-blur-[1px]
        "
      />


      {/* SHEET */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          mx-auto
          max-h-[90vh]
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
        <div
          className="
            sticky
            top-0
            z-20
            flex
            items-center
            justify-between
            border-b
            border-border
            bg-background
            px-5
            py-4
          "
        >
          <div>
            <h2 className="text-lg font-bold">
              Choose your dates
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Select check-in and check-out.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close calendar"
            onClick={
              onClose
            }
          >
            <X className="size-4" />
          </Button>
        </div>


        {/* SELECTED DATES */}
        <div className="grid grid-cols-2 gap-3 px-5 pt-5">
          <div
            className={`
              rounded-xl
              border
              p-3
              transition

              ${
                draftCheckIn &&
                !draftCheckOut
                  ? 'border-primary'
                  : 'border-border'
              }
            `}
          >
            <span className="text-[11px] text-muted-foreground">
              Check-in
            </span>

            <strong className="mt-1 block text-sm">
              {formatShortDate(
                draftCheckIn
              )}
            </strong>
          </div>


          <div
            className={`
              rounded-xl
              border
              p-3
              transition

              ${
                draftCheckIn &&
                !draftCheckOut
                  ? 'border-primary'
                  : 'border-border'
              }
            `}
          >
            <span className="text-[11px] text-muted-foreground">
              Check-out
            </span>

            <strong className="mt-1 block text-sm">
              {formatShortDate(
                draftCheckOut
              )}
            </strong>
          </div>
        </div>


        {/* MONTH NAVIGATION */}
        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            px-5
          "
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Previous month"
            onClick={
              goPreviousMonth
            }
          >
            <ChevronLeft className="size-4" />
          </Button>

          <strong className="text-sm">
            {monthLabel}
          </strong>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Next month"
            onClick={
              goNextMonth
            }
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>


        {/* WEEK DAYS */}
        <div
          className="
            mt-4
            grid
            grid-cols-7
            px-5
            text-center
            text-[11px]
            font-medium
            text-muted-foreground
          "
        >
          {[
            'S',
            'M',
            'T',
            'W',
            'T',
            'F',
            'S',
          ].map(
            (
              day,
              index
            ) => (
              <span
                key={`${day}-${index}`}
              >
                {day}
              </span>
            )
          )}
        </div>


        {/* CALENDAR */}
        <div
          className="
            mt-2
            grid
            grid-cols-7
            px-5
            pb-5
          "
        >
          {days.map(
            (
              date,
              index
            ) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="aspect-square"
                  />
                )
              }


              const disabled =
                isBeforeDay(
                  date,
                  today
                )


              const isStart =
                isSameDay(
                  date,
                  draftCheckIn
                )


              const isEnd =
                isSameDay(
                  date,
                  draftCheckOut
                )


              const inRange =
                isBetween(
                  date,
                  draftCheckIn,
                  draftCheckOut
                )


              return (
                <button
                  key={
                    date.toISOString()
                  }
                  type="button"
                  disabled={
                    disabled
                  }
                  onClick={() =>
                    chooseDate(
                      date
                    )
                  }
                  aria-label={
                    date.toLocaleDateString(
                      'en-US',
                      {
                        weekday:
                          'long',
                        month:
                          'long',
                        day:
                          'numeric',
                      }
                    )
                  }
                  aria-pressed={
                    isStart ||
                    isEnd
                  }
                  className={`
                    relative
                    flex
                    aspect-square
                    items-center
                    justify-center
                    text-sm
                    outline-none

                    ${
                      disabled
                        ? 'cursor-not-allowed text-muted-foreground/35'
                        : ''
                    }
                  `}
                >
                  {/* --------------------------------
                      RANGE BACKGROUND

                      These three layers create one
                      continuous horizontal range.
                  --------------------------------- */}


                  {/* MIDDLE OF RANGE */}
                  {inRange && (
                    <span
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        inset-y-1.5
                        bg-primary/10
                      "
                    />
                  )}


                  {/* CHECK-IN → RANGE */}
                  {isStart &&
                    draftCheckOut && (
                      <span
                        className="
                          pointer-events-none
                          absolute
                          bottom-1.5
                          left-1/2
                          right-0
                          top-1.5
                          bg-primary/10
                        "
                      />
                    )}


                  {/* RANGE → CHECK-OUT */}
                  {isEnd &&
                    draftCheckIn && (
                      <span
                        className="
                          pointer-events-none
                          absolute
                          bottom-1.5
                          left-0
                          right-1/2
                          top-1.5
                          bg-primary/10
                        "
                      />
                    )}


                  {/* --------------------------------
                      DATE CIRCLE
                  --------------------------------- */}
                  <span
                    className={`
                      relative
                      z-10
                      flex
                      size-9
                      items-center
                      justify-center
                      rounded-full
                      transition

                      ${
                        isStart ||
                        isEnd
                          ? 'bg-primary font-bold text-primary-foreground'
                          : ''
                      }

                      ${
                        !disabled &&
                        !isStart &&
                        !isEnd
                          ? 'hover:bg-surface'
                          : ''
                      }
                    `}
                  >
                    {
                      date.getDate()
                    }
                  </span>
                </button>
              )
            }
          )}
        </div>


        {/* APPLY */}
        <div
          className="
            sticky
            bottom-0
            border-t
            border-border
            bg-background
            px-5
            py-4
          "
        >
          <Button
            type="button"
            size="lg"
            disabled={
              !draftCheckIn ||
              !draftCheckOut
            }
            onClick={
              applyDates
            }
            className="
              w-full
              rounded-full
              text-sm
              font-bold
            "
          >
            Apply dates
          </Button>
        </div>
      </div>
    </div>
  )
}