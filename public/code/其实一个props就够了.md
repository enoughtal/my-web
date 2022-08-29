# 其实一个props就够了

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

react的简洁是vue无法比的，当然了vue有它的template compilation，也许模板语法的性能比jsx强也说不定。react包含一种设计思想，而vue只是一个框架，这个从双方的文档就可以看出来。react的文档在介绍思想（redux更甚），上来就告诉你组件是一个输入数据输出视图的函数，各种思想的介绍在文档里到处可见（外国技术作者喜欢讲得透彻，把每一根汗毛都呈现给你，相反国内技术作者喜欢把人讲糊涂，你越看不懂越显得他高深）。而vue的文档就是在讲解api的使用，最多是告诉你要去学习一下js的Proxy。vue3在很多方面都是跟react反着来的，这个在[文档](https://vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)里可以看到，也许是为了不雷同而刻意为之。

我只想说，其实vue比react更难，因为vue的api实在太多，当然了api多还可以说成是渐进式吗。

> I am a React cult fun boy.