# ref和computed

## [文档](https://vuejs.org/guide/components/props.html#one-way-data-flow)

这一段说明了如何使用props，以及ref和computed的重要区别，即ref*不*订阅（响应）其参数，而computed订阅：

```javascript
const props = defineProps(['initialCounter'])
const counter = ref(props.initialCounter) // 不响应
const counter = computed(() => props.initialCounter) // 响应
```

但是computed是只读的，不能赋值。遇到要赋值的场合只能使用ref，可以配合watchEffect使用：

```javascript
const props = defineProps(['initialCounter'])
const counter = ref() // 可以不给参数
watchEffect(() => counter.value = props.initialCounter) // 响应
```

这样既可响应又可赋值。补充：这种模式是多此一举，直接写成const counter = ref(props.initialCounter)就好，因为子组件本来就要跟随props.initialCounter的改变而重新渲染。
