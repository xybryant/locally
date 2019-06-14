// pages/list/list.js
//const fetch = require('../../utils/fetch')
import { fetch } from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {},
    shops: [],
    page: 1,
    limit: 10,
    hasMore: true,
    isLoadMore: false,
    searchText: ''
  },
  loadMore () {
    if(!this.data.hasMore) {
      //console.log('没有更多数据了！')
      return
    }
    // 不能用const,因为++page会变
    let { page, limit, shops, searchText } = this.data
    const params = { _page: page, _limit: limit }
    if(searchText){
      params.q = searchText
    }
    // fetch本身返回的就是一个promise对象
    return fetch(`categories/${this.data.category.id}/shops`, params)
      .then(res => {
        const total = parseInt(res.header['X-Total-Count'])
        const hasMore = page * limit < total
        this.setData({
          shops: shops.concat(res.data),
          //page: page + 1
          page: ++page,
          hasMore: hasMore,
          isLoadMore: false
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    fetch(`categories/${params.cat}`).then((res) => {
      //console.log(res)
      if(params.cat==3){
        res.data.name = '摄影'
      }
      this.setData({
        category: res.data
      })
      if(res.data.name){
        wx.setNavigationBarTitle({
          title: res.data.name
        })
      }
      this.loadMore()
     // return fetch(`categories/${params.cat}/shops`,{_page:1,_limit:10})
    })
    /*}).then(res => {
      this.setData({
        shops: res.data
      })
    })*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      shops: [],
      page: 1,
      hasMore: true,
      isLoadMore: false
    })
    this.loadMore().then(() => { wx.stopPullDownRefresh() })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log('已经到底了')
    // 判断是否正在加载，避免多次触发
    if(!this.data.isLoadMore){
      this.setData({
        isLoadMore: true
      })
      this.loadMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  searchHandle() {
    // console.log(this.data.searchText)
     this.setData({
       shops: [],
       page: 1,
       hasMore: true,
       isLoadMore: false
     })
    this.loadMore()
  },

  showSearchHandle() {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle() {
    this.setData({ searchText: '', searchShowed: false })
  },
  clearSearchHandle() {
    this.setData({ searchText: '' })
  },
  searchChangeHandle(e) {
    this.setData({ searchText: e.detail.value })
  }
})