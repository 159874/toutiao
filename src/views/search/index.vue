<template>
  <div class="search-contatiner">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        background="#3196fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isResultShow = false"
      >
        <template #action>
          <div @click="onCancel" class="heard-text">取消</div>
        </template>
      </van-search>
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      :searchText="searchText"
      v-else-if="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @clear-search-history="searchHistories = []"
      @search="onSearch"
      @deleteHistories="deleteHistories"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('serach-histories') || []
    }
  },
  components: {
    'search-history': SearchHistory,
    'search-suggestion': SearchSuggestion,
    'search-result': SearchResult
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      this.isResultShow = true
    },
    onCancel() {
      // this.$toast('取消')
      this.$router.push('/')
    },
    deleteHistories(index) {
      this.searchHistories.splice(index, 1)
    }
  },
  watch: {
    searchHistories(val) {
      setItem('serach-histories', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-contatiner {
  padding-top: 106px;
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
