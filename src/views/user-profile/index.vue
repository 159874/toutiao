<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link />
    <van-cell title="性别" :value="user.gender ? '女' : '男'" is-link />
    <van-cell title="生日" :value="user.birthdy || '1997-00-00'" is-link />
  </div>
</template>

<script>
import { getUserProFile } from '@/api/user'
export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      try {
        const { data: res } = await getUserProFile()
        this.user = res.data
      } catch (error) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
