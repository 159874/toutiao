<template>
  <div class="update-genger">
    <van-picker
      title="性别"
      show-toolbar
      :default-index="index"
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  model: {
    prop: 'gender',
    event: 'update-gender'
  },
  data() {
    return {
      columns: ['男', '女'],
      index: this.gender
    }
  },
  methods: {
    async onConfirm(value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUser({
          gender: index
        })
        this.$emit('update-gender', index)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
