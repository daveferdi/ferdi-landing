# CLAUDE.md - FERDI Landing Project Guide

This file aligns Claude-session guidance with the locked FERDI direction.
Use it together with `AGENTS.md` and `docs/ferdi/landing-brief.md`.

---

## Priority Order

1. `docs/ferdi/landing-brief.md` (Locked V2)
2. `docs/ferdi/work-orders.md`
3. `docs/ferdi/assets-todo.md`
4. `AGENTS.md`
5. `CLAUDE.md`

If guidance conflicts, follow this order.
Historical notes that conflict with this order are archival only.

---

## Direction Lock (Default)

FERDI must read as a light-smoky premium technology environment with human warmth.

Core visual anchors:
- cream-mineral atmospheric field across the full site
- smoky blue-gray depth layers
- one restrained dark navy technological anchor
- softly present warm undertones
- blurred but readable human presence

Not allowed as default style:
- dark SaaS heaviness
- flat white sterile sections
- generic glassmorphism everywhere
- sci-fi/cyber aesthetics
- decorative AI demo visuals

---

## Background and Depth Rules

Background is a system, not a single image treatment.

Required behavior:
- use full-page atmospheric field logic
- preserve continuity between hero and below-the-fold sections
- keep depth subtle and premium

Do not:
- treat background as static wallpaper logic
- solve depth by piling on blur, darkness, or glow
- isolate every section into disconnected visual islands
- normalize utility blur-card combos as a default surface language

---

## Hero Rules

Hero structure remains two-column and must stay coherent:
- left: restrained dark operational anchor + blurred human presence
- right: bright editorial message surface with clear hierarchy

Do not:
- convert hero into dashboard clutter
- overload hero with many equal-weight cards
- let motion or effects compete with headline/CTA readability

---

## Motion Rules

Motion is a system upgrade, not surface polish.

Required:
- layered atmospheric motion
- low amplitude
- long duration
- calm sweeping behavior
- transform/opacity-first animation
- reduced-motion support preserved

Intent:
- atmosphere moves
- decorative graphics do not dominate

---

## Implementation Behavior

- Preserve architecture before changing structure.
- Favor refinement over structural churn.
- Keep content readability and trust first.
- Record major visual-direction changes in:
  - `docs/ferdi/landing-brief.md`
  - `docs/ferdi/work-orders.md`

---

## Technical Baseline

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS + `app/globals.css`
- Main runtime: `npm run dev` on port `3456`
- RTL foundation: `<html lang="he" dir="rtl">`

This file is a consistency layer and must remain aligned with `AGENTS.md`.
