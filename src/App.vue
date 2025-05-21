<script setup lang="ts">
import Footer from './components/Footer.vue'
import SectionCover from './components/SectionCover.vue'
import SectionMusic from './components/SectionMusic.vue'
import SectionPreview from './components/SectionPreview.vue'
</script>

<template>
  <main class="main-container">
    <SectionCover />
    <SectionPreview />
    <SectionMusic />
  </main>
  <Footer />
</template>

<style scoped>
@media (min-width: 1024px) {
  .main-container {
    display: grid;
    grid-template-rows: 1fr auto auto;
    margin-block-start: 200px;
    box-shadow: 0 0 20px var(--color-box-shadow, rgba(0, 0, 0, 0.2));
    border-radius: var(--border-radius);
  }
  section {
    &:first-of-type {
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }
    &:last-of-type {
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
  }
}
@media (prefers-color-scheme: dark) {
  .main-container {
   --color-box-shadow: rgba(255, 255, 255, 0.2);
  }
}
section {
  border: 2px solid var(--color-border);
  &:not(:last-of-type) {
    border-bottom: 0;
  }
}
</style>
