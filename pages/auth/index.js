// // pages/auth/index.js
// import request from "../../utils/request.js"

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },


//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 授权,
//    * 用了这个方法，就可以不用bindtap方法
//    */
//   handleGetUserInfo(msg){
//     // 这个参数里面有需要的四个参数
//     // console.log(msg)
//     wx.login({
//       success(res) {
//         if (res.code) {
//           // 获取code，就是res.code的值
//           // console.log(res.code)
//           const data = {
//             encryptedData:msg.detail.encryptedData,
//             rawData:msg.detail.rawData,
//             iv:msg.detail.iv,
//             signature:msg.detail.signature,
//             code:res.code
//           }


//           //发起网络请求
//           request({
//             url: '/users/wxlogin',
//             method:'POST',
//             data
//           }).then(res=>{
//             console.log(res)
//           })
//         } else {
//           console.log('登录失败！' + res.errMsg)
//         }
//       }
//     })
//   }
// })


import request from "../../utils/request.js";

// pages/auth/index.js
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

  // 获取用户详细信息
  handleGetUserInfo(msg) {
    // 获取code
    wx.login({
      success(res) {
        if (res.code) {

          // 拼接参数
          const data = {
            code: res.code,
            encryptedData: msg.detail.encryptedData,
            rawData: msg.detail.rawData,
            iv: msg.detail.iv,
            signature: msg.detail.signature,
          }

          // 开始调用后台接口获取token
          request({
            url: "/users/wxlogin",
            data,
            method: "POST"
          }).then(res => {
            // console.log(res)
            const { token } = res.data.message
            wx.setStorageSync('token', token)

            wx.navigateBack({
              url:'/pages/order_enter/index'
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})

// import request from "../../utils/request.js";

// // pages/auth/index.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   // 获取用户详细信息
//   handleGetUserInfo(msg) {
//     // 获取code
//     wx.login({
//       success(res) {
//         if (res.code) {

//           // 拼接参数
//           const data = {
//             code: res.code,
//             encryptedData: msg.detail.encryptedData,
//             rawData: msg.detail.rawData,
//             iv: msg.detail.iv,
//             signature: msg.detail.signature,
//           }

//           // 开始调用后台接口获取token
//           request({
//             url: "/users/wxlogin",
//             data,
//             method: "POST"
//           }).then(res => {

//             // 把token保存到本地
//             const { token } = res.data.message;
//             wx.setStorageSync("token", token);

//             // 返回上一页
//             wx.navigateBack();

//           })
//         } else {
//           console.log('登录失败！' + res.errMsg)
//         }
//       }
//     })
//   }
// })