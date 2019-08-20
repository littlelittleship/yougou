// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info:{
      userName:'',
      user_tel:'',
      user_address:''
    }
  },

  /**
   * 这里注意写法，用箭头函数改变this的指向
   * 如果不改变的话this指向dom元素，就设置不了值
   * 函数是一个闭包
   * wx.chooseAddress:微信提供的接口--收货地址
   */
  handleGetAddress(){
    wx.chooseAddress({
      success:res=>{                //注意
        // console.log(res)
        this.setData({
          user_info:{
            userName:res.userName,
            user_tel:res.telNumber,
            user_address:res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

 
})