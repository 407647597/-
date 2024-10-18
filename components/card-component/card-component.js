Component({
  properties: {
    image: String,
    title: String,
    targetPage: String
  },
  methods: {
    navigate() {
      wx.navigateTo({
        url: this.data.targetPage
      });
    }
  }
})
