'use client'

import {
  useRef,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

import HotelCard from '@/components/HotelCard'

import {
  useCompare,
} from '@/context/CompareContext'

import {
  useFavorite,
} from '@/context/FavoriteContext'

export default function DraggableHotelRecommendation({
  hotel,
  currency = 'IDR',
  onClose,
}) {
  const router = useRouter()

const [
  position,
  setPosition,
] = useState(null)

  const dragState =
    useRef({
      dragging: false,
      moved: false,

      startX: 0,
      startY: 0,

      originX: 0,
      originY: 0,
    })

  const {
    toggleCompare,
    isCompared,
    maxCompare,
    comparedIds,
  } = useCompare()

  const {
    toggleFavoriteHotel,
    isFavoriteHotel,
  } = useFavorite()

  if (!hotel) {
    return null
  }

  const compared =
    isCompared(hotel.id)

  const favorite =
    isFavoriteHotel(
      hotel.id
    )

  const compareFull =
    comparedIds.length >=
      maxCompare &&
    !compared
const handlePointerDown = (
  event
) => {
  if (
    event.target.closest(
      'button, a'
    )
  ) {
    return
  }

  const element =
    event.currentTarget

  const rect =
    element.getBoundingClientRect()

  const parentRect =
    element.parentElement.getBoundingClientRect()

  /*
   * Convert centered position
   * into local pixel coordinates
   * when dragging starts.
   */
  const currentX =
    rect.left -
    parentRect.left

  const currentY =
    rect.top -
    parentRect.top

  setPosition({
    x: currentX,
    y: currentY,
  })

  dragState.current = {
    dragging: true,
    moved: false,

    startX:
      event.clientX,

    startY:
      event.clientY,

    originX:
      currentX,

    originY:
      currentY,
  }

  event.currentTarget.setPointerCapture(
    event.pointerId
  )
}

  const handlePointerMove = (
    event
  ) => {
    if (
      !dragState.current
        .dragging
    ) {
      return
    }

    const deltaX =
      event.clientX -
      dragState.current
        .startX

    const deltaY =
      event.clientY -
      dragState.current
        .startY

    const distance =
      Math.sqrt(
        deltaX * deltaX +
          deltaY * deltaY
      )

    /*
     * Small movement still
     * counts as a tap.
     */
    if (distance > 8) {
      dragState.current.moved =
        true
    }

    if (
      !dragState.current
        .moved
    ) {
      return
    }

    setPosition({
      x:
        dragState.current
          .originX +
        deltaX,

      y:
        dragState.current
          .originY +
        deltaY,
    })
  }

  const handlePointerUp = (
    event
  ) => {
    /*
     * Favorite / Compare / Close
     * shouldn't open hotel.
     */
    if (
      event.target.closest(
        'button, a'
      )
    ) {
      dragState.current.dragging =
        false

      return
    }

    const wasDragging =
      dragState.current.moved

    dragState.current.dragging =
      false

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      )
    } catch {}

    /*
     * Tap = open hotel
     * Drag = only move card
     */
    if (!wasDragging) {
      router.push(
        `/hotel/${hotel.id}`
      )
    }
  }

  return (
<div
  className="
    absolute
    z-40
    w-[68%]
    max-w-[260px]
    touch-none
    select-none
  "
  style={
    position
      ? {
          left: position.x,
          top: position.y,
        }
      : {
          left: '50%',
          top: '50%',
          transform:
            'translate(-50%, -50%)',
        }
  }
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={() => {
        dragState.current.dragging =
          false
      }}
    >
      {/* CLOSE */}
      <button
        type="button"
        aria-label="Close hotel recommendation"
        onPointerDown={(
          event
        ) => {
          event.stopPropagation()
        }}
        onPointerUp={(
          event
        ) => {
          event.stopPropagation()
        }}
        onClick={(
          event
        ) => {
          event.stopPropagation()

          onClose?.()
        }}
        className="
          absolute
          right-2
          top-2
          z-50
          flex
          size-7
          items-center
          justify-center
          rounded-full
          bg-black/60
          text-white
          shadow-sm
          backdrop-blur-sm
        "
      >
        <X className="size-3.5" />
      </button>

      <HotelCard
        hotel={hotel}
        variant="feed"
        currency={
          currency
        }
        compared={
          compared
        }
        onCompare={() => {
          if (
            compareFull
          ) {
            return
          }

          toggleCompare(
            hotel.id
          )
        }}
        favorite={
          favorite
        }
        onFavorite={() =>
          toggleFavoriteHotel(
            hotel.id
          )
        }
      />
    </div>
  )
}