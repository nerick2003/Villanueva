"use client";

import type { TouristSpot } from "@/data/site-data";
import Image from "next/image";

type TouristSpotModalProps = {
  spot: TouristSpot | null;
  onClose: () => void;
};

export function TouristSpotModal({ spot, onClose }: TouristSpotModalProps) {
  if (!spot) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#14151a]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={spot.name}
      >
        <div className="relative h-72 w-full">
          <Image src={spot.image} alt={spot.name} fill className="object-cover" sizes="90vw" />
        </div>
        <div className="space-y-4 p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-white">{spot.name}</h3>
          <p className="text-zinc-300">{spot.details}</p>
          <button
            onClick={onClose}
            className="rounded-full border border-amber-300/40 px-5 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-300/15"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
