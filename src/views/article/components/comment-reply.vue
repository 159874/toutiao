<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <collect-article :list="commentList" :source="comment.com_id" type="c" />
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @onpost-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CollectArticle from './article-commect'
import CommentItem from './comment-item'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    'collect-article': CollectArticle,
    'comment-item': CommentItem,
    'comment-post': CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentList: [],
      isPostShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuccess(data) {
      console.log(data)
      this.comment.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
