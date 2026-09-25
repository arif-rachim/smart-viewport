# Smart Viewport

Smart Viewport is a small React experiment from April 2020 that works out how to tile a changing number of media boxes so that together they fill the screen, the way a video-call app lays out participant tiles. The screen is a flex container that wraps into rows in landscape and into columns in portrait, and a lookup table picks how many boxes go on each row (for example 2 for four boxes, 3 for nine, 5 for ten, and 5 for anything above 18). Inside each box the content is scaled with a "cover" rule, so it fills the box completely, stays centred and keeps its aspect ratio, with a 300 ms CSS transition whenever the layout changes. The demo fills the boxes with a sample image and has buttons to add, remove and re-fit them. It was bootstrapped with Create React App and uses Material-UI buttons and sliders. It is a prototype for trying out the layout algorithm, not a packaged library, and it is not maintained.

> Status: prototype from 2020, not actively maintained.

**Live demo:** https://www.rach.im/smart-viewport/

## Features

- Responsive grid for 1 to N boxes: rows in landscape, columns in portrait, recalculated on window resize.
- Boxes-per-row lookup for 1 to 18 boxes, with a default of 5 beyond that.
- "Cover" scaling of each box's content (`scale = max(boxWidth / contentWidth, boxHeight / contentHeight)`), centred with absolute positioning.
- Animated transitions (`transition: all 300ms ease-in-out`) when boxes are added, removed or resized.
- Demo controls: **Add**, **Remove** and **Update** (re-fit all boxes).
- Workarounds for iOS pinch-zoom and double-tap zoom.
- A `useContentFiller` hook and a `ContentFillerTestScreen` with sliders for testing the fill algorithm on its own (not mounted by the app).

## Tech stack

React 16 · Create React App (react-scripts 3.4) · Material-UI 4 · CSS Modules · GitHub Pages

## Getting started

Prerequisites: Node.js and npm.

```bash
npm install
npm start      # dev server on http://localhost:3000
npm test       # CRA test runner (the repo has no test files)
npm run build  # production build, then renames build/ to docs/
```

The `build` script runs `react-scripts build && rename build docs`. `rename` is the Windows command; on macOS or Linux, run `npx react-scripts build && rm -rf docs && mv build docs` instead. The committed `docs/` folder is the build served by GitHub Pages.

## Project structure

```text
src/
  App.js                        Demo page: creates image boxes and the Add / Remove / Update buttons
  MobileScreen.js               Grid layout, boxes-per-row table and content fill logic
  MobileScreen.module.css       Box (viewport) styles
  hooks/useContentFiller.js     Reusable hook version of the fill algorithm
  hooks/ContentFillerTestScreen.js  Slider-based test screen for the hook
public/                         CRA public assets, including the sample image pics.jpg
docs/                           Built site published to GitHub Pages
```

## How it works

1. `MobileScreen` measures its container and treats the screen as landscape when width is greater than height.
2. `calculateBoxPerRow(n)` picks the number of boxes per row (or per column in portrait), and each box gets `100 / boxPerRow` percent of the width (landscape) or height (portrait), with `flex-grow: 1` spreading any leftover space.
3. Each box is a DOM element appended into its tile. `updateAllViewports()` re-scales every tile's first child to cover the tile. It runs when the aspect ratio or box count changes, when a sample image finishes loading (through `window.updateMobileScreenViewPorts`), and when **Update** is pressed.

## Limitations

- Content is plain DOM nodes built with `innerHTML`, not React components, and only a sample image is used; no real video streams are wired in.
- `package.json` still has `"homepage": "https://marsa-emreef.github.io/smart-viewport"`, an old address that is no longer online. It only sets the `/smart-viewport` base path for the build.
