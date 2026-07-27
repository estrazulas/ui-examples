---
name: Luminous Fintech
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c7c6cd'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#909097'
  outline-variant: '#46464c'
  surface-tint: '#c2c6db'
  primary: '#c2c6db'
  on-primary: '#2b3040'
  primary-container: '#0a0f1e'
  on-primary-container: '#777b8e'
  inverse-primary: '#595e70'
  secondary: '#ffffff'
  on-secondary: '#283500'
  secondary-container: '#c3f400'
  on-secondary-container: '#556d00'
  tertiary: '#bcc7de'
  on-tertiary: '#263143'
  tertiary-container: '#051021'
  on-tertiary-container: '#717d92'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dee1f7'
  primary-fixed-dim: '#c2c6db'
  on-primary-fixed: '#161b2b'
  on-primary-fixed-variant: '#414658'
  secondary-fixed: '#c3f400'
  secondary-fixed-dim: '#abd600'
  on-secondary-fixed: '#161e00'
  on-secondary-fixed-variant: '#3c4d00'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  value-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  section-gap: 40px
---

## Brand & Style

This design system is built for high-performance financial management, blending a high-end "Dark Mode First" aesthetic with professional minimalism. The brand personality is precise, secure, and forward-thinking. It avoids the clutter of traditional banking in favor of a focused, data-centric interface where information density is low but information clarity is high.

The style leverages **Modern Minimalism** with a hint of **Glassmorphism**. It utilizes deep tonal layering to create a sense of architectural space, ensuring that financial values are the undisputed hero of every screen. The emotional response should be one of calm control and technological sophistication.

## Colors

The palette is anchored by a sophisticated **Deep Dark Blue** (#0A0F1E) which serves as the primary canvas. This creates a high-contrast environment for the **Vibrant Neon Green** (#CCFF00) accent, which is used sparingly for primary actions, success states, and growth indicators.

- **Primary Canvas**: The deep dark blue background provides a premium, low-strain reading environment.
- **Accent/Success**: The neon green is a high-visibility signal for prosperity and completion.
- **Surface Tones**: Tertiary blues (#1E293B) are used for card backgrounds and input fields to create depth against the primary canvas.
- **Typography**: Pure white (#FFFFFF) for headers, with muted slate neutrals (#94A3B8) for secondary data and labels.

## Typography

The system utilizes **Inter** for all primary interfaces due to its exceptional legibility and neutral, systematic tone. For data-heavy financial values or transaction IDs, a secondary monospaced font (**JetBrains Mono**) is introduced to provide a technical, "ledger-like" feel.

Financial values should be treated with distinct hierarchy:
- Use `display-lg` for primary account balances.
- Use `label-sm` in all-caps for micro-copy and metadata to create a professional, "dashboard" aesthetic.
- Tighten letter-spacing on larger headings to maintain a modern, compact appearance.

## Layout & Spacing

This design system follows a **fluid grid** model with generous margins to enforce a sense of luxury and breathing room. 

- **Grid**: A 12-column grid for desktop and a 4-column grid for mobile.
- **Whitespace**: Utilize a base-8 spacing scale. Avoid "crowding" financial data; use a minimum of `section-gap` between major functional blocks (e.g., between the Balance Summary and the Transaction List).
- **Alignment**: Standardize on left-alignment for text, but right-align numerical values in lists to allow for easy decimal comparison.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Soft Shadows** rather than heavy borders.

1.  **Level 0 (Base)**: The primary background (#0A0F1E).
2.  **Level 1 (Cards/Containers)**: Slightly lighter surface (#1E293B) with a 1px subtle stroke (10% white) to define edges.
3.  **Floating Elements**: Use "Ambient Shadows"—extra-diffused shadows with a 20% opacity of the primary background color, focused on the Y-axis to suggest a natural lift.

Avoid sharp drop-shadows; the transition between surfaces should feel organic and atmospheric.

## Shapes

The shape language is defined by **pronounced, friendly curves**. While the overall tone is professional, the `rounded-2xl` corners soften the technical edge of the app.

- **Cards/Buttons**: Utilize a consistent `1.5rem` (24px) corner radius.
- **Inputs**: Follow the same `1.5rem` radius to ensure harmony when stacked.
- **Icons**: Icons should be enclosed in circular or highly-rounded containers when used as success/status indicators.

## Components

### Buttons
- **Primary**: Full-width, neon green (#CCFF00) background with black text for maximum contrast. 24px corner radius.
- **Secondary**: Outlined or ghost style with white text, maintaining the same 24px radius.

### Financial Cards
- Use a subtle glassmorphism effect: 10% opacity white fill with a 20px backdrop blur to sit above the primary background. 

### Success States
- Use **Large Success Icons**: 64px+ oversized neon green icons to celebrate completed transactions.
- Pair with `display-lg` typography for the amount transferred.

### Input Fields
- Dark, recessed backgrounds (#161C2D).
- Neon green focus rings (2px width) to clearly indicate user interaction.

### Lists
- Transaction list items should have generous vertical padding (20px+) and use `label-sm` for dates/categories to keep the layout clean and scanable.