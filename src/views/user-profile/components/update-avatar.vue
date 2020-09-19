<template>
  <div class="update-avatar">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import { updateUserAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.js'
import Cropper from 'cropperjs'
export default {
  data() {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    confirm() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateAvatar(blob)
      })
    },
    async updateAvatar(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const formDate = new FormData()
        formDate.append('photo', blob)
        const { data: res } = await updateUserAvatar(formDate)
        this.$emit('close')
        this.$emit('update-avatar', res.data.photo)
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
