<script setup lang="ts">
import Footer from './components/Footer.vue'
import SectionCover from './components/SectionCover.vue'
import SectionMusic from './components/SectionMusic.vue'
import SectionPreview from './components/SectionPreview.vue'
</script>

<template>
  <header class="header-container">
    <div class="mi-box">
      <span>沐</span>
      <span>目</span>
    </div>
  </header>
  <main class="main-container">
    <SectionCover />
    <SectionMusic />
    <SectionPreview />
  </main>
  <Footer />
</template>

<style scoped>
.header-container {
  display: none;
}
@media (min-width: 1024px) {
  .header-container {
    display: block;
    text-align: center;
    margin-block: 70px;
    --color-border-mi: #74759b;
    /* 实现米字格 */
    .mi-box {
      display: inline-block;
      position: relative;
      width: 160px;
      height: 160px;
      border: 2px solid var(--color-border-mi);
      box-shadow: 0 0 20px var(--color-box-shadow, rgba(0, 0, 0, 0.2));
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
          linear-gradient(
            to right,
            transparent calc(50% - 0.5px),
            var(--color-border-mi) calc(50% - 0.5px),
            var(--color-border-mi) calc(50% + 0.5px),
            transparent calc(50% + 0.5px)
          ),
          linear-gradient(
            to bottom,
            transparent calc(50% - 0.5px),
            var(--color-border-mi) calc(50% - 0.5px),
            var(--color-border-mi) calc(50% + 0.5px),
            transparent calc(50% + 0.5px)
          ),
          linear-gradient(
            to bottom left,
            transparent calc(50% - 0.5px),
            var(--color-border-mi) calc(50% - 0.5px),
            var(--color-border-mi) calc(50% + 0.5px),
            transparent calc(50% + 0.5px)
          ),
          linear-gradient(
            to bottom right,
            transparent calc(50% - 0.5px),
            var(--color-border-mi) calc(50% - 0.5px),
            var(--color-border-mi) calc(50% + 0.5px),
            transparent calc(50% + 0.5px)
          );
      }
    }
    span {
      position: absolute;
      transform: translate(-50%, -50%);
      font-family: MMT;
      font-size: 106px;
      user-select: none;
    }
    span:first-of-type {
      top: 52%;
      left: 40%;
      color: brown;
    }
    span:last-of-type {
      top: 54%;
      left: 75%;
      color: gray;
    }
  }
  .main-container {
    display: grid;
    grid-template-rows: 1fr auto auto;
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
  .mi-box {
    --color-box-shadow: rgba(255, 255, 255, 0.2);
    --color-border-mi: #5a5b7c;
  }
}
section {
  border: 2px solid var(--color-border);
  &:not(:last-of-type) {
    border-bottom: 0;
  }
}
</style>
