# 字段对应关系
始点: （组团）主题
终点: （组团）描述
是否已有车:是否已进行 
出行方式:组团分类 
时间
人数
备注
# 系统更新
1. 功能性
  * 消息缓存全部消息 OK
  * 新加入用户接收消息 OK
  * 添加系统消息 OK
  * 他人时间显示异常
2. 优化性
  * 顶部页面适应 OK
  * 用户未授权
  * 查询信息速度优化
  * 相关标题优化 OK
  * 提示图标取消 OK
# 3.0开发记录
1. BUG修改 周三 OK
 - 人数上限OK
 - 日期异常OK
 - 登陆系统OK
2. 聊天优化
 - 发表情
 - 设备同步
 - 长度
3. 用户优化
 - 查询速度
4. 搜索功能
# 登陆系统设计(新用户/旧用户 适配)
>  app.js程序加载时
1. 登陆启动(重新登陆)
  - 调用微信登陆
    - 成功返回
    - 启动服务器登陆
    - 返回会话信息(token,uId)
2. 更新用户信息或初始化用户信息
    - 获取用户信息权限
    - 用户信息存服务器:新用户插入,旧用户更新,同时存储本地(头像,昵称)
3. 进入主页
@time 2019.7.16
1. 评论查看
2. 评论提交
3. 点赞功能