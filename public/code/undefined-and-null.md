# the difference between undefined and null

Most time, the primary types undefined and null are the same. For example, their truth is both false, reading their property will cause an error, and the new syntax ?., ??, ??= are treating them as the `nullish` value.

But there is an absolute difference between them. It is when using them as the argument of a function. See the following code.

```
const fn = (arg = true) => {
    if (arg) console.log('do something')
    else console.log('do nothing')
}

let foo
fn(foo) // do something
```
Firstly, I thought the foo was undefined and that its boolean value was false, so the call fn(foo) was equal to fn(false), and the fn would print 'do nothing'. But I was wrong! When calling fn(undefined), it is equal to fn(), so the fn will use the default argument - true, then print 'do something'. If I rewrote it as follows,
```
let foo = null
```
the result will come as my intention. So, remember that when using undefined as an argument of a function, it's just a placeholder meaning nothing was passed, and the function will use its default argument if it has.
