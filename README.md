# Briefed

**Turn chaotic client DMs into structured project briefs.**

Briefed is a SaaS platform for creative freelancers — designers, agencies, and anyone tired of losing project details in scattered messages. Share a guided form with your client, get a structured brief back, and download a professional PDF. No client sign-up required.

---

## How It Works

1. **Create a brief** — Fill in the basics: client info, project goals, timeline, budget, and upload a moodboard.
2. **Share the link** — Send your client a unique link. They fill out the form without needing an account.
3. **Download the PDF** — Get a clean, professional brief ready for your workflow.

---

## Features

- **Multi-step guided form** — Walks clients through project details step by step for higher completion rates.
- **Shareable links** — Each brief gets a unique token-based URL. Clients access it instantly, no sign-up needed.
- **Professional PDF export** — One-click download of a styled, branded PDF brief.
- **Moodboard uploads** — Clients can attach up to 10 reference images directly in the form.
- **Dashboard** — View, manage, share, and download all your briefs in one place.
- **Authentication** — Secure sign-in/sign-up powered by Clerk.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Auth | [Clerk](https://clerk.com/) |
| File Uploads | [UploadThing](https://uploadthing.com/) |
| PDF Generation | [jsPDF](https://github.com/parallax/jsPDF) |
| Forms | [React Hook Form](https://react-hook-form.com/) |

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
UPLOADTHING_SECRET=
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
├── page.tsx                    # Landing page
├── dashboard/
│   ├── page.tsx                # User dashboard (all briefs)
│   └── new/page.tsx            # Create new brief
├── brief/
│   └── [token]/page.tsx        # Public shared brief view
├── sign-in/                    # Clerk sign-in
├── sign-up/                    # Clerk sign-up
└── api/uploadthing/            # File upload endpoint

components/
├── BriefForm.tsx               # Multi-step brief creation form
└── ui/                         # shadcn/ui components

lib/
├── supabase/                   # Database client & brief CRUD
├── generatePDF.ts              # PDF generation logic
└── uploadthing.ts              # Upload helpers
```

---

## License

This project is currently unlicensed. All rights reserved.
