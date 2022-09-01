# vue3学习笔记

## ref和computed的区别
### [文档](https://vuejs.org/guide/components/props.html#one-way-data-flow)
这一段说明了如何使用props，以及ref和computed的重要区别，即ref*不*订阅（响应）其参数，而computed订阅：
```
const props = defineProps(['initialCounter'])
const counter = ref(props.initialCounter) // 不响应
const counter = computed(() => props.initialCounter) // 响应
```
但是computed是只读的，不能赋值。遇到要赋值的场合只能使用ref，可以配合watchEffect使用：
```
const props = defineProps(['initialCounter'])
const counter = ref() // 可以不给参数
watchEffect(() => counter.value = props.initialCounter) // 响应
```
这样既可响应又可赋值。