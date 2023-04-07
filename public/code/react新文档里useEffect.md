# 取数据（fetch data）时用useEffect并不好

我的个人项目一直用useEffect取数据，react官网告诉我这有几点不好：

1. useEffect不能用在服务端渲染
2. 造成“网络瀑布”，即父组件取完子组件取，依次进行，不能并行
3. 不能预加载和缓存数据
4. 要写很多的样板代码

This list of downsides is not specific to React. It applies to fetching data on mount with any library.

给的建议如下：
用框架

因为框架有内置取数据功能。它们会自己缓存，避免“网络瀑布”（在路由时取数据）等。
