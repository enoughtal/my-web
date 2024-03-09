# sbvue

vue傻逼的地方在于.vue文件

要如下设置：

```json
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

vscode的prettier插件自动format时无法对`<template>`里的代码使用`singleAttributePerLine`，为解决这个问题花了我`5个小时`

如果半年不碰代码，再重新拾起来的话，react最多`1个小时`就唤起记忆了，vue至少`1天`，props，event，slot就得看3个，还有模板语法。真的，react比vue要简单得多
