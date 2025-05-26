<template>
  <div class="slide" :style="slide.visual ? { backgroundImage: `url('${slide.visual}')` } : {}" @click="goNext">
    <div class="overlay"></div>
    <div class="slide-content">
      <div v-if="slide.header" class="header">{{ slide.header }}</div>
      <h1 class="title">{{ slide.title }}</h1>
      <div v-if="slide.subtitle" class="subtitle">{{ slide.subtitle }}</div>
      <div v-if="slide.content" class="content" v-html="renderedContent"></div>
      <div v-if="slide.speakerNote" class="speaker-note">
        <span>🎤</span>
        <span v-html="renderedSpeakerNote"></span>
      </div>
      <div v-if="slide.link" class="link-button">
        <button @click="openLink">👉🏻 Open Link</button>
      </div>
    </div>
    <!-- Closing tag for .slide-content -->
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import slides, { Slide } from "../slides"

// Enhanced markdown to HTML with table support
function markdown(text: string = ""): string {
  // Table parsing
  const tableRegex = /((?:\|.*\|\n)+)/g
  text = text.replace(tableRegex, (tableBlock) => {
    const rows = tableBlock.trim().split("\n")
    if (rows.length < 2) return tableBlock // Not a valid table
    const headerCells = rows[0]
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim())
    const alignRow = rows[1]
    const bodyRows = rows.slice(2)
    let html = '<table class="md-table"><thead><tr>'
    headerCells.forEach((cell) => (html += `<th>${cell}</th>`))
    html += "</tr></thead><tbody>"
    bodyRows.forEach((row) => {
      const cells = row
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim())
      if (cells.length === headerCells.length) {
        html += "<tr>"
        cells.forEach((cell) => (html += `<td>${cell}</td>`))
        html += "</tr>"
      }
    })
    html += "</tbody></table>"
    return html
  })

  // Code block parsing (```lang ... ```)
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang ? lang : ""
    return `<pre class="md-code-block"><code class="language-${language}">${code.replace(
      /[<>&]/g,
      (c) =>
        ({
          "<": "<",
          ">": ">",
          "&": "&",
        }[c] || c)
    )}</code></pre>`
  })

  // Other markdown
  return text
    .replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n- (.*)/g, "<li>$1</li>")
    .replace(/\n/g, "<br>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
}

const router = useRouter()
const route = useRoute()

const slideIndex = computed<number>(() => Number(route.params.slideIndex) || 0)
const slide = computed<Slide>(() => slides[slideIndex.value] || slides[0])
const renderedContent = computed(() => markdown(slide.value.content))
const renderedSpeakerNote = computed(() => markdown(slide.value.speakerNote))
function goNext() {
  if (slideIndex.value < slides.length - 1) {
    router.push({ name: "Slide", params: { slideIndex: slideIndex.value + 1 } })
  }
}
function openLink() {
  if (slide.value.link) {
    router.push(slide.value.link)
  }
}
</script>

<style>
.slide {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #181c24;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: background 3s;
  overflow: hidden;
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(24, 28, 36, 0.92) 60%, rgba(24, 28, 36, 0.7) 100%);
  z-index: 1;
}
.slide-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 90vw;
  margin: 0 auto;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 1.5rem;
  background: rgba(30, 34, 44, 0.85);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  text-align: left;
  color: #fff;
  backdrop-filter: blur(2px);
}
.header {
  font-size: 2rem;
  font-weight: 700;
  color: #7ee787;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}
.title {
  font-size: 3.6rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 0 2px 16px #0008;
}
.subtitle {
  font-size: 1.73rem;
  font-weight: 500;
  color: #58a6ff;
  margin-bottom: 1.2rem;
}
.content {
  font-size: 1.66rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  white-space: pre-line;
}
.content b {
  color: #ffb86c;
}
.content i {
  color: #f5e663;
}
.content code {
  background: #222;
  color: #7ee787;
  padding: 0.2em 0.5em;
  border-radius: 0.3em;
  font-size: 1em;
}
.md-code-block {
  background: #181c24;
  color: #7ee787;
  border-radius: 0.5em;
  padding: 1em;
  margin: 1.2em 0;
  font-size: 1.1em;
  overflow-x: auto;
}
.md-code-block code {
  background: none;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
  font-family: "Fira Mono", "Consolas", "Menlo", monospace;
  display: block;
  white-space: pre;
}
.content blockquote {
  border-left: 4px solid #7ee787;
  margin: 1em 0;
  padding: 0.5em 1em;
  background: #23272e;
  color: #7ee787;
  font-style: italic;
}
.md-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  background: #23272e;
  border-radius: 0.5em;
  overflow: hidden;
}
.md-table th,
.md-table td {
  border: 1px solid #444;
  padding: 0.5em 2em;
  text-align: left;
}
.md-table th {
  background: #181c24;
  color: #7ee787;
  font-weight: 700;
}
.md-table tr:nth-child(even) td {
  background: #23272e;
}
.md-table tr:nth-child(odd) td {
  background: #1a1e27;
}
.speaker-note {
  margin-top: 1.5rem;
  font-size: 1.33rem;
  color: #b3b3b3;
  background: rgba(30, 34, 44, 0.7);
  padding: 0.7em 1em;
  border-left: 4px solid #58a6ff;
  border-radius: 0.5em;
  display: flex;
  align-items: flex-start;
  gap: 0.7em;
}
.link-button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.link-button button {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, transform 0.2s;
}

.link-button button:hover {
  background-color: rgba(0, 0, 0, 0.9);
  transform: scale(1.05);
}

.link-button button {
  padding: 10px 20px;
  background-color: rgba(0, 123, 255, 0.4);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.link-button button:hover {
  background-color: #0056b3;
}
@media (max-width: 600px) {
  .slide-content {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
  .title {
    font-size: 1.5rem;
  }
  .header {
    font-size: 1.1rem;
  }
}
</style>
