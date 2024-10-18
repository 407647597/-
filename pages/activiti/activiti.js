Page({
  data: {
    images: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg'
    ]
   
  },

  handleClick() {
   
    wx.navigateTo({
      url: '/pages/activiti/activit info/paiqiu',
     
    });
  }
})