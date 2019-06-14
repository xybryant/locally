//index.js
// const fetch = require('../../utils/fetch')
import { fetch } from '../../utils/fetch'
//获取应用实例
const app = getApp()

Page({
  data: {
    slides: [],
    categories: []
  },
  onLoad: function () {
    /*//let _this = this
    wx.request({
      url: 'https://locally.uieee.com/slides',
      //success (res) {
      success: (res) => {
        //console.log(res)
        //console.log(_this)
       // _this.setData({
        this.setData({
          slides: res.data
      })
      }
    })
    wx.request({
      url: 'https://locally.uieee.com/categories',
      success: (res) => {
        //console.log(res)
        this.setData({
          categories: res.data
        })
      }
    })*/
    
    fetch('slides').then((res) => {
      this.setData({
        slides: res.data
      })
    })
    fetch('categories').then((res) => {
      res.data[2].name = '摄影'
      this.setData({
        categories: res.data
      })
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
})
