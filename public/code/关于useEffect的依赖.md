# 用linter注释来取消依赖的报错

// eslint-disable-next-line react-hooks/exhaustive-deps
这段代码应不应该使用？
After useEffectEvent becomes a stable part of React, we recommend never suppressing the linter.
官网上说明了，因为现在useEffectEvent还没有加入到稳定版，所以还是可以使用那个linter注释来取消报错。但是，最好是想其他办法来消除报错，比如在effect里加入条件语句等。

我在实际项目中使用过这种注释，当时只是因为这样做可以解决问题，[新官网](https://react.dev/learn/separating-events-from-effects)上详细的介绍了useEffect的reactive和non-reactive的问题。

简单来说就是，effect需要最新的数据，但是又不需要响应某些最新数据，这个时候就会出现把那些不需要响应的数据从依赖数组里移除这样的操作，这个操作会导致linter报错，必须得用注释来取消报错，这是没问题的。而还是实验版的useEffectEvent就是为了解决这个问题，在不用注释的情况下。

为什么会如此纠结？因为函数组件使用闭包作用域，effect如果需要最新数据，那么必须随着组件的更新执行一次。如果不执行那么就得不到最新的数据，始终是上一个闭包里的旧数据，导致需要执行的时候使用的是旧数据；而如果执行，那么有些不必要的操作也跟着执行了，这些不必要的操作就是所谓的non-reactive，并不需要响应它们，只是需要得到它们的最新数据。这就是Vue官网上所说的React的一些对开发者不友好的地方，即一不小心就得到了旧的闭包数据。

在useEffectEvent加入稳定版之前，开发者有时需要用注释来取消linter的报错，这种开发体验有点tricky，而如果不用注释那得重新组织代码，这又有点反直观。所以回到Vue和React的比较，说Vue更直观易学这不是没有原因的。
