<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <input type="file" hidden ref="inputFile" @change="inputChange" />
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <van-cell
      title="性别"
      :value="user.gender ? '女' : '男'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday || '1997-00-00'"
      is-link
      @click="isShowUpdateBirthdy = true"
    />
    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <update-name
        v-if="isShowUpdateName"
        v-model="user.name"
        @close="isShowUpdateName = false"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <update-gender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      />
    </van-popup>
    <!-- 编辑性别弹层 -->
    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <update-birthdy
        v-if="isShowUpdateBirthdy"
        v-model="user.birthday"
        @close="isShowUpdateBirthdy = false"
      />
    </van-popup>
    <!-- 编辑生日弹层 -->
    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isShowUpdateAcatar"
      style="height: 100%"
      position="bottom"
    >
      <update-avatar
      v-if="isShowUpdateAcatar"
        :img="img"
        @close="isShowUpdateAcatar = false"
        @update-avatar="user.photo = $event"
      />
    </van-popup>
    <!-- 编辑头像弹层 -->
  </div>
</template>

<script>
import { getUserProFile } from '@/api/user'
import updatedName from './components/update-name'
import updatedGender from './components/update-gender'
import updatedBirthdy from './components/update-birthdy'
import updatedAvatar from './components/update-avatar'
export default {
  data() {
    return {
      user: {},
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
      isShowUpdateAcatar: false,
      img: ''
    }
  },
  components: {
    'update-name': updatedName,
    'update-gender': updatedGender,
    'update-birthdy': updatedBirthdy,
    'update-avatar': updatedAvatar
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      try {
        const { data: res } = await getUserProFile()
        this.user = res.data
        console.log(this.user)
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    inputChange() {
      const file = this.$refs.inputFile.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isShowUpdateAcatar = true
      this.$refs.inputFile.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
