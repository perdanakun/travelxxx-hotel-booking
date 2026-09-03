'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { Play } from 'lucide-react'

export default function TikTokVideo({
  videoId,
  poster,
  title,
  active = false,
  muted = true,
}) {
  const iframeRef = useRef(null)

  const [playerReady, setPlayerReady] =
    useState(false)

  const sendMessage = (type, value) => {
    const player = iframeRef.current

    if (!player?.contentWindow) return

    player.contentWindow.postMessage(
      {
        type,
        value,
        'x-tiktok-player': true,
      },
      '*'
    )
  }

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data

      if (
        !data ||
        data['x-tiktok-player'] !== true
      ) {
        return
      }

      if (data.type === 'onPlayerReady') {
        setPlayerReady(true)
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
    if (!playerReady) return

    if (active) {
      sendMessage('play')

      if (muted) {
        sendMessage('mute')
      } else {
        sendMessage('unMute')
      }
    } else {
      sendMessage('pause')
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
  <div className="absolute inset-0 overflow-hidden bg-black">
    {active ? (
      <div
        className="
          absolute
          left-0
          top-0
          w-full
          aspect-[9/16]
          overflow-hidden
          bg-black
        "
      >
        <iframe
          ref={iframeRef}
          key={videoId}
          src={playerUrl}
          title={title}
          allow="autoplay; fullscreen"
          loading="eager"
          className="
            absolute
            inset-0
            h-full
            w-full
            border-0
          "
        />
      </div>
    ) : (
      <>
        <img
          src={poster}
          alt=""
          className="
            absolute
            left-0
            top-0
            w-full
            aspect-[9/16]
            object-cover
          "
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <span className="flex size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
            <Play
              className="ml-0.5 size-5"
              fill="currentColor"
            />
          </span>
        </div>
      </>
    )}
  </div>
)
}