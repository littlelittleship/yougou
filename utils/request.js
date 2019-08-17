/**
 * 封装一个类似于axios的请求工具库
 * 1.设置基准路径
 * axios.default.baseURL=""
 * 2.发起请求，返回的是promise
 * axios({参数}).then().catch()
 * 3.监听错误
 * axios.onError()
 * 
 * 封装思路：
 * 采用单例的封装模式-就是只有一个对象或函数
 *
 */

const request = function( config = {} ){

  //判断是否有输入url地址
  if(!config.url){
    throw new Error("请输入url地址");
    return;
  }

  //判断请求是否为http开头的，若是，则不用添加基准路径
  if(config.url.search(/^http/) === -1){
    config.url = request.defaults.baseURL + config.url
  }

  

  // 返回一个promise对象，里面的参数是一个函数，函数有两个参数：成功的回调和失败的回调
  // 里面的参数肯定是一个函数，因为每次调用都需要独立的作用域，请求在函数里面发生，将
  //传进来的参数解构出来，如果没有参数，默认为空对象。resolve就是then里面的方法
  return new Promise((resolve,reject) =>{
    wx.request({
      ...config,
      success(res){
        resolve(res)
      },
      fail(){},
      complete(res){
        request.errors.forEach( fn => {
          fn(res)
        })
      }
    })
  })
}

request.defaults = {
  baseURL:""
}
request.errors=[]

request.onError= function(callback){
  request.errors.push(callback)
}
export default request;
