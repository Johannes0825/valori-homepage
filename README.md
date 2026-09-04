# valori.no

Next.js 16 (App Router) + Tailwind v4. Offentlig nettside på `/`, internt timeregistreringsverktøy på `/timer`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Timeregistrering (`/timer`)

Innlogging og database via Supabase. Brukere inviteres fra Supabase-dashboardet.

### 1. Miljøvariabler

Kopier `.env.example` til `.env.local` og fyll inn fra Supabase → Project Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL=https://<prosjekt>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_…
```

Legg de samme to inn i Vercel → Project → Settings → Environment Variables.

### 2. Database

Kjør hele `supabase/schema.sql` i Supabase → SQL Editor. Filen er idempotent og oppretter:

- `profiles` – én rad per bruker (opprettes automatisk ved invitasjon; navn = e-postens lokaldel, f.eks. `hanne@valori.no` → «Hanne»)
- `projects` – prosjekter med kunde, timepris, timeramme, farge, aktiv/avsluttet
- `time_entries` – timeføringer (dato, timer, reisetid, beskrivelse, fakturerbar)
- RLS: alle innloggede ser alt; føringer kan bare opprettes/slettes av eieren

### 3. Auth-innstillinger i Supabase

**Authentication → URL Configuration**

- Site URL: `https://valori.no`
- Redirect URLs: `https://valori.no/timer/**` og `http://localhost:3000/timer/**`

**Authentication → Email Templates** – bytt lenken i to maler:

- *Invite user*:
  `{{ .SiteURL }}/timer/auth/confirm?token_hash={{ .TokenHash }}&type=invite`
- *Reset password*:
  `{{ .SiteURL }}/timer/auth/confirm?token_hash={{ .TokenHash }}&type=recovery`

(Erstatter `{{ .ConfirmationURL }}`. Dette gjør at lenken virker uansett nettleser/enhet.)

**Authentication → Sign In / Providers → Email**: la «Allow new users to sign up» være **av** – kun inviterte får tilgang.

### 4. Inviter brukere

Authentication → Users → *Invite user* → e-post. Mottaker klikker lenken, trykker «Aktiver konto» på `/timer/auth/confirm`, velger passord på `/timer/sett-passord` og er inne.

Lenkene utløper etter «Email OTP Expiration» (Authentication → Sign In / Providers → Email) – standard er 1 time, sett gjerne 86400 (24 t). Utløpt lenke? Users → ⋯ → *Send invitation* på nytt (eller «Glemt passord» hvis kontoen allerede er aktivert).

### Struktur

```
src/app/(site)/          offentlig nettside
src/app/timer/           timer-verktøy (layout, sider, auth-ruter)
src/Timer/               UI-komponenter for verktøyet
src/lib/supabase/        browser-/server-klient, typer
src/proxy.ts             fornyer sesjon og beskytter /timer
supabase/schema.sql      databaseskjema + RLS
```
