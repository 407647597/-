Page({
  data: {
    avatarUrl: ''  // 存储用户头像URL
  },
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    if (userInfo) {
      this.setData({
        avatarUrl: userInfo.avatarUrl  // 设置用户头像URL
      });
    }
  }
});
