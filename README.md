# briefed

**Turn chaotic client DMs into structured project briefs.**

Briefed is a tool for creative freelancers — designers, agencies, and anyone tired of losing project details in scattered messages. Share a guided form with your client, get a structured brief back, and download a professional PDF. No client sign-up required.

> Built as a portfolio project to demonstrate full-stack development with modern tools.

---

## How It Works

1. **Create a brief** — Fill in the basics: client info, project goals, timeline, budget, and upload a moodboard.
2. **Share the link** — Send your client a unique link. They fill out the form without needing an account.
3. **Download the PDF** — Get a clean, professional brief ready for your workflow.

---

## Features

- **Multi-step guided form** — Walks clients through project details step by step.
- **Invite system** — Generate a unique token-based link for clients. They fill the brief without signing up.
- **Shareable brief view** — Each completed brief has a public read-only page.
- **Professional PDF export** — One-click download of a styled, card-based PDF with moodboard grid.
- **Moodboard uploads** — Clients can attach up to 10 reference images with drag-to-remove previews.
- **Status management** — Track briefs as draft, in progress, or completed with filterable dashboard.
- **Brief editing** — Update any brief after creation, including adding/removing moodboard images.
- **Dark/light mode** — Theme toggle with full palette support.
- **Form validation** — Step-by-step validation with toast notifications.
- **Authentication** — Secure sign-in/sign-up powered by Clerk.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Server Components) |
| Language | TypeScript |
| UI | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security) |
| Auth | [Clerk](https://clerk.com/) (with Supabase JWT integration) |
| File Uploads | [UploadThing](https://uploadthing.com/) |
| PDF Generation | [jsPDF](https://github.com/parallax/jsPDF) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Notifications | [Sonner](https://sonner.emilkowal.dev/) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
git clone https://github.com/Kmetho/briefed-shadcn.git
cd briefed-shadcn
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# UploadThing
UPLOADTHING_TOKEN=
```

### Run the Dev Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/
├── page.tsx                       # Landing page (auth-aware)
├── layout.tsx                     # Root layout + ThemeProvider
├── dashboard/
│   ├── page.tsx                   # Brief dashboard with filters
│   ├── new/page.tsx               # Create new brief
│   └── edit/[id]/page.tsx         # Edit existing brief
├── brief/
│   └── [token]/page.tsx           # Public shared brief view
├── fill/
│   ├── [token]/page.tsx           # Client brief submission form
│   └── success/page.tsx           # Post-submission confirmation
├── sign-in/                       # Clerk sign-in
├── sign-up/                       # Clerk sign-up
└── api/uploadthing/               # File upload endpoint

components/
├── BriefForm.tsx                  # Multi-step brief form (create/edit)
├── ClientBriefForm.tsx            # Public client-facing brief form
├── MoodboardGallery.tsx           # Image grid with lightbox
├── Hero.tsx                       # Landing page hero
├── HowItWorks.tsx                 # Landing page steps section
├── Features.tsx                   # Landing page features grid
├── CTA.tsx                        # Landing page call-to-action
├── Nav.tsx                        # Navigation (4 variants)
├── Footer.tsx                     # Footer
├── ThemeToggle.tsx                # Dark/light mode switch
├── validateStep.ts                # Reusable form validation
└── ui/                            # shadcn/ui primitives

lib/
├── supabase/
│   ├── client.ts                  # Browser + public Supabase clients
│   ├── server.ts                  # Server-side Supabase client
│   └── briefs.ts                  # Brief & invite CRUD operations
├── generatePDF.ts                 # PDF generation with card layout
├── uploadthing.ts                 # UploadThing React helpers
└── utils.ts                       # Tailwind merge utility
```

---

## What I Learned

- Integrating Clerk authentication with Supabase Row Level Security using JWT tokens
- Building multi-step forms with validation using native React state (no form library needed)
- Handling file uploads with UploadThing — async upload flows, progress tracking, race condition prevention
- Generating styled PDFs programmatically with jsPDF — text measurement, card layouts, image grids
- Next.js 16 patterns: `params` as Promise, server vs client components, dynamic routes
- Designing a token-based invite system for anonymous access without user accounts

---

## License

This project is currently unlicensed. All rights reserved.
