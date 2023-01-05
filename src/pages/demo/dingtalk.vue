<!-- 本demo页演示如何调用钉钉jsapi定位，流程为页面先执行钉钉jsapi鉴权，再dd.ready内调用定位api -->
<template>
  <view>
    <u--text :text="address" />
    <u--text :text="lon" />
    <u--text :text="lat" />
    <u-button
      text="退出登录"
      @click="handleLogoutClick"
    />
  </view>
</template>

<script>
import * as dd from 'dingtalk-jsapi'
import { ddConfig } from '@/utils/dingtalk'

export default {
  name: 'DingtalkDemo',
  data () {
    return {
      address: '定位中...',
      lon: null,
      lat: null
    }
  },
  onReady () {
    if (dd.env.platform === 'notInDingTalk') {
      this.address = '请在钉钉内打开'
    } else {
      ddConfig('http://实际访问地址', ['device.geolocation.get'])
        .then(() => {
          dd.ready(() => {
            dd.device.geolocation.get({
              targetAccuracy: 200,
              coordinate: 1,
              withReGeocode: true,
              useCache: true,
              onSuccess: result => {
                this.address = result.address
                this.lon = result.longitude
                this.lat = result.latitude
              },
              onFail: function (err) {
                alert('geolocation.get error: ' + JSON.stringify(err))
              }
            })
          })
        })
    }
  },
  methods: {
    handleLogoutClick () {
      this.$store.dispatch('user/logout', this.query)
    }
  }
}
</script>

<style scoped>

</style>
