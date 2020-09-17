<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlightText(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(function(val) {
        this.loadSearchSuggestion(val)
      }, 1000),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (error) {
        console.log('获取失败')
      }
    },
    highlightText(text) {
      const highlightStr = `<span style="color: red">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped></style>
