# Hospital purple theme and Hero Slider

Implemented in the existing projects:

- `kohchang-hospital-web`: Next.js App Router, React, Tailwind. Thai/English routes and database-driven content remain intact.
- `kohchang-hospital-login`: existing React/Vite admin, React Router, Axios/Sanctum session.
- `kohchang-hospital-api`: Laravel/Eloquent, existing public storage disk. No auth changes or new runtime dependencies.

## Administration

Sign in to the existing admin application, then choose **จัดการเว็บไซต์ · Hero Slider** (`/hero-sliders`).

1. Add a desktop image. Optionally add a separate mobile composition.
2. Set title, description, image alt text, optional button label/URL, text alignment, overlay, order and active status.
3. Preview the image and save. Use the up/down buttons to persist ordering immediately.
4. Disabled slides remain editable but are never returned by the public endpoint.
5. Deleting asks for confirmation. Replacing/removing images cleans up files after the database operation succeeds. Shared paths are retained until no slide references them.

JPG/JPEG, PNG and WebP are accepted, up to 5 MiB per source image and 8000 pixels per dimension. The admin resizes desktop images to at most 1920px wide and mobile images to 960px wide (height capped at 2400px), and prefers WebP when smaller or resizing is necessary. No image library is downloaded by the browser. Server validation independently checks file contents, dimensions, size, URLs and field values. Recommended compositions: desktop 1920×800, mobile 750×1000. Images are centered and cover the hero; preview compositions at each target size to avoid cropping important subjects.

Links may be HTTP(S) URLs or site paths starting with a single `/`. Script/data URLs, protocol-relative URLs, backslashes and whitespace are rejected. Slide copy is shared across the two languages; the pre-existing welcome hero remains localized when no active slides exist.

## Deployment

In the API project:

```sh
php artisan migrate --path=database/migrations/2026_09_22_000000_create_hero_sliders_table.php
php artisan storage:link
```

The migration has been applied to the local configured database. The local public storage link already exists. On other deployments ensure the web server can write `storage/app/public/hero-sliders`, `APP_URL` points to the API origin, and `/storage` serves that disk. Set PHP `upload_max_filesize` to at least `5M` and `post_max_size` above both images plus form fields (for example `12M`); apply equivalent reverse-proxy request limits. These server settings are not changed by this feature.

Build both frontend projects using `npm run build`. Keep `NEXT_PUBLIC_API_URL` (public site) and `VITE_API_URL` (admin origin, without `/api`) pointed to the same API. Sanctum/CSRF configuration remains unchanged. The project currently treats authenticated admin-session users as authorized editors, matching other protected management endpoints.

## Behavior

- Shared purple tokens drive public surfaces and the existing admin primary palette.
- Navigation uses a single explicit open state. Item selection, outside click, Escape, breakpoint changes and route changes close menus. Mobile uses touch-friendly accordion buttons and a keyboard focus loop.
- The hero advances every six seconds, wraps, supports arrows/dots and horizontal touch swipes. Interaction restarts its timer. Hover, keyboard focus, hidden tabs and explicit pause stop autoplay. Reduced-motion preference disables autoplay and transitions.
- Only current/next and previously loaded first-slide image elements are mounted. The first image gets high fetch priority; the next slide is prepared without loading all full-resolution slides. `<picture>` selects the mobile image when supplied.
- Grid-based slides reserve the height of the tallest content, preventing image layout shifts and text clipping. The welcome image has optimized desktop/mobile WebP versions (162 KB / 42 KB versus the original 1.97 MB).
- White text is protected by a directional purple overlay or a dark text panel when the overlay is disabled.

## Verification (2026-09-22)

- Public and admin production builds pass.
- Laravel Hero API suite: `php artisan test --filter HeroSliderApiTest` passes (7 tests, 60 assertions). Uses isolated SQLite and fake storage, with real JPEG/PNG/WebP fixtures; no GD extension required.
- Complete existing API suite: 33 pass, one pre-existing `ExampleTest` fails because it expects HTTP 200 at `/`, which has no API root route. No root route was added solely to satisfy this unrelated test.
- Eighteen public routes returned HTTP 200, including both home languages, all top-level navigation destinations/subpages and policy pages.
- Browser: desktop dropdown open, exclusive state, outside click, Escape, navigation closure; mobile accordion and navigation closure verified.
- Browser: real carousel component tested with temporary QA slides for autoplay, pause, previous/next and dots; no real slides were added to the live database. Touch swipe logic is implemented but physical touch-device testing remains recommended.
- Public hero and admin listing measured at 1440, 1280, 1024, 768, 430, 390 and 375px with no horizontal overflow. Mobile image and admin form preview visually inspected.
- Actual admin component tested through upload/preview, save, edit, enable/disable, reorder, cancel-delete and confirm-delete using an isolated in-memory API adapter. This complements authenticated Laravel integration tests; a real signed-in browser upload against the live API remains a final manual check.
- Temporary QA pages/adapters are removed before delivery. No sample slides or users are seeded into the live database.
