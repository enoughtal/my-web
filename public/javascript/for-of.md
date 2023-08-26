# for-of

https://github.com/airbnb/javascript#iterators--nope

forEach 并不能完全替代 for of，在有些场合只能使用 for of。

如下模式是不能用 forEach 替代的：

```javascript
for (const val of iter) {
  await
}
```

这种模式和 for await of 也不同

```javascript
for await (const val of asyncIter) {
}
```

非异步的代码可以用 forEach，异步代码用 for of。
