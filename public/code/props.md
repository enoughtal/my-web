# props

在[vue文档里的函数组件](https://vuejs.org/guide/extras/render-function.html#functional-components)里看到一个函数签名：
```
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```

我似乎对vue和react的区别理解得更明白了。vue分别使用了slots、 emit、 attrs来传元素、传函数、传一些特殊的东西（react里好像没有[Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html)）。而在react里，这些统统都是props，函数签名如下：
```
function MyComponent(props) {
  // ...
}
```