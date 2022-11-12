const { getTokenSync } = require('@/utils/auth')

module.exports = (vm) => {
  const whiteList = ['/', '/pages/login/index', '/auth-redirect'] // no redirect whitelist
  const apiNames = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack']

  apiNames.forEach(name => {
    uni.addInterceptor(name, {
      invoke (args) {
        // console.log(args)
        // 是否白名单
        const isWhiteList = whiteList.includes(args.url)
        const hasToken = getTokenSync()
        if (hasToken) {
          // 有token，阻止去lgoin
          if (args.url === '/pages/login/index') {
            uni.switchTab({ url: '/' })
            return false
          } else {
            // todo 有token，判断权限
            const hasUsername = vm.$store.state.user.name
            if (hasUsername) {
              // todo
            } else {
              vm.$store.dispatch('user/getInfo')
            }
          }
        } else {
          // 没有token
          if (isWhiteList) {
            // 白名单内
          } else {
            uni.navigateTo({ url: '/pages/login/index' })
            return false
          }
        }
      },
      success (args) {
        // 请求成功后，修改code值为1
        // args.data.code = 1
      },
      fail (err) {
        console.log('navi-interceptor-fail', err)
      },
      complete (res) {
        // console.log('navi-interceptor-complete',res)
      }
    })
  })
}
