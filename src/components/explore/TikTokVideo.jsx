'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Play,
} from 'lucide-react'

export default function TikTokVideo({
  videoId,
  poster,
  title,
  active = false,
  muted = true,
}) {
  const iframeRef =
    useRef(null)

  const [
    playerReady,
    setPlayerReady,
  ] = useState(false)

  const sendMessage = (
    type,
    value
  ) => {
    const player =
      iframeRef.current

    if (
      !player?.contentWindow
    ) {
      return
    }

    player.contentWindow.postMessage(
      {
        type,
        value,
        'x-tiktok-player':
          true,
      },
      '*'
    )
  }

  useEffect(() => {
    const handleMessage = (
      event
    ) => {
      const data =
        event.data

      if (
        !data ||
        data[
          'x-tiktok-player'
        ] !== true
      ) {
        return
      }

      if (
        data.type ===
        'onPlayerReady'
      ) {
        setPlayerReady(
          true
        )
      }
    }

    window.addEventListener(
      'message',
      handleMessage
    )

    return () => {
      window.removeEventListener(
        'message',
        handleMessage
      )
    }
  }, [])

  useEffect(() => {
    if (!playerReady) {
      return
    }

    if (active) {
      sendMessage(
        'play'
      )

      if (muted) {
        sendMessage(
          'mute'
        )
      } else {
        sendMessage(
          'unMute'
        )
      }
    } else {
      sendMessage(
        'pause'
      )
    }
  }, [
    active,
    muted,
    playerReady,
  ])

  const playerUrl =
    `https://www.tiktok.com/player/v1/${videoId}` +
    `?autoplay=1` +
    `&loop=1` +
    `&controls=0` +
    `&progress_bar=0` +
    `&play_button=0` +
    `&volume_control=0` +
    `&fullscreen_button=0` +
    `&music_info=0` +
    `&description=0`

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-black
      "
    >
      {active ? (
        <div
          className="
            absolute
            inset-0
            overflow-hidden
            bg-black
          "
        >
          <iframe
            ref={
              iframeRef
            }
            key={
              videoId
            }
            src={
              playerUrl
            }
            title={
              title ??
              'TikTok travel video'
            }
            allow="
              autoplay;
              fullscreen
            "
            loading="eager"
            className="
              absolute
              left-1/2
              top-1/2

              h-[100dvh]
              w-[56.25dvh]

              min-h-full
              min-w-full

              -translate-x-1/2
              -translate-y-1/2

              border-0
            "
          />
        </div>
      ) : (
        <>
          <img
            src={
              poster
            }
            alt=""
            className="
              absolute
              inset-0
              size-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/10
            "
          >
            <span
              className="
                flex
                size-12
                items-center
                justify-center
                rounded-full
                bg-black/40
                text-white
                backdrop-blur-sm
              "
            >
              <Play
                className="
                  ml-0.5
                  size-5
                  fill-current
                "
              />
            </span>
          </div>
        </>
      )}
    </div>
  )
}