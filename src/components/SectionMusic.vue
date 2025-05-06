<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Comment {
  musicName: string
  musicUrl: string
  artist: string
  picUrl: string
  content: string
  nickname: string
  avatarUrl: string
}

const mid = ref<string>('2280569152')
const defaultComment: Comment = {
  musicName: '',
  musicUrl: '',
  artist: '',
  picUrl: '',
  content: '',
  nickname: '',
  avatarUrl: '',
}
const comment = ref<Comment>(defaultComment)

function getRandomComment() {
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
    })
    .catch((err) => {
      console.error(err)
      comment.value = {
        ...defaultComment,
        content: '获取评论失败，请稍后再试...',
      }
    })
}

onMounted(() => {
  getRandomComment()
})
</script>

<template>
  <section class="section-music">
    <div class="comment-163" title="随机下一条" @click="getRandomComment">
      <span class="pic-backdrop" :style="comment.picUrl ? `background-image: url(${comment.picUrl});` : ''" />
      <div class="commentator">
        <img
          v-show="comment?.avatarUrl"
          class="comment-avatar"
          :alt="`${comment.nickname}'s avatar`"
          :src="comment.avatarUrl?.slice(5)"
        >
        <span class="comment-nickname">{{ comment.nickname }}</span>
      </div>
      <div v-if="comment.content" class="comment-content">
        {{ comment.content }}
      </div>
      <div v-else class="loading-indicator-wrapper">
        <div class="aether-spinner">
          <div class="rect-one" />
          <div class="rect-two" />
          <div class="rect-three" />
        </div>
      </div>
      <div class="music-info">
        <span class="artists-name">{{ comment.artist }}</span>
        <span class="music-name">{{ comment.musicName }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-music {
  z-index: 1;
  padding: 1rem;
  min-height: 185px;
  --color-comment: #272626;

  .comment-163 {
    font-family: MMT, '沐目体';
    position: relative;
    border: 1px solid #f5f5f5;
    padding: 0.75em;
    border-radius: 0.75rem;
    color: var(--color-comment);
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
    border-radius: 0.75rem;
    z-index: -1;
    opacity: 0.75;
  }
  .commentator {
    display: flex;
    align-items: center;
  }
  .comment-avatar {
    width: 3.125em;
    height: 3.125em;
    border-radius: 50%;
    margin-right: 0.75em;
    border: 1px solid #f5f5f5;
    padding: 0.125em;
  }
  .comment-nickname {
    position: relative;
    font-weight: 600;
    font-size: 1.2rem;
    text-decoration: none;
    display: inline-block;
  }
  .comment-nickname:not(:empty)::after {
    content: '：';
    margin-right: 0.25em;
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
    flex-direction: row-reverse;
    font-weight: 500;
    font-size: 1.2rem;
    margin-top: 0.75em;
  }
  .music-name:not(:empty)::after {
    content: '-';
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  .mmt-netease-powered {
    display: blcok;
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
