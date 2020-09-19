<template>
  <div class="comment-post">
    <van-field
      v-model.trim="inputComment"
      class="post-field"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onAddComment">发布</van-button>
  </div>
</template>

<script>
import { addCommentPost } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      inputComment: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onAddComment() {
      const inputComment = this.inputComment.trim()
      if (!inputComment.length) {
        return
      }
      try {
        const { data: res } = await addCommentPost({
          target: this.target + '',
          content: inputComment,
          art_id: this.articleId ? this.articleId + '' : null
        })
        this.$emit('onpost-success', res)
        this.$toast('添加成功')
      } catch (error) {
        console.log(error)
        this.$toast('添加失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
