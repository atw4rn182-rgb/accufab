import Image from "next/image";
import { PROJECTS_PHOTOS, PROJECTS_VIDEOS } from "@/lib/projects-media";

export function ProjectsGallery() {
  return (
    <div className="mt-14 space-y-16 sm:space-y-20">
      <section aria-labelledby="projects-photos-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="projects-photos-heading"
            className="text-2xl font-black tracking-tight text-steel-100 sm:text-3xl"
          >
            Project gallery
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-steel-200 sm:text-lg">
            Selected work from the shop — large machining, precision components, and heavy fabrication built with the same care on every job.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3" role="list">
          {PROJECTS_PHOTOS.map((photo) => (
            <li key={photo.src}>
              <article className="flex h-full flex-col overflow-hidden rounded-sm border border-brand-blue-light/15 bg-charcoal-950/40 shadow-xl shadow-black/25">
                <figure className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal-900 sm:aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent"
                    aria-hidden
                  />
                </figure>
                <div className="flex flex-1 flex-col border-t border-brand-blue-light/10 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-lg font-black text-steel-100">{photo.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-steel-300 sm:text-base">
                    {photo.caption}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="projects-videos-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="projects-videos-heading"
            className="text-2xl font-black tracking-tight text-steel-100 sm:text-3xl"
          >
            Project videos
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-steel-200 sm:text-lg">
            Watch work in progress — welding, machining, and fabrication from real Accu-Fab projects.
          </p>
        </div>

        <ul
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
          role="list"
        >
          {PROJECTS_VIDEOS.map((video) => (
            <li key={video.src}>
              <article className="flex h-full flex-col overflow-hidden rounded-sm border border-brand-blue-light/15 bg-charcoal-950/40 shadow-xl shadow-black/25">
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
                <div className="flex flex-1 flex-col border-t border-brand-blue-light/10 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-lg font-black text-steel-100">{video.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-steel-300 sm:text-base">
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

