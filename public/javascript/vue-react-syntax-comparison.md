# vue-react-syntax-comparison

---

---

---

## Template Syntax

---

{{msg}}

{msg}

---

v-html

dangerouslySetInnerHTML

---

v-bind:id='dynamicId'
id='I am a string'
:id='12'

id={id}
id='I am a string'
id={12}

> 在Vue里用:区别字符串和表达式（Vue称之为静态/动态props），在React里用引号和花括号区别字符串和表达式。

---

title='My journey with Vue'

title='My journey with Vue'

---

:id="ok ? 'YES' : 'NO'"

id={ok ? 'YES' : 'NO'}

---

v-bind='objectOfAttrs', v-bind='$attrs'

{...objectOfAttrs}

---

v-on:click='doSomething'

onClick={doSomething}

---

:[someAttr]='value'

there is no direct syntax

---

@submit.prevent='onSubmit'

there is no direct syntax

---

:disabled='isButtonDisabled' [doc](https://vuejs.org/guide/essentials/template-syntax.html#boolean-attributes)

disabled={true} [doc](https://react.dev/reference/react-dom/components/input#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled)

---

&lt;template></template>

<></>

---

---

---

## Reactivity Fundamentals

---

state.count++
nextTick(() => {
// access updated DOM
})

flushSync(() => {
setSomething(123);
})
// By this line, the DOM is updated.

---

reactive({ count: 0 })

useState()

---

ref(0)

useState()

---

这个Vue文档[Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)。
前半部分介绍了2个API，reactive()和ref(),后半部分讲了Unwrapping。
怎么理解reactive和ref呢？只要记住——自动响应（Reactivity）靠代理（Proxy），代理只能代理对象（Object），原始类型（primitive）不是对象怎么办，就把它包装进{ value: xxx }对象里再代理它。
看以下这段代码:

```javascript
const proxy = reactive({});

const raw = {};
proxy.nested = raw;

console.log(proxy.nested === raw); // false
```

Proxy会拦截赋值操作。因为raw是一个对象，为了实现Deep Reactivity，遇到对象就给它代理了。而如果raw是一个原始类型，那就不代理。

```javascript
const proxy = reactive({});

const raw = new Date(); // 除Object，Array，Set，Map，WeakSet，WeakMap之外。
proxy.nested = raw;

console.log(proxy.nested === raw); // true
```

再看下面的代码：

```javascript
const state = reactive({ count: 0 });
// const state = reactive({ count: { value: 0 } }) // 如果这样写就不一样了
// n is a local variable that is disconnected
// from state.count.
let n = state.count;
// does not affect original state
n++;
```

这里的state.count是一个数字0，无法代理，于是就disconnected了。如果是一个对象{ value: 0 }，那就不会disconnected，因为reactive()自动把嵌套的对象也代理了，即Deep Reactivity，也有shallowReactive的API。

---

---

---

## Computed Properties

---

computed(() => author.books.length > 0 ? 'Yes' : 'No')

useMemo()

---

computed应该是一个纯函数

---

---

---

### Conditional Rendering

---

v-if

if

---

---

---

### List Rendering

---

v-for='item of items'

items.map()

---

---

---

### Form Input Bindings

---

v-model='text'

there is no direct syntax

---

---

---

### Lifecycle Hooks

---

onMounted, onUpdated, and onUnmounted

there is no direct syntax in the functional component

---

---

---

### Watchers

---

watch, watchEffect((onCleanup) => { ...; onCleanup(cleanupFn); ... })

useEffect(() => { ...; return cleanupFn; })

---

```javascript
// vue等价的useEffect
watchPostEffect((onCleanup) => {
  onCleanup(() => {
    console.log('do some cleanup');
  });
  console.log(state.value);
});

// or
watch(
  state,
  (n, o, onCleanup) => {
    onCleanup(() => {
      console.log('do some cleanup');
    });
    console.log(state.value);
  },
  {
    immediate: true,
    flush: 'post',
  }
);
```

```javascript
// useEffect
useEffect(() => {
  console.log(state);

  return () => {
    console.log('do some cleanup');
  };
}, [state]);
```

---

---

---

### Template Refs

---

const input = ref(); `<input ref='input' />`

const input = useRef(); `<input ref={input} />`

---

---

---

### Provide / inject

---

provide/inject

React.createContext/Context.Provider/useContext

---

---

---

### Async Components

---

defineAsyncComponent

lazy

---

---

---

### Others

---

Teleport

createPortal

---

---

---

### the knowledge chain of vue

reactive-ref-computed-watch-watchEffect-component-props-events-slots-composables
