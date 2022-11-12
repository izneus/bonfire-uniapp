<template>
  <view class="demo">
    <view>{{ name }}</view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MeTab',
  dicts: ['user_status'],
  computed: {
    ...mapState('user', {
      name: state => state.name
    })
  },
  created () {
    // 得到完整数据
    // console.log('dict', this.dict)
    // 打印简化后的label数据
    // console.log('user_status', this.dict.label.user_status)
  }
}
</script>

<style scoped>
</style>
