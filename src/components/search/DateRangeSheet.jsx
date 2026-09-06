'use client'

import {
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


function formatMonthLabel(
  date
) {
  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: 'long',
      year: 'numeric',
    }
  ).format(
    date
  )
}


function buildMonths(
  startMonth,
  count = 60
) {
  return Array.from(
    { length: count },
    (_, index) =>
      new Date(
        startMonth.getFullYear(),
        startMonth.getMonth() + index,
        1
      )
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

  const currentMonth =
    useMemo(
      () =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        ),
      [today]
    )

  const months =
    useMemo(
      () =>
        buildMonths(
          currentMonth,
          60
        ),
      [currentMonth]
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

    if (
      isSameDay(
        date,
        draftCheckIn
      )
    ) {
      return
    }

    setDraftCheckOut(
      date
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

  // Must match BottomNav's real visual height:
  // pt-3 (12px) + icon (16px) + gap-1 (4px) + label line (~16px)
  // + bottom padding (12px + safe area) = ~60px + safe area.
  const bottomNavOffset =
    'calc(3.75rem + env(safe-area-inset-bottom))'

  return (
    <div
      className="fixed inset-x-0 top-0 z-[80]"
      style={{
        bottom: bottomNavOffset,
      }}
    >
      {/* BACKDROP — stops above bottom navigation */}
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
          flex
          max-w-md
          flex-col
          overflow-hidden
          rounded-t-3xl
          border-x
          border-t
          border-border
          bg-background
          shadow-2xl
        "
        style={{
          height:
            `calc(100dvh - ${bottomNavOffset})`,
          maxHeight:
            `calc(100dvh - ${bottomNavOffset})`,
        }}
      >
        {/* HANDLE */}
        <div className="shrink-0 flex justify-center pt-2.5">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>


        {/* HEADER */}
        <div
          className="
            shrink-0
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
        <div className="shrink-0 grid grid-cols-2 gap-3 px-5 py-4">
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


        {/* SCROLLABLE MONTH LIST — clipped between dates and Apply */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full min-h-0 overflow-y-auto overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: 'touch' }}>
          {months.map(
            monthDate => {
              const days =
                getMonthDays(
                  monthDate
                )

              return (
                <section
                  key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}
                  className="pb-6"
                >
                  {/* MONTH TITLE */}
                  <div
                    className="
                      sticky
                      top-0
                      z-30
                      isolate
                      overflow-hidden
                      bg-background
                      px-5
                      pb-3
                      pt-2
                      before:absolute
                      before:inset-0
                      before:-z-10
                      before:bg-background
                      before:content-['']
                    "
                  >
                    <strong className="relative z-10 text-sm">
                      {formatMonthLabel(
                        monthDate
                      )}
                    </strong>
                  </div>


                  {/* WEEK DAYS */}
                  <div
                    className="
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


                  {/* MONTH CALENDAR */}
                  <div
                    className="
                      mt-2
                      grid
                      grid-cols-7
                      px-5
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


                            {/* DATE CIRCLE */}
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
                </section>
              )
            }
          )}
          </div>
        </div>


        {/* APPLY — always visible and directly attached to bottom nav */}
        <div
          className="
            shrink-0
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
