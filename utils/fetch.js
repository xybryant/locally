export let fetch = 
    (url, data = {}) => {
      return new Promise((resolve, reject) => {
        // wx.showLoading({ title: 'Loading...' })
        // wx.showLoading({ title: '加载中...' })
        wx.request({
          url: `https://locally.uieee.com/${url}`,
          data: data,
          success: resolve,
          fail: reject,
          // complete: wx.hideLoading
        })
      })
    }
  
export let fetch_load =
  (url, data = {}) => {
    return new Promise((resolve, reject) => {
      // wx.showLoading({ title: 'Loading...' })
      wx.showLoading({ title: '加载中...' })
      wx.request({
        url: `https://locally.uieee.com/${url}`,
        data: data,
        success: resolve,
        fail: reject,
        complete: wx.hideLoading
      })
    })
  }



// module.exports = (url, data = {}) => {
//   return new Promise((resolve, reject) => {
//     // wx.showLoading({ title: 'Loading...' })
//     // wx.showLoading({ title: '加载中...' })
//     wx.request({
//       url: `https://locally.uieee.com/${url}`,
//       data: data,
//       success: resolve,
//       fail: reject,
//       // complete: wx.hideLoading
//     })
//   })
// }