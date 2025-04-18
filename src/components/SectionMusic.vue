<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Comment {
  name: string
  url: string
  picurl: string
  artistsname: string
  avatarurl: string
  nickname: string
  content: string
}

const mid = ref<string>('2280569152')
const defaultComment: Comment = {
  name: '',
  url: '',
  picurl: '',
  artistsname: '',
  avatarurl: '',
  nickname: '',
  content: '',
}
const comment = ref<Comment>(defaultComment)

function getRandomComment() {
  fetch(`https://api.uomg.com/api/comments.163?mid=${mid.value}`)
    .then(response => response.json())
    .then((res) => {
      if (res.code !== 1) {
        return
      }
      comment.value = {
        ...defaultComment,
        name: '未知用户',
        ...res.data,
      }
    }).catch((err) => {
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
      <span class="pic-backdrop" :style="comment.picurl ? `background-image: url(${comment.picurl});` : ''"></span>
      <div class="commentator">
        <img 
          v-show="comment?.avatarurl"
          class="comment-avatar"
          :alt="`${comment.nickname}'s avatar`"
          :src="comment.avatarurl?.slice(5)"
        />
        <span class="comment-nickname">{{ comment.nickname }}</span>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="music-info">
        <span class="artists-name">{{ comment.artistsname }}</span>
        <span class="music-name">{{ comment.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-music {
  z-index: 1;
  padding: 1rem;
  --color-comment: #272626;

  .comment-163 {
    font-family: MMT, '沐目体';
    position: relative;
    border: 1px solid #f5f5f5;
    padding: 0.75em;
    border-radius: 0.75rem;
    color: var(--color-comment);
    cursor: pointer;
    margin-top: 1rem;
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
</style>
