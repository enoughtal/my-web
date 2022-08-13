# mutating and equality

For the primary variables such as String or Number, mutating them is an easily understood concept.
```
let foo = 1
let bar = foo
foo = 2
console.log(bar === foo)//false
```
The value of foo is changed from 1 to 2, it mutated in place. Now, the bar isn't equal to foo. But if the value isn't primary such as the Object, the situation is different.

```
let foo = { a: 1 }
let bar = foo
foo = { a: 2 }
console.log(bar === foo)//false
```
This situation is similar to the above, foo is assigned to another Object, therefore bar isn't equal to foo. Now, see the next code.
```
let foo = { a: 1 }
let bar = foo
foo.a = 2
console.log(bar === foo)//true
```
In this situation, the bar is equal to foo. It seems so normal since it's the fundamentals of javascript. But it's the main difference between React and Vue3 in the rendering mechanism.
