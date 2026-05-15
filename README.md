## Overview

This is the main landing page for my personal website. It’s a simple, one-page site designed to link to my social media accounts and online presence, providing an easy way for people to contact me while I look for work opportunities.

**URL:** [https://jasonatkinson.co.uk/](https://jasonatkinson.co.uk/)

## Easter Eggs

The homepage includes a few hidden interactions that are meant to stay subtle and accessible.

### How to open them

- Accessibility Inspector: press `Ctrl + Shift + A` on Windows/Linux or `Cmd + Shift + A` on macOS while the page has focus.
- Bonus hero roles: type `jason` anywhere on the page, outside of form fields.
- Creative Mode: type `creative` anywhere on the page, outside of form fields.

### How to disable them

The easter eggs are controlled by a master reactive flag in `src/components/5-pages/SingleSitePage.vue`. Set `state.easterEggsEnabled` to `false` to disable the shortcuts and hide any active easter egg UI while the page is running.





1. Complete Storybook Component Stories

You have the color story and a11y addon set up, but no individual component stories yet. Since you're an accessibility consultant/developer, a complete Storybook showcasing your atoms, molecules, and organisms with WCAG checks is a direct, linkable portfolio artifact — it shows your craft rather than just claiming it.






## Recommended Setup

- [VS Code](https://code.visualstudio.com/)

## Commands Run

- `npm create vite@latest`
  - `Project name: template-vuets`
  - `Select a framework: Vue`
  - `Select a variant: TypeScript`

## Installation Instructions

To install the project dependencies, run:

```sh
npm install
```

To start the development server, run:

```sh
npm run dev
```

## Storybook (Component Library)

Storybook is set up alongside the website so you can build and review UI components in isolation.

### Start Storybook

```sh
npm run storybook
```

Storybook runs at:

```text
http://localhost:6006
```

### Build Static Storybook

```sh
npm run build-storybook
```

### Story Location Convention

No components or stories have been added yet.

When you are ready, add story files under `src` using this naming pattern:

- `*.stories.ts`
- `*.stories.tsx`
- `*.stories.js`
- `*.stories.jsx`
- `*.mdx`
