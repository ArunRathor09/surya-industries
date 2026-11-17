export default function ProductLoading() {
  return (
    <div aria-busy="true" className="animate-pulse" role="status">
      <span className="sr-only">Loading product details</span>
      <section className="bg-gradient-to-br from-white via-brand-cream to-[#f4f0ff] px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="order-2 space-y-5 lg:order-1">
              <div className="h-7 w-28 rounded-full bg-slate-200" />
              <div className="h-12 max-w-xl rounded-xl bg-slate-200" />
              <div className="h-4 max-w-2xl rounded bg-slate-200" />
              <div className="h-4 max-w-xl rounded bg-slate-200" />
              <div className="h-12 w-44 rounded-full bg-slate-200" />
            </div>
            <div className="order-1 aspect-[1.25] rounded-3xl bg-slate-200 lg:order-2" />
          </div>
        </div>
      </section>
      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="h-64 rounded-2xl bg-slate-100" />
          <div className="h-64 rounded-2xl bg-slate-100" />
        </div>
      </section>
    </div>
  );
}
