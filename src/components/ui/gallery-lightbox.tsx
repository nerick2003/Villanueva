"use client";

import Image from "next/image";

type GalleryLightboxProps = {
  image: string | null;
  onClose: () => void;
};

export function GalleryLightbox({ image, onClose }: GalleryLightboxProps) {
  if (!image) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative h-[75vh] w-full max-w-5xl overflow-hidden rounded-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery lightbox"
      >
        <Image src={image} alt="Gallery view" fill className="object-cover" sizes="100vw" />
      </div>
    </div>
  );
}
