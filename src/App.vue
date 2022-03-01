<template>
  <div id="app">
    <div ref="header" class="change-role">
      <div class="change" @click="changeUser">切换角色</div>
      <div class="current-role">
        <img :src="currentUser.avatar" />
        <span>{{
          currentUser.name + (currentUser.author ? '（作者）' : '（游客）')
        }}</span>
      </div>
    </div>
    <div ref="comment" :style="wrapStyle" class="comment-wrap">
      <Comment
        v-model="data"
        :user="currentUser"
        :before-submit="submit"
        :before-like="like"
        :before-delete="deleteComment"
        :upload-img="uploadImg"
        :props="props"
      />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import { EXAMPLE_DATA } from './data'

export default {
  name: 'App',
  components: {
    Comment,
  },
  data() {
    const users = [
      {
        id: '001',
        name: 'Up&Up',
        avatar: require('./assets/image/avatar1.jpg'),
        nameAvatar: true,
        author: true,
      },
      {
        id: '002',
        name: '我叫白云',
        avatar: require('./assets/image/comment.png'),
        nameAvatar: false,
      },
      {
        id: '003',
        name: '我叫黑土',
        avatar: require('./assets/image/avatar3.jpg'),
        nameAvatar: false,
      },
      {
        id: '004',
        name: 'NARUTO',
        avatar: require('./assets/image/avatar2.jpg'),
        nameAvatar: false,
      },
    ]
    return {
      data: [],
      props: {
        id: '_id',
        content: 'content',
        imgSrc: 'imgSrc',
        children: 'childrenComments',
        likes: 'likes',
        liked: 'liked',
        reply: 'reply',
        createAt: 'createAt',
        user: 'visitor',
      },
      currentUser: users[0],
      users,
      wrapStyle: '',
    }
  },
  created() {
    this.addData(1)
  },
  mounted() {
    const header = this.$refs.header
    this.wrapStyle = `height: calc(100vh - ${header.clientHeight + 20}px)`
  },
  methods: {
    async submit(newComment, parent, add) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ newComment, parent })
        }, 300)
      })

      add(Object.assign(res.newComment, { _id: new Date().getTime() }))

      console.log('addComment: ', res)
    },

    async like(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })

      console.log('likeComment: ', res)
    },

    async uploadImg({ file, callback }) {
      const res = await new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
          resolve(reader.result)
        }

        reader.onerror = () => {
          reject(reader.error)
        }
      })

      callback(res)
      console.log('uploadImg： ', res)
    },

    async deleteComment(comment, parent) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ comment, parent })
        }, 300)
      })

      console.log('deleteComment: ', res)
    },

    changeUser() {
      const users = this.users
      const index = users.findIndex((c) => c.name === this.currentUser.name)

      this.currentUser = users[index === users.length - 1 ? 0 : index + 1]
      this.$refs.comment.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    },

    addData(times) {
      setTimeout(() => {
        this.data = new Array(times).fill(EXAMPLE_DATA).flat(Infinity)
      }, 0)
    },
  },
}
</script>

<style lang="scss">
@mixin scroll-style(
  $thumb: rgba(255, 255, 255, 0.6),
  $track: rgba(255, 255, 255, 0)
) {
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    border: none;
    box-shadow: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: $thumb;
  }
  &::-webkit-scrollbar-track {
    background: $track;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 14px;
}

html,
body,
#app {
  height: 100%;
}

@media screen and (min-width: 320px) {
  html {
    font-size: calc(14px + 4 * ((100vw - 320px) / (1200 - 320)));
  }
}

@media screen and (min-width: 1200px) {
  html {
    font-size: 18px;
  }
}

.change-role {
  background: #1c2433;
  color: #eee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  .change {
    cursor: pointer;
    padding: 0.4rem;
    margin-right: 2rem;
    font-size: 0.9rem;
    border: 1px solid #e99210;
    border-radius: 5px;
    user-select: none;
    &:hover {
      opacity: 0.9;
    }
  }
  .current-role {
    min-width: 15rem;
    color: #e99210;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e99210;
    padding: 0 1rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}

.comment-wrap {
  overflow: auto;
  @include scroll-style(#db8f1c, #b9b9b9);
}

@media screen and (min-width: 760px) {
  body {
    margin: 0 10%;
    border: 1px dashed #eee;
  }
}

@media screen and (max-width: 500px) {
  .change-role .current-role {
    min-width: 5rem;
    padding: 0 0.5rem;
  }
}
</style>
