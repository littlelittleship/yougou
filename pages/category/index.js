// pages/category/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_item_list:[],
    current:0,
    nav_brands_item:[]
  },

  handleNacItemClick(event){
    // console.log(event)
    const { index } = event.currentTarget.dataset
    this.setData({
      current:index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    request({
      url:"/categories"
    }).then(res=>{
      // console.log(res);
      const { message } = res.data;
      this.setData({
        nav_item_list:message
      })
    })
  },

 
})