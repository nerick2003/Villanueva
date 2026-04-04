"use client";

import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { TouristSpotModal } from "@/components/ui/tourist-spot-modal";
import { foods, galleryImages, place, touristSpots, type TouristSpot } from "@/data/site-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=2100&q=80";

/** Equal insets = small centered square, then opens to full frame (not a circle). */
const HERO_SQUARE_START = "inset(49.35% 49.35% 49.35% 49.35%)";
const HERO_SQUARE_END = "inset(0% 0% 0% 0%)";

export default function Home() {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const titleMorphRef = useRef<HTMLParagraphElement | null>(null);
  const centerIslandRef = useRef<HTMLDivElement | null>(null);
  const islandLabelRef = useRef<HTMLParagraphElement | null>(null);
  const touristSectionRef = useRef<HTMLElement | null>(null);
  const touristOverlayRef = useRef<HTMLDivElement | null>(null);
  const touristHeadingEyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const touristHeadingTitleRef = useRef<HTMLHeadingElement | null>(null);
  const touristLabelTopLeftRef = useRef<HTMLParagraphElement | null>(null);
  const touristLabelTopRightRef = useRef<HTMLParagraphElement | null>(null);
  const touristLabelBottomLeftRef = useRef<HTMLParagraphElement | null>(null);
  const touristLabelBottomRightRef = useRef<HTMLParagraphElement | null>(null);
  const touristFeaturedCardRef = useRef<HTMLDivElement | null>(null);
  const touristDescriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let effectCancelled = false

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const registerHeroBackgroundScroll = () => {
      if (effectCancelled) return
      gsap.set(".hero-background", { transformOrigin: "50% 88%" })
      gsap.fromTo(
        ".hero-background",
        { scale: 1.2, yPercent: -4 },
        {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.6,
          },
        },
      )
    }

    const heroCopySlide = () =>
      typeof window !== "undefined" ? Math.min(320, window.innerHeight * 0.38) : 220

    const heroTimeline = gsap.timeline()

    gsap.set(".hero-background", { scale: 1.2, yPercent: -4, transformOrigin: "50% 88%" })

    if (prefersReducedMotion) {
      gsap.set(".hero-reveal-square", { clipPath: HERO_SQUARE_END })
      gsap.set(".hero-gradient", { opacity: 1 })
      gsap.set([".hero-intro-welcome", ".hero-title", ".hero-tagline", ".scroll-indicator"], {
        opacity: 1,
        y: 0,
      })
      registerHeroBackgroundScroll()
    } else {
      gsap.set(".hero-reveal-square", { clipPath: HERO_SQUARE_START })
      gsap.set(".hero-gradient", { opacity: 0 })

      heroTimeline.fromTo(
        ".hero-reveal-square",
        { clipPath: HERO_SQUARE_START },
        {
          clipPath: HERO_SQUARE_END,
          duration: 1.85,
          ease: "power3.inOut",
          onComplete: () => {
            if (effectCancelled) return
            gsap.set(".hero-reveal-square", { clipPath: "none" })
            registerHeroBackgroundScroll()
          },
        },
        0,
      )

      heroTimeline.fromTo(
        ".hero-gradient",
        { opacity: 0 },
        { opacity: 1, duration: 0.85, ease: "power2.out" },
        ">",
      )

      const yLift = heroCopySlide()
      heroTimeline.fromTo(
        ".hero-intro-welcome",
        { y: yLift * 0.88, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: "power4.out" },
        ">+=0.12",
      )
      heroTimeline.fromTo(
        ".hero-title",
        { y: yLift, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, ease: "power4.out" },
        ">+=0.1",
      )
      heroTimeline.fromTo(
        ".hero-tagline",
        { y: yLift * 0.7, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.88, ease: "power4.out" },
        ">+=0.08",
      )
      heroTimeline.fromTo(
        ".scroll-indicator",
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">+=0.08",
      )
    }

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart none restart reverse",
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>(".about-reveal-left, .about-reveal-right").forEach((element) => {
      const isLeftReveal = element.classList.contains("about-reveal-left");

      gsap.fromTo(
        element,
        { x: isLeftReveal ? -90 : 90, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "restart none restart reverse",
          },
        },
      );
    });

    const heroTitleElement = heroTitleRef.current
    const titleMorphElement = titleMorphRef.current
    const centerIslandElement = centerIslandRef.current
    const islandLabelElement = islandLabelRef.current

    if (heroTitleElement && titleMorphElement && centerIslandElement && islandLabelElement) {
      let hasScrolledHeroSection = false

      const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress

      gsap.set(centerIslandElement, { autoAlpha: 0, scale: 0.92, y: -8 })
      gsap.set(islandLabelElement, { autoAlpha: 0, y: 2 })
      gsap.set(titleMorphElement, {
        autoAlpha: 0,
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        transformOrigin: "50% 50%",
      })

      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "top+=58% top",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          if (progress > 0) {
            hasScrolledHeroSection = true
          }
          const bridgeStart = 0.04
          const bridgeArrive = 0.88
          const bridgeHoldEnd = 0.96
          const bridgeEnd = 1
          const borderStart = 0.965
          const borderEnd = 1
          const hasMorphStarted = progress > bridgeStart
          const startRect = heroTitleElement.getBoundingClientRect()
          const endRect = islandLabelElement.getBoundingClientRect()
          const scaleTarget = Math.max(0.24, Math.min(0.4, endRect.width / Math.max(1, startRect.width)))
          const travelProgress = Math.max(0, Math.min(1, (progress - bridgeStart) / (bridgeArrive - bridgeStart)))
          const startCx = startRect.left + startRect.width / 2
          const startCy = startRect.top + startRect.height / 2
          const endCx = endRect.left + endRect.width / 2
          const endCy = endRect.top + endRect.height / 2
          const cx = lerp(startCx, endCx, travelProgress)
          const cy = lerp(startCy, endCy, travelProgress)
          const scale = lerp(1, scaleTarget, travelProgress)
          let bridgeOpacity = 0
          if (progress > bridgeStart && progress < bridgeEnd) {
            if (progress <= bridgeHoldEnd) {
              bridgeOpacity = 1
            } else {
              bridgeOpacity = Math.max(0, 1 - (progress - bridgeHoldEnd) / (bridgeEnd - bridgeHoldEnd))
            }
          }

          gsap.set(titleMorphElement, {
            x: cx,
            y: cy,
            xPercent: -50,
            yPercent: -50,
            scale,
            transformOrigin: "50% 50%",
            autoAlpha: bridgeOpacity,
          })
          if (hasMorphStarted) {
            gsap.set(heroTitleElement, { autoAlpha: 0 })
          } else if (progress > 0 || hasScrolledHeroSection) {
            gsap.set(heroTitleElement, { autoAlpha: 1 })
          }
          const islandRevealProgress = Math.max(0, Math.min(1, (progress - borderStart) / (borderEnd - borderStart)))
          gsap.set(centerIslandElement, {
            autoAlpha: islandRevealProgress,
            scale: lerp(0.92, 1, islandRevealProgress),
            y: lerp(-8, 0, islandRevealProgress),
          })
          gsap.set(islandLabelElement, {
            autoAlpha: islandRevealProgress,
            y: lerp(2, 0, islandRevealProgress),
          })
        },
      })
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }

    gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((element) => {
      gsap.fromTo(
        element,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: true,
          },
        },
      );
    });

    const touristSectionElement = touristSectionRef.current;
    const touristOverlayElement = touristOverlayRef.current;
    const touristHeadingEyebrowElement = touristHeadingEyebrowRef.current;
    const touristHeadingTitleElement = touristHeadingTitleRef.current;
    const touristLabelTopLeftElement = touristLabelTopLeftRef.current;
    const touristLabelTopRightElement = touristLabelTopRightRef.current;
    const touristLabelBottomLeftElement = touristLabelBottomLeftRef.current;
    const touristLabelBottomRightElement = touristLabelBottomRightRef.current;
    const touristFeaturedCardElement = touristFeaturedCardRef.current;
    const touristDescriptionElement = touristDescriptionRef.current;

    if (
      touristSectionElement &&
      touristOverlayElement &&
      touristHeadingEyebrowElement &&
      touristHeadingTitleElement &&
      touristLabelTopLeftElement &&
      touristLabelTopRightElement &&
      touristLabelBottomLeftElement &&
      touristLabelBottomRightElement &&
      touristFeaturedCardElement &&
      touristDescriptionElement
    ) {
      const featuredSlides = Array.from(touristFeaturedCardElement.querySelectorAll<HTMLElement>(".tourist-featured-slide"));
      const mobileDetails = Array.from(touristSectionElement.querySelectorAll<HTMLElement>(".tourist-mobile-detail"));
      const headingElements = [touristHeadingEyebrowElement, touristHeadingTitleElement];
      const labelElements = [
        touristLabelTopLeftElement,
        touristLabelTopRightElement,
        touristLabelBottomLeftElement,
        touristLabelBottomRightElement,
      ];
      const labelPeekByCorner = [
        { x: 44, y: 36 },
        { x: -44, y: 36 },
        { x: 44, y: -32 },
        { x: -44, y: -32 },
      ] as const;
      const applyLabelHiddenPeek = (elements: typeof labelElements) => {
        elements.forEach((el, index) => {
          const peek = labelPeekByCorner[index];
          gsap.set(el, { autoAlpha: 0, x: peek.x, y: peek.y, scale: 0.9 });
        });
      };
      const sectionRect = touristSectionElement.getBoundingClientRect();
      const sectionCenterX = sectionRect.left + sectionRect.width / 2;
      const sectionCenterY = sectionRect.top + sectionRect.height / 2;

      const headingOffsets = headingElements.map((element) => {
        const elementRect = element.getBoundingClientRect();
        const elementCenterX = elementRect.left + elementRect.width / 2;
        const elementCenterY = elementRect.top + elementRect.height / 2;

        return {
          element,
          x: sectionCenterX - elementCenterX,
          y: sectionCenterY - elementCenterY,
        };
      });

      gsap.set(touristOverlayElement, { autoAlpha: 0 });
      headingOffsets.forEach(({ element, x, y }) => {
        gsap.set(element, { autoAlpha: 0, x, y, scale: 0.45 });
      });
      applyLabelHiddenPeek(labelElements);
      const featuredIntroRect = touristFeaturedCardElement.getBoundingClientRect();
      const featuredIntroCenterX = featuredIntroRect.left + featuredIntroRect.width / 2;
      const featuredIntroCenterY = featuredIntroRect.top + featuredIntroRect.height / 2;
      gsap.set(touristFeaturedCardElement, {
        autoAlpha: 0,
        x: sectionCenterX - featuredIntroCenterX,
        y: sectionCenterY - featuredIntroCenterY,
        scale: 0.78,
      });
      gsap.set(touristDescriptionElement, { autoAlpha: 0, y: 60 });
      gsap.set(featuredSlides, {
        autoAlpha: 0,
        rotationY: -90,
        z: 0.1,
        transformPerspective: 1400,
        transformOrigin: "50% 50%",
      });
      if (featuredSlides[0]) {
        gsap.set(featuredSlides[0], { autoAlpha: 1, rotationY: 0 });
      }
      featuredSlides.forEach((slide, index) => {
        gsap.set(slide, { zIndex: featuredSlides.length - index });
      });
      gsap.set(mobileDetails, { autoAlpha: 0, y: 12 });

      let activeIndex = 0;
      const slideStepper = { value: 0 };
      const labelIntroProgress = { v: 0 };
      const lastSlideIndex = Math.max(0, featuredSlides.length - 1);

      const snapCarouselToIndex = (targetIndex: number) => {
        gsap.killTweensOf(featuredSlides);
        gsap.killTweensOf(labelElements);
        featuredSlides.forEach((slide, index) => {
          const isActive = index === targetIndex;
          gsap.set(slide, {
            autoAlpha: isActive ? 1 : 0,
            rotationY: isActive ? 0 : -90,
            zIndex: isActive ? featuredSlides.length + index : featuredSlides.length - index,
          });
        });
        labelElements.forEach((label, index) => {
          const peek = labelPeekByCorner[index];
          if (index === targetIndex) {
            gsap.set(label, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
            return;
          }
          gsap.set(label, { autoAlpha: 0, x: peek.x, y: peek.y, scale: 0.9 });
        });
        mobileDetails.forEach((detail, index) => {
          const isActive = index === targetIndex;
          gsap.set(detail, {
            autoAlpha: isActive ? 1 : 0,
            y: isActive ? 0 : 12,
          });
        });
        activeIndex = targetIndex;
        slideStepper.value = targetIndex;
      };

      const touristTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: touristSectionElement,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            resetTouristSequence()
          },
          // Do not reset slides when scrolling down past the pin: that snapped the carousel
          // back to the first image while the user had already reached the last (Luna Market).
          // Killing tweens alone left the last flip mid-animation when scrub lagged or scroll was fast.
          onLeave: () => {
            snapCarouselToIndex(lastSlideIndex);
          },
        },
      })

      const resetTouristSequence = () => {
        gsap.killTweensOf(featuredSlides);
        gsap.killTweensOf(labelElements);
        const mobileTweensOnMainTimeline = new Set(touristTimeline.getTweensOf(mobileDetails, false));
        gsap.getTweensOf(mobileDetails).forEach((tween) => {
          if (!mobileTweensOnMainTimeline.has(tween)) {
            tween.kill();
          }
        });
        labelIntroProgress.v = 0;
        activeIndex = 0;
        slideStepper.value = 0;
        featuredSlides.forEach((slide, index) => {
          gsap.set(slide, {
            autoAlpha: index === 0 ? 1 : 0,
            rotationY: index === 0 ? 0 : -90,
            zIndex: featuredSlides.length - index,
          });
        });
        applyLabelHiddenPeek(labelElements);
        gsap.set(mobileDetails, { autoAlpha: 0, y: 12 });
      };

      const introHeadingDuration = 0.32;
      const introHeadingStagger = 0.06;
      const mistfallLabelIntroDuration = 0.38;

      touristTimeline
        .to(touristOverlayElement, { autoAlpha: 1, duration: 0.18, ease: "power1.out" })
        .to(
          headingElements,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: introHeadingDuration,
            stagger: introHeadingStagger,
            ease: "power3.out",
          },
        )
        .to(
          touristFeaturedCardElement,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: "power3.out",
          },
          ">",
        )
        .to(
          labelIntroProgress,
          {
            v: 1,
            duration: mistfallLabelIntroDuration,
            ease: "power3.out",
            onUpdate: () => {
              const easedProgress = labelIntroProgress.v;
              const peek = labelPeekByCorner[0];
              gsap.set(labelElements[0], {
                autoAlpha: easedProgress,
                x: gsap.utils.interpolate(peek.x, 0, easedProgress),
                y: gsap.utils.interpolate(peek.y, 0, easedProgress),
                scale: gsap.utils.interpolate(0.9, 1, easedProgress),
              });
            },
          },
          ">",
        )
        .to(
          mobileDetails[0],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            ease: "power3.out",
          },
          ">",
        );

      const showSlideAtIndex = (nextIndex: number) => {
        if (nextIndex === activeIndex) {
          return;
        }
        if (nextIndex < 0 || nextIndex >= featuredSlides.length) {
          return;
        }

        const previousIndex = activeIndex;
        const previousSlide = featuredSlides[previousIndex];
        const currentSlide = featuredSlides[nextIndex];

        featuredSlides.forEach((slide, index) => {
          if (index !== previousIndex && index !== nextIndex) {
            gsap.killTweensOf(slide);
            gsap.set(slide, {
              autoAlpha: 0,
              rotationY: -90,
              zIndex: featuredSlides.length - index,
            });
          }
        });

        if (previousSlide && currentSlide) {
          gsap.killTweensOf([previousSlide, currentSlide]);
          gsap.to(previousSlide, {
            autoAlpha: 0,
            rotationY: 90,
            duration: 0.22,
            ease: "power2.inOut",
            overwrite: true,
          });
          gsap.fromTo(
            currentSlide,
            {
              autoAlpha: 0,
              rotationY: -90,
              zIndex: featuredSlides.length + nextIndex,
            },
            {
              autoAlpha: 1,
              rotationY: 0,
              duration: 0.28,
              ease: "power2.out",
              overwrite: true,
            },
          );
        }

        labelElements.forEach((label, index) => {
          const peek = labelPeekByCorner[index];
          if (index === nextIndex) {
            gsap.fromTo(
              label,
              { autoAlpha: 0, x: peek.x, y: peek.y, scale: 0.9 },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.34,
                ease: "power3.out",
                overwrite: true,
              },
            );
            return;
          }
          gsap.to(label, {
            autoAlpha: 0,
            x: peek.x,
            y: peek.y,
            scale: 0.9,
            duration: 0.22,
            ease: "power2.in",
            overwrite: true,
          });
        });

        mobileDetails.forEach((detail, index) => {
          const isActive = index === nextIndex;
          gsap.set(detail, {
            autoAlpha: isActive ? 1 : 0,
            y: isActive ? 0 : 12,
          });
        });

        activeIndex = nextIndex;
      };

      touristTimeline.to(slideStepper, {
        value: lastSlideIndex,
        duration: featuredSlides.length * 1.15,
        ease: "none",
        onUpdate: () => {
          const nextIndex = Math.round(slideStepper.value);
          showSlideAtIndex(nextIndex);
        },
        onComplete: () => {
          snapCarouselToIndex(lastSlideIndex);
        },
      });

      touristTimeline
        .to(touristOverlayElement, { autoAlpha: 0, duration: 0.22, ease: "power2.out" })
        .to(
          touristDescriptionElement,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.26,
            ease: "power3.out",
          },
          "-=0.04",
        );
    }

    const refreshScrollTriggers = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }
    refreshScrollTriggers()
    window.addEventListener("resize", refreshScrollTriggers)

    return () => {
      effectCancelled = true
      gsap.killTweensOf([
        ".hero-background",
        ".hero-reveal-square",
        ".hero-gradient",
        ".hero-intro-welcome",
        ".hero-title",
        ".hero-tagline",
        ".scroll-indicator",
      ])
      window.removeEventListener("resize", refreshScrollTriggers)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="bg-[#0d0e11] text-zinc-100">
      <div className="pointer-events-none fixed left-1/2 top-4 z-40 w-full max-w-xl -translate-x-1/2 px-4">
        <div
          ref={centerIslandRef}
          className="center-island invisible rounded-full border border-white/20 bg-black/45 px-6 py-2.5 text-center opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <p
            ref={islandLabelRef}
            className="invisible font-semibold leading-[1.05] opacity-0 text-zinc-100 text-2xl md:text-3xl"
          >
            {place.name}
          </p>
        </div>
      </div>

      <section className="hero-section relative flex min-h-screen items-end overflow-hidden bg-black px-6 pb-20 pt-28 md:px-12">
        <div className="hero-background absolute inset-0 z-[5] will-change-transform">
          <div
            className="hero-reveal-square absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: HERO_SQUARE_START }}
          >
            <Image
              src={HERO_IMAGE_SRC}
              alt="Cinematic view of Villanueva"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="hero-gradient pointer-events-none absolute inset-0 z-10 opacity-0 bg-gradient-to-t from-[#090a0c] via-black/40 to-black/25" />
        <p
          ref={titleMorphRef}
          aria-hidden="true"
          className="pointer-events-none invisible fixed left-0 top-0 z-20 m-0 max-w-4xl font-semibold leading-[1.05] opacity-0 text-zinc-100 text-5xl md:text-8xl"
        >
          {place.name}
        </p>
        <div className="relative z-30 mx-auto w-full max-w-6xl space-y-6">
          <p className="hero-intro-welcome opacity-0 text-sm uppercase tracking-[0.28em] text-amber-200/90">
            Welcome to
          </p>
          <h1
            ref={heroTitleRef}
            className="hero-title max-w-4xl text-5xl font-semibold leading-[1.05] opacity-0 will-change-transform md:text-8xl"
          >
            {place.name}
          </h1>
          <p className="hero-tagline max-w-2xl text-lg text-zinc-200 opacity-0 md:text-2xl">{place.tagline}</p>
          <div className="scroll-indicator flex items-center gap-3 pt-3 text-sm text-zinc-300 opacity-0">
            <span className="h-px w-16 bg-zinc-300/80" />
            Scroll to Explore
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <div className="about-reveal-left">
          <SectionHeading
            suppressReveal
            eyebrow="About The Place"
            title="A valley shaped by stories, water, and light."
          />
        </div>
        <p className="about-reveal-right self-end text-lg leading-relaxed text-zinc-300">{place.history}</p>
      </section>

      <section
        ref={touristSectionRef}
        className="tourist-spots-section relative mx-auto max-w-6xl space-y-10 px-6 py-20 md:px-12 md:py-28"
      >
        <div ref={touristOverlayRef} className="pointer-events-none absolute inset-0 z-20 bg-[#0d0e11]" />
        <div className="tourist-spots-content relative z-30 space-y-10">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p ref={touristHeadingEyebrowRef} className="text-xs uppercase tracking-[0.35em] text-amber-300/90">
              Tourist Spots
            </p>
            <h2 ref={touristHeadingTitleRef} className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Must-visit landmarks and natural attractions.
            </h2>
          </div>
          <div className="relative isolate mx-auto w-full max-w-5xl overflow-visible pb-8 pt-20 md:py-12 md:pt-14">
            <p
              ref={touristLabelTopLeftRef}
              className="pointer-events-none invisible absolute -left-2 -top-3 z-[5] hidden max-w-[32%] space-y-1 opacity-0 md:block md:-left-4 md:-top-4"
            >
              <span className="block text-sm font-semibold text-zinc-100 md:text-base">
                {touristSpots[0]?.name ?? "Tourist Spot"}
              </span>
              <span className="block text-xs text-zinc-300 md:text-sm">
                {touristSpots[0]?.shortDescription ?? "Spot details"}
              </span>
            </p>
            <p
              ref={touristLabelTopRightRef}
              className="pointer-events-none invisible absolute -right-2 -top-3 z-[5] hidden max-w-[32%] space-y-1 text-right opacity-0 md:block md:-right-4 md:-top-4"
            >
              <span className="block text-sm font-semibold text-zinc-100 md:text-base">
                {touristSpots[1]?.name ?? "Tourist Spot"}
              </span>
              <span className="block text-xs text-zinc-300 md:text-sm">
                {touristSpots[1]?.shortDescription ?? "Spot details"}
              </span>
            </p>
            <p
              ref={touristLabelBottomLeftRef}
              className="pointer-events-none invisible absolute -bottom-1 -left-2 z-[5] hidden max-w-[32%] space-y-1 opacity-0 md:block md:-left-4"
            >
              <span className="block text-sm font-semibold text-zinc-100 md:text-base">
                {touristSpots[2]?.name ?? "Tourist Spot"}
              </span>
              <span className="block text-xs text-zinc-300 md:text-sm">
                {touristSpots[2]?.shortDescription ?? "Spot details"}
              </span>
            </p>
            <p
              ref={touristLabelBottomRightRef}
              className="pointer-events-none invisible absolute -bottom-1 -right-2 z-[5] hidden max-w-[32%] space-y-1 text-right opacity-0 md:block md:-right-4"
            >
              <span className="block text-sm font-semibold text-zinc-100 md:text-base">
                {touristSpots[3]?.name ?? "Tourist Spot"}
              </span>
              <span className="block text-xs text-zinc-300 md:text-sm">
                {touristSpots[3]?.shortDescription ?? "Spot details"}
              </span>
            </p>

            <div className="mx-auto w-full max-w-xl">
              <div className="relative">
                <div
                  ref={touristFeaturedCardRef}
                  className="relative z-30 mx-auto w-full rounded-2xl border-4 border-white/90 bg-black/10 p-2 [perspective:1400px]"
                >
                  <div className="relative h-64 overflow-hidden rounded-lg md:h-80">
                    {touristSpots.slice(0, 4).map((spot) => (
                      <div key={spot.id} className="tourist-featured-slide absolute inset-0 [transform-style:preserve-3d] [backface-visibility:hidden]">
                        <Image
                          src={spot.image}
                          alt={spot.name}
                          fill
                          loading="lazy"
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, 700px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {touristSpots.slice(0, 4).map((spot, slideIndex) => {
                  const isLabelAboveImage = slideIndex % 2 === 0
                  return (
                    <div
                      key={`${spot.id}-mobile-detail`}
                      className={`tourist-mobile-detail pointer-events-none invisible absolute inset-x-0 z-[35] opacity-0 rounded-lg border border-white/10 bg-white/[0.04] p-3 md:hidden ${
                        isLabelAboveImage ? "bottom-[calc(100%+1.5rem)]" : "top-[calc(100%+1.5rem)]"
                      }`}
                    >
                      <p className="text-sm font-semibold text-zinc-100">{spot.name}</p>
                      <p className="mt-1 text-xs text-zinc-300">{spot.shortDescription}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <p ref={touristDescriptionRef} className="mx-auto mt-8 max-w-2xl text-center text-zinc-300/90 md:text-lg" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-[#171920] to-[#121319] py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-10 px-6 md:px-12">
          <SectionHeading
            eyebrow="Culture & People"
            title="Festivals, craft traditions, and warm local life."
            description="The town comes alive each full moon with music, lantern parades, and artisan markets."
          />
          <div className="reveal grid gap-6 md:grid-cols-3">
            {["Lantern River Festival", "Bamboo Weaving Village", "Sunrise Drum Ceremony"].map((item) => (
              <article key={item} className="rounded-xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-lg font-medium text-amber-100">{item}</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  Experience authentic community traditions passed through generations.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 py-20 md:px-12 md:py-28">
        <SectionHeading
          eyebrow="Food & Delicacies"
          title="Taste the flavor map of Villanueva."
          description="Every dish carries ingredients grown in local farms and mountain terraces."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {foods.map((food) => (
            <article
              key={food.id}
              className="reveal group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(251,191,36,0.16)]"
            >
              <div className="relative h-52 overflow-hidden rounded-xl">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  loading="lazy"
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{food.name}</h3>
              <p className="mt-2 text-sm text-zinc-300">{food.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 py-20 md:px-12 md:py-28">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from trails, coastlines, and local celebrations."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              onClick={() => setActiveImage(image)}
              className={`reveal relative overflow-hidden rounded-xl ${index % 3 === 0 ? "md:row-span-2 md:h-[26rem]" : "h-52 md:h-64"}`}
            >
              <Image
                src={image}
                alt={`Villanueva gallery ${index + 1}`}
                fill
                loading="lazy"
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#13141a] px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <SectionHeading
            eyebrow="Plan Your Visit"
            title="Start your Villanueva journey today."
            description="Find us in Villanueva, Misamis Oriental. Best season: October to May."
          />
          <div className="reveal space-y-5">
            <iframe
              title="Map of Villanueva"
              src="https://www.google.com/maps?q=Villanueva%2C%20Misamis%20Oriental&z=12&output=embed"
              className="h-56 w-full rounded-xl border border-white/10"
              loading="lazy"
            />
            <form className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-md border border-white/15 bg-black/20 px-4 py-2 text-sm outline-none focus:border-amber-300/70"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-md border border-white/15 bg-black/20 px-4 py-2 text-sm outline-none focus:border-amber-300/70"
              />
              <textarea
                placeholder="Tell us when you plan to visit"
                rows={4}
                className="w-full rounded-md border border-white/15 bg-black/20 px-4 py-2 text-sm outline-none focus:border-amber-300/70"
              />
              <button
                type="submit"
                className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-[#131313] transition hover:bg-amber-200"
              >
                Plan Your Visit
              </button>
            </form>
          </div>
        </div>
      </section>

      <TouristSpotModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
      <GalleryLightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </main>
  );
}
