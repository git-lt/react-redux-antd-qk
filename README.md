## React+Redux+Antd 后台管理系统脚手架

## 说明

此框架参考自[react-redux-antd](https://github.com/okoala/react-redux-antd) & [react-antd-admin](https://github.com/fireyy/react-antd-admin)

- 结合了两个框架的优点，使用了 [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) 维持state的不可变性
- 添加了数据 `Mock` 服务，结合 `MockJS` 动态生成不同的数据列表，模拟异步请求
- 自定义路由配置，方便注册路由，使用 webpack 动态监听变动，实时编译刷新。
- 将store层主要分为中间件、业务模块，每个业务模块中包含initState、reducer、action三个模块，在store下将这三种模块合并到一起，方便管理分层。
- 使用 异步请求中间件 `promiseMiddleware` 将请求状态分的更细 `['LOADING', 'SUCCESS', 'ERROR']`,根据状态可以做相应的state的更新。

## Features

- [React](https://facebook.github.io/react/)
- [Redux](https://github.com/reactjs/redux)
- [Ant.Design](http://ant.design/)


## Getting Started

```shell
$ npm install
$ npm start
```
