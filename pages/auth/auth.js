// pages/auth/auth.js
import { request } from "../../request/request.js";
import { login } from "../../utils/asyncWx.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  async handleGetUserInfo(e) {
    try {
      // console.log(e);
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 获取登陆
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };
      // 获取token
      const token =
        // (await request({
        //   url: "/users/wxlogin",
        //   data: loginParams,
        //   method: "post",
        // })) ||
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      // console.log(res);
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1,
      });
    } catch (err) {
      console.log(err);
    }
  },
});
