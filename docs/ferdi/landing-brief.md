# FERDI Landing Page - Master Brief

> Status: Locked V2 (Source of Truth)
> Last Updated: 2026-03-12
> Scope: Homepage direction, visual system, hero architecture, motion behavior

---

## 1. Brand Definition (Locked)

FERDI is a premium technology company focused on operational clarity and trusted execution.

Core tone:
- calm
- precise
- intelligent
- premium
- human
- trustworthy

Brand principle:
- Quiet Power

This is not a startup-hype aesthetic and not a fintech clone.

---

## 2. Visual Direction (Locked)

FERDI must be expressed as a light-smoky premium technology brand with human warmth.

Mandatory visual identity anchors:
- cream-mineral full-site atmospheric field
- smoky blue-gray depth layers
- one restrained dark navy technological anchor
- softly visible warm undertones
- blurred but readable human presence

Design intent:
- atmospheric and art-directed
- restrained, not decorative
- premium depth without visual noise

---

## 3. Full-Site Background System (Locked)

The background is a living atmospheric field across the entire app, not a static wallpaper.

Implementation behavior:
- full-viewport atmospheric base at app/layout level
- layered tonal gradients (cream + smoky blue-gray)
- subtle depth transitions between hero and below-the-fold
- low-amplitude motion only, if used
- foreground readability always prioritized

What it must feel like:
- breathable
- softly dimensional
- calm and immersive

---

## 4. Hero Architecture (Locked)

Hero structure is fixed as a two-column premium system.

Left column (operational anchor):
- dark navy anchored technological surface
- blurred human presence embedded in depth (not pasted portrait)
- restrained system signal layer only

Right column (editorial message surface):
- bright premium reading surface
- strong headline hierarchy
- clear CTA grouping
- trust signals with low visual noise

Layout guidance:
- desktop balance target: 55% message, 45% visual anchor
- visual active mass should not overpower headline
- mobile: preserve hierarchy first, atmosphere second

---

## 5. Motion System (Locked)

Motion style:
- slow
- sweeping
- low-amplitude
- layered
- premium

Motion rules:
- background motion should be felt, not noticed
- no abrupt loops
- no high-frequency jitter
- no fast parallax
- no element-level attention stealing near headline

Reduced motion:
- preserve depth through static tonal layering
- remove continuous motion while keeping premium composition

---

## 6. Final Color Lock and Role Mapping

Use this palette and role mapping as the final lock.

| Token | HEX | Role |
|---|---|---|
| Mineral Base 100 | `#ECEBE6` | Full-site atmospheric base |
| Mineral Base 200 | `#DFE3E1` | Secondary background transitions |
| Smoke Blue Gray 400 | `#90A2AF` | Depth haze and soft structural layers |
| Smoke Blue Gray 600 | `#5F7687` | Mid-depth contrast surfaces |
| Navy Anchor 900 | `#0E1B2C` | Main technological anchor |
| Navy Anchor 800 | `#1D3147` | Secondary dark support |
| Cool Light Accent | `#A9C7DB` | Subtle premium accents |
| Steel Accent | `#6D8EAE` | Utility accents and controlled separators |
| Soft Teal Accent | `#8FCBD0` | Rare calm highlights |
| Warm Undertone 300 | `#D7C5B7` | Soft warmth in atmosphere |
| Warm Undertone 400 | `#E3D2C5` | Light warm diffusion |
| Divider Line | `#D8E3EA` | Minimal structure lines |
| Primary Text Ink | `#102130` | Main editorial text |
| Secondary Text | `#4F677C` | Supporting copy |

Usage guidance:
- keep navy usage restrained and intentional
- warm undertones should remain soft and atmospheric, never orange or saturated
- accent colors support hierarchy and clarity, not decoration

---

## 7. Surface and Block System

Surface language must be editorial and context-driven, not a default glass recipe.

Default behavior:
- prefer mineral/light premium surfaces with subtle tonal separation
- use translucency only where functionally needed (e.g., readability over dark anchor or media)
- keep panel effects secondary to hierarchy and atmosphere

Visual guardrails:
- no heavy glow
- no neon edges
- no aggressive shadow stacks
- no generic glass effect everywhere
- do not treat utility combos like `bg-white/5 backdrop-blur-md border border-white/10` as the primary system

---

## 8. Human Presence Integration

Human presence is required, but must remain integrated and premium.

Rules:
- blur/soften edges into atmospheric layers
- preserve readability over media
- avoid cut-out portrait look
- maintain institutional confidence, not lifestyle tone

---

## 9. Do Not Do (Hard Rules)

Do not introduce:
- wallpaper logic for background
- generic glassmorphism everywhere
- sci-fi or cyberpunk motifs
- fast flashy motion
- flat white empty sections
- dashboard clutter as hero focus
- AI cliche visuals (particles, neon networks, gimmick glows)

---

## 10. Implementation Priorities

Priority order:
1. global atmospheric background system
2. hero two-column lock (left anchor + right editorial surface)
3. motion smoothing and amplitude control
4. human presence integration
5. section-wide surface consistency and readability tuning

Definition of done:
- premium, calm, immersive first impression in 3-5 seconds
- clear hierarchy and trusted tone
- no visual noise, no template feel

---

## 11. Deprecated Assumptions (Removed)

The following assumptions are no longer valid:
- dark SaaS default look as baseline
- flat white sections as primary identity
- generic glass as the main visual language
- fast feature-demo motion
- card-heavy dashboard-first hero styling

---

## 12. Instruction Alignment Lock

This brief is the canonical implementation source for FERDI visual and motion direction.

Enforcement:
- any conflicting instruction in `AGENTS.md`, `CLAUDE.md`, or older work notes must be treated as deprecated
- historical records remain for traceability only and must not be used as active direction
- future design/implementation prompts should reference this brief first, then the latest locked work order
