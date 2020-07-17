// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  showModal,
  showToast,
} from "../../utils/asyncWx";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
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
    const cart = wx.getStorageSync("cart") || [];
    // 计算全选
    // const allChecked = cart.length ? cart.every((v) => v.checked) : false;
    // 赋值
    this.setData({
      address,
    });
    this.setCart(cart);
  },
  async handleAddress() {
    try {
      //获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      const address = await chooseAddress();
      address.all =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo;
      // console.log(address);
      wx.setStorageSync("address", address);
    } catch (err) {
      console.log(err);
    }
  },
  // 商品选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    //
    let { cart } = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex((v) => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 设置购物车状态同时重新计算工具栏的数据
  setCart(cart) {
    //
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    // 判断数组
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked,
    });
    wx.setStorageSync("cart", cart);
  },
  // 商品全选
  handleItemAllCheck() {
    console.log("545");
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach((v) => (v.checked = allChecked));
    // 修改后的值
    this.setCart(cart);
  },
  // 商品数量
  async handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex((v) => v.goods_id === id);
    //判断当前数量是否为1
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content: "您是否要删除？" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  // 计算
  async orderPay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast("您还没有选择收货地址");
      return;
    }
    if (totalNum === 0) {
      await showToast("您还没有选择商品");
      return;
    }
    //
    wx.navigateTo({
      url: "/pages/pay/pay",
    });
  },
});
