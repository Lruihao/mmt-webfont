<script setup lang="ts">
import SectionCover from './components/SectionCover.vue'
import SectionMusic from './components/SectionMusic.vue'
import SectionPreview from './components/SectionPreview.vue'
</script>

<template>
  <SectionCover />
  <SectionPreview />
  <SectionMusic />
</template>

<style scoped>
section {
  border: 2px solid var(--color-border);
  &:not(:last-child) {
    border-bottom: 0;
  }
}
</style>
