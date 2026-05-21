import Image from "next/image";
import { CAPABILITIES_PHOTOS, CAPABILITIES_VIDEOS } from "@/lib/capabilities-media";

export function CapabilitiesGallery() {
  return (
    <div className="mt-14 space-y-16 sm:space-y-20">
      <section aria-labelledby="capabilities-photos-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="capabilities-photos-heading"
            className="text-2xl font-black tracking-tight text-steel-100 sm:text-3xl"
          >
            Shop &amp; Field Metal Fabrication Capability
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-steel-200 sm:text-lg">
            Our mobile field service fleet supports on-site work across the Four Corners and Texas when
            downtime and logistics demand repair at your location.
          </p>
        </div>

        <ul className="mt-10 mx-auto max-w-4xl grid grid-cols-1 gap-8" role="list">
          {CAPABILITIES_PHOTOS.map((photo) => (
            <li key={photo.src}>
              <article className="overflow-hidden rounded-sm border border-brand-blue-light/15 bg-charcoal-950/40 shadow-xl shadow-black/25">
                <figure className="relative aspect-video w-full overflow-hidden bg-charcoal-900">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent"
                    aria-hidden
                  />
                </figure>
                <div className="border-t border-brand-blue-light/10 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-lg font-black text-steel-100">{photo.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-steel-300 sm:text-base">
                    {photo.caption}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="capabilities-videos-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="capabilities-videos-heading"
            className="text-2xl font-black tracking-tight text-steel-100 sm:text-3xl"
          >
            See our work
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-steel-200 sm:text-lg">
            Real footage from the shop and field — welding, machining, hydraulic repair, and custom
            fabrication.
          </p>
        </div>

        <ul
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
          role="list"
        >
          {CAPABILITIES_VIDEOS.map((video) => (
            <li key={video.src}>
              <article className="overflow-hidden rounded-sm border border-brand-blue-light/15 bg-charcoal-950/40 shadow-xl shadow-black/25">
                <div className="relative aspect-video w-full bg-black">
                  <video
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  >
                    <track kind="captions" />
                    Your browser does not support embedded video.
                  </video>
                </div>
                <div className="border-t border-brand-blue-light/10 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-lg font-black text-steel-100">{video.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-steel-300 sm:text-base">
                    {video.caption}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
