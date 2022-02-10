[![NPM version](https://img.shields.io/npm/v/sww-cli.svg)](https://www.npmjs.com/package/sww-cli)
[![NPM package](https://img.shields.io/npm/dy/sww-cli.svg)](https://www.npmjs.com/package/sww-cli)

## sww-cli

1. 基于webpack开发的前端脚手架cli工具，不需要配置webpack，下载此插件安装即可。
2. 支持react、typescript、less等
3. 能够将前端的文件打包成合适的大小，避免文件臃肿。
4. 此插件是本人在开发[cacheweb-webpack-plugin](https://www.npmjs.com/package/cacheweb-webpack-plugin)时配套开发的脚手架工具。
5. 支持使用模板，配套模板[sww-template](https://www.npmjs.com/package/sww-template)提供开箱即用的配置环境，内置[cacheweb-webpack-plugin](https://www.npmjs.com/package/cacheweb-webpack-plugin)，集成开发所需的各种配置

## 支持的命令

```
sww --help
sww run --help 查看run命令的参数
  -m 指定编译模式 Dev ｜ Pro
  -url 指定 PUBLIC_URL
  -c 开启运行时检查
  -r 开启px转换成rem
  -H 开启HTTPS
  -h 设置开发环境的HOST

sww init sww-template 初始化模板
```

## sww-cli的使用

```js
"scripts": {
  "start": "sww run -m Dev -h cache.service-worker.com -H -url /",
  "build": "sww run -m Pro -url /",
}
```

## 模板的安装

```
git init
npm install sww-cli
npx sww-cli init sww-template
npm install
npm start 开发
npm build 生产
```

## 插件

```js
// 在项目根目录新建webpack.plugins.js，在文件中写入

const cachewebWebpackPlugin = require('cacheweb-webpack-plugin');
module.exports = [
  new cachewebWebpackPlugin({
    chacheName: 'SW',
    expirationHour: 72,
    maxNum: 0,
    noCacheFileList: ['index.html', 'register.js'],
    cacheFirstList: ['cacheFirstTest', 'acacheFirstTes', 'bcacheFirstTes'],
    permanentCacheList: ['test'],
  }),
];
```

## 使用注意

```
安装此插件的项目需要配置如下配置文件
  .browserslistrc
  .env
  .eslintrc.js
  tsconfig.json
```
