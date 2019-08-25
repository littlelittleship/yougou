// pages/order_enter/index.js
import request from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info:{},
    goods:[],
    allPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

 
  /**
   * 生命周期函数--监听页面显示
   * 获取本地商品信息和用户信息
   * 计算总价格
   */
  onShow: function () {
    let goods = wx.getStorageSync('arrList')
    let user_info = wx.getStorageSync('user_info')
    
    let allPrice = 0
    goods.forEach(v=>{
      allPrice += v.goods_price * v.num
    })

    this.setData({
      user_info,
      goods,
      allPrice
    })

  },

  /**
   * 按下支付触发
   * 发起创建订单的接口，
   * 先获取需要的数据
   */
  handlePay(){
    const { goods, allPrice, user_info} = this.data
    const newGoods = goods.map(v=>{
      return {
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }
    })
    const token = wx.getStorageSync('token')

    request({
      url:'/my/orders/create',
      method:"POST",
      header:{
        Authorization:token
      },
      data:{
        order_price:allPrice,
        consignee_addr:`${user_info.userName} ${user_info.user_tel} ${user_info.user_address}`,
        goods:newGoods
      }
    }).then(res=>{
      console.log(res)
      const { order_number } = res.data.message
      // 获取支付参数
      // 注意Authorization可以不用加“”
      request({
        url:'/my/orders/req_unifiedorder',
        method:'POST',
        header:{     
          Authorization:token
        },
        data:{
          order_number
        }
      }).then( res=>{
        // console.log(res)
        // 直接给pay里面的信息，不用像文档那样分解
        wx.requestPayment(res.data.message.pay)
      })

    })
  }

})