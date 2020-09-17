<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <template v-if="isDeleteShow">
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onHistoryClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onHistoryClick(item, index) {
      if (this.isDeleteShow) {
        // this.searchHistories.splice(index, 1)
        this.$emit('deleteHistories', index)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
