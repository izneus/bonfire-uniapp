<!--todo uniapp自带的tab导航，在钉钉环境下比较卡，在苹果设备上，字号过大容易错行,计划换成uview的tab组件-->
<template>
  <view class="demo">
    首页演示
  </view>
</template>

<script>
import { getTokenSync } from '@/utils/auth'

export default {
  name: 'HomeTab',
  data () {
    return {
      title: 'Hello',
      value6: 0
    }
  },
  onReady () {
    // fix首次进入无token不跳转login问题
    if (!getTokenSync()) {
      uni.navigateTo({ url: '/pages/login/index' })
    }
  },
  methods: {}
}
</script>

<style>
/*.content {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*}*/

/*.logo {*/
/*  height: 200 rpx;*/
/*  width: 200 rpx;*/
/*  margin: 200 rpx auto 50 rpx auto;*/
/*}*/

/*.text-area {*/
/*  display: flex;*/
/*  justify-content: center;*/
/*}*/

/*.title {*/
/*  font-size: 36 rpx;*/
/*  color: #8f8f94;*/
/*}*/
</style>
