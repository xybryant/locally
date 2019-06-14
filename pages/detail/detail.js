// pages/detail/detail.js
// const fetch = require('../../utils/fetch')
import { fetch_load as fetch } from '../../utils/fetch'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fetch(`shops/${options.item}`)
      .then(res => {
        this.setData({ 
          shop: res.data,
          images: res.data.images.slice(0, 5)
          })
        wx.setNavigationBarTitle({ title: res.data.name })
      })
  },

  previewHandle(e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.images
    })
  }
})
