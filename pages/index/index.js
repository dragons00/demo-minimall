// 引入请求函数
import { request } from "../../request/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数据
    cateList: [],
    // 楼层数据
    floorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList() {
    // 发送轮播图请求
    request({
      url: "/home/swiperdata",
    }).then((res) => {
      this.setData({
        swiperList: res.data.message,
      });
    });
  },
  getCateList() {
    request({
      url: "home/catitems",
    }).then((res) => {
      this.setData({
        cateList: res.data.message,
      });
    });
  },
  getFloorList() {
    request({
      url: "/home/floordata",
    }).then((res) => {
      this.setData({
        floorList: res.data.message,
      });
    });
  },
});
