export default function AgendaResumeLoading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4 w-full px-3 py-2 pb-2">
          <div className="flex flex-col gap-0.5">
            <div className="h-6 w-32 bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-neutral-200 rounded animate-pulse" />
          </div>
          <div>
            <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-neutral-200 rounded animate-pulse mt-1" />
          </div>
        </div>
        <section className="px-2 w-full flex gap-2 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-1 bg-white p-2 rounded-xl min-w-[200px]"
            >
              <div className="h-16 bg-neutral-200 rounded animate-pulse" />
              <div className="flex justify-between items-center text-xs px-1 text-neutral-400 gap-6 uppercase">
                <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
