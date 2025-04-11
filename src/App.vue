<script setup lang="ts">
import 'mmt-webfont/dist/result.css'
</script>

<template>
  <header>
    <div class="wrapper font-mmt">
      To be, or not to be, that is the question.
    </div>
  </header>

  <main>
    TODO
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
