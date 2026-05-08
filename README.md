## Overview

This is the main landing page for my personal website. It’s a simple, one-page site designed to link to my social media accounts and online presence, providing an easy way for people to contact me while I look for work opportunities.

**URL:** [https://jasonatkinson.co.uk/](https://jasonatkinson.co.uk/)

**Technologies Used:** Vue 3, TypeScript, Vite, TailwindCSS

**Plans:** I plan to introduce more sections to the landing page and link to additional micro-sites.

1. Complete Storybook Component Stories

You have the color story and a11y addon set up, but no individual component stories yet. Since you're an accessibility consultant/developer, a complete Storybook showcasing your atoms, molecules, and organisms with WCAG checks is a direct, linkable portfolio artifact — it shows your craft rather than just claiming it.

2. Skills Section

Your site is polished with projects, services, testimonials, and bio — but no explicit Skills section. This is one of the first things recruiters and hiring managers scan for. It's a self-contained addition using your existing siteContent.ts + component pattern.

3. Contact Form

The Contact section currently only has social link icons. A form reduces friction for hiring managers who don't want to leave the page. You can connect it to a free service (Formspree, Netlify Forms, or EmailJS) without a backend — aligns with the Contact Form (Section || Page) item already in your README plans.

- [ ] Readout loud feature (api)
- [ ] Update About image (Quality - Look - Feel)
- [ ] About (Page)
- [ ] Easter Eggs (Section): Just for fun! (But keeping it accessible)
- [ ] Services (Micro Site)
- [ ] Projects (Micro Site)
- [ ] Blog (Micro Site)
- [ ] Blog (Section)
- [ ] Certifications and Awards (Section)
- [ ] Workshops & Talks (Section)
- [ ] Open Source Contributions (Section)
- [ ] Community Involvement (Section)
- [ ] Personal Projects (Section)
- [ ] Art Sketchbook
- [ ] Add Instagram
- [ ] Download Resume (Section)
- [ ] Frequently Asked Questions (Section)
- [ ] Newsletter Sign Up (Section)

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
