<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar header" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to='/search'
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i
          class="toutiao toutiao-gengduo"
          @click="isChannelEditShow = true"
        ></i>
      </div>
    </van-tabs>
    <!-- 弹出框 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
        @add-channel="onAddChannel"
        @channel-click="deleteChannelClick"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  components: {
    'article-list': ArticleList,
    'channel-edit': ChannelEdit
  },
  created() {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels() {
      try {
        const localChannel = getItem('TOUTIAO_CHANNELS')
        if (this.user || !localChannel) {
          const { data: res } = await getUserChannels()
          this.channels = res.data.channels
          return false
        } else {
          this.channels = localChannel
        }
      } catch (error) {
        this.$toast.fail('获取频道列表失败')
      }
    },
    onUpdateActive(index, isEditChannelShow) {
      this.active = index
      this.isChannelEditShow = isEditChannelShow
    },
    onAddChannel(value) {
      this.channels.push(value)
    },
    deleteChannelClick(index, num) {
      this.channels.splice(index, num)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 180px;
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
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 2;
      width: 100%;
    }
  }
}
.edit-channel-popup {
  padding-top: 100px;
  box-sizing: border-box;
}
</style>
