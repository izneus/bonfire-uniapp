import * as dd from 'dingtalk-jsapi'
import { getDdSign } from '@/api/dingtalk'

export function ddConfig (url, apis) {
  return new Promise((resolve, reject) => {
    getDdSign({ url }).then(res => {
      const config = res.data
      dd.config({
        agentId: config.agentId,
        corpId: config.corpId,
        timeStamp: config.timeStamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        type: 0,
        jsApiList: apis
      })
      dd.error(function (err) {
        alert('dd error: ' + JSON.stringify(err))
      })
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}
