<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <p>仅用于个人非商用</P>
    <p>
      © 2019 - {{ currentYear }}
      <a href="https://github.com/Lruihao/mmt-webfont/" target="_blank">沐目体</a>
      By <a href="https://github.com/Lruihao/" target="_blank">Lruihao</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  padding: 2rem 1rem;
  font-size: 0.75rem;

  a {
    color: var(--color-link);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }
  a:hover {
    color: var(--color-link-hover);
    text-decoration: underline;
  }
}
</style>
