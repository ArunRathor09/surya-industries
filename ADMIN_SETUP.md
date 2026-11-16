# Admin catalog setup

The public product catalogue continues to use its built-in product data until
`DATABASE_URL` is configured. To enable shared admin edits:

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a PostgreSQL
   database available to the app. Set `DATABASE_SSL=true` when the provider
   requires TLS.
2. Set `ADMIN_EMAIL`, a strong `ADMIN_PASSWORD`, and a random
   `ADMIN_SESSION_SECRET` with at least 32 characters. Keep these values in
   the host's secret manager in production; never commit `.env.local`.
3. Run `npm run db:migrate`, then `npm run db:seed`. Seeding adds the current
   catalogue—including the supplied product details—without overwriting
   existing database products or prices.
4. Start the app and visit `/admin/products`. Product edits and prices are
   saved in PostgreSQL and used by the public catalogue and product detail
   pages. An unset price is shown as “Price on request”.

The admin session is signed, HTTP-only, same-site, and expires after eight
hours. Admin APIs require a valid session; the login screen alone is not
access control.

The hero uses a looping, muted Pexels MP4 by default. Override it with your
own browser-accessible MP4 URL using `NEXT_PUBLIC_HERO_VIDEO_URL`. The existing
image remains visible underneath as the fallback. Use video media that you own
or are licensed to use.
