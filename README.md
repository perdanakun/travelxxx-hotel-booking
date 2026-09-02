# TravelXXX

A hotel discovery & booking concept exploring how travelers find a place to stay when they only know *where* they want to go — not *which hotel*. Built as a personal case study, not a client project: no real stakeholders, no real business data. The goal is the process, not the product.

## Why this exists

I'm a visual designer moving into product design and design engineering. Most of my decade-plus of work has been about how things look — icons, branding, illustration. This project is where I test whether I can think in systems, not just surfaces: research, define, design, and ship a working product end to end, on my own.

TravelXXX started from a simple observation about how online travel platforms show pricing (tax hidden until checkout) and grew into a broader question: travelers don't just struggle with price transparency, they struggle with *deciding where to stay in the first place*, often bouncing between social media for inspiration and OTA tabs for comparison. This project designs for that whole loop, not just the pricing symptom.

## The problem

Someone who already wants to visit a city usually doesn't know which hotel — or even which area — fits them. Their main source of inspiration is social media, which is trend-driven and impersonal. Existing OTAs only support search by name or location you already know, with no way to explore contextually. So people bounce between apps to research manually, and often book somewhere else entirely.

**How might we help travelers find a hotel that fits their own holiday profile, without bouncing back to social media — while making pricing feel honest from the first screen to checkout?**

## What v1 does

- **Holiday profile onboarding** — a short survey (budget, ambience, activities) instead of a blank search bar
- **Tag-based area recommendations** — areas are described by what they're known for (e.g. "beach," "mountain escape," "trendy cafes"), not just pinned on a map
- **Comparison cart** — add a few hotels to a cart and compare them side by side, the way you'd compare products in a marketplace, instead of juggling multiple browser tabs
- **Consistent price transparency** — non-tax and after-tax prices shown together from browsing through checkout, no surprises

## Process

This project runs on two parallel workflows, intentionally documented side by side, as part of the case study itself:

1. **Design Thinking** (Empathize → Define → Ideate → Prototype → Test → Iterate) — the conventional process, used to validate that the fundamentals (research, problem framing, persona, journey mapping) hold up without shortcuts.
2. **AI-Native Design Engineer Workflow** — my own framework for building product design work in an AI-native era, compressing and restructuring the same process:
   - **Think** — rapid research synthesis into a PRD, skipping manual persona artifacts in favor of a structured problem/scope document
   - **Generative Blueprinting + Code-Prototype Execution** — a tight per-screen loop: define a coded design system, generate structural screens in [v0](https://v0.dev), self-review, then hand-detail every screen in VS Code — breaking single-file AI output into clean, modular React components and taking manual control of state, spacing, and interaction. AI provides the base; the design decisions are mine.
   - **Test & Ship** — deploy the working prototype live and test with real users, not clicks on a rigged Figma prototype
   - **Iterate** — feedback goes straight into the codebase and ships

The point of running both isn't to prove one is "correct" — it's to document, concretely, what changes (and what doesn't) when AI tools are folded into a design process, and to show the judgment that stays human even when execution speeds up.

## Tech

- Next.js (App Router)
- Tailwind CSS
- Component structure hand-refactored from v0-generated bases into modular, reusable pieces

## Status

Actively in progress — currently in the screen-by-screen design/build loop. Full case study writeup (with before/after process comparison) will follow once the prototype is live-tested.

---

*This is a personal portfolio project, not affiliated with or a redesign of any real OTA brand.*
