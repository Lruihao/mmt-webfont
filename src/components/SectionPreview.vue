<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const message = ref<string>('')
const fontSize = ref<number>(24)
const fontWeight = ref<number>(400)
const fontWeightOptions = [400, 500, 600, 700, 800, 900]
const defaultMessage = ref<string>('')

const style = computed(() => {
  const size = fontSize.value < 20 ? 20 : fontSize.value
  return {
    'fontSize': `${size}px`,
    '--live-font-weight': fontWeight.value,
  }
})

function typeIt() {
  const text = '沐目之，湘也。\n\n字字珠玑，见字如面。'
  let index = 0
  let interval: ReturnType<typeof setInterval> | undefined
  const _typeIt = (observer: IntersectionObserver) => {
    interval = setInterval(() => {
      defaultMessage.value += text[index]
      index++
      if (index >= text.length) {
        // 停止定时器
        clearInterval(interval)
        // 取消观察
        observer.disconnect()
      }
    }, 100)
  }
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      // 如果元素在视口中可见，触发打字效果
      if (entry.isIntersecting) {
        _typeIt(observer)
      }
      else {
        clearInterval(interval)
      }
    })
  }, { threshold: 0.1 })
  const target = document.querySelector('.live-content')
  if (target) {
    observer.observe(target)
  }
}

onMounted(() => {
  typeIt()
})

if (window.innerWidth < 768) {
  fontSize.value = 20
}

// ————“沐目之，湘也。”
// 取字于大学时初恋的名字，这个字体也是为她而写。
// 从下笔到停笔，从开始到结束，它见证了我们稚嫩到成熟。
// 沐目体和红人馆的那首《最甜情歌》有着类似的遭遇。
// 故事的开头极具温柔，但结局不尽人意。
// 那些忘不掉的人和事，岁月都已替我轻描淡写。
//
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
        {{ message || defaultMessage }}
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
      line-height: 26px;
      width: 50%;
      min-height: 130px;
      max-height: 500px;
      overflow-y: auto;
      background-image:
        linear-gradient(90deg, var(--color-border) 3%, transparent 0),
        linear-gradient(1turn, var(--color-border) 3%, transparent 0);
      background-size: 24px 24px;
      background-position: center;
      white-space: pre-wrap;
    }
    .live-textarea {
      width: 50%;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      resize: vertical;
      border: 1px solid var(--color-border);
      background-color: var(--color-background);
    }
  }
}
</style>
