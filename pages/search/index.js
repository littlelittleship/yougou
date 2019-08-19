// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    history:[]    //用于获取和设置本地缓存
  },

  /**
   * 每次输入值的时候触发，因为这里接口不对，不做这个模糊搜索功能
   * 个鬼
   * 取消按钮的隐藏显示要用到，若inputValue有值，隐藏按钮显示，若没有，消失
   */
  handleInput(val){
    const { value } = val.detail;
    this.setData({
      inputValue: value
    })
  },

  /**
   * 输入框确定时触发
   * 实现一下功能：
   * 拿到关键字，跳转到商品列表页，带上关键字
   * 将数据存储在本地，显示在历史搜索中  ---傻了吧，肯定是先获取，在data中定义一个空数组
   * 限制显示的长度，比如10条
   * 去重，显示在最近的一条
   */
  handleSearch(val){
    const { value } = val.detail;
    const arr = [value, ...this.data.history]
    // arr.length = 3;
    if(arr.length > 10){
      arr.length = 10;
    }
    this.setData({
      history:[...new Set(arr)]
    })

    wx.setStorageSync('history', this.data.history)
    // wx.navigateTo({
    //   url:'/pages/search_list/index?keyword='+ value
    // })
  },

  /**
   * 按下X图标清空历史搜索记录，
   * 就是清空本地存储
   */
  handleCancel(){
    this.setData({
      history:[]
    })
    wx.setStorageSync('history', [])
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      history: wx.getStorageSync('history') || []
    })
  },


 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})