# vue

## 1

vscode的prettier插件自动format时无法对`<template>`里的代码使用`singleAttributePerLine`，为解决这个问题花了我5个小时，在vscode要如下设置：

```json
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

## 2

遇到一个典型的问题，A>B>C组件的层级关系像这样，A是B的父，B是C的父，那么问题来了 ———— 如果A的数据要传给C，然后在C里面变更这个数据，怎么实现？

这个问题太典型了，如果是react，就把变更函数setState从A传给B再传给C，在C里面调用setState。在vue里其实也一样，把update:事件从C传给B再传给A。两者要写的代码量其实差不多，但是vue喜欢给语法糖，v-model就是一个。它让emit('update:state', 'new value')实现了类似setState('new value')的功能。但是它还不能解决上面这个A>B>C的问题，因为在B里的变更并不能自动传给A，props是只读的，或者说是单向数据流。一般做法是把v-model拆分了，还原成v-bind和v-on的组合，这时候v-model的语法糖没用了，为了维持语法糖的作用，vue在3.4版本推出了defineModel宏

```javascript
// B组件
<script setup>
const model = defineModel() // model是A传下来的props
</script>

<template>
  <input v-model="model" /> // input就是C
</template>
```

vue在v-model的文档里用了双向数据流这一说法，这好像是第一次。因为在子组件里对props调用.value了，所以看起来是从子组件变更了父组件的数据，但文档又说是发送update:事件给父组件，这也不算是双向数据流啊，不一直是发送事件吗。

开头那个A>B>C问题也可以用provide/inject来解决，我不知道是不是可以这么说：关于props drilling，只要传递到下下层（孙）组件，就直接用provide。当然了，用provide相当于是用全局变量，用props相当于是用函数参数，还是有本质区别的。
