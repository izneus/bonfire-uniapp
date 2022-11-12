<template>
  <view class="app-container">
    <view class="logo-wrapper">
      <u--image
        :show-loading="true"
        src="/static/logo.png"
        width="72px"
        height="72px"
        style="margin: auto; align-items: center"
      />
    </view>
    <u--form
      ref="loginForm"
      label-position="left"
      :model="query"
    >
      <u-form-item prop="username">
        <u--input
          v-model="query.username"
          placeholder="请输入用户名称"
          prefix-icon="account-fill"
          prefix-icon-style="font-size: 22px;color: #303133"
          class="focus-input"
        />
      </u-form-item>

      <u-form-item prop="password">
        <u--input
          v-model="query.password"
          placeholder="请输入登录密码"
          type="password"
          prefix-icon="lock-fill"
          prefix-icon-style="font-size: 22px;color: #303133"
          class="focus-input"
        />
      </u-form-item>

      <u-row style="width: 100%; height: 100%;">
        <u-col span="6">
          <u-form-item prop="captcha">
            <u--input
              v-model="query.captcha"
              placeholder="验证码"
              type="text"
              class="focus-input"
            />
          </u-form-item>
        </u-col>
        <u-col span="6">
          <u--image
            :show-loading="true"
            :src="captchaImage"
            width="100%"
            height="37px"
            style="margin: 0 0 0 10px;"
            @click="setCaptchaImage"
          />
        </u-col>
      </u-row>
    </u--form>
    <u-button
      text="登录"
      type="primary"
      style="margin-top: 10px"
      :loading="loading.login"
      @click="handleLogin"
    />
  </view>
</template>

<script>
import { getCaptcha } from '@/api/login'
import { REG_PASSWORD, REG_USERNAME } from '@/common/constant/reg-exp'

export default {
  name: 'LoginPage',
  data () {
    return {
      query: {
        username: 'admin',
        password: 'Admin123',
        captcha: null,
        captchaId: null
      },
      captchaImage: null,
      loading: {
        login: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: REG_USERNAME, message: '用户名必须为5-20位字母或者数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: REG_PASSWORD, message: '密码必须包含大小写字母和数字，长度为8～16', trigger: 'blur' }
        ],
        captcha: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      }
    }
  },
  created () {
    // window.addEventListener('storage', this.afterQRScan)
    this.setCaptchaImage()
  },
  onReady () {
    // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.loginForm.setRules(this.rules)
  },
  methods: {
    setCaptchaImage () {
      getCaptcha().then(resp => {
        this.captchaImage = resp.data.captcha
        this.query.captchaId = resp.data.id
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate().then(() => {
        // uni.$u.toast('校验通过')
        this.loading.login = true
        // login(this.query).then(resp => {
        //   setTokenSync(resp.data.token)
        //   uni.switchTab({url: '/'})
        // }).finally(() => {
        //   this.loading.login = false
        // })
        this.$store.dispatch('user/login', this.query).then(() => {
          uni.switchTab({ url: '/' })
        }).finally(() => {
          this.loading.login = false
        })
      }).catch(errors => {
        // uni.$u.toast('校验失败')
      })
    }
  }
}
</script>

<style scoped>
.logo-wrapper {
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
