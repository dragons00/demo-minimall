const { request } = require("../../request/request");

// pages/goods_list/goods_list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 2,
        value: "价格",
        isActive: false,
      },
    ],
    goodsList: [],
  },
  // 接口参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  totalPage: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  // 获取商品信息
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.queryParams,
    });
    // 获取总条数
    const total = res.data.message.total;
    // 计算总页数
    this.totalPage = Math.ceil(total / this.queryParams.pagesize);
    // console.log(this.totalPage);
    // console.log(res);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods],
    });
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },
  // 点击事假
  itemTap(e) {
    // console.log(e);
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? (v.isActive = true) : (v.isActive = false);
    });
    this.setData({
      tabs,
    });
  },
  // 滚动 触底事件
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPage) {
      // console.log("daodi");
      wx.showToast({ title: "到底了" });
    } else {
      // console.log("shuxin");
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // console.log("test");
    this.setData({
      goodsList: [],
    });
    this.queryParams.pagenum = 1;
    this.getGoodsList();
  },
});
