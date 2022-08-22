# vue-react-syntax-comparison
### Template Syntax
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

### Reactivity Fundamentals
***
reactive({ count: 0 })

useState()
***
ref(0)

useState()
***

### Computed Properties
***
computed(() => author.books.length > 0 ? 'Yes' : 'No')

useMemo()

### Conditional Rendering
***
v-if

if
***

### List Rendering
***
v-for='item of items'

items.map()
***

### Lifecycle Hooks
***
onMounted, onUpdated, and onUnmounted

there is no direct syntax in the functional component
***

### Watchers
***
watch and watchEffect

useEffect
***

### the knowledge chain of vue
reactive-ref-computed-watch-watchEffect-component-props-events-slots-composables
