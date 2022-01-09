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

sww-cli的运行命令

```
开发：sww run -m Dev -h [yourhost] -H -url /
编译：sww run -m Pro -url /
```