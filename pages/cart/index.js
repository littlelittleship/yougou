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
    selectAll:true,
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
   * 
   * 也需要跑断全选的状态，基本ok，代码还需优化封装
   */
  onShow: function(){
    const goods = wx.getStorageSync('goodsList')

    //处理全选按钮
    let flag = true
    Object.keys(goods).forEach(v => {
      if (!flag) return
      const { selected } = goods[v]
      if (!selected) {
        flag = false
      }
    })

    this.setData({
      selectAll: flag
    })

    this.setData({
      goods
    })
    this.getAllPrice()
  },

  /**
   * 单个商品的选中事件
   * 需要实现：
   * 1.点击状态改变（本地存储的数据改变），颜色改变
   * 2.总价格发生变化，修改总价格函数，并引用
   */
  handleSelectChange(options){
    // console.log(options)
    const { id } = options.currentTarget.dataset;
    // console.log(id)
    const { goods } = this.data;
    goods[id].selected = !goods[id].selected;

    //处理全选按钮
    let flag = true
    Object.keys(goods).forEach( v=>{
      if(!flag) return
      const { selected } = goods[v]
      if(!selected){
        flag = false
      }
    })

    
    this.setData({
      selectAll:flag
    })
    

    this.setData({
      goods
    })
    wx.setStorageSync('goodsList', goods)
    this.getAllPrice()
  },

  /**
   * 商品数量增加
   * 实现的功能：
   * 1.数量加1
   * 2.若为选中状态，总价格发生改变，就是重新调用总价格函数
   */
  handleAdd(options){
    const { id } = options.currentTarget.dataset
    const { goods } = this.data
    goods[id].num +=1
    this.setData({
      goods
    })
    wx.setStorageSync('goodsList', goods)
    this.getAllPrice()
  },

  /**
   * 商品数量减少
   * 实现的功能
   * 1.数量减去1
   * 2.价格变动
   * 3.若数量为0，提示用户是否删除该商品
   */
  handleReduce(options){
    const { id } = options.currentTarget.dataset
    const { goods } = this.data
    if (goods[id].num === 1){
      wx.showModal({
        title: '提示',
        content: '确定要删除这个商品吗',
        success:(res)=> {
          if (res.confirm) {
            // console.log('用户点击确定')
            delete goods[id]
            this.setData({
              goods
            })
            wx.setStorageSync('goodsList', goods)
            this.getAllPrice()
          }
        }
      })
    }else{
      goods[id].num -= 1
      this.setData({
        goods
      })
      wx.setStorageSync('goodsList', goods)
      this.getAllPrice()
    }
   
  },

  /**
   * 全选按钮
   * 改变自身的状态
   * 按下全选，再次按下全不选
   */
  handleSelectAll(){
    // console.log(123)
    let { selectAll,goods } = this.data
    selectAll = !selectAll
    this.setData({
      selectAll
    })
    Object.keys(goods).forEach( v=>{
      goods[v].selected = selectAll
    })
    this.setData({
      goods
    })
    wx.setStorageSync('goodsList', goods)
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
      if(goods[v].selected){
        price += goods[v].goods_price * goods[v].num
      }
    })
    this.setData({
      allPrice:price
    })
  }
 
})