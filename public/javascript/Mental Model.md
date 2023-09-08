# Mental Model

对于应用程序员来说，可以不知道底层实现，但是思想模型是很重要的。比如 useState 必须写在组件的顶层不能写在条件或循环里，对于这条规则只需要记住就行，但是也可以用一个思想模型来理解这条规则——useState 是通过数组来记录的，数组的索引当然是不能随意变化的（[文档](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)）。所以，想要深刻的理解和熟练的使用，好的思想模型是必要的。

You “use” React features at the top of your component similar to how you “import” modules at the top of your file.
以上这句话来自 React 文档，意思是把 hook 看成是 import 那样只能在模块的顶层调用。他不说我是压根不会把 hook 和 import 联系起来的，但是他一说我确实加深了理解。可见到处都是思想模型。

mental model 这个词也是这段[文档](https://react.dev/learn/state-a-components-memory)里出现的。这是一段讲 state 的文档，但是它出现在 Adding interactivity 一章，在讲完了 event handler 之后才介绍 state。我当时就疑问，state 不是应该在 Describing the UI（在 Adding interactivity 的前一章）里就应该讲的吗？因为一般来说，前端框架的第一个例子就是点击按钮计数器，这必然要涉及 state，但是 React 新文档却在整个 Describing the UI 一章里讲完条件渲染列表渲染都没有介绍 state，而是在第二章讲完 event handler 之后才介绍 state，这是为什么。

这又涉及到思想模型了。可以这么理解，state 大多是被用户交互（或者说 event handler）改变的，所以在讲完 event 之后再讲 state 是完全可以的。所以，state 到底是属于渲染（render）的概念还是事件的概念？都可以，仁者见仁智者见智，这取决于个人的思想模型。

对于自学应用开发的人来说，思想模型的建立完全是自己的探索。拿 Promise 举例，每个人理解 Promise 都有自己的思想模型。在中文语境下 Promise 可能就是挂起、解决、拒绝三个状态，而在英文语境下是 pending、fulfilled、rejected，注意第二个状态 fulfilled 的中文意思并非是解决。中文用解决和拒绝是因为 Promise 构造函数里的 resolve 和 reject，但是调用 resolve 之后是不是就一定 fulfilled 呢？不一定。因为如果 resolve 的是另一个 Promise，那么还必须等待那个 Promise 的结果。

再拿函数举例，我自己总结了一个使用函数的思想模型。一个函数包含三个阶段：定义（definition）、引用（reference）、调用（call）。因为 React 大量使用函数，初学者往往分不清“传引用”和“调用”的区别。首先关于定义，每次 re-render，组件里的函数定义都会被重新执行，生成一个新的函数，返回一个新的引用，类似于对象字面量{}并不等于{}，每个函数都是新的。如果涉及到把这个函数作为 props 传给子组件的情况，就要考虑是不是有多余的渲染是不是要用 memo。fn()这种形式是函数调用，它是一个表达式，表达式需要求值，所以每次渲染都需要计算出这个函数调用的返回值，这涉及到是否有额外计算的情况。如果计算很昂贵，那么就需要优化，比如在 setState 里传入一个函数引用而不是一个表达式。函数引用是指向这个函数的指针，它并不立即调用函数，如果传入一个函数引用，可以把这个过程理解为“注册”一个函数，等将来需要的时候再调用。注册监听器 addEventListener 的时候，传入的是一个函数引用，移除监听器的时候需要传入同一个函数引用。在定义和调用的时候又会涉及到 this 的概念，常规函数的 this 在调用的时候绑定；而箭头函数的 this 只是一个普通的变量，在定义的时候就绑定了，类似于 python 里的 LEGB（Local，Enclosed，Global，Built-in）。如果对比 python 和 js 的函数，python 的方法是手写 self 形参的，而 js 的方法不需要手写 this，js 可以通过 bind 手写 this，二者殊途同归。如果要理解方法和函数可以看 java，在 java 里没有函数只有静态方法，打印一个 Hello World 要写上这么多：class Main { public static void main() { System.out.println('Hello World') } }。

以上所有的东西都只是思想模型，它不涉及具体的实现，但可以帮助理解。前端是应用层的，本质上和做菜没有区别，初学做菜首要任务就是学会使用调料，但是具体到豆瓣酱是怎么生产出来的不用关心（顶级大厨会关心豆瓣酱的产地）。一个数组的 indexOf 方法和一个 Set 的 has 方法谁更快？数组的 splice 方法真的比手动 for 循环更好吗？对前端来说这些都不太重要。我只需要知道烧鱼来点豆瓣酱准没错但炒土豆别用，这就行了。
