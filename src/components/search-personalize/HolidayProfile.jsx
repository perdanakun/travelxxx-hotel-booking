export default function HolidayProfile({
  tags = [],
}) {
  return (
<section className="px-5 pb-4 pt-0">
  <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {tags.map((tag) => (
      <span
        key={tag}
        className="
          shrink-0
          rounded-full
          border
          border-secondary/20
          bg-secondary-muted
          px-3
          py-1.5
          text-xs
          font-medium
          text-secondary
        "
      >
        {tag}
      </span>
    ))}
  </div>
</section>

  )
}