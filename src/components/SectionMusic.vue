<script setup lang="ts">
import ColorThief from 'colorthief/dist/color-thief.mjs'
import { computed, onMounted, ref } from 'vue'

interface Comment {
  musicName: string
  musicUrl: string
  artist: string
  picUrl: string
  content: string
  nickname: string
  avatarUrl: string
  timeStr: string
  likedCount: number
}
type RGB = [number, number, number]

const mid = ref<string>('2280569152')
const imgRGB = ref<RGB>([0, 0, 0])
const loading = ref<boolean>(false)
const defaultComment: Comment = {
  musicName: '',
  musicUrl: '',
  artist: '',
  picUrl: '',
  content: '',
  nickname: '',
  avatarUrl: '',
  timeStr: '',
  likedCount: 0,
}
const comment = ref<Comment>(defaultComment)
const TIME_OUT = 60
const timer = ref<ReturnType<typeof setInterval> | null>(null)
const img = new Image()
img.crossOrigin = 'Anonymous'

function rgbToHex([r, g, b]: RGB): string {
  return `#${[r, g, b].map((x) => {
    const hex = x.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }).join('')}`
}

function invertColor([r, g, b]: RGB): RGB {
  return [255 - r, 255 - g, 255 - b]
}

function getImgColor() {
  const colorThief = new ColorThief()
  img.addEventListener('load', () => {
    // const palette = colorThief.getPalette(img, 5)
    imgRGB.value = colorThief.getColor(img)
  })
}

// 图片的反色十六进制颜色
const imgInvertColor = computed(() => {
  if (!imgRGB.value)
    return ''
  return rgbToHex(invertColor(imgRGB.value))
})

function getRandomComment() {
  loading.value = true
  fetch(`https://api.lruihao.cn/netease/comment?mid=${mid.value}`)
    .then(response => response.json())
    .then((res) => {
      if (res.code !== 1) {
        return
      }
      comment.value = {
        ...defaultComment,
        nickname: '未知用户',
        ...res.data,
      }
      img.src = comment.value.picUrl
    })
    .catch((err) => {
      console.error(err)
      comment.value = {
        ...defaultComment,
        content: '获取评论失败，请稍后再试...',
      }
    })
    .finally(() => {
      loading.value = false
    })
}

function refresh() {
  getRandomComment()
  if (timer.value) {
    clearInterval(timer.value)
  }
  timer.value = setInterval(() => {
    getRandomComment()
  }, TIME_OUT * 1000)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 进入视口时开始获取评论
        refresh()
        // 取消观察
        observer.disconnect()
      }
    })
  }, { threshold: 0.1 })
  const target = document.querySelector('.section-music')
  if (target) {
    observer.observe(target)
  }
  getImgColor()
})
</script>

<template>
  <section class="section-music" :style="{ '--color-time': imgInvertColor }">
    <div v-if="!loading" class="comment-163" title="随机下一条" @click="refresh">
      <span class="pic-backdrop" :style="comment.picUrl ? `background-image: url(${comment.picUrl});` : ''" />
      <div class="commentator">
        <img
          v-show="comment?.avatarUrl"
          class="comment-avatar"
          :alt="`${comment.nickname}'s avatar`"
          :src="comment.avatarUrl?.slice(5)"
        >
        <div class="comment-user">
          <span class="comment-nickname">{{ comment.nickname }}</span>
          <small class="comment-time">{{ comment.timeStr }}</small>
        </div>
        <span class="comment-liked">{{ comment.likedCount }}</span>
      </div>
      <div class="comment-content">
        {{ comment.content }}
      </div>
      <div class="music-info">
        <span class="music-name">{{ comment.musicName }}</span>
        <span class="artists-name">{{ comment.artist }}</span>
      </div>
    </div>
    <div v-else class="loading-indicator-wrapper">
      <div class="aether-spinner">
        <div class="rect-one" />
        <div class="rect-two" />
        <div class="rect-three" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-music {
  position: relative;
  z-index: 1;
  padding: 1rem;
  min-height: 194px;

  .comment-163 {
    font-family: MMT, '沐目体';
    position: relative;
    border: 1px solid #f5f5f5;
    padding: 0.75em;
    border-radius: var(--border-radius);
    color: var(--color-comment, #272626);
    cursor: pointer;
    height: 100%;
  }
  .pic-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    filter: blur(10px);
    background-size: cover;
    background-position: center;
    border-radius: var(--border-radius);
    z-index: -1;
    opacity: 0.75;
  }
  .commentator {
    display: flex;
    align-items: center;
    margin-bottom: 0.75em;
    .comment-avatar {
      width: 3.125em;
      height: 3.125em;
      border-radius: 50%;
      margin-right: 0.75em;
      border: 1px solid #f5f5f5;
      padding: 0.125em;
    }
    .comment-user {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.2;
      .comment-nickname {
        position: relative;
        font-weight: 600;
        font-size: 1.2rem;
        text-decoration: none;
        display: inline-block;
      }
      .comment-time {
        font-size: 0.8rem;
        color: var(--color-time);
        /* 使用 CSS 也可达到同样的效果 */
        /* mix-blend-mode: difference; */
      }
      .comment-nickname:not(:empty)::after {
        content: '：';
        margin-right: 0.25em;
      }
    }
    .comment-liked {
      font-weight: 600;
      font-size: 0.8rem;
      color: var(--color-time);
      margin-left: auto;
      &::after {
        content: '👍';
        margin-left: 0.25em;
      }
    }
  }
  .comment-content {
    word-wrap: break-word;
    word-break: break-all;
    font-size: 1.5rem;
    line-height: 2rem;
    position: relative;
    margin-left: 2.8em;
  }
  .music-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.2rem;
    margin-top: 0.75em;
    text-shadow: 0 0 4px var(--color-text-shadow, rgba(0, 0, 0, .4));
  }
  .music-name:not(:empty)::before {
    content: '《';
  }
  .artists-name:not(:empty)::after {
    content: '》';
  }
  .music-name:not(:empty)::after {
    content: '·';
    margin-inline: 0.25rem;
  }
  .mmt-netease-powered {
    display: block;
    text-align: right;
    font-size: 80%;
    color: #999;
    margin-block: 0.5rem;
  }
}

@media (prefers-color-scheme: dark) {
  .section-music {
    --color-comment: #f5f5f5;
  }
  .music-info {
    --color-text-shadow: rgba(255, 255, 255, .8);
  }
}

.loading-indicator-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 20px;

  .aether-spinner {
    display: flex;
    justify-content: space-between;
    width: var(--as-size, 16px);
    height: var(--as-size, 16px);
    text-align: center;
    font-size: var(--as-font-size, 10px);

    > div {
      height: 100%;
      width: 4px;
      background-color: var(--as-content-color-tertiary, #a6a6a6);
      opacity: 0.2;
      border-radius: var(--as-border-radius-default, 4px);
      animation: spinner-bounce 0.6s infinite ease-in-out;
      transform-origin: center;
    }
    .rect-two {
      animation-delay: 0.15s;
    }
    .rect-three {
      animation-delay: 0.3s;
    }
  }
}

@keyframes spinner-bounce {
  0%,
  100% {
    transform: scaleY(0.4);
    opacity: 0.8;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
