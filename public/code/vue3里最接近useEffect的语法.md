# vue3里最接近useEffect的语法

```
useEffect(() => {
    console.log(state)

    return () => {
        console.log('do some cleanup')
    }
}, [state])
```
上面是react里的useEffect，与之最接近的vue3语法如下：
```
watchPostEffect((onCleanup) => {
    onCleanup(() => {
        console.log('do some cleanup')
    })
    console.log(state.value)
})

// 或者
watch(state, (_, _, onCleanup) => {
    onCleanup(() => {
        console.log('do some cleanup')
    })
    console.log(state.value)
}, {
    immediate: true,
    flush: 'post'
})
```
首先得用watchPostEffect，即在渲染完之后再执行。其次注意，注册清理函数的位置不同。

这是最接近的语法，因为还是有两点不同：
1. watchEffect不需要手动填写依赖数组，如果需要额外订阅则要使用watch。
1. 即便用post，清理函数的执行时间还是不同的，react是在更新渲染之前，vue3是在更新渲染之后（待验证）。

二者最本质的区别是，在react的机制下useEffect可以当成生命周期钩子来用，这也是react没有生命周期钩子（在函数组件里）的原因。而vue3的watcher只是其响应式系统（reactivity）的一部分，没有进入组件生命周期的功能。另外，在react里也没有专门的computed语法，任何写在函数组件作用域里依赖了state的普通变量都是computed。