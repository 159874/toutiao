<template>
  <div class="home-container">
    <div class="page-nav-bar header">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </div>
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        {{ item.name }}
        <router-view/>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      } catch (error) {
        this.$toast.fail('获取频道列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .header {
    display: flex;
    justify-content: center;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      margin: 10px 0;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
  }
}
</style>
