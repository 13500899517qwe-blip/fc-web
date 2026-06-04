# i18n & translation decisions (2026-06-04)

## URL pattern

- **Chosen:** All 8 locales use path prefix (`localePrefix: 'always'`).
- Examples: `/en/products`, `/fr/products`, `/ar/products`
- Default locale: `en` (root `/` redirects to `/en` via middleware).
- Rationale: Consistent hreflang, simpler middleware, no special-case for English.

## Machine translation

- **Primary:** Google Cloud Translation API v2 (`GOOGLE_TRANSLATE_API_KEY` or service account).
- **Optional override:** DeepL (`DEEPL_API_KEY`) when set — used for European locales if configured.
- **SKU / Part Number / spec tables:** Never auto-translated.
- **Footer:** Non-`en` locales show: *"Auto-translated — contact us for details."*

## Inquiry attachments

- **Phase 1:** No file uploads.
- **Phase 2:** PDF/JPG on inquiry form (planned).

## Locales

`en`, `fr`, `de`, `es`, `ru`, `ja`, `ar`, `pt` — `ar` uses RTL (`dir="rtl"`).
