export default function ActivityTabsLoading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 border-b border-neutral-200 pb-2">
          <div className="h-12 w-32 bg-neutral-200 rounded animate-pulse" />
          <div className="h-12 w-32 bg-neutral-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 bg-white rounded-xl"
            >
              <div className="w-8 h-8 bg-neutral-200 rounded-full animate-pulse" />
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
                <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
