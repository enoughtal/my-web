# Vue通过props传函数

这个[文档](https://medium.com/js-dojo/passing-functions-as-props-an-anti-pattern-in-vue-js-b542fc0cf5d)及其评论很有意思。

关于Vue为什么不能像React一样通过props直接传函数的问题，我想了很久。直到某一天我突然发现，Vue是可以通过props直接传函数的！
那么问题来了，为什么Vue不推荐这种模式？
如果这样，那么在重新渲染的时候，很容易造成多余的渲染，比如下面这行代码：

```javascript
<MyComp :handleClick='() => {}' />
```

每次渲染父组件时handleClick都是一个新的引用，作为子组件的MyComp每次都要跟随父组件重新渲染。
而如果写成events的形式，如下所示：

```javascript
<MyComp @click='() => {}' />
```

因为传的并不是props，所以MyComp不会重新渲染。Vue没有useCallback这种优化多余渲染的手段，Vue的做法是引入events让事件处理成为一个不同于props的attribute即$attrs（class，style，id，v-on……）。

但provide/inject是传函数的。
