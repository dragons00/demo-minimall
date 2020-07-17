// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  showModal,
  showToast,
} from "../../utils/asyncWx";
import { request } from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow() {
    // 获取缓存中的数据
    const address = wx.getStorageSync("address");
    // console.log(address);
    // 获取缓存中的数据
    let cart = wx.getStorageSync("cart") || [];
    // 计算全选
    // const allChecked = cart.length ? cart.every((v) => v.checked) : false;
    // 赋值
    // 过滤后的购物车数组
    cart = cart.filter((v) => v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    });
  },
  async handlePay() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/auth",
      });
      return;
    }
    // 创建订单
    const header = { Authorization: token };
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach((v) =>
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price,
      })
    );
    const orderParams = { order_price, consignee_addr, goods };
    const { order_number } = await request({
      url: "/my/orders/create",
      method: "post",
      data: orderParams,
      header,
    });
    console.log(order_number);
  },
});
