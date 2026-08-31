import { ArrowRight } from 'lucide-react'

export default function FeaturedTripCard({
  trip,
}) {
  return (
    <article
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-border
        bg-background
        p-2
        shadow-sm
        transition-transform
        active:scale-[0.99]
      "
    >
      <img
        src={trip.image}
        alt={trip.title}
        className="size-16 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold">
          {trip.title}
        </h3>

        <p className="truncate text-xs text-muted-foreground">
          {trip.location}
        </p>
      </div>

      <ArrowRight className="mr-2 size-4 shrink-0 text-secondary" />
    </article>
  )
}