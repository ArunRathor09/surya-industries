# Admin catalog setup

The public product catalogue continues to use its built-in product data until
`DATABASE_URL` is configured. To enable shared admin edits with Neon:

1. Create a Neon project and copy its PostgreSQL connection string into
   `DATABASE_URL` in `.env.local` (use the pooled connection string for the
   web app). Keep the `sslmode=require` option.
2. Set `ADMIN_EMAIL`, a strong `ADMIN_PASSWORD`, and a random
   `ADMIN_SESSION_SECRET` with at least 32 characters. Keep these values in
   the host's secret manager in production; never commit `.env.local`.
3. For product image uploads, create a Cloudinary account and set
    `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`
    in `.env.local`. Uploads are size/type checked and delivered with automatic
    format and quality optimization.
4. Run `npm run db:migrate`, then `npm run db:seed`. Seeding adds the current
   catalogue—including the supplied product details—without overwriting
   existing products or prices.
5. Start the app and visit `/admin/login` to sign in. The protected dashboard
   is at `/admin`. Product edits and prices are
   saved in Neon and used by the public catalogue and product detail
   pages. An unset price is shown as “Price on request”.
6. In the dashboard, open **Categories** to add a category. It becomes
    available in the product form and as a filter on `/products`; published
    products appear in the public catalogue and their own detail pages.

The admin session is signed, HTTP-only, same-site, and expires after eight
hours. Admin APIs require a valid session; the login screen alone is not
access control.

The hero uses a looping, muted Pexels MP4 by default. Override it with your
own browser-accessible MP4 URL using `NEXT_PUBLIC_HERO_VIDEO_URL`. The existing
image remains visible underneath as the fallback. Use video media that you own
or are licensed to use.
