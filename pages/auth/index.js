// pages/auth/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 授权,
   * 用了这个方法，就可以不用bindtap方法
   */
  handleGetUserInfo(msg){
    // 这个参数里面有需要的四个参数
    console.log(msg)
    wx.login({
      success(res) {
        if (res.code) {
          // 获取code，就是res.code的值
          console.log(res.code)
          const data = {
            encryptedData:msg.detail.encryptedData,
            rawData:msg.detail.rawData,
            iv:msg.detail.iv,
            signature:msg.detail.signature,
            code:res.code
          }


          //发起网络请求
          request({
            url: '/users/wxlogin',
            method:'POST',
            data
          }).then(res=>{
            console.log(res)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }



})