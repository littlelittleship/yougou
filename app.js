//app.js
import request from './utils/request.js'

App({
  onLaunch: function () {
    request.defaults.baseURL = 'https://api.zbztb.cn/api/public/v1'

    request.onError(function(res){
      // console.log(res)
      if(res.data.meta.status === 401){
        wx.navigateTo({
          url:'/pages/auth/index'
        })
      }
    })
  }
})