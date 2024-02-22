# rust数据类型

总结出一个rust数据类型的记忆链

标量数据类型，就是几种integer几种floating point，一个character一个boolean。

组合类型，首先有tuple，不同类型固定个数的连续存储，并且和函数的结合紧密，函数的传参和默认的返回值都是tuple。

其次是array，固定类型固定个数的连续存储，表示为[T; N]。array和tuple一样必须存在栈内存里，原始类型都存在栈里，因为其大小在编译时是知道的，那些在运行时才知道大小的自定义类型存储在堆里，在堆里存储但在栈里有个固定大小的指针指着。

接着是Vec\<T\>，这个最接近js里的数组，固定类型不固定个数的连续存储，数据是存储在堆里的。vec本身是一个智能指针，智能指针就是一个指针附带其他信息，如vec是一个指针附带len和capacity信息，其大小也是固定的，存储在栈里。

接着就是系统语言的字符串了，这个在js里最简单的概念，在系统语言里首先表示为字符数组char[]，然后是标准库里的String类型。不同于js，String不是原始类型，它是new出来的，存在堆里，rust自动保证free/drop内存（不是garbage collection）。

rust的字符串还有一个&str，这是一个slice原始类型。&str是一个u8(char用u8表示其ASCII码)数组的一段切片，js里有一个方法叫slice。slice表示的连续存储的数据可以在栈里也可以在堆里。&str和&[u8]是等价的，而String和Vec\<u8\>等价。字符串字面量如“hello”的数据类型是&str。

slice的表示是[T]，但在使用时必须用&[T]、&mut [T]、Box\<[T]\>的形式。这个Box\<T\>，其功能是把所有数据存储在堆里，它自己是一个指针指向这个数据。这3种形式分别是share、mutate、ownership。

js里的object既是类的实例也是一个集合类型，rust里没有object，rust标准库里的集合类型是hashmap，rust里的类是struct和enum。enum里有2个重要的类型：Option和Result，在写js的时候可以参考这2个类型让代码更清晰。

rust里也有point和reference这些原始类型，point是不被优先使用的，只有在unsafe模式下才可使用，而reference就是rust保证的一种安全的指针。

还有一些数据类型如rc、arc等。
