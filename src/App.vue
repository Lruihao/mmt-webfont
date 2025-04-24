<script setup lang="ts">
import Footer from './components/Footer.vue'
import SectionCover from './components/SectionCover.vue'
import SectionMusic from './components/SectionMusic.vue'
import SectionPreview from './components/SectionPreview.vue'
</script>

<template>
  <SectionCover />
  <SectionPreview />
  <SectionMusic />
  <Footer />
</template>

<style scoped>
section {
  border: 2px solid var(--color-border);
  &:not(:last-of-type) {
    border-bottom: 0;
  }
}
</style>
