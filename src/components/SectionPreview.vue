<script setup lang="ts">
import { computed, ref } from 'vue'

const message = ref<string>('')
const fontSize = ref<number>(24)
const fontWeight = ref<number>(400)
const fontWeightOptions = [400, 500, 600, 700, 800, 900]

const style = computed(() => {
  const size = fontSize.value < 20 ? 20 : fontSize.value
  return {
    'fontSize': `${size}px`,
    '--live-font-weight': fontWeight.value,
  }
})

// ————“沐目之，湘也。”
// 取字于大学时初恋的名字，这个字体也是为她而写。
// 沐目体和红人馆的那首《最甜情歌》有着类似的遭遇。
// 事隔经年，淡然写下。
</script>

<template>
  <section class="section-preview" :style="style">
    <header>
      <div>
        <span>字体大小：</span>
        <input v-model="fontSize" type="number" min="20" max="100">
      </div>
      <div>
        <span>字体粗细：</span>
        <select v-model="fontWeight">
          <option
            v-for="option in fontWeightOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </header>
    <main>
      <p class="live-content">
        {{ message || '「沐目之，湘也」\n 从下笔到停笔，从开始到结束，沐目体见证了我们稚嫩到成熟。\n故事的开头往往极具温柔，但结局常常不尽人意。\n那些忘不掉的人和事，岁月都已替我轻描淡写。' }}
      </p>
      <textarea v-model="message" class="live-textarea" placeholder="中文测试器，你可以在这里写任何字来测试字体！" />
    </main>
  </section>
</template>

<style scoped>
.section-preview {
  display: flex;
  flex-direction: column;
  header {
    font-family: MMT;
    font-size: 24px;
    border-bottom: 2px solid var(--color-border);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    span {
      font-weight: 600;
    }
    input,
    select {
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--color-border);
      width: 80px;
    }
  }
  main {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    gap: 2rem;
    position: relative;
    flex-grow: 1;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      background-color: var(--color-border);
      transform: translateX(-50%);
    }
    .live-content {
      font-family: MMT;
      font-weight: var(--live-font-weight);
      line-height: 1.25;
      width: 50%;
      min-height: 120px;
      max-height: 400px;
      overflow-y: auto;
      background-image:
        linear-gradient(90deg, var(--color-border) 3%, transparent 0),
        linear-gradient(1turn, var(--color-border) 3%, transparent 0);
      background-size: 24px 24px;
      background-position: center;
    }
    .live-textarea {
      width: 50%;
      padding: 0.5rem;
      border-radius: 0.75rem;
      resize: vertical;
      border: 1px solid var(--color-border);
      background-color: var(--color-background);
    }
  }
}
</style>
