[![NPM version](https://img.shields.io/npm/v/sww-cli.svg)](https://www.npmjs.com/package/sww-cli)
[![NPM package](https://img.shields.io/npm/dy/sww-cli.svg)](https://www.npmjs.com/package/sww-cli)

1. 命令

```
sww --help
sww run --help 查看run命令的参数
  -m 指定编译模式 Dev ｜ Pro
  -url 指定 PUBLIC_URL
  -c 开启运行时检查
  -r 开启px转换成rem
  -H 开启HTTPS
  -h 设置开发环境的HOST
```

2. sww-cli的运行命令

```
开发：sww run -m Dev -h [yourhost] -H -url /
编译：sww run -m Pro -url /
```

3. 使用注意

```
安装此插件的项目需要配置如下配置文件
  browserslist
  .env
  .eslintrc.js
  tsconfig.json
```
