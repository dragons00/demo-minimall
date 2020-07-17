// pages/category/category.js
import { request } from "../../request/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContList: [],
    //接口返回数据
    cates: [],
    //当前的分类Index
    currentIndex: 0,
    //定义内容区显示位置初始化
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地存储有无缓存数据
    const cates = wx.getStorageSync("cates");
    if (!cates) {
      console.log("没有缓存");
      this.getList();
    } else {
      // 判断是否过期
      if (Date.now() - cates.time > 1000 * 10) {
        console.log("缓存过期");
        this.getList();
      } else {
        console.log("使用缓存");
        this.data.cates = cates.data;
        let leftMenuList = this.data.cates.map((i) => {
          return i.cat_name;
        });
        let rightContList = this.data.cates[this.data.currentIndex].children;
        this.setData({
          leftMenuList,
          rightContList,
        });
      }
    }
  },
  getList() {
    request({
      url: "/categories",
    }).then((res) => {
      this.data.cates = res.data.message;
      // 写入缓存
      console.log(this.data.cates);
      wx.setStorageSync("cates", { time: Date.now(), data: this.data.cates });
      let leftMenuList = this.data.cates.map((i) => {
        return i.cat_name;
      });
      let rightContList = this.data.cates[this.data.currentIndex].children;
      this.setData({
        leftMenuList,
        rightContList,
      });
    });
  },
  cateTap(e) {
    this.setData({
      currentIndex: e.target.dataset.index,
    });
    let rightContList = this.data.cates[this.data.currentIndex].children;
    this.setData({
      rightContList,
      scrollTop: 0,
    });
  },
});
