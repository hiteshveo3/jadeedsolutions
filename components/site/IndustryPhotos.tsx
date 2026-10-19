import Image from "next/image";
import { industryImages } from "@/lib/industry-images";
import { Section } from "./ui";

export function IndustryPhotos({ slug }: { slug: string }) {
  const photos = industryImages[slug];
  if (!photos?.length) return null;
  return <Section tone="deep">
    <div className={`grid gap-5 ${photos.length > 1 ? "sm:grid-cols-2" : "max-w-3xl"}`}>
      {photos.map(photo => <Image key={photo.src} src={photo.src} alt={photo.alt} width={1200} height={900} sizes="(min-width: 1024px) 550px, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />)}
    </div>
  </Section>;
}
