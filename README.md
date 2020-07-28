# vue-cube-master-template

### 项目介绍

vue-cube-master-template 是一个wap端响应式页面模板。可拿来即用，不需要配置复杂的配置，当然你也可以在根目录找到 vue.config.js 来进行配置。

### 自定义组件

封装了动画页面跳转组件、骨架屏加载等. 后续还会更新常用的组件...

### 框架

框架采用的是cube-ui 精致移动端组件库
cube-ui地址：[https://didi.github.io/cube-ui/#/zh-CN](https://didi.github.io/cube-ui/#/zh-CN)


### 项目构建

vue-cli3脚手架构建

### 技术栈

vue+vue全家桶(vuex+router+axios)，stylus，ES6，eslint，amfe-flexible(rem动态布局计算)，postcss-px2rem（px 到 rem 转换），theme 可更改自定义主题。

### 开发


```bash
# clone the project(克隆项目)
git clone https://gitee.com/fxa888/vue-cube-master-template.git

# enter the project directory(进入项目目录)
cd vue-cube-master-template

# install dependency(安装依赖)
npm install

# develop(开发运行)
npm run serve
```

This will automatically open(默认打开) http://localhost:8080

### 线上运行demo
[https://fxa888.gitee.io/vue-cube-master-template/](https://fxa888.gitee.io/vue-cube-master-template/)

### 目录结构

```
├── public                     # 静态资源(所有此文件里面的文件是不会被编译及处理)
│   │── favicon.ico            # favicon图标
│   └── index.html             # 入口页面
├── src                        # 项目源码目录
│   ├── api                    # 所有请求
│   │   ├── index.js	       # api默认访问的文件(所有请求接口全部写在这里)
│   │   ├── request.js	       # axios 封装
│   ├── assets                 # 字体、图片等静态资源(这个目录下的资源会被编译)
│   ├── common                 # 公共资源
│   │   ├── fonts	           # 字体文件
│   │   ├── js		           # js文件
│   │   ├── stylus	           # stylus样式
│   │   ├── ├── base.styl      # 基础样式
│   │   ├── ├── index.styl     # stylus默认访问的文件
│   │   ├── ├── mixin.styl     # cube-ui可复用的样式方法
│   │   ├── ├── variable.styl  # 定义一些变量以供项目中使用
│   │   ├── util	           # 构建相关全局公用方法
│   ├── components             # 公共组件目录
│   │   ├── v-footer	       # 底部tab组件
│   │   ├── v-jump-page	       # 公共弹出页面层
│   ├── config                 # 全局配置文件
│   │   ├── index.js	       # config默认访问文件
│   ├── router                 # 前端路由
│   │   ├── routerList	       # 路由模块 routes 配置项
│   │   ├── index.js	       # router默认访问文件
│   │   ├── router.js	       # 路由实例
│   ├── store                  # 全局 store管理
│   │   ├── module             # store 模块
│   │   ├── index.js           # store默认访问文件
│   │   ├── store.js	       # store实例
│   ├── views                  # views 所有页面目录
│   │   ├── chat	           # 聊天页面
│   │   ├── details	           # 页面详情页
│   │   ├── home	           # 主页面
│   │   ├── my		           # 个人页面
│   │   ├── no-page            # 404页面
│   │   ├── shopping	       # 购物车页面
│   ├── App.vue                # 入口页面
│   ├── cube-ui.js             # cube-ui 组件引入
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── theme.styl             # 主题配置文件
├── .browserslistrc            # 这个配置能够分享目标浏览器和nodejs版本在不同的前端工具。这些工具能根据目标浏览器自动来进行配置。
├── .editorconfig              # 在不同的编辑器维护一致的编码样式
├── .eslintrc.js               # eslint 配置项
├── .gitignore                 # Git忽略提交规则
├── babel.config.js            # 配置一些多个不同的组件库
├── package-lock.json          # 安装时的包的版本号
├── package.json               # package.json文件描述这个NPM包的所有相关信息，包括作者、简介、包依赖、构建等信息
├── postcss.config.js          # rem布局配置(设计稿的大小：例如cube-ui基于375 * 667，但项目设计草案基于750 * 1334)
├── README.md                  # 自述文件
└── vue.config.js              # 全局的 CLI 配置文件
```
### Communication（交流群）
![输入图片说明](https://images.gitee.com/uploads/images/2019/0419/115637_9ee54d51_1253542.png "vue-elementUI_layui后台模群聊二维码.png")

 **最近在开发一个后台管理系统模板：** 
基于vue+elementUI+仿layui风格 。
有兴趣的可以加群。

后台模板访问地址：[http://fa.pengconghero.cn](http://fa.pengconghero.cn)




 **做的不好仅供参考噢！** 

