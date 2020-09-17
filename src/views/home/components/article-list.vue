<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        >
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import articleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    'article-item': articleItem
  },
  props: {
    channel: {
      type: Object,
      requied: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false,
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        console.log(this.list)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取频道文章列表失败')
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshing = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.$toast.fail('获取频道文章列表失败')
        this.refreshing = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
