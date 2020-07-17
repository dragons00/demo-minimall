// 同时发送异步代码的次数
let ajaxTime = 0;
export const request = (params) => {
  ajaxTime++;
  // 显示加载
  wx.showLoading({
    title: "加载中",
    mark: true,
  });
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((res, rej) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: (result) => {
        res(result);
      },
      fail: (err) => {
        rej(err);
      },
      complete: () => {
        ajaxTime--;
        // 关闭加载
        wx.hideLoading();
      },
    });
  });
};
