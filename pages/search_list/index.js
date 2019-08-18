// pages/search_list/index.js

import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    product_list:[]

  },
  
  handleTapLick(event){
    const { index } = event.currentTarget.dataset
    this.setData({
      current:index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      request({
        url:"/goods/search?query="+ "小米"
      }).then(res=>{
        console.log(res)
        const { goods } = res.data.message;
        
        const newGoods = goods.map( v=>{
          v.goods_price = v.goods_price + ".00" ;
          // v.goods_price = Number(v.goods_price).toFixed(2);
          return v
        })
        this.setData({
          product_list: newGoods
        })
      })
  },

})