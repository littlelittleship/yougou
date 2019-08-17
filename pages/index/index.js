import request from "../../utils/request.js"

Page({
 data:{
   carousel_imglist_list:[
    //           "https://img14.360buyimg.com/da/s590x470_jfs/t1/10948/10/9980/72414/5c5305b5Edce4a04b/20daff1deee4ea76.jpg.webp",
    //  "https://img30.360buyimg.com/pop/s590x470_jfs/t1/64923/26/6321/78493/5d480b50Ea4f2032e/69fffaf2530cf122.jpg.webp",
    //  "https://imgcps.jd.com/ling/50182359555/5Y6f5Lqn5Zyw55u05Y-R/576O5ZGz5LiA6Kem55u06L6-/p-5bd8253082acdd181d02f9e8/2a3d35e4.jpg"

   ],
   category_list_images:[],
   floor_images:[]
 },
 onLoad(){
    request({
      url:"/home/swiperdata"
    }).then(res=>{
      //  console.log(res)
      const { message } = res.data;
      this.setData({
        carousel_imglist_list:message
      })
    })

    request({
      url:'/home/catitems'
    }).then(res=>{
      // console.log(res)
      const { message } = res.data;
      this.setData({
        category_list_images:message
      })
    })

    request({
      url:"/home/floordata"
    }).then(res=>{
      // console.log(res)
      const { message } = res.data;
      this.setData({
        floor_images:message
      })
    })
 }
})
