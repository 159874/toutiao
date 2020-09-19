<template>
  <div class="update-name">
    <!-- 导航 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div style="padding: 10px">
      <van-field
        v-model="localName"
        placeholder="请输入新昵称"
        rows="2"
        autosize
        type="textarea"
        show-word-limit
        maxlength="50"
      />
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  model: {
    prop: 'name',
    event: 'update-name'
  },
  data() {
    return {
      localName: ''
    }
  },
  created() {
    this.localName = this.name
  },
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.localName.trim() === '') return this.$toast('请输入昵称')
        await updateUser({ name: this.localName })
        this.$emit('update-name', this.localName)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        close.dir(error)
        if (error.response && error.response.status === 409) {
          return this.$toast('用户名已存在')
        }
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-name {
  .van-field {
    background: #f5f7f9;
  }
}
</style>
