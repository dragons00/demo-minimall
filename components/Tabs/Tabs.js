// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
      // currentIndex: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    itemTap(e) {
      // console.log(e);
      // this.setData({
      //   currentIndex:e.target.dataset.index
      // })
      const { index } = e.target.dataset;
      this.triggerEvent("tabsItem", { index });
    },
  },
});
