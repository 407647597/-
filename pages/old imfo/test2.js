const app = getApp();

import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({


  
  data: {
    avatarUrl: '',
    noLogin: true,
    touxiang: '',
    nickName: '',
    showModal: false,
    student: {
      name: '',
      class: '',
      college: '',
      major: '',
      studentNumber: '',
      team: ''
    }
    
  },

  showModal() {
    this.setData({
      showModal: true
    });
  },
  hideModal() {
    this.setData({
      showModal: false
    });
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
   
    this.setData({
      avatarUrl,
      noLogin: false
    })
    app.globalData.userInfo.avatarUrl = avatarUrl
   
  },
  
  onButtonClick1() {
    const student = this.data.student;
    const message = `姓名: ${student.name}\n班级: ${student.class}\n学院: ${student.college}\n专业: ${student.major}\n学号: ${student.studentNumber}\n团队: ${student.team}`;

    Dialog.alert({
      title: '学生信息',
      message: message,
      context: this, // 添加 context: this
    }).then(() => {
      // on close
    });
  },

  onButtonClick2() {
    const student = this.data.student;
    

    Dialog.alert({
      title: '联系我们',
      message: '辅导员联系电话：1**********',
      context: this, // 添加 context: this
    }).then(() => {
      // on close
    });
  },


  onLoad() {
    const token = app.globalData.TOKEN;
    console.log('Token:', token); // 打印 token 以确认其正确性

    if (!token) {
      wx.showToast({
        title: 'Token 未设置',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: `http://47.113.231.190:8080/ccsu/user/getStuInfo?token=${token}`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res);
          this.setData({
            student: {
              name: res.data.name,
              class: res.data.team,
              college: res.data.college,
              major: res.data.major,
              studentNumber: res.data.studentNumber,
              team: res.data.team
            }
          });
        } else {
          console.log('Error:', res); // 打印错误响应以进行调试
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('Request failed:', err); // 打印错误以进行调试
        wx.showToast({
          title: '请求失败，请稍后重试',
          icon: 'none'
        });
      }
    });
  }
});
