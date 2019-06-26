/**
 * @author sunLei
 * @time 2019/3/28
 */
Page({
  data: {
    notice:'本平台不提供实际拼车服务,致力于帮助大学生在寒暑假出行提供在线组团的功能。   本平台不提供实际拼车服务,致力于帮助大学生在寒暑假出行提供在线组团的功能。   本平台不提供实际拼车服务,致力于帮助大学生在寒暑假出行提供在线组团的功能'
  },
  createList:function(){
    wx.navigateTo({
      url: '/pages/home/create/create',
    })
  },
  goCreatedList:function(){
  wx.navigateTo({
      url: '/pages/me/history/history?id=0',
    })
  },
  goJoinedList:function(){
    wx.navigateTo({
      url: '/pages/me/history/history?id=1',
    })
  },
  goHistoryList:function(){
    wx.navigateTo({
      url: '/pages/me/history/history?id=2',
    })
  },
  goHelp:function(){
    wx.navigateTo({
      url: '/pages/me/help/help',
    })
  },
  goSuggesstion:function(){
    wx.navigateTo({
      url: '/pages/me/feedback/feedback',
    })
  },
})