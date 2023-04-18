# vue-react-syntax-comparison

***
***
***

## Template Syntax

***
{{msg}}

{msg}
***
v-html

dangerouslySetInnerHTML
***
v-bind:id='dynamicId'

id={dynamicId}
***
title='My journey with Vue'

title='My journey with Vue'
***
:id="ok ? 'YES' : 'NO'"

id={ok ? 'YES' : 'NO'}
***
v-bind='objectOfAttrs'

{...objectOfAttrs}
***
v-on:click='doSomething'

onClick={doSomething}
***
:[someAttr]='value'

there is no direct syntax
***
@submit.prevent='onSubmit'

there is no direct syntax
***
:disabled='isButtonDisabled' [doc](https://vuejs.org/guide/essentials/template-syntax.html#boolean-attributes)

disabled={true} [doc](https://react.dev/reference/react-dom/components/input#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled)
***
***
***

## Reactivity Fundamentals

***
state.count++
nextTick(() => {
    // access updated DOM
})

flushSync(() => {
    setSomething(123);
})
// By this line, the DOM is updated.
***
***
reactive({ count: 0 })

useState()
***
ref(0)

useState()
***
所以这个Vue文档[Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)到底讲了啥？
这是Essentials的第三篇，我敢打赌没有初学者能看懂它讲了啥。
这一篇前半部分介绍了2个API，reactive()和ref()；后半部分讲了那个无聊的Unwrapping。我选择不Unwrapping行了吧，我宁愿多打value也不愿记住这些规则，统一不香吗。当然了成为熟练工之后自然就会Unwrapping不打多余的value了，但这跟知道茴香豆的茴有几种写法一样无聊。
回归正题。怎么理解reactive和ref呢？只要记住——自动响应（Reactivity）靠代理（Proxy），代理只能代理对象（Object），原始类型（primitive）不是对象怎么办，就把它包装进{value: xxx}对象里再代理它。
所以以下这段代码初学者一定无法理解:

```javascript
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

上一行赋值的东西下一行就不相等了，wtf。是的，就是这样，因为raw是一个对象，为了实现Deep Reactivity，遇到对象立马就给它代理了。
那如果raw是一个原始类型呢，那就是true！！

```javascript
const proxy = reactive({})

const raw = new Date() // 除Object，Array，Set，Map，WeakSet，WeakMap之外。
proxy.nested = raw

console.log(proxy.nested === raw) // true!!
```

再看下面的代码：

```javascript
const state = reactive({ count: 0 })
// const state = reactive({ count: { value: 0 } }) // 如果这样写就不一样了！！
// n is a local variable that is disconnected
// from state.count.
let n = state.count
// does not affect original state
n++
```

这里的state.count是一个数字0，无法代理，于是就disconnected了。如果是一个对象{value: 0}，那就不lose the reactivity connection，为啥？因为reactive()自动把嵌套的对象也代理了，即Deep Reactivity。所以又引出了一个shallowReactive的API……

而对面的React，一个state搞定一切，何其优雅。

***
***
***

## Computed Properties

***
computed(() => author.books.length > 0 ? 'Yes' : 'No')

useMemo()
***
***

### Conditional Rendering
***
v-if

if
***
***

### List Rendering
***
v-for='item of items'

items.map()
***
***

### Form Input Bindings
***
v-model='text'

there is no direct syntax
***
***

### Lifecycle Hooks
***
onMounted, onUpdated, and onUnmounted

there is no direct syntax in the functional component
***
***

### Watchers
***
watch, watchEffect((onCleanup) => { ...; onCleanup(cleanupFn); ... })

useEffect(() => { ...; return cleanupFn; })
***
***

### Template Refs
***
const input = ref(); `<input ref='input' />`

const input = useRef(); `<input ref={input} />`
***
***

### Provide / inject
***
provide/inject

React.createContext/Context.Provider/useContext
***
***

### Async Components
***
defineAsyncComponent

lazy
***
***

### the knowledge chain of vue
reactive-ref-computed-watch-watchEffect-component-props-events-slots-composables
