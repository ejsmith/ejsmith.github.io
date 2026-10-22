# ericjsmith.dev

Personal site for Eric J. Smith. Plain Jekyll, built by GitHub Pages; no build tooling.

- Sections live in `_includes/`, project cards in `_data/projects.yml`.
- Styles are hand-written in `assets/css/main.css`; behavior in `assets/js/main.js`.
- The résumé is `resume/index.html`. `assets/resume.pdf` is printed from that page.

## Preview locally

```sh
docker run --rm -v "$PWD":/srv/jekyll -p 4000:4000 jekyll/jekyll:pages jekyll serve
```

## Regenerate the résumé PDF

After editing `resume/index.html`, serve the site and print the page with any Chromium:

```sh
chromium --headless --no-pdf-header-footer --print-to-pdf=assets/resume.pdf http://localhost:4000/resume/
```

The print styles in `main.css` (the `@media print` block) keep it to two Letter pages.

## Email address

The address is never stored in plain text, to keep it away from scrapers. `_config.yml` holds `email_encoded`, which is
the address reversed and then ROT13-encoded. `assets/js/main.js` decodes it into any `[data-email]` link in the
browser. Without JavaScript, those links fall back to LinkedIn. To change the address:

```sh
python3 -c "import codecs,sys; print(codecs.encode(sys.argv[1][::-1], 'rot13'))" you@example.com
```
