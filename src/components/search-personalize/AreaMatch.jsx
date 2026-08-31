import { MapPin } from 'lucide-react'

export default function AreaMatch({
  area,
  city,
  description,
  tags = [],
}) {
  return (
    <section className="mx-5 mt-4 mb-4 rounded-2xl border border-secondary/20 bg-secondary-muted p-4">

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
        Your area match
      </p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {area}
          </h2>

          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-secondary">
            <MapPin className="size-3.5" />
            {city}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          Best match
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="
              rounded-full
              bg-background
              px-3
              py-1.5
              text-xs
              font-medium
            "
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}