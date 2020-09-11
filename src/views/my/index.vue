<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            fit="cover"
            round
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝 关注 -->
      <div class="data-stats">
        <div class="data-item">
          <span>{{userInfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{userInfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn">
        <img
          class="mobile-img"
          src="@/assets/mobile.png"
          @click="$router.push('/login')"
        />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <van-grid :column-num="2">
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <div>
      <van-cell title="消息通知" is-link url="" />
      <van-cell title="实名注册" is-link url="" />
      <van-cell title="用户反馈" is-link url="" />
      <van-cell title="小智同学" is-link url="" />
      <van-cell title="系统设置" is-link url="" />
      <van-cell
        v-if="user"
        @click="onLogout"
        class="logout-cell"
        title="退出登录"
        center
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: '退出',
          message: '是否退出当前账号'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
    },
    async loadUser() {
      try {
        const { data: res } = await getUserInfo()
        // console.log(res)
        this.userInfo = res.data
      } catch (error) {}
    }
  },
  created() {
    if (this.user) this.loadUser()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 401px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
        }
      }
    }
    .data-stats {
      height: 130px;
    }
  }
  .data-stats {
    display: flex;
    justify-content: space-around;
    .data-item {
      height: 130px;
      display: flex;
      align-content: center;
      justify-content: center;
      flex-direction: column;
      color: #fff;
      span:nth-child(1) {
        font-size: 36px;
        margin-bottom: 15px;
      }
      span:nth-child(2) {
        font-size: 23px;
      }
    }
  }

  .van-grid {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
