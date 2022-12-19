// 此vm参数为页面的实例，可以通过它引用vuex中的变量
const { getTokenSync } = require('@/utils/auth')
module.exports = (vm) => {
  // 初始化请求配置
  uni.$u.http.setConfig((config) => {
    /* config 为默认全局配置 */
    config.baseURL = process.env.VUE_APP_BASE_API /* 根域名 */
    return config
  })

  // 请求拦截
  uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    config.data = config.data || {}
    // 看情况添加token头
    const token = getTokenSync()
    if (token) {
      // console.log('Bearer', token)
      config.header.Authorization = 'Bearer ' + token
    }
    // 根据custom参数中配置的是否需要token，添加对应的请求头
    // if(config?.custom?.auth) {
    //     // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
    //     // config.header.token = vm.$store.state.userInfo.token
    // }
    return config
  }, config => { // 可使用async await 做异步操作
    return Promise.reject(config)
  })

  // 响应拦截
  uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作 */
    // const data = response.data
    // 自定义参数
    // const custom = response.config?.custom
    // if (data.code !== 200) {
    //     // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
    //     if (custom.toast !== false) {
    //         uni.$u.toast(data.message)
    //     }
    //
    //     // 如果需要catch返回，则进行reject
    //     if (custom?.catch) {
    //         return Promise.reject(data)
    //     } else {
    //         // 否则返回一个pending中的promise，请求不会进入catch中
    //         return new Promise(() => { })
    //     }
    // }
    // return data.data === undefined ? {} : data.data
    return response
  }, (error) => {
    console.log('error', error)
    // 对响应错误做点什么 （statusCode !== 200）
    if (!Object.prototype.hasOwnProperty.call(error, 'data')) {
      // console.log('err', error) // for debug
      uni.showToast({
        title: '服务不可达',
        duration: 2000,
        icon: 'error'
      })
      return Promise.reject(error)
    }

    const res = error.data
    // 符合ApiError的错误返回
    if (Object.prototype.hasOwnProperty.call(res, 'message')) {
      uni.showToast({
        title: res.message,
        icon: 'exception',
        duration: 2000
      })
    } else {
      // 其他未知错误返回
      // console.log('err' + error) // for debug
      uni.showToast({
        title: error.errMsg,
        icon: 'fail',
        duration: 2000
      })
    }

    return Promise.reject(error)
  })
}
