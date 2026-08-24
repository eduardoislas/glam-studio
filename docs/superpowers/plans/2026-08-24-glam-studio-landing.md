# Glam Studio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, mobile-first Angular landing page for Glam Studio (makeup & hair studio, Cd. Obregón) whose only call to action is booking an appointment via WhatsApp.

**Architecture:** Angular standalone components, one per landing-page section, under `glam-studio/src/app/sections/`. Each section's copy/data lives in a sibling `*.data.ts` file so content can be edited without touching template or logic. A single `contact.data.ts` is the source of truth for the WhatsApp link, Instagram handle, address, hours, and map URL, consumed by every section that needs a CTA or contact info.

**Tech Stack:** Angular (latest via `@angular/cli`), TypeScript, SCSS (no Tailwind/Material), Karma + Jasmine (Angular CLI default test runner), no backend/routing/CMS.

**Spec:** `docs/superpowers/specs/2026-08-24-glam-studio-landing-design.md`

## Global Constraints

- WhatsApp booking link (single source of truth): `https://wa.link/yyturk`
- Instagram: `@glamstudio.mx_` — `https://www.instagram.com/glamstudio.mx_/`
- Address: `Av. Nainari 1730, Urb. No. 6, 85110 Cd. Obregón, Son.`
- Hours: `Lunes a sábado, 9:00am – 7:00pm`
- Map coordinates: `27.4999502, -109.9575301`
- Brand colors: black `#0a0a0a`, white `#fdfdfd`, gold accent `#c9a24b`
- Fonts: serif for headings (`Cormorant Garamond`), sans for body (`Jost`)
- No backend, no Angular Router, no CMS, no fabricated testimonials
- Mobile-first, fully responsive
- Static site only — no hosting/CI configuration in this plan

---

## Task 1: Scaffold Angular project and brand foundation

**Files:**
- Create: `glam-studio/` (new Angular workspace, via Angular CLI)
- Modify: `glam-studio/src/index.html`
- Create: `glam-studio/src/styles/_tokens.scss`
- Modify: `glam-studio/src/styles.scss`
- Create: `glam-studio/public/logo.png` (real brand asset, copied from user-provided file)
- Modify: `glam-studio/angular.json` (only if the asset directory needs fixing — see Step 5)

**Interfaces:**
- Produces: CSS custom properties `--color-black`, `--color-white`, `--color-gold`, `--font-serif`, `--font-sans` available globally to every component's SCSS. A global `.btn-primary` class and `.section` layout class available globally.
- Produces: static assets served from the workspace's `public/` directory, referenced by later tasks as root-relative paths (e.g. `/logo.png`).

- [ ] **Step 1: Scaffold the workspace**

```bash
cd /Users/eduardoislas/projects/personal/makeup
npx -y @angular/cli@latest new glam-studio --style=scss --routing=false --ssr=false --skip-git --package-manager=npm
```

Answer any interactive prompt not covered by flags with the default option.

- [ ] **Step 2: Verify the static assets directory**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
ls public 2>/dev/null && echo "HAS_PUBLIC" || echo "NO_PUBLIC"
grep -A2 '"assets"' angular.json
```

If `HAS_PUBLIC` printed and `angular.json` already lists an entry like
`{ "glob": "**/*", "input": "public" }` inside `build.options.assets`,
nothing to change — continue to Step 3.

If `NO_PUBLIC` printed instead (older CLI scaffold using `src/assets`),
create the directory and wire it up:

```bash
mkdir -p public
```

Then edit `angular.json`, inside the `build` target's `options.assets`
array, add:

```json
{ "glob": "**/*", "input": "public" }
```

All later tasks in this plan assume assets live under `public/` and are
referenced as root-relative paths (e.g. `src="/logo.png"`). Keep that
consistent regardless of which branch above you took.

- [ ] **Step 3: Copy the real brand logo into the project**

```bash
cp /Users/eduardoislas/.claude/image-cache/ea25dda2-0c74-4680-af0a-80b43f40cfdd/2.png \
   /Users/eduardoislas/projects/personal/makeup/glam-studio/public/logo.png
```

- [ ] **Step 4: Add brand fonts and title to `index.html`**

Edit `glam-studio/src/index.html`, replace the `<head>` contents with:

```html
<head>
  <meta charset="utf-8" />
  <title>Glam Studio | Makeup & Hair</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</head>
```

- [ ] **Step 5: Create brand tokens**

Create `glam-studio/src/styles/_tokens.scss`:

```scss
:root {
  --color-black: #0a0a0a;
  --color-white: #fdfdfd;
  --color-gold: #c9a24b;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Jost', Arial, sans-serif;
}
```

- [ ] **Step 6: Wire tokens into global styles**

Replace the contents of `glam-studio/src/styles.scss` with:

```scss
@use 'styles/tokens';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  color: var(--color-black);
  background: var(--color-white);
  line-height: 1.5;
}

h1,
h2,
h3 {
  font-family: var(--font-serif);
  font-weight: 500;
  line-height: 1.2;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.btn-primary {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: var(--color-gold);
  color: var(--color-black);
  border-radius: 2px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.85;
}

.section {
  padding: 4rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
```

- [ ] **Step 7: Verify the project builds**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npm run build
```

Expected: build succeeds with no errors (default starter template still
renders at this point — sections are added in later tasks).

- [ ] **Step 8: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio
git commit -m "Scaffold Angular workspace with Glam Studio brand foundation"
```

---

## Task 2: Shared contact data

**Files:**
- Create: `glam-studio/src/app/shared/contact.data.ts`
- Test: `glam-studio/src/app/shared/contact.data.spec.ts`

**Interfaces:**
- Consumes: nothing (leaf data module).
- Produces: `CONTACT` constant with fields `whatsappUrl: string`,
  `instagramUrl: string`, `instagramHandle: string`, `address: string`,
  `hours: string`, `mapEmbedUrl: string` — imported by Header, Hero,
  Location, Final CTA, and Footer components in later tasks as
  `import { CONTACT } from '../../shared/contact.data';`.

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/shared/contact.data.spec.ts`:

```ts
import { CONTACT } from './contact.data';

describe('CONTACT', () => {
  it('has a WhatsApp booking link', () => {
    expect(CONTACT.whatsappUrl).toBe('https://wa.link/yyturk');
  });

  it('has the real studio address', () => {
    expect(CONTACT.address).toBe(
      'Av. Nainari 1730, Urb. No. 6, 85110 Cd. Obregón, Son.'
    );
  });

  it('has a Google Maps embed URL pointing at the studio coordinates', () => {
    expect(CONTACT.mapEmbedUrl).toContain('27.4999502');
    expect(CONTACT.mapEmbedUrl).toContain('-109.9575301');
    expect(CONTACT.mapEmbedUrl).toContain('output=embed');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/contact.data.spec.ts'
```

Expected: FAIL — `contact.data.ts` does not exist yet.

- [ ] **Step 3: Implement the data module**

Create `glam-studio/src/app/shared/contact.data.ts`:

```ts
export interface Contact {
  whatsappUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  address: string;
  hours: string;
  mapEmbedUrl: string;
}

export const CONTACT: Contact = {
  whatsappUrl: 'https://wa.link/yyturk',
  instagramUrl: 'https://www.instagram.com/glamstudio.mx_/',
  instagramHandle: '@glamstudio.mx_',
  address: 'Av. Nainari 1730, Urb. No. 6, 85110 Cd. Obregón, Son.',
  hours: 'Lunes a sábado, 9:00am – 7:00pm',
  mapEmbedUrl:
    'https://www.google.com/maps?q=27.4999502,-109.9575301&output=embed',
};
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/contact.data.spec.ts'
```

Expected: PASS (3 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/shared
git commit -m "Add shared contact data (WhatsApp, address, map, Instagram)"
```

---

## Task 3: Header section

**Files:**
- Create: `glam-studio/src/app/sections/header/header.component.ts`
- Create: `glam-studio/src/app/sections/header/header.component.html`
- Create: `glam-studio/src/app/sections/header/header.component.scss`
- Test: `glam-studio/src/app/sections/header/header.component.spec.ts`

**Interfaces:**
- Consumes: `CONTACT.whatsappUrl` from `../../shared/contact.data`.
- Produces: `HeaderComponent` (selector `app-header`), imported by
  `AppComponent` in Task 12. Defines the nav anchors `#servicios`,
  `#galeria`, `#nosotras`, `#contacto` that Tasks 6, 7, 8, and 10 must
  provide as section `id`s.

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/sections/header/header.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CONTACT } from '../../shared/contact.data';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('renders the studio name', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Glam Studio');
  });

  it('renders nav links to each section', () => {
    const el: HTMLElement = fixture.nativeElement;
    const hrefs = Array.from(el.querySelectorAll('.header__nav a')).map(
      (a) => (a as HTMLAnchorElement).getAttribute('href')
    );
    expect(hrefs).toEqual(['#servicios', '#galeria', '#nosotras', '#contacto']);
  });

  it('CTA button links to WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cta = el.querySelector('.header__cta') as HTMLAnchorElement;
    expect(cta.getAttribute('href')).toBe(CONTACT.whatsappUrl);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/header.component.spec.ts'
```

Expected: FAIL — `header.component.ts` does not exist yet.

- [ ] **Step 3: Implement the component**

Create `glam-studio/src/app/sections/header/header.component.ts`:

```ts
import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
}
```

Create `glam-studio/src/app/sections/header/header.component.html`:

```html
<header class="header">
  <a class="header__brand" href="#top">
    <img src="/logo.png" alt="Glam Studio" class="header__logo" />
    <span class="header__name">Glam Studio</span>
  </a>
  <nav class="header__nav">
    <a href="#servicios">Servicios</a>
    <a href="#galeria">Galería</a>
    <a href="#nosotras">Nosotras</a>
    <a href="#contacto">Contacto</a>
  </nav>
  <a
    class="btn-primary header__cta"
    [href]="whatsappUrl"
    target="_blank"
    rel="noopener"
    >Agendar</a
  >
</header>
```

Create `glam-studio/src/app/sections/header/header.component.scss`:

```scss
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-black);
  color: var(--color-white);
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__logo {
  height: 32px;
  width: 32px;
}

.header__name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

.header__nav {
  display: none;
  gap: 1.5rem;
  font-size: 0.9rem;
}

.header__cta {
  padding: 0.5rem 1.25rem;
}

@media (min-width: 768px) {
  .header__nav {
    display: flex;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/header.component.spec.ts'
```

Expected: PASS (3 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/sections/header
git commit -m "Add Header section with sticky nav and WhatsApp CTA"
```

---

## Task 4: Hero section

**Files:**
- Create: `glam-studio/src/app/sections/hero/hero.component.ts`
- Create: `glam-studio/src/app/sections/hero/hero.component.html`
- Create: `glam-studio/src/app/sections/hero/hero.component.scss`
- Test: `glam-studio/src/app/sections/hero/hero.component.spec.ts`

**Interfaces:**
- Consumes: `CONTACT.whatsappUrl` from `../../shared/contact.data`.
- Produces: `HeroComponent` (selector `app-hero`), imported by
  `AppComponent` in Task 12. Defines `id="top"`, the anchor target for
  the Header's logo link (Task 3).

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/sections/hero/hero.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { CONTACT } from '../../shared/contact.data';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('has the #top anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#top')).toBeTruthy();
  });

  it('renders the headline', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Maquillaje');
    expect(el.textContent).toContain('Cd. Obregón');
  });

  it('CTA button links to WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cta = el.querySelector('.hero a.btn-primary') as HTMLAnchorElement;
    expect(cta.getAttribute('href')).toBe(CONTACT.whatsappUrl);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/hero.component.spec.ts'
```

Expected: FAIL — `hero.component.ts` does not exist yet.

- [ ] **Step 3: Implement the component**

Create `glam-studio/src/app/sections/hero/hero.component.ts`:

```ts
import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
}
```

Create `glam-studio/src/app/sections/hero/hero.component.html`:

```html
<section id="top" class="hero">
  <div class="hero__content">
    <h1 class="hero__title">Maquillaje &amp; Peinado en Cd. Obregón</h1>
    <p class="hero__subtitle">
      Realza tu belleza para cada ocasión especial.
    </p>
    <a class="btn-primary" [href]="whatsappUrl" target="_blank" rel="noopener"
      >Agenda tu cita</a
    >
  </div>
</section>
```

Create `glam-studio/src/app/sections/hero/hero.component.scss`:

```scss
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(
    160deg,
    var(--color-black) 0%,
    #2a2216 70%,
    var(--color-gold) 160%
  );
  color: var(--color-white);
}

.hero__content {
  max-width: 640px;
}

.hero__title {
  font-size: 2.25rem;
  margin-bottom: 1rem;
}

.hero__subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

@media (min-width: 768px) {
  .hero__title {
    font-size: 3rem;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/hero.component.spec.ts'
```

Expected: PASS (3 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/sections/hero
git commit -m "Add Hero section with gradient background and WhatsApp CTA"
```

---

## Task 5: About section

**Files:**
- Create: `glam-studio/src/app/sections/about/about.component.ts`
- Create: `glam-studio/src/app/sections/about/about.component.html`
- Create: `glam-studio/src/app/sections/about/about.component.scss`
- Test: `glam-studio/src/app/sections/about/about.component.spec.ts`

**Interfaces:**
- Consumes: nothing (static copy).
- Produces: `AboutComponent` (selector `app-about`), imported by
  `AppComponent` in Task 12.

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/sections/about/about.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
  });

  it('renders the "Sobre el estudio" heading', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain(
      'Sobre el estudio'
    );
  });

  it('renders a non-empty description paragraph', () => {
    const el: HTMLElement = fixture.nativeElement;
    const paragraph = el.querySelector('p');
    expect(paragraph?.textContent?.trim().length).toBeGreaterThan(20);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/about.component.spec.ts'
```

Expected: FAIL — `about.component.ts` does not exist yet.

- [ ] **Step 3: Implement the component**

Create `glam-studio/src/app/sections/about/about.component.ts`:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
```

Create `glam-studio/src/app/sections/about/about.component.html`:

```html
<section class="about section">
  <h2>Sobre el estudio</h2>
  <p>
    En Glam Studio combinamos técnica y sensibilidad artística para crear
    looks de maquillaje y peinado que resaltan tu belleza natural. Cada
    cita es una experiencia personalizada, pensada para que te sientas
    segura y radiante.
  </p>
</section>
```

Create `glam-studio/src/app/sections/about/about.component.scss`:

```scss
.about p {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  color: #333;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/about.component.spec.ts'
```

Expected: PASS (2 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/sections/about
git commit -m "Add About section"
```

---

## Task 6: Services section

**Files:**
- Create: `glam-studio/src/app/sections/services/services.data.ts`
- Create: `glam-studio/src/app/sections/services/services.component.ts`
- Create: `glam-studio/src/app/sections/services/services.component.html`
- Create: `glam-studio/src/app/sections/services/services.component.scss`
- Test: `glam-studio/src/app/sections/services/services.component.spec.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Service` interface (`name: string`, `description: string`)
  and `SERVICES: Service[]` array (3 entries) from `services.data.ts`.
  `ServicesComponent` (selector `app-services`) with `id="servicios"`,
  matching the Header's nav anchor from Task 3. Imported by
  `AppComponent` in Task 12.

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/sections/services/services.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesComponent } from './services.component';
import { SERVICES } from './services.data';

describe('ServicesComponent', () => {
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
  });

  it('has the #servicios anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#servicios')).toBeTruthy();
  });

  it('renders one card per service', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.services__card');
    expect(cards.length).toBe(SERVICES.length);
  });

  it('renders the first service name and description', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstCard = el.querySelector('.services__card');
    expect(firstCard?.textContent).toContain(SERVICES[0].name);
    expect(firstCard?.textContent).toContain(SERVICES[0].description);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/services.component.spec.ts'
```

Expected: FAIL — `services.component.ts` does not exist yet.

- [ ] **Step 3: Implement the data and component**

Create `glam-studio/src/app/sections/services/services.data.ts`:

```ts
export interface Service {
  name: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    name: 'Maquillaje social',
    description: 'Para eventos, fiestas y ocasiones especiales.',
  },
  {
    name: 'Maquillaje de novia',
    description: 'Look personalizado para el día más importante.',
  },
  {
    name: 'Peinados y recogidos',
    description: 'Peinados profesionales para cualquier evento.',
  },
];
```

Create `glam-studio/src/app/sections/services/services.component.ts`:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SERVICES } from './services.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly services = SERVICES;
}
```

Create `glam-studio/src/app/sections/services/services.component.html`:

```html
<section id="servicios" class="services section">
  <h2>Servicios</h2>
  <div class="services__grid">
    <article class="services__card" *ngFor="let service of services">
      <h3>{{ service.name }}</h3>
      <p>{{ service.description }}</p>
    </article>
  </div>
</section>
```

Create `glam-studio/src/app/sections/services/services.component.scss`:

```scss
.services__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

.services__card {
  padding: 2rem 1.5rem;
  border: 1px solid #e5e0d5;
  text-align: center;
}

.services__card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-black);
}

.services__card p {
  color: #555;
  font-size: 0.95rem;
}

@media (min-width: 768px) {
  .services__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/services.component.spec.ts'
```

Expected: PASS (3 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/sections/services
git commit -m "Add Services section with editable services data"
```

---

## Task 7: Gallery section

**Files:**
- Create: `glam-studio/public/gallery/placeholder-1.svg` … `placeholder-6.svg` (6 files)
- Create: `glam-studio/src/app/sections/gallery/gallery.data.ts`
- Create: `glam-studio/src/app/sections/gallery/gallery.component.ts`
- Create: `glam-studio/src/app/sections/gallery/gallery.component.html`
- Create: `glam-studio/src/app/sections/gallery/gallery.component.scss`
- Test: `glam-studio/src/app/sections/gallery/gallery.component.spec.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `GalleryImage` interface (`src: string`, `alt: string`) and
  `GALLERY_IMAGES: GalleryImage[]` array (6 entries) from
  `gallery.data.ts`. `GalleryComponent` (selector `app-gallery`) with
  `id="galeria"`, matching the Header's nav anchor from Task 3.
  Imported by `AppComponent` in Task 12.

- [ ] **Step 1: Create the 6 placeholder images**

Create `glam-studio/public/gallery/placeholder-1.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="22" text-anchor="middle" dominant-baseline="middle">Glam Studio 1</text></svg>
```

Create `glam-studio/public/gallery/placeholder-2.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="22" text-anchor="middle" dominant-baseline="middle">Glam Studio 2</text></svg>
```

Create `glam-studio/public/gallery/placeholder-3.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="22" text-anchor="middle" dominant-baseline="middle">Glam Studio 3</text></svg>
```

Create `glam-studio/public/gallery/placeholder-4.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="22" text-anchor="middle" dominant-baseline="middle">Glam Studio 4</text></svg>
```

Create `glam-studio/public/gallery/placeholder-5.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="22" text-anchor="middle" dominant-baseline="middle">Glam Studio 5</text></svg>
```

Create `glam-studio/public/gallery/placeholder-6.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="22" text-anchor="middle" dominant-baseline="middle">Glam Studio 6</text></svg>
```

- [ ] **Step 2: Write the failing test**

Create `glam-studio/src/app/sections/gallery/gallery.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';
import { GALLERY_IMAGES } from './gallery.data';

describe('GalleryComponent', () => {
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
  });

  it('has the #galeria anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#galeria')).toBeTruthy();
  });

  it('renders one image per gallery entry', () => {
    const el: HTMLElement = fixture.nativeElement;
    const images = el.querySelectorAll('.gallery__grid img');
    expect(images.length).toBe(GALLERY_IMAGES.length);
  });

  it('sets the correct src and alt on the first image', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstImg = el.querySelector('.gallery__grid img') as HTMLImageElement;
    expect(firstImg.getAttribute('src')).toBe(GALLERY_IMAGES[0].src);
    expect(firstImg.getAttribute('alt')).toBe(GALLERY_IMAGES[0].alt);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/gallery.component.spec.ts'
```

Expected: FAIL — `gallery.component.ts` does not exist yet.

- [ ] **Step 4: Implement the data and component**

Create `glam-studio/src/app/sections/gallery/gallery.data.ts`:

```ts
export interface GalleryImage {
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/gallery/placeholder-1.svg', alt: 'Trabajo de maquillaje y peinado 1' },
  { src: '/gallery/placeholder-2.svg', alt: 'Trabajo de maquillaje y peinado 2' },
  { src: '/gallery/placeholder-3.svg', alt: 'Trabajo de maquillaje y peinado 3' },
  { src: '/gallery/placeholder-4.svg', alt: 'Trabajo de maquillaje y peinado 4' },
  { src: '/gallery/placeholder-5.svg', alt: 'Trabajo de maquillaje y peinado 5' },
  { src: '/gallery/placeholder-6.svg', alt: 'Trabajo de maquillaje y peinado 6' },
];
```

Create `glam-studio/src/app/sections/gallery/gallery.component.ts`:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_IMAGES } from './gallery.data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  readonly images = GALLERY_IMAGES;
}
```

Create `glam-studio/src/app/sections/gallery/gallery.component.html`:

```html
<section id="galeria" class="gallery section">
  <h2>Galería</h2>
  <div class="gallery__grid">
    <img
      *ngFor="let image of images"
      [src]="image.src"
      [alt]="image.alt"
      loading="lazy"
    />
  </div>
</section>
```

Create `glam-studio/src/app/sections/gallery/gallery.component.scss`:

```scss
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.gallery__grid img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

@media (min-width: 768px) {
  .gallery__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/gallery.component.spec.ts'
```

Expected: PASS (3 specs).

- [ ] **Step 6: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/public/gallery glam-studio/src/app/sections/gallery
git commit -m "Add Gallery section with replaceable placeholder images"
```

---

## Task 8: Team section

**Files:**
- Create: `glam-studio/public/team/sofia.svg`
- Create: `glam-studio/public/team/perla.svg`
- Create: `glam-studio/src/app/sections/team/team.data.ts`
- Create: `glam-studio/src/app/sections/team/team.component.ts`
- Create: `glam-studio/src/app/sections/team/team.component.html`
- Create: `glam-studio/src/app/sections/team/team.component.scss`
- Test: `glam-studio/src/app/sections/team/team.component.spec.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `TeamMember` interface (`name: string`, `role: string`,
  `instagramUrl: string`, `photo: string`) and `TEAM: TeamMember[]`
  array (2 entries) from `team.data.ts`. `TeamComponent` (selector
  `app-team`) with `id="nosotras"`, matching the Header's nav anchor
  from Task 3. Imported by `AppComponent` in Task 12.

- [ ] **Step 1: Create the 2 placeholder photos**

Create `glam-studio/public/team/sofia.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="26" text-anchor="middle" dominant-baseline="middle">Sofía</text></svg>
```

Create `glam-studio/public/team/perla.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0a"/><text x="50%" y="50%" fill="#c9a24b" font-family="Georgia, serif" font-size="26" text-anchor="middle" dominant-baseline="middle">Perla</text></svg>
```

- [ ] **Step 2: Write the failing test**

Create `glam-studio/src/app/sections/team/team.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamComponent } from './team.component';
import { TEAM } from './team.data';

describe('TeamComponent', () => {
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
    fixture.detectChanges();
  });

  it('has the #nosotras anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#nosotras')).toBeTruthy();
  });

  it('renders one card per team member', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.team__card');
    expect(cards.length).toBe(TEAM.length);
  });

  it('renders the first member name, role, and Instagram link', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstCard = el.querySelector('.team__card') as HTMLElement;
    expect(firstCard.textContent).toContain(TEAM[0].name);
    expect(firstCard.textContent).toContain(TEAM[0].role);
    const link = firstCard.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(TEAM[0].instagramUrl);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/team.component.spec.ts'
```

Expected: FAIL — `team.component.ts` does not exist yet.

- [ ] **Step 4: Implement the data and component**

Create `glam-studio/src/app/sections/team/team.data.ts`:

```ts
export interface TeamMember {
  name: string;
  role: string;
  instagramUrl: string;
  photo: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Sofía',
    role: 'Maquillaje',
    instagramUrl: 'https://www.instagram.com/sofiaislasmakeup/',
    photo: '/team/sofia.svg',
  },
  {
    name: 'Perla Huerta',
    role: 'Peinado',
    instagramUrl: 'https://www.instagram.com/perlahuerta.hair/',
    photo: '/team/perla.svg',
  },
];
```

Create `glam-studio/src/app/sections/team/team.component.ts`:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEAM } from './team.data';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  readonly team = TEAM;
}
```

Create `glam-studio/src/app/sections/team/team.component.html`:

```html
<section id="nosotras" class="team section">
  <h2>Nosotras</h2>
  <div class="team__grid">
    <article class="team__card" *ngFor="let member of team">
      <img [src]="member.photo" [alt]="member.name" class="team__photo" />
      <h3>{{ member.name }}</h3>
      <p>{{ member.role }}</p>
      <a [href]="member.instagramUrl" target="_blank" rel="noopener"
        >Instagram</a
      >
    </article>
  </div>
</section>
```

Create `glam-studio/src/app/sections/team/team.component.scss`:

```scss
.team__grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  justify-items: center;
  text-align: center;
}

.team__photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.team__card h3 {
  font-size: 1.25rem;
}

.team__card p {
  color: #555;
  margin-bottom: 0.5rem;
}

.team__card a {
  font-size: 0.85rem;
  color: var(--color-gold);
  font-weight: 600;
}

@media (min-width: 768px) {
  .team__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/team.component.spec.ts'
```

Expected: PASS (3 specs).

- [ ] **Step 6: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/public/team glam-studio/src/app/sections/team
git commit -m "Add Team section for Sofía and Perla Huerta"
```

---

## Task 9: Location section

**Files:**
- Create: `glam-studio/src/app/sections/location/location.component.ts`
- Create: `glam-studio/src/app/sections/location/location.component.html`
- Create: `glam-studio/src/app/sections/location/location.component.scss`
- Test: `glam-studio/src/app/sections/location/location.component.spec.ts`

**Interfaces:**
- Consumes: `CONTACT.address`, `CONTACT.hours`, `CONTACT.mapEmbedUrl`
  from `../../shared/contact.data`.
- Produces: `LocationComponent` (selector `app-location`) with
  `id="ubicacion"`. Imported by `AppComponent` in Task 12.

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/sections/location/location.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationComponent } from './location.component';
import { CONTACT } from '../../shared/contact.data';

describe('LocationComponent', () => {
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationComponent);
    fixture.detectChanges();
  });

  it('renders the address and hours', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain(CONTACT.address);
    expect(el.textContent).toContain(CONTACT.hours);
  });

  it('embeds the map iframe pointing at the studio coordinates', () => {
    const el: HTMLElement = fixture.nativeElement;
    const iframe = el.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.getAttribute('src')).toContain('google.com/maps');
    expect(iframe.getAttribute('src')).toContain('27.4999502');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/location.component.spec.ts'
```

Expected: FAIL — `location.component.ts` does not exist yet.

- [ ] **Step 3: Implement the component**

Create `glam-studio/src/app/sections/location/location.component.ts`:

```ts
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  readonly address = CONTACT.address;
  readonly hours = CONTACT.hours;
  readonly mapEmbedUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    this.mapEmbedUrl = sanitizer.bypassSecurityTrustResourceUrl(
      CONTACT.mapEmbedUrl
    );
  }
}
```

Create `glam-studio/src/app/sections/location/location.component.html`:

```html
<section id="ubicacion" class="location section">
  <h2>Horario y ubicación</h2>
  <div class="location__grid">
    <div class="location__info">
      <p class="location__address">{{ address }}</p>
      <p class="location__hours">{{ hours }}</p>
    </div>
    <iframe
      class="location__map"
      [src]="mapEmbedUrl"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Ubicación de Glam Studio"
    ></iframe>
  </div>
</section>
```

Create `glam-studio/src/app/sections/location/location.component.scss`:

```scss
.location__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  align-items: start;
}

.location__address,
.location__hours {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.location__map {
  width: 100%;
  height: 320px;
  border: 0;
}

@media (min-width: 768px) {
  .location__grid {
    grid-template-columns: 1fr 1.5fr;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/location.component.spec.ts'
```

Expected: PASS (2 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/sections/location
git commit -m "Add Location section with real address and embedded map"
```

---

## Task 10: Final CTA section

**Files:**
- Create: `glam-studio/src/app/sections/final-cta/final-cta.component.ts`
- Create: `glam-studio/src/app/sections/final-cta/final-cta.component.html`
- Create: `glam-studio/src/app/sections/final-cta/final-cta.component.scss`
- Test: `glam-studio/src/app/sections/final-cta/final-cta.component.spec.ts`

**Interfaces:**
- Consumes: `CONTACT.whatsappUrl` from `../../shared/contact.data`.
- Produces: `FinalCtaComponent` (selector `app-final-cta`) with
  `id="contacto"`, matching the Header's nav anchor from Task 3.
  Imported by `AppComponent` in Task 12.

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/sections/final-cta/final-cta.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalCtaComponent } from './final-cta.component';
import { CONTACT } from '../../shared/contact.data';

describe('FinalCtaComponent', () => {
  let fixture: ComponentFixture<FinalCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalCtaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalCtaComponent);
    fixture.detectChanges();
  });

  it('has the #contacto anchor id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('#contacto')).toBeTruthy();
  });

  it('CTA button links to WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cta = el.querySelector('a.btn-primary') as HTMLAnchorElement;
    expect(cta.getAttribute('href')).toBe(CONTACT.whatsappUrl);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/final-cta.component.spec.ts'
```

Expected: FAIL — `final-cta.component.ts` does not exist yet.

- [ ] **Step 3: Implement the component**

Create `glam-studio/src/app/sections/final-cta/final-cta.component.ts`:

```ts
import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss',
})
export class FinalCtaComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
}
```

Create `glam-studio/src/app/sections/final-cta/final-cta.component.html`:

```html
<section id="contacto" class="final-cta">
  <h2>Agenda tu cita</h2>
  <p>Escríbenos por WhatsApp y reserva tu espacio.</p>
  <a class="btn-primary" [href]="whatsappUrl" target="_blank" rel="noopener"
    >Agendar por WhatsApp</a
  >
</section>
```

Create `glam-studio/src/app/sections/final-cta/final-cta.component.scss`:

```scss
.final-cta {
  padding: 4rem 1.5rem;
  text-align: center;
  background: var(--color-black);
  color: var(--color-white);
}

.final-cta h2 {
  margin-bottom: 0.5rem;
}

.final-cta p {
  margin-bottom: 1.5rem;
  opacity: 0.85;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/final-cta.component.spec.ts'
```

Expected: PASS (2 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/sections/final-cta
git commit -m "Add Final CTA section"
```

---

## Task 11: Footer

**Files:**
- Create: `glam-studio/src/app/sections/footer/footer.component.ts`
- Create: `glam-studio/src/app/sections/footer/footer.component.html`
- Create: `glam-studio/src/app/sections/footer/footer.component.scss`
- Test: `glam-studio/src/app/sections/footer/footer.component.spec.ts`

**Interfaces:**
- Consumes: `CONTACT.whatsappUrl`, `CONTACT.instagramUrl`,
  `CONTACT.instagramHandle` from `../../shared/contact.data`.
- Produces: `FooterComponent` (selector `app-footer`). Imported by
  `AppComponent` in Task 12.

- [ ] **Step 1: Write the failing test**

Create `glam-studio/src/app/sections/footer/footer.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { CONTACT } from '../../shared/contact.data';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('links to Instagram and WhatsApp', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = Array.from(el.querySelectorAll('a')).map((a) =>
      a.getAttribute('href')
    );
    expect(links).toContain(CONTACT.instagramUrl);
    expect(links).toContain(CONTACT.whatsappUrl);
  });

  it('renders the current year in the copyright line', () => {
    const el: HTMLElement = fixture.nativeElement;
    const currentYear = new Date().getFullYear().toString();
    expect(el.textContent).toContain(currentYear);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/footer.component.spec.ts'
```

Expected: FAIL — `footer.component.ts` does not exist yet.

- [ ] **Step 3: Implement the component**

Create `glam-studio/src/app/sections/footer/footer.component.ts`:

```ts
import { Component } from '@angular/core';
import { CONTACT } from '../../shared/contact.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly whatsappUrl = CONTACT.whatsappUrl;
  readonly instagramUrl = CONTACT.instagramUrl;
  readonly instagramHandle = CONTACT.instagramHandle;
  readonly year = new Date().getFullYear();
}
```

Create `glam-studio/src/app/sections/footer/footer.component.html`:

```html
<footer class="footer">
  <div class="footer__links">
    <a [href]="instagramUrl" target="_blank" rel="noopener">{{
      instagramHandle
    }}</a>
    <a [href]="whatsappUrl" target="_blank" rel="noopener">WhatsApp</a>
  </div>
  <p class="footer__copyright">&copy; {{ year }} Glam Studio</p>
</footer>
```

Create `glam-studio/src/app/sections/footer/footer.component.scss`:

```scss
.footer {
  padding: 2rem 1.5rem;
  text-align: center;
  background: var(--color-black);
  color: var(--color-white);
  font-size: 0.85rem;
}

.footer__links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.footer__links a {
  color: var(--color-gold);
  font-weight: 600;
}

.footer__copyright {
  opacity: 0.7;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/footer.component.spec.ts'
```

Expected: PASS (2 specs).

- [ ] **Step 5: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/sections/footer
git commit -m "Add Footer with social links and dynamic copyright year"
```

---

## Task 12: Assemble the landing page

**Files:**
- Modify: `glam-studio/src/app/app.component.ts`
- Modify: `glam-studio/src/app/app.component.html`
- Modify: `glam-studio/src/app/app.component.scss`
- Test: `glam-studio/src/app/app.component.spec.ts`

**Interfaces:**
- Consumes: `HeaderComponent`, `HeroComponent`, `AboutComponent`,
  `ServicesComponent`, `GalleryComponent`, `TeamComponent`,
  `LocationComponent`, `FinalCtaComponent`, `FooterComponent` from
  Tasks 3–11.
- Produces: the composed `AppComponent`, the app's root — nothing
  downstream depends on it.

- [ ] **Step 1: Write the failing test**

Replace `glam-studio/src/app/app.component.spec.ts` with:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('renders every section in order', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sectionTags = Array.from(el.children).map((child) =>
      child.tagName.toLowerCase()
    );
    expect(sectionTags).toContain('app-header');
    expect(sectionTags).toContain('app-footer');

    const main = el.querySelector('main');
    expect(main).toBeTruthy();
    const mainChildren = Array.from(main!.children).map((child) =>
      child.tagName.toLowerCase()
    );
    expect(mainChildren).toEqual([
      'app-hero',
      'app-about',
      'app-services',
      'app-gallery',
      'app-team',
      'app-location',
      'app-final-cta',
    ]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /Users/eduardoislas/projects/personal/makeup/glam-studio
npx ng test --watch=false --browsers=ChromeHeadless --include='**/app.component.spec.ts'
```

Expected: FAIL — `AppComponent` does not yet import/render the sections.

- [ ] **Step 3: Assemble the component**

Replace `glam-studio/src/app/app.component.ts` with:

```ts
import { Component } from '@angular/core';
import { HeaderComponent } from './sections/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { GalleryComponent } from './sections/gallery/gallery.component';
import { TeamComponent } from './sections/team/team.component';
import { LocationComponent } from './sections/location/location.component';
import { FinalCtaComponent } from './sections/final-cta/final-cta.component';
import { FooterComponent } from './sections/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    GalleryComponent,
    TeamComponent,
    LocationComponent,
    FinalCtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
```

Replace `glam-studio/src/app/app.component.html` with:

```html
<app-header />
<main>
  <app-hero />
  <app-about />
  <app-services />
  <app-gallery />
  <app-team />
  <app-location />
  <app-final-cta />
</main>
<app-footer />
```

Replace `glam-studio/src/app/app.component.scss` with an empty file (all
layout is handled inside each section's own stylesheet):

```scss
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include='**/app.component.spec.ts'
```

Expected: PASS (1 spec).

- [ ] **Step 5: Run the full test suite**

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

Expected: all specs across every task pass (22 specs total: 3 contact +
3 header + 3 hero + 2 about + 3 services + 3 gallery + 3 team + 2
location + 2 final-cta + 2 footer + 1 app).

- [ ] **Step 6: Verify the production build**

```bash
npm run build
```

Expected: build succeeds with no errors or warnings about missing
assets.

- [ ] **Step 7: Manual browser verification**

```bash
npm start
```

Open `http://localhost:4200` and confirm, at both a mobile width
(~375px) and desktop width (~1280px) in DevTools device toolbar:
- Every nav link in the header scrolls to the matching section.
- Every "Agendar"/WhatsApp CTA opens `https://wa.link/yyturk` in a new
  tab.
- The gallery and team images load (as placeholder SVGs).
- The map iframe renders and is centered on the real studio location.
- No layout overflow or broken wrapping at either width.

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 8: Commit**

```bash
cd /Users/eduardoislas/projects/personal/makeup
git add glam-studio/src/app/app.component.ts glam-studio/src/app/app.component.html glam-studio/src/app/app.component.scss glam-studio/src/app/app.component.spec.ts
git commit -m "Assemble Glam Studio landing page from all sections"
```
