# SanAuto — website

A static one-page site (HTML + CSS + JS, no build step). Open `index.html` in a browser to view it locally.

```
index.html      page content
style.css       all styles
script.js       menu, animations, counters, photo gallery
images/         photos, logo.svg, favicon.svg
```

---

## 1. Publish on GitHub Pages

1. Sign in to github.com → **New repository** → name it e.g. `sanauto` → **Public** → **Create repository**.
2. On the empty repo page click **uploading an existing file**.
3. Drag in **the contents** of this folder (`index.html`, `style.css`, `script.js`, `README.md` and the `images` folder) — not the folder itself, so `index.html` sits at the top level of the repo. Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment* choose **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** → **Save**.
5. Wait 1–2 minutes and refresh that page. Your site will be at
   `https://YOUR-USERNAME.github.io/sanauto/`
6. Optional: to use your own domain (e.g. `sanauto.ru`), enter it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.

To update the site later: open a file on GitHub → pencil icon → edit → **Commit changes**. For photos, open the `images` folder → **Add file → Upload files** and upload a file with the **same name** to replace it.

---

## 2. Things you'll probably want to edit

| What | Where |
|---|---|
| Phone number | `index.html` — search for `+78121234567` (the call links) and `123-45-67` (the visible text) |
| Address / hours | `index.html` — footer section (`id="contacts"`) |
| Social links | `index.html` — the four links with `data-social="…"`; replace `href="#"` with your profile URL |
| Numbers (10+, 1 500+, 4.9) | `index.html` — `data-count="…"` **and** the visible number next to it |
| Colours / fonts | `style.css` — the variables at the top (`--red`, `--night`, …) |

All "Записаться онлайн" / "Оставить заявку" buttons call the phone number.

---

## 3. Better-quality photos (ChatGPT prompts)

The photos in `images/` were cut from the mockup and upscaled, so they look soft on big screens. Generate new ones with the prompts below, save them as **JPG with exactly the same file name**, and replace the old files. Nothing else needs to change.

Tips: ask for the exact aspect ratio, the largest size available, and "no text, no logos, no watermarks". Don't include text in images — the slogan and the red corner on the hero are drawn by the website itself.

### `hero-garage.jpg` — main banner · landscape 4:3 (≈ 1600×1250)
> Photorealistic wide interior shot of a modern, clean car service garage at night, cinematic and moody. A glossy white modern sedan (no visible brand badges) stands in the right half of the frame, front three-quarter view facing left, headlights on. A tall grey two-post car lift stands in the left third. Dark charcoal walls with bright linear LED ceiling lights, a strip of LED light along the back wall, tool cabinets with red drawers, blue lift columns and neatly hung tools. Wet polished concrete floor with soft reflections. The left third of the image is darker and less busy (room for text). Keep the upper-right part of the back wall plain and empty. Cool neutral tones with small red accents, high detail, sharp, 35mm lens, no people, no text, no watermark. Aspect ratio 4:3.

*(Optional: add "an illuminated SanAuto logo sign on the back wall, centre" if you want the wall sign — AI tools often misspell text, so check it.)*

### `service-diagnostics.jpg` — card photo · wide 2.2:1 (≈ 1760×800)
> Close-up photo of a mechanic's hands in dark grey work gloves checking a car engine bay with a diagnostic probe, dark navy work jacket sleeves, detailed engine parts and hoses, shallow depth of field, dark moody workshop lighting, photorealistic, no text. Wide 2.2:1 aspect ratio.

### `service-repair.jpg` — card photo · wide 2.2:1 (≈ 1760×800)
> Close-up photo of a mechanic's gloved hands (dark grey gloves) inspecting a car brake disc and caliper on a wheel hub with a tool, workshop blurred in the background, dark moody lighting with metallic highlights, photorealistic, no text. Wide 2.2:1 aspect ratio.

### `service-tires.jpg` — card photo · wide 2.2:1 (≈ 1760×800)
> Close-up photo of a mechanic's gloved hands (dark grey gloves) mounting a car wheel with a black alloy rim and a low-profile tyre, blue lift column on the right, blurred garage background, photorealistic, no text. Wide 2.2:1 aspect ratio.

### `why-wheel.jpg` — dark background · landscape 16:9 (≈ 1600×900)
> Very dark, low-key studio photo of a black car's front wheel with a multi-spoke alloy rim and red brake caliper, seen from the side, subtle rim light on the tyre and fender. Wheel placed in the right half; left half is almost pure black empty space. Minimal, elegant, photorealistic, no text. Aspect ratio 16:9.

### `work-1.jpg` … `work-4.jpg` — "Наши работы" gallery · 3:2 (≈ 1200×800)
Use a slightly more realistic, "real workshop phone photo" look for these:
1. **work-1.jpg**
   > Realistic photo of a white modern sedan (no brand badges) parked in a clean, bright auto repair bay next to a grey two-post lift, fluorescent ceiling lights, tool benches along the wall, 3:2.
2. **work-2.jpg**
   > Realistic photo of a steel workbench in an auto workshop with an open black socket-wrench set case, a few wrenches, a red tool tray and an orange tool rack on the wall, 3:2.
3. **work-3.jpg**
   > Realistic photo of a silver sedan raised on a blue two-post lift in a car repair workshop, underside visible, grey and white walls, fluorescent lights, 3:2.
4. **work-4.jpg**
   > Realistic close-up photo of a brake disc replacement on a lifted car, gloved hand holding a tool near the hub, suspension parts visible, blue lift in the blurred background, 3:2.

### `cta-car.jpg` — booking banner · landscape 16:9 (≈ 1600×900)
> Dramatic close-up of the rear of a dark graphite modern car (no badges) with a glowing red LED tail light, glossy paint reflections, black background. Car fills the left two thirds; the right side fades into pure black. Photorealistic, no text. Aspect ratio 16:9.

---

## 4. Logo

`images/logo.svg` is a vector (sharp at any size) redraw of the mockup logo; `images/favicon.svg` is the browser-tab icon. If you have the original logo file, replace `logo.svg` with it — or save it as `logo.png` and change `images/logo.svg` to `images/logo.png` in `index.html` (2 places).

//Test
