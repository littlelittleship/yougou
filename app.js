//app.js
import request from './utils/request.js'

App({
  onLaunch: function () {
    request.defaults.baseURL = 'https://api.zbztb.cn/api/public/v1'
  }
})