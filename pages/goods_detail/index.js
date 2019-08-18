// pages/goods_detail/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_list:[]
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
        image_list:message
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }

})