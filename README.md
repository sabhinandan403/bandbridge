# BandBridge

A responsive React and JavaScript coaching site, modelled on the public course and demo-booking flow of ForeignPrep. BandBridge is a working name. The demo enquiry stays in browser memory and is cleared when the dialog closes. It sends nothing and reserves no appointment. The results page displays a labelled sample.

## Run locally

Use Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to create the production bundle in `dist/`, or `npm run preview` to serve it locally. Routes use URL hashes so static hosting can serve every page from the same HTML file.

Course descriptions and FAQs are in `src/content.js`. The colour palette is defined at the top of `src/styles.css`.

## Publish on GitHub Pages

Put this folder's contents in the root of a GitHub repository on the `main` branch. In the repository's **Settings → Pages**, choose **GitHub Actions** as the source. In the **Actions** tab, run **Publish BandBridge to GitHub Pages** for the first release. The workflow also publishes on future pushes to `main`.

The build uses relative asset paths, so it works under a repository path such as `/bandbridge/`. The deployment job reports the published URL.
