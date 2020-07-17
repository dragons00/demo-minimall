// pages/goods_detail/goods_detail.js
import { request } from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
  },
  GoodsINfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: { goods_id },
    });
    const goodsObj = res.data.message;
    this.GoodsInfo = res.data.message;
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone不识别webp格式
        // webp=>jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"),
        pics: goodsObj.pics,
      },
    });
  },
  // 点击轮播图预览
  handlePreview(e) {
    const urls = this.GoodsInfo.pics.map((v) => {
      return v.pics_mid;
    });
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls,
    });
  },
  // 购物车
  handleCartAdd() {
    //获取缓存数据
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex((v) => {
      return v.goods_id === this.GoodsInfo.goods_id;
    });
    if (index === -1) {
      // 第一次
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: "加入成功",
      icon: "success",

      mask: true,
    });
  },
});
