var app = getApp();

Page({
  data: {
    age: '',
    tjImageUrl: '',
    tjTitle: '',
    tjUrl: '',
    rate: '',
    weight: '',
    vitalcapacity: '',
    height: '',
    infoIDs: [1, 2], // 初始 infoID 数组
    notice: '体测时间还有**天',
    recommendations: [] // 存储多个推荐信息
  },

  onLoad(options) {
    this.loadData();
  },

  loadData() {
    const token = app.globalData.TOKEN;
    console.log('Token:', token);

    if (!token) {
      wx.showToast({
        title: 'Token 未设置',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: `http://47.113.231.190:8080/ccsu/user/getScore?token=${token}`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res);
          const data = res.data[0];
          this.setData({
            rate: data.rate,
            weight: data.weight,
            vitalcapacity: data.vitalcapacity,
            height: data.height
          });
        } else {
          console.log('Error:', res);
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('Request failed:', err);
        wx.showToast({
          title: '请求失败，请稍后重试',
          icon: 'none'
        });
      }
    });

    this.fetchAllInfo();
  },

  fetchAllInfo() {
    const promises = this.data.infoIDs.map(infoID => this.fetchInfo(infoID));
    Promise.all(promises).then(results => {
      this.setData({
        recommendations: results
      });
    }).catch(error => {
      console.error('Error fetching info:', error);
      wx.showToast({
        title: '获取数据失败',
        icon: 'none'
      });
    });
  },

  fetchInfo(infoID) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `http://47.113.231.190:8080/ccsu/getInfo`,
        method: 'GET',
        data: {
          infoID: infoID
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },

  loadMoreRecommendation() {
    const nextInfoID = this.data.infoIDs.length + 1; // 假设下一个 infoID 是递增的
    this.fetchInfo(nextInfoID).then(data => {
      this.setData({
        recommendations: [...this.data.recommendations, data],
        infoIDs: [...this.data.infoIDs, nextInfoID]
      });
    }).catch(error => {
      console.error('Error fetching more recommendation:', error);
      wx.showToast({
        title: '获取更多推荐失败',
        icon: 'none'
      });
    });
  }
});
