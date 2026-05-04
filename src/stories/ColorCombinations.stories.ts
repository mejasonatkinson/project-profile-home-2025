import type { Meta, StoryObj } from '@storybook/vue3'

type ModeId = 'light' | 'dark'
type Restriction = 'all' | 'standard-text'

type ColourToken = 'off-white' | 'off-black' | 'yellow' | 'red' | 'teal'

type Combination = {
  id: string
  name: string
  background: ColourToken
  foreground: ColourToken
}

type ContrastBadge = {
  label: string
  threshold: number
  ratio: number
  pass: boolean
}

type DisplayCard = {
  id: string
  name: string
  backgroundClass: string
  foregroundClass: string
  backgroundHex: string
  foregroundHex: string
  badges: ContrastBadge[]
  restriction: Restriction | null
}

const TOKEN_BACKGROUND_CLASS: Record<ColourToken, string> = {
  'off-white': 'bg-color-off-white',
  'off-black': 'bg-color-off-black',
  yellow: 'bg-color-yellow',
  red: 'bg-color-red',
  teal: 'bg-color-teal'
}

const TOKEN_FOREGROUND_CLASS: Record<ColourToken, string> = {
  'off-white': 'text-color-off-white',
  'off-black': 'text-color-off-black',
  yellow: 'text-color-yellow',
  red: 'text-color-red',
  teal: 'text-color-teal'
}

const LIGHT_TOKEN_HEX: Record<ColourToken, string> = {
  'off-white': '#F5F5F5',
  'off-black': '#141414',
  yellow: '#FFAA01',
  red: '#FE0000',
  teal: '#009899'
}

const DARK_TOKEN_HEX: Record<ColourToken, string> = {
  'off-white': '#F5F5F5',
  'off-black': '#1E1E1E',
  yellow: '#DAA520',
  red: '#DC143C',
  teal: '#006666'
}

const COMBINATIONS: Combination[] = [
// ink on paper
  {
    id: 'ink-on-paper',
    name: 'Ink on Paper',
    background: 'off-white',
    foreground: 'off-black'
  },
// yellow on paper
  {
    id: 'yellow-on-paper',
    name: 'Yellow on Paper',
    background: 'off-white',
    foreground: 'yellow'
  },
// red on paper
  {
    id: 'red-on-paper',
    name: 'Red on Paper',
    background: 'off-white',
    foreground: 'red'
  },
// teal on paper
  {
    id: 'teal-on-paper',
    name: 'Teal on Paper',
    background: 'off-white',
    foreground: 'teal'
  },
// paper on ink
  {
    id: 'paper-on-ink',
    name: 'Paper on Ink',
    background: 'off-black',
    foreground: 'off-white'
  },
// yellow on ink
  {
    id: 'yellow-on-ink',
    name: 'Yellow on Ink',
    background: 'off-black',
    foreground: 'yellow'
  },
// red on ink
  {
    id: 'red-on-ink',
    name: 'Red on Ink',
    background: 'off-black',
    foreground: 'red'
  },
// teal on ink
  {
    id: 'teal-on-ink',
    name: 'Teal on Ink',
    background: 'off-black',
    foreground: 'teal'
  },
// paper on yellow
  {
    id: 'paper-on-yellow',
    name: 'Paper on Yellow',
    background: 'yellow',
    foreground: 'off-white'
  },
// ink on yellow
  {
    id: 'ink-on-yellow',
    name: 'Ink on Yellow',
    background: 'yellow',
    foreground: 'off-black'
  },
// red on yellow
  {
    id: 'red-on-yellow',
    name: 'Red on Yellow',
    background: 'yellow',
    foreground: 'red'
  },
// teal on yellow
  {
    id: 'teal-on-yellow',
    name: 'Teal on Yellow',
    background: 'yellow',
    foreground: 'teal'
  },
// paper on red
  {
    id: 'paper-on-red',
    name: 'Paper on Red',
    background: 'red',
    foreground: 'off-white'
  },
// ink on red
  {
    id: 'ink-on-red',
    name: 'Ink on Red',
    background: 'red',
    foreground: 'off-black'
  },
// yellow on red
  {
    id: 'yellow-on-red',
    name: 'Yellow on Red',
    background: 'red',
    foreground: 'yellow'
  },
// teal on red
  {
    id: 'teal-on-red',
    name: 'Teal on Red',
    background: 'red',
    foreground: 'teal'
  },
// paper on teal
  {
    id: 'paper-on-teal',
    name: 'Paper on Teal',
    background: 'teal',
    foreground: 'off-white'
  },
// ink on teal
  {
    id: 'ink-on-teal',
    name: 'Ink on Teal',
    background: 'teal',
    foreground: 'off-black'
  },
// yellow on teal
  {
    id: 'yellow-on-teal',
    name: 'Yellow on Teal',
    background: 'teal',
    foreground: 'yellow'
  },
// red on teal
  {
    id: 'red-on-teal',
    name: 'Red on Teal',
    background: 'teal',
    foreground: 'red'
  },
]

const RESTRICTIONS: Partial<Record<string, Partial<Record<ModeId, Restriction>>>> = {
  'yellow-on-paper':  { light: 'all',           dark: 'all' },
  'red-on-paper':     { light: 'standard-text' },
  'teal-on-paper':    { light: 'standard-text' },
  'red-on-ink':       {                          dark: 'standard-text' },
  'teal-on-ink':      {                          dark: 'all' },
  'paper-on-yellow':  { light: 'all',           dark: 'all' },
  'red-on-yellow':    { light: 'all',           dark: 'all' },
  'teal-on-yellow':   { light: 'all',           dark: 'standard-text' },
  'paper-on-red':     { light: 'standard-text' },
  'ink-on-red':       {                          dark: 'standard-text' },
  'yellow-on-red':    { light: 'all',           dark: 'all' },
  'teal-on-red':      { light: 'all',           dark: 'all' },
  'paper-on-teal':    { light: 'standard-text' },
  'ink-on-teal':      {                          dark: 'all' },
  'yellow-on-teal':   { light: 'all',           dark: 'standard-text' },
  'red-on-teal':      { light: 'all',           dark: 'all' },
}

const MODE_META: Record<ModeId, { title: string; wrapperClass: string }> = {
  light: {
    title: 'Light Mode',
    wrapperClass: 'space-y-4 rounded-xl border border-black/10 bg-white p-4 shadow-sm md:p-5'
  },
  dark: {
    title: 'Dark Mode (.dark)',
    wrapperClass: 'dark space-y-4 rounded-xl border border-white/20 bg-[#1E1E1E] text-white p-4 shadow-sm md:p-5'
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '')
  const bigint = Number.parseInt(normalized, 16)

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  const channels = [r, g, b].map((channel) => {
    const sRgb = channel / 255
    return sRgb <= 0.03928 ? sRgb / 12.92 : ((sRgb + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrastRatio(backgroundHex: string, foregroundHex: string): number {
  const bg = relativeLuminance(backgroundHex)
  const fg = relativeLuminance(foregroundHex)
  const lighter = Math.max(bg, fg)
  const darker = Math.min(bg, fg)

  return (lighter + 0.05) / (darker + 0.05)
}

function createBadges(ratio: number): ContrastBadge[] {
  const checks: Array<{ label: string; threshold: number }> = [
    { label: 'Large text (AA)', threshold: 3 },
    { label: 'Standard text (AA)', threshold: 4.5 },
    { label: 'Icons / UI graphics (AA)', threshold: 3 }
  ]

  return checks.map((check) => ({
    label: check.label,
    threshold: check.threshold,
    ratio,
    pass: ratio >= check.threshold
  }))
}

function createCards(combinations: Combination[], mode: ModeId): DisplayCard[] {
  const tokens = mode === 'light' ? LIGHT_TOKEN_HEX : DARK_TOKEN_HEX

  return combinations.map((combo) => {
    const backgroundHex = tokens[combo.background]
    const foregroundHex = tokens[combo.foreground]
    const ratio = contrastRatio(backgroundHex, foregroundHex)

    return {
      id: combo.id,
      name: combo.name,
      backgroundClass: TOKEN_BACKGROUND_CLASS[combo.background],
      foregroundClass: TOKEN_FOREGROUND_CLASS[combo.foreground],
      backgroundHex,
      foregroundHex,
      badges: createBadges(ratio),
      restriction: RESTRICTIONS[combo.id]?.[mode] ?? null
    }
  })
}

function renderThemeComparison(combinations: Combination[], args: Record<string, unknown>) {
  return {
    setup() {
      return {
        lightCards: createCards(combinations, 'light'),
        darkCards: createCards(combinations, 'dark'),
        lightMeta: MODE_META.light,
        darkMeta: MODE_META.dark,
        args
      }
    },
    template: `
      <div class="min-h-screen bg-neutral-200 p-6 md:p-10">
        <div class="mx-auto max-w-7xl space-y-6">
          <header class="space-y-2 rounded-xl bg-white p-5 shadow-sm">
            <h1 class="font-secondary text-2xl font-extrabold text-Colour-off-black md:text-3xl">
              Light and Dark Colour Combinations
            </h1>
            <p class="font-primary text-sm text-Colour-off-black/80 md:text-base">
              Compare each pairing with live contrast ratios and WCAG AA checks for large text, standard text, and icons.
            </p>
            <p class="font-primary text-xs text-Colour-off-black/70 md:text-sm">
              Storybook Accessibility addon (axe-core) is enabled. Open the A11y panel to run automated checks on each story.
            </p>
          </header>

          <div :class="args.mode === 'both' ? 'grid gap-6 lg:grid-cols-2' : 'grid gap-6'">
            <section v-if="args.mode !== 'dark'" :class="lightMeta.wrapperClass">
              <h2 class="font-secondary text-xl font-bold text-Colour-off-black">{{ lightMeta.title }}</h2>

              <div class="grid gap-4">
                <article
                  v-for="card in lightCards"
                  :key="'light-' + card.id"
                  :class="[card.backgroundClass, card.foregroundClass]"
                  class="rounded-lg p-4 shadow-sm"
                >
                  <p class="font-secondary text-sm font-extrabold tracking-wide uppercase ">{{ card.name }}</p>
                  <p class="font-primary mt-1 text-xs ">BG {{ card.backgroundHex }} / FG {{ card.foregroundHex }}</p>
                  <h3 class="font-secondary mt-2 text-3xl font-extrabold leading-tight md:text-4xl">Large Heading Aa</h3>
                  <p class="font-primary mt-2 text-base md:text-lg">Standard paragraph text for readability checks.</p>

                  <div class="mt-4 flex items-center gap-4">
                    <i class="fa-solid fa-star text-3xl" aria-hidden="true"></i>
                    <i class="fa-solid fa-bolt text-4xl" aria-hidden="true"></i>
                    <span class="font-primary text-sm">Icons: standard and large</span>
                  </div>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="badge in card.badges"
                      :key="'light-' + card.id + '-' + badge.label"
                      :class="badge.pass ? 'bg-green-800 text-white' : 'bg-red-800 text-white'"
                      class="rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {{ badge.label }}: {{ badge.ratio.toFixed(2) }}:1 ({{ badge.pass ? 'PASS' : 'FAIL' }})
                    </span>
                  </div>

                  <div v-if="card.restriction" class="mt-3 rounded-md bg-black/80 px-3 py-2 text-white" role="alert">
                    <p class="font-primary text-xs font-bold">
                      ⛔ Do not use for {{ card.restriction === 'all' ? 'any text' : 'standard body text' }} — WCAG AA fail
                    </p>
                  </div>
                </article>
              </div>
            </section>

            <section v-if="args.mode !== 'light'" :class="darkMeta.wrapperClass">
              <h2 class="font-secondary text-xl font-bold text-Colour-off-white">{{ darkMeta.title }}</h2>

              <div class="grid gap-4">
                <article
                  v-for="card in darkCards"
                  :key="'dark-' + card.id"
                  :class="[card.backgroundClass, card.foregroundClass]"
                  class="rounded-lg p-4 shadow-sm"
                >
                  <p class="font-secondary text-sm font-extrabold tracking-wide uppercase ">{{ card.name }}</p>
                  <p class="font-primary mt-1 text-xs ">BG {{ card.backgroundHex }} / FG {{ card.foregroundHex }}</p>
                  <h3 class="font-secondary mt-2 text-3xl font-extrabold leading-tight md:text-4xl">Large Heading Aa</h3>
                  <p class="font-primary mt-2 text-base md:text-lg">Standard paragraph text for readability checks.</p>

                  <div class="mt-4 flex items-center gap-4">
                    <i class="fa-solid fa-circle text-xl" aria-hidden="true"></i>
                    <i class="fa-solid fa-star text-3xl" aria-hidden="true"></i>
                    <i class="fa-solid fa-bolt text-4xl" aria-hidden="true"></i>
                    <span class="font-primary text-sm">Icons: standard and large</span>
                  </div>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="badge in card.badges"
                      :key="'dark-' + card.id + '-' + badge.label"
                      :class="badge.pass ? 'bg-green-800 text-white' : 'bg-red-800 text-white'"
                      class="rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {{ badge.label }}: {{ badge.ratio.toFixed(2) }}:1 ({{ badge.pass ? 'PASS' : 'FAIL' }})
                    </span>
                  </div>

                  <div v-if="card.restriction" class="mt-3 rounded-md bg-black/80 px-3 py-2 text-white" role="alert">
                    <p class="font-primary text-xs font-bold">
                      ⛔ Do not use for {{ card.restriction === 'all' ? 'any text' : 'standard body text' }} — WCAG AA fail
                    </p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    `
  }
}

type ColourStoryArgs = { mode: 'both' | 'light' | 'dark' }

const meta: Meta<ColourStoryArgs> = {
  title: 'Theme/Brand Colour Combinations',
  argTypes: {
    mode: {
      name: 'Mode',
      description: 'Show light mode, dark mode, or both side by side.',
      control: { type: 'radio' },
      options: ['both', 'light', 'dark']
    }
  },
  args: {
    mode: 'both'
  },
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [{ id: 'Colour-contrast', enabled: true }]
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const a11yParams = {
  a11y: { config: { rules: [{ id: 'Colour-contrast', enabled: true }] } }
}

export const AllCombinationsMatrix: Story = {
  name: 'All Combinations',
  args: { mode: 'both' },
  render: (args) => renderThemeComparison(COMBINATIONS, args)
}

export const InkOnPaper: Story = {
  name: 'Ink on Paper',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[0]], args)
}

export const YellowOnPaper: Story = {
  name: 'Yellow on Paper',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[1]], args)
}

export const RedOnPaper: Story = {
  name: 'Red on Paper',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[2]], args)
}

export const TealOnPaper: Story = {
  name: 'Teal on Paper',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[3]], args)
}

export const PaperOnInk: Story = {
  name: 'Paper on Ink',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[4]], args)
}

export const YellowOnInk: Story = {
  name: 'Yellow on Ink',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[5]], args)
}

export const RedOnInk: Story = {
  name: 'Red on Ink',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[6]], args)
}

export const TealOnInk: Story = {
  name: 'Teal on Ink',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[7]], args)
}

export const PaperOnYellow: Story = {
  name: 'Paper on Yellow',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[8]], args)
}

export const InkOnYellow: Story = {
  name: 'Ink on Yellow',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[9]], args)
}

export const RedOnYellow: Story = {
  name: 'Red on Yellow',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[10]], args)
}

export const TealOnYellow: Story = {
  name: 'Teal on Yellow',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[11]], args)
}

export const PaperOnRed: Story = {
  name: 'Paper on Red',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[12]], args)
}

export const InkOnRed: Story = {
  name: 'Ink on Red',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[13]], args)
}

export const YellowOnRed: Story = {
  name: 'Yellow on Red',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[14]], args)
}

export const TealOnRed: Story = {
  name: 'Teal on Red',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[15]], args)
}

export const PaperOnTeal: Story = {
  name: 'Paper on Teal',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[16]], args)
}

export const InkOnTeal: Story = {
  name: 'Ink on Teal',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[17]], args)
}

export const YellowOnTeal: Story = {
  name: 'Yellow on Teal',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[18]], args)
}

export const RedOnTeal: Story = {
  name: 'Red on Teal',
  args: { mode: 'both' },
  parameters: a11yParams,
  render: (args) => renderThemeComparison([COMBINATIONS[19]], args)
}