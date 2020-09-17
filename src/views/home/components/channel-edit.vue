<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false" class="title-text">
      <van-button
        type="danger"
        round
        size="mini"
        plain
        class="edit-btn"
        @click="isEditShow = !isEditShow"
      >
        {{ isEditShow ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(value, index)"
      >
        <span slot="text" class="text" :class="{ aa: active === index }"
          >{{ value.name }}
        </span>
        <van-icon
          slot="icon"
          name="close"
          v-show="isEditShow && !flxedChannels.includes(value.id)"
        ></van-icon>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="value in recommendChannels"
        :key="value.id"
        :text="value.name"
        icon="plus"
        @click="onAddChannnel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      allcahnnel: [],
      isEditShow: false,
      flxedChannels: [0] // 固定频道 不允许删除
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created() {
    this.getChannelAll()
  },
  methods: {
    async getChannelAll() {
      try {
        const { data } = await getAllChannels()
        this.allcahnnel = data.data.channels
      } catch (error) {
        console.log('获取所有频道失败', error)
      }
    },
    async onAddChannnel(channel) {
      // this.myChannels.push(channel)
      this.$emit('add-channel', channel)
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (error) {
          console.log(error)
          this.$toast('添加失败')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(value, index) {
      if (this.isEditShow) {
        if (this.flxedChannels.includes(value.id)) return
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // this.myChannels.splice(index, 1)
        this.$emit('channel-click', index, 1)
        this.deleteChannel(value)
      } else {
        this.$emit('update-active', index)
      }
    },
    async deleteChannel(channle) {
      try {
        if (this.user) {
          await deleteUserChannel(channle.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
        this.$toast('删除成功')
      } catch (error) {
        console.log(error)
        this.$toast('删除失败')
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allcahnnel.filter(channel => {
        const mychannel = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        return !mychannel
      })
    },
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .title-text {
    font-size: 33px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
  }
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        white-space: nowrap;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
        /deep/ .van-icon-close {
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 36px;
          color: #ccc;
        }
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 24px;
      }
      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
}
.aa {
  color: red !important;
}
</style>
