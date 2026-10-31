function FlightSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-surface p-5 ring-1 ring-separator">
      <div className="flex justify-between">
        <div className="h-3 w-24 rounded-full bg-separator" />
        <div className="h-3 w-14 rounded-full bg-separator" />
      </div>
      <div className="mt-4 h-7 w-full rounded-lg bg-separator" />
      <div className="mt-4 flex justify-between">
        <div className="h-3 w-20 rounded-full bg-separator" />
        <div className="h-4 w-12 rounded-full bg-separator" />
      </div>
    </div>
  )
}

export default FlightSkeleton