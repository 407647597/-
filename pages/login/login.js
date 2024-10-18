var app = getApp();

Page({
  data: {
    username: '',
    password: '',
    TOKEN: '',
    TabCur: 0,
    navNames: ['学生登入', '管理员登入'] // 这里定义你的导航栏名字
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
  
  inputUsername: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  inputPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },
  onLogin: function() {
    const { username, password } = this.data;
    if (!username || !password) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: `http://47.113.231.190:8080/ccsu/getToken`, 
      data: {
        account: username,
        password: password
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        app.globalData.TOKEN = res.data; // 设置全局变量
        console.log(app.globalData.TOKEN);

        if (res.data) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          wx.switchTab({
            url: '/pages/index/index',
          });
        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none'
          });
        }
      },
      fail: function(err) {
        console.error(err);
        wx.showToast({
          title: '登录失败，请稍后重试',
          icon: 'none'
        });
      }
    });
  }
});
