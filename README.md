##          WeChat在线聊天网站说明文档

1951574 Wu Wei

[toc]

### 一、项目概要

##### 1. 功能简述

该网站定位为“仿WeChat在线聊天网站”，实现了简要的用户系统（包含注册登录与个人信息编辑功能）和在线聊天系统

##### 2. 技术栈

- 前端：
  - html、css——网站页面搭建及样式设计
  - javascript、jquery——网页事件交互

- 后端
  - node.js——运行环境
  - express——基于node.js的轻量级web应用开发框架
  - mongoose——ODM库，负责在node环境下与mongodb数据库交互
  - **socket.io**——WebSocket库，实现在线聊天功能

##### 3. 项目结构

- 前端（weChatFront文件夹）

  - css——样式文件
  - img——图片资源
  - js——javascript代码文件
  - index.html——主界面
  - login.html——登录界面

  <img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219210001190.png" alt="image-20211219210001190" style="zoom:50%;" />

- 后端（weChatBack文件夹）

  - node_modules、package.json——依赖文件
  - data——数据库连接及交互文件
  - app.js——后端项目入口
  - test.sql——数据库文件

  <img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220095236092.png" alt="image-20211220095236092" style="zoom:50%;" />

##### 4. **项目运行及部署说明**

- 本项目的数据库及后端代码均已部署在个人服务器（101.43.31.168）上，开放端口为9001

- 前端页面分为两块：

  - login.html——用户注册与登录
  - index.html——网站主页，包括个人信息编辑、好友管理与在线聊天功能

  运行该项目，请务必**先打开login.html文件**，执行登录操作，登录成功后将自动跳转至index.html

### 二、项目演示

#### 注册登陆界面

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219210343660.png" alt="image-20211219210343660" style="zoom:80%;" />

##### 1. 登录

初始页面为登录页面，并默认保存了用户ww的登录信息（数据库中有ww、dog与tom三个初始用户，密码均为123），点击登录后判定登录信息：

- 用户名不存在
- 密码错误
- 登陆成功

三种状态均会弹出消息框提示，若为“登陆成功”状态，则将自动跳转至网站主页。

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219210924301.png" alt="image-20211219210924301" style="zoom:80%;" />

##### 2. 注册

点击下方的的**注册**按钮，将跳转至注册模式，输入用户名和密码，共有两种情况：

- 用户名已被注册
- 注册成功

​	用户名和密码均使用正则表达式进行了判空处理，注册成功后，将默认登录并转入主页



#### 聊天界面

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219211253657.png" alt="image-20211219211253657" style="zoom:80%;" />

- 左上角为用户头像，点击进入个人信息编辑界面
- 左侧为好友列表
- 右侧为信息栏

##### 1. 个人信息编辑

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219212159061.png" alt="image-20211219212159061" style="zoom:80%;" />

​		点击左上角的个人头像，进入个人信息编辑页面	

- 填写个人信息，点击”提交“按钮，完成个人信息更新

- 点击”重置“按钮，清空已填写的个人信息

##### 2. 在线聊天

点击左侧好友头像，转入聊天界面

- 填写消息栏，点击发送，将更新上方的聊天气泡

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219212739777.png" alt="image-20211219212739777" style="zoom:50%;" />

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219212755329.png" alt="image-20211219212755329" style="zoom:50%;" />

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220111328757.png" alt="image-20211220111328757" style="zoom:50%;" />

##### 3. 群聊

点击左侧群聊头像，进入群聊界面，所有其他用户发送的信息将一并在左边显示，并附带发送者姓名

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220102156149.png" alt="image-20211220102156149" style="zoom:50%;" />

##### 4. 好友管理

- ###### 添加好友

  在左下角的搜索栏搜索好友名字，共有三种情况：

  - 用户名不存在

  <img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220102847645.png" alt="image-20211220102847645" style="zoom: 50%;" />

  - 用户已经添加为好友

  <img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220102917944.png" alt="image-20211220102917944" style="zoom:50%;" />

  - 成功添加好友

    <img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220110002160.png" alt="image-20211220110002160" style="zoom:50%;" />

- ###### 删除好友

  点击聊天界面右上角的删除图标

  <svg class="delete" t="1639920558924" class="icon" viewBox="0 0 1024 1024" version="1.1"
                          xmlns="http://www.w3.org/2000/svg" p-id="2057" width="24" height="24">
                          <path
                              d="M661.1 292.8c0-61.1-23.8-118.6-66.9-161.8C551 87.8 493.7 64 432.7 64s-118.4 23.8-161.5 67c-43.1 43.2-66.9 100.7-66.9 161.8 0 61.1 23.8 118.6 66.9 161.8 11.5 11.5 24 21.6 37.3 30.3-6.5 2.3-12.9 4.8-19.3 7.6-43.9 18.6-83.3 45.2-117.2 79.1-33.9 33.9-60.4 73.4-79 117.4-19.2 45.6-29 93.9-29 143.8 0 17.7 14.3 32 31.9 32s31.9-14.3 31.9-32c0-168.3 136.7-305.3 304.8-305.3 26.4 0 52.5 3.4 77.8 10 17.1 4.5 34.5-5.7 39-22.8 2.2-8.2 0.9-16.6-2.9-23.5 17.2-9.9 33.2-22.2 47.5-36.6 43.3-43.2 67.1-100.7 67.1-161.8zM432.7 457.5c-90.7 0-164.5-73.9-164.5-164.7S342 128.1 432.7 128.1 597.2 202 597.2 292.8s-73.8 164.7-164.5 164.7z"
                              fill="#727272" p-id="2058"></path>
                          <path
                              d="M795.2 728.8L960 532.1 766.6 694.5l-165-197-68.9 69.1 193.1 162.2L532.7 891l68.9 69 165-197L960 925.5z"
                              fill="#CE6043" p-id="2059">
                          </path>
                      </svg>


  将弹出确认框，点击确认，删除好友

  <img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211219221226475.png" alt="image-20211219221226475" style="zoom:50%;" />

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220105739316.png" alt="image-20211220105739316" style="zoom:50%;" />

##### 5. 转发及撤回

鼠标左键单击聊天气泡，将出现信息管理弹窗

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220110217823.png" alt="image-20211220110217823" style="zoom:50%;" />

- 撤回

  点击撤回按钮，将撤回信息

- 转发，点击转发按钮，左侧用户列表将出现转发图标，点击则将信息转发给该用户

<img src="C:\Users\86187\AppData\Roaming\Typora\typora-user-images\image-20211220110647364.png" alt="image-20211220110647364" style="zoom: 67%;" />

