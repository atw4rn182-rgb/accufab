import Image from "next/image";

export function ShopFeature() {
  return (
    <section
      aria-labelledby="shop-heading"
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="container-narrow mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <figure className="relative mx-auto w-full max-w-sm overflow-hidden rounded-sm border border-brand-blue-light/15 bg-charcoal-950/40 shadow-2xl shadow-black/30 sm:max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[575/1024] w-full">
              <Image
                src="/images/shop-floor.png"
                alt="Accu-Fab fabrication shop in Milan, New Mexico with machining equipment, forklifts, and an American flag"
                fill
                sizes="(max-width: 1024px) min(100vw, 28rem), 50vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/55 via-charcoal-950/5 to-charcoal-950/15"
                aria-hidden
              />
            </div>
          </figure>

          <div className="text-center lg:text-left">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue-light">
              Our Shop
            </p>
            <h2
              id="shop-heading"
              className="mt-3 text-3xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:text-4xl"
            >
              Built for heavy work in Milan, New Mexico
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-steel-200 sm:text-lg lg:mx-0">
              From large-format machining and welding to hydraulic repair and custom fabrication,
              our shop is equipped for tough jobs — with the same hands-on care on every project we
              take on across the Four Corners and Texas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
