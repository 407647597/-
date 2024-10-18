Page({
  data: {
    avatarUrl: ''  // 存储用户头像URL
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于展示用户头像',  // 描述获取用户信息的目的
      success: (res) => {
        const userInfo = res.userInfo;
        if (userInfo) {
          this.setData({
            avatarUrl: userInfo.avatarUrl  // 设置用户头像URL
          });
        }
      },
      fail: (err) => {
        console.log('用户拒绝授权', err);
      }
    });
  }
});
