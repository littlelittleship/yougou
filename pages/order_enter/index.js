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

    request({
      url:'/my/orders/create',
      method:"POST",
      data:{
        order_price:allPrice,
        consignee_addr:`${user_info.userName} ${user_info.user_tel} ${user_info.user_address}`,
        goods
      }
    }).then(res=>{
      // console.log(res)
    })
  }

})