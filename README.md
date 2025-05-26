# Programming in the Age of Prompts — Slideshow

This is a static slideshow web app built with [Vue 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/). Click anywhere on the page to advance to the next slide. Slides are managed in an array for easy editing and extension.

## Features

- Vue 3 Composition API
- TypeScript support
- Vue Router for slide state in the URL
- Easily extendable slide array (`src/slides.ts`)
- Responsive, minimal design

## Getting Started

1. **Install [Bun](https://bun.sh/) if you haven't already**

   ```sh
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**

   ```sh
   bun install
   ```

3. **Run the development server**

   ```sh
   bun run dev
   ```

4. **Open your browser**
   Visit [http://localhost:5173](http://localhost:5173) (or the URL shown in your terminal).

## Project Structure

- `src/main.ts` — App entry point
- `src/App.vue` — Root component
- `src/router.ts` — Vue Router config
- `src/slides.ts` — Slide array (edit/add slides here)
- `src/components/Slide.vue` — Slide display component
- `src/style.css` — Global styles

## Adding Slides

Edit [`src/slides.ts`](src/slides.ts) and add new objects to the exported array. Each slide should have a `title` and `content`.

---

Built with Vue 3 + TypeScript + Vite + Bun.
