'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  Compass,
} from 'lucide-react'

export default function LoadingScreen({
  title = 'Getting things ready',
  titles = [],
  message = '',
  messages = [],
  interval = 700,
}) {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  /*
   * If rotating titles exist,
   * they control the sequence.
   *
   * Otherwise rotating messages
   * control the sequence.
   */
  const itemCount =
    titles.length > 0
      ? titles.length
      : messages.length

  useEffect(() => {
    if (itemCount <= 1) {
      return
    }

    const timer =
      window.setInterval(
        () => {
          setActiveIndex(
            (current) =>
              (current + 1) %
              itemCount
          )
        },
        interval
      )

    return () => {
      window.clearInterval(
        timer
      )
    }
  }, [
    itemCount,
    interval,
  ])

  /*
   * Reset sequence whenever
   * loading content changes.
   */
  useEffect(() => {
    setActiveIndex(0)
  }, [
    title,
    titles.length,
    message,
    messages.length,
  ])

  const currentTitle =
    titles.length > 0
      ? titles[
          activeIndex
        ] ?? title
      : title

  const currentMessage =
    messages.length > 0
      ? messages[
          activeIndex
        ] ?? message
      : message

  return (
    <main
      className="
        flex
        h-[100dvh]
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-background
        px-5
        text-center
        text-foreground

        md:mx-auto
        md:max-w-md
        md:border-x
        md:border-border
      "
    >
      {/* LOADING MARK */}
      <div
        className="
          flex
          size-20
          items-center
          justify-center
          rounded-full
          bg-primary
          text-secondary-foreground
        "
      >
        <Compass
          className="
            size-10
            animate-[spin_1.8s_linear_infinite]
          "
        />
      </div>

      {/* BRAND */}
      <p
        className="
          mt-4
          text-xs
          font-bold
          tracking-[0.18em]
          text-primary
        "
      >
        TRAVELXXX
      </p>

      {/* TITLE */}
      <h1
        className="
          mt-2
          max-w-sm
          text-2xl
          font-bold
          leading-tight
          tracking-tight
        "
      >
        {currentTitle}
      </h1>

      {/* STATUS */}
      {currentMessage && (
        <p
          className="
            mt-0
            min-h-5
            max-w-xs
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          {currentMessage}
        </p>
      )}
    </main>
  )
}