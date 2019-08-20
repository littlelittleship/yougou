// pages/goods_detail/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_list:[],
    goods_list:{},
    goods_id:0          //用不到，
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const { id } = options;
    request({
      url:"/goods/detail",
      data:{
        goods_id:id
      }
    }).then(res=>{
      // console.log(res);
      const { message } = res.data;
      this.setData({
        image_list:message,
        goods_id:message.goods_id
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 
  /**
   * 点击加入购物车触发
   * 意识到是通过本地存储来进行数据传递的
   * 先从本地获取商品列表数据，注意设置默认值
   * 获取商品的id，将该商品的信息存储在本地
   * 给商品添加两个属性，number和是否被选中（默认被选中），
   */
  handleAddToCart(){
    const goodsList = wx.getStorageSync('goodsList') || {}
    // 注意，本地存储的格式是对象里面包对象，最外面的对象叫goodList
    const { image_list } = this.data
    image_list.num = 1
    image_list.selected = true
    // 注意这个写法
    goodsList[image_list.goods_id] = image_list
    wx.setStorageSync("goodsList",goodsList)
  }

})