# Glam Studio — Landing Page Design

**Fecha:** 2026-08-24
**Estado:** Aprobado, pendiente de plan de implementación

## Contexto

Glam Studio (@glamstudio.mx_ en Instagram) es un estudio de maquillaje y
peinado en Cd. Obregón, Sonora. Actualmente su único canal es Instagram;
necesitan una landing page en Angular cuyo objetivo principal es que el
visitante agende una cita vía WhatsApp.

Datos reales recopilados de Instagram/Google Maps:

- Nombre: **GLAM STUDIO | Makeup & Hair**
- Categoría: Beauty Studio
- Ubicación: Av. Nainari 1730, Urb. No. 6, 85110 Cd. Obregón, Son.
  (coordenadas: 27.4999502, -109.9575301)
- Horario: Lunes a sábado, 9:00am – 7:00pm
- Citas únicamente vía WhatsApp: `https://wa.link/yyturk`
- Equipo: Sofía (@sofiaislasmakeup), Perla Huerta (@perlahuerta.hair)
- Logo: monograma "GS", serif elegante con filigrana, blanco sobre negro
- Sin testimonios reales disponibles todavía — se omiten para no
  publicar contenido inventado.
- Sin fotos de portafolio reales todavía — se usan placeholders con
  estructura lista para reemplazo.

## Objetivo

Landing page de una sola página, estática, mobile-first, cuyo único
llamado a la acción es agendar cita por WhatsApp. Sin backend, sin
formulario propio, sin routing.

## Fuera de alcance

- Backend / API / formulario de contacto propio.
- CMS o edición de contenido sin tocar código (se puede añadir después
  si el negocio crece).
- Testimonios (no hay contenido real todavía).
- Configuración de hosting/CI — el proyecto queda listo para
  `ng build` y desplegar en cualquier host estático.

## Arquitectura técnica

- **Angular** standalone components (sin NgModules), última versión
  del CLI.
- Un componente por sección bajo `src/app/sections/<seccion>/`, cada
  uno con su archivo de contenido tipado `<seccion>.data.ts` separado
  del componente. Esto permite editar textos, servicios o fotos sin
  tocar HTML/lógica.
- `src/app/shared/contact.data.ts`: fuente única de verdad para el
  link de WhatsApp (`https://wa.link/yyturk`), usado por todos los CTAs.
- `src/styles/_tokens.scss`: variables de marca.
  - Negro `#0a0a0a`, blanco `#fdfdfd`, acento dorado/champán `#c9a24b`.
  - Tipografía serif para títulos (estilo del logo), sans-serif para
    cuerpo de texto.
- Estilos: SCSS plano por componente + tokens compartidos. Sin
  Tailwind ni Angular Material.
- Responsive mobile-first (la mayoría del tráfico viene de Instagram
  desde celular).
- Mapa: iframe de Google Maps embebido sin API key, centrado en las
  coordenadas reales, usando `output=embed`.

## Secciones (en orden de aparición)

1. **Header** — Logo (monograma GS) + "Glam Studio", nav con anclas
   (Servicios, Galería, Nosotras, Contacto), botón CTA "Agendar" que
   abre WhatsApp. Sticky al hacer scroll.
2. **Hero** — Imagen full-bleed (placeholder), titular
   ("Maquillaje & Peinado en Cd. Obregón"), subtítulo breve, botón CTA
   principal a WhatsApp.
3. **Sobre el estudio** — Texto breve de posicionamiento como *beauty
   studio*, tono elegante/editorial.
4. **Servicios** — Tarjetas de servicios genéricos (Maquillaje social,
   Maquillaje de novia, Peinados/recogidos) definidos en
   `services.data.ts`, fáciles de renombrar/ampliar.
5. **Galería** — Grid tipo Instagram, imágenes placeholder en
   proporción 1:1, definidas en `gallery.data.ts` (array de rutas).
6. **Equipo** — Tarjetas para Sofía (Makeup) y Perla Huerta (Hair),
   con foto placeholder, rol y link a su Instagram personal.
7. **Horario y ubicación** — Mapa embebido (iframe, coordenadas
   reales), dirección en texto (Av. Nainari 1730, Urb. No. 6, 85110
   Cd. Obregón, Son.), horario (Lunes a sábado 9am–7pm).
8. **CTA final** — Bloque grande "Agenda tu cita" con botón a
   WhatsApp, repite el CTA principal antes del footer.
9. **Footer** — Links a Instagram (@glamstudio.mx_) y WhatsApp,
   copyright con año dinámico.

## Manejo de contenido y datos

Cada sección expone una interfaz TypeScript simple para su contenido
(ej. `interface Service { name: string; description: string }`) y un
archivo `*.data.ts` con los valores. No hay estado ni lógica de
negocio — todo el contenido es estático en build time.

## Testing

- Pruebas unitarias mínimas por componente (Angular TestBed):
  verificar que cada sección renderiza su contenido y que los CTAs
  apuntan al link de WhatsApp correcto.
- Verificación manual en navegador (mobile + desktop) antes de dar
  por terminado, siguiendo el flujo real de un visitante que llega
  desde Instagram y agenda por WhatsApp.

## Riesgos / decisiones abiertas

- No hay fotos reales de portafolio ni del equipo todavía — placeholders
  claramente reemplazables vía `gallery.data.ts` y `team.data.ts`.
- No hay testimonios — sección omitida intencionalmente, se puede
  agregar en una iteración futura cuando existan reseñas reales.
