'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import HeroBackground from '@/src/components/landing/HeroBackground'
import HeroContent from '@/src/components/landing/HeroContent'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null)
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })
  const [canHover, setCanHover] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      setCanHover(hoverQuery.matches)
      setReduceMotion(motionQuery.matches)
    }

    sync()
    hoverQuery.addEventListener('change', sync)
    motionQuery.addEventListener('change', sync)

    return () => {
      hoverQuery.removeEventListener('change', sync)
      motionQuery.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    const element = heroRef.current
    if (!element || !canHover || reduceMotion) {
      setMousePos({ x: -9999, y: -9999 })
      return
    }

    let rafId: number | null = null
    let latestX = 0
    let latestY = 0

    const updatePointer = () => {
      const rect = element.getBoundingClientRect()
      setMousePos({
        x: latestX - rect.left,
        y: latestY - rect.top,
      })
      rafId = null
    }

    const onPointerMove = (event: PointerEvent) => {
      latestX = event.clientX
      latestY = event.clientY

      if (rafId !== null) {
        return
      }

      rafId = window.requestAnimationFrame(updatePointer)
    }

    const onPointerLeave = () => {
      setMousePos({ x: -9999, y: -9999 })
    }

    element.addEventListener('pointermove', onPointerMove, { passive: true })
    element.addEventListener('pointerleave', onPointerLeave, { passive: true })

    return () => {
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [canHover, reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      setParallaxY(0)
      return
    }

    let rafId: number | null = null

    const updateParallax = () => {
      setParallaxY(Math.min(window.scrollY * 0.05, 20))
      rafId = null
    }

    const onScroll = () => {
      if (rafId !== null) {
        return
      }
      rafId = window.requestAnimationFrame(updateParallax)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [reduceMotion])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative isolate flex min-h-screen items-center overflow-hidden py-16 md:py-24"
    >
      <HeroBackground />

      {canHover && !reduceMotion ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(62,172,224,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
          }}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center" aria-hidden="true">
        <Image
          src="/ferdi-logo.svg"
          alt=""
          width={400}
          height={306}
          className="h-auto w-[320px] opacity-[0.03] sm:w-[400px]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-[620px]">
            <HeroContent />
          </div>

          <div
            className="mx-auto w-full max-w-[520px] lg:mx-0"
            style={{
              transform: `translateY(${parallaxY}px)`,
              willChange: 'transform',
            }}
          >
            <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_24px_50px_rgba(6,30,68,0.3)] backdrop-blur-[12px]">
              <p className="text-xs font-medium tracking-[0.08em] text-[var(--ferdi-breeze)]">OPERATIONS SNAPSHOT</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-[14px] border border-[rgba(181,226,248,0.14)] bg-[rgba(6,30,68,0.45)] p-4">
                  <p className="font-[var(--font-mono)] text-sm text-[var(--ferdi-ice)]">01. איסוף אוטומטי</p>
                  <p className="mt-2 text-sm text-[rgba(181,226,248,0.75)]">בקשות מסמכים אוטומטיות וניהול מעקב שקט.</p>
                </div>
                <div className="rounded-[14px] border border-[rgba(181,226,248,0.14)] bg-[rgba(6,30,68,0.45)] p-4">
                  <p className="font-[var(--font-mono)] text-sm text-[var(--ferdi-ice)]">02. OCR מדויק</p>
                  <p className="mt-2 text-sm text-[rgba(181,226,248,0.75)]">פענוח חשבוניות עם אימות נתונים מובנה.</p>
                </div>
                <div className="rounded-[14px] border border-[rgba(181,226,248,0.14)] bg-[rgba(6,30,68,0.45)] p-4">
                  <p className="font-[var(--font-mono)] text-sm text-[var(--ferdi-ice)]">03. הזנה ללא מגע יד אדם</p>
                  <p className="mt-2 text-sm text-[rgba(181,226,248,0.75)]">הפקת פקודות יומן והזנה ישירה למערכת הנהלת החשבונות.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
