<template>
  <van-icon
    :color="attitude === 1 ? 'red' : ''"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  props: {
    attitude: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'attitude',
    event: 'update-like'
  },
  methods: {
    async onLike() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.attitude === 1) {
          await deleteLike(this.articleId)
          // this.attitude = -1
          this.$emit('update-like', -1)
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.articleId)
          // this.attitude = 1
          this.$emit('update-like', 1)
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
