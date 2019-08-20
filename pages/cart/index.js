// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info:{
      userName:'',
      user_tel:'',
      user_address:'',
      allPrice:0          //总价格
    },

    goods:{}
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
  
  /**
   * 页面出现的时候触发
   * 实现的功能:
   * 获取本地商品数据,赋值给goods
   * 傻吊，单词都写错了
   * 然后遍历对象（对象也是能遍历的，用法跟数组相同）
   * 替换静态数据，注意选中状态有selected属性决定，用三元表达式
   */
  onShow: function(){
    const goods = wx.getStorageSync('goodsList')
    this.setData({
      goods
    })
    this.getAllPrice()
  },

  /**
   * 计算总价格
   * 很多地方都要用到，封装成一个函数
   */
  getAllPrice(){
    let price = 0;
    const { goods } = this.data
    Object.keys(goods).forEach( v=>{
      price += goods[v].goods_price * goods[v].num
    })
    this.setData({
      allPrice:price
    })
  }
 
})