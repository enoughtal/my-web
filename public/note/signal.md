# signal

`Jason Miller 🦊⚛️
Building stuff with Preact + Signals is easier than using hooks.
You get to write as if the UI is being created fresh on any change (the good part of VDOM), but behind-the-scenes your components generally end up only needing to run once. No need for things like memoization or "useCallback".
Plus you get free reactive models: any part of your state can be built independent of the UI tree using the same 3 functions (signal, computed and effect).`

最近准备找工作，重新拾起前端框架，尽管用react和vue写过不少简单的应用，但是几个月过去了很多概念有点模糊，于是开始了回顾过程，我的方法是看其他前端框架的文档，这样反而会更好的重拾react和vue。

我快速看了solid和preat的文档，还有vue的reactivity系统，得到了一个以前不知道的概念：signal。

react是没有响应系统的，也没有signal。vue，preact，qwik，solid，angular都用了signal。它是一个自动track和自动trigger的系统，vue和solid的文档给出了简单实现这种功能的示范代码。借助proxy拦截访问和赋值操作，让访问操作track effect函数，让赋值操作trigger effect让其再次执行，实现了自动响应的过程，effect对dom操作就实现了自动更新ui。react不是这个原理，react的重新渲染就是再执行一次组件函数，Dan Abramov（react团队成员）说“react实现了初始化和更新的统一”。它没有setup的过程，初始化和更新都是执行函数。很多人诟病react的问题，比如多余渲染，依赖数组，手动memo等。但我认为react在设计上是最简单的，拥有简单的api，最重要的是没有dsl（领域专用语言）。signal的本质是一种数据类型，一种对象类型。访问它可以让effect跟踪（订阅）自己，变更它就触发（通知）effect重新执行。react也可以加进signal，就像preact做的那样。

`With signals we can bypass Virtual DOM rendering and bind signal changes directly to DOM mutations. If you pass a signal into JSX in a text position, it will render as text and automatically update in-place without Virtual DOM diffing`

以上来自preact文档，说的是用了signal就可以不用virtual dom。这个大概就是vue的vapor mode，vue说这是受solid的启发。看来signal真的要全面流行，毕竟连angular都加入了它的行列。solid的作者说它的signal实现了一种细粒度的dom更新，而react是粗粒度的。前者是绝不多渲染一个结点，后者是多渲染一遍无所谓，这是两种不同的设计哲学。所以react的strictmode上来就是两遍重复渲染，不明白的人认为这是啥玩意为啥要这样，react文档说这是在查bug。在其他框架都只setup一遍，开发者只要设计好signal，computed和effect，其余就交给框架自动完成的时代，react还在让开发者自己在脑子里模拟重复执行的过程，确认依赖数组的正确，确认需要优化（useCallback, useMemo）的必要，很难说谁更好。

这是一场函数（react）和类（signal）两种编程范式的较量。
