# next与意面

记得在一开始学express的时候，经常把next当成return用，会写如下代码：

```javascript
// WRONG
if () next()
next()
```

[这个链接说明了为什么错](https://router.vuejs.org/guide/advanced/navigation-guards.html#Optional-third-argument-next)

曾经看过一个像意大利面的代码库，他写了类似如下代码：

```javascript
// WRONG
if ('some condition') window.location.replace('http://foo.bar');
throw 'some error';
```

这里虽然页面会跳转，但是throw是会执行的，埋下了潜在的bug。

像next()、window.location.replace()这些都不是控制流，它们不是 `return` ！

p.s. 这个写意面的老板居然要瑞又（review）我的代码，他甚至连NODE_ENV=developmemt里的拼写错误都说最好不要改可能有用，我立刻就不合作了，我能说什么呢，这才是真正的无语。
