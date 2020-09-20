<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="err"
      error-text="加载失败 点击重试"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- <van-cell v-for="(item, index) in list" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{
              item.pubdate | relativeTime
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @click-reply="$emit('click-reply', $event)"
      />
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  components: {
    'comment-item': CommentItem
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      totalCount: 0,
      err: false
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getComments({
          type: this.type,
          source: this.source + '',
          offset: this.offset,
          limit: 10
        })
        const { results } = res.data
        this.list.push(...results)
        this.totalCount = res.data.total_count
        this.$emit('onload-success', this.totalCount)
        this.loading = false
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.err = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
