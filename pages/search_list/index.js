// pages/search_list/index.js

import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    product_list:[],
    pagenum:1,
    pagesize:10,
    hasUnderline:true,
    keyword:''            //关键字定义在最外面，防止需要函数传参
  },

  /**
   * 封装请求数据的方法
   * 重难点：将查询关键字定义在外面，onload中通过options参数赋值
   */
  getData(){
    const { keyword,pagenum,pagesize } = this.data
    request({
      url: "/goods/search",
      data: {
        query: keyword,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res => {
      console.log(res)
      const { goods } = res.data.message;

      if(goods.length < this.data.pagesize){
        this.setData({
          hasUnderline:false
        })
      }

      const newGoods = goods.map(v => {
        v.goods_price = v.goods_price + ".00";
        // v.goods_price = Number(v.goods_price).toFixed(2);
        return v
      })
      this.setData({
        product_list: this.data.product_list.concat(newGoods)
      })
    })
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
    // console.log(options)
    const { keyword } = options;
    this.setData({
      keyword
    })
    this.getData()
      // request({
      //   url:"/goods/search",
      //   data:{
      //     query:"小米",
      //     pagenum:this.data.pagenum,
      //     pagesize:this.data.pagesize
      //   }
      // }).then(res=>{
      //   console.log(res)
      //   const { goods } = res.data.message;
        
      //   const newGoods = goods.map( v=>{
      //     v.goods_price = v.goods_price + ".00" ;
      //     // v.goods_price = Number(v.goods_price).toFixed(2);
      //     return v
      //   })
      //   this.setData({
      //     product_list: newGoods
      //   })
      // })
  },

  /**
   * 到达底部时触发
   */
  onReachBottom:function(){
    // console.log("123")
    if(!this.data.hasUnderline){
      return
    }
    this.setData({
      pagenum:this.data.pagenum + 1
    })
    this.getData()
  }


})