'use client'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import SearchForm from '@/components/search/SearchForm'

export default function EditSearchSheet({
  open,
  value,
  onChange,
  onApply,
  onClose,
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close edit search"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-[1px]"
      />

      {/* SHEET */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          mx-auto
          max-h-[88vh]
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
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-5 py-4">
          <div>
            <h2 className="text-lg font-bold">
              Edit search
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Update your stay details.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close edit search"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* CONTENT */}
        <div className="px-5 py-5">
          <SearchForm
            value={value}
            onChange={onChange}
            onSubmit={onApply}
            submitLabel="Update search"
          />
        </div>
      </div>
    </div>
  )
}