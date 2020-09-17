<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    v-if="!is_followed"
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    @click="follow"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    :loading="isFollowLoading"
    size="small"
    @click="follow"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  data() {
    return {
      isFollowLoading: false
    }
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'is_followed',
    event: 'update-follow'
  },
  methods: {
    async follow() {
      this.isFollowLoading = true
      try {
        if (this.is_followed) {
          await deleteFollow(this.user_id)
        } else {
          await addFollow(this.user_id)
        }
        this.$emit('update-follow', !this.is_followed)
      } catch (error) {
        console.dir(error)
        if (error.response && error.response.status === 400) {
          return this.$toast.fail('不能关注自己')
        }
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    }
  }
}
</script>
<style lang="less" scoped></style>
