<template>
  <div class="update-avatar">
    <img :src="img" class="img" ref="img" />

    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import { updateUserAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
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
      // autoCropArea: 1,
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
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
