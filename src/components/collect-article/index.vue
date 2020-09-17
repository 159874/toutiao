<template>
  <van-icon
    :color="is_collected ? '#ffa500' : ''"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  model: {
    prop: 'is_collected',
    event: 'update-collect'
  },
  methods: {
    async onCollect() {
      console.log(this.articleId)
      this.loading = true
      try {
        if (this.is_collected) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('update-collect', !this.is_collected)
        this.$toast.success(this.is_collected ? '取消收藏' : '收藏成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
