import ReactMarkdown from 'react-markdown'
import './index.sass'

const statement = `
## 几点说明：
1. 本人自学前端
1. BOSS直聘上填的工作经历不连贯，空白期就是没有上班
1. 之前没有在正规软件公司做过前端开发岗，属于半路转行
1. 不要看我的工作经历，看我会做的东西
***
***

## 个人技能：
### javascript
1. 精通javascript。掌握js语言的精粹——一等对象（first class）的函数、简洁强大的对象、基于原型链的类继承；掌握js的异步编程，理解会用回调函数、Promise、then catch、async await；掌握js的异常处理，理解会用throw、try catch finally。

1. 精通es6+语法。掌握箭头函数及其与普通函数的区别（前者没有自己的this和prototype）；掌握esmodule、import import() export、解构赋值、扩展运算符（...）、可迭代对象等。

1. 熟悉会用node。掌握commonjs及其与esmodule的区别；熟悉会用fs读写文件、http/https构建网络服务等。

1. 掌握一般编程语言的主要概念。理解原始类型和引用类型（对象）；理解传值和传引用；理解变量的可变与不可变；理解相等性判断；理解类型、静态动态语言的区别，能看懂typescript；理解栈内存和堆内存（前者存放对象方法，后者存放实例属性）；理解表达式和函数式编程；理解纯函数和副作用；理解递归函数；理解垃圾回收等。理解算法复杂度。会用正则表达式。

1. 掌握面向对象编程思想。知道java和c++里类的结构，知道继承、多态、接口等概念，知道设计模式，会用oop思维来设计程序（此网站的tictactoe游戏就使用了oop）；理解js的类，会用class表示和函数原型表示；理解类方法、静态方法、实例属性、公共私有属性、get set等。

1. 本人目前所学习过的编程语言（除js）：c、c++、java、python。知道语言的基本特性和结构，能看懂简单代码。
***

### html
1. 了解html文档的结构，会用tag元素构建页面布局。

1. 熟练使用input构建表单，a构建链接，table构建表格。
***

### css
1. 掌握响应式设计。会用flex/grid和@media构建适应桌面和手机的响应式界面（参见此网站的效果）。

2. 会用sass。
***

### web和浏览器
1. 了解bom和dom，会用一些常见的dom方法。

1. 理解会用事件和监听器。

1. 会用主要的web api，如Fetch、FormData、FileReader等。

1. 了解http请求的过程，了解cors、cookie。

1. 会用chrome浏览器和firefox浏览器的devtools。
***

### 前端框架
1. 熟悉会用react。

1. 熟悉会用vue2（因很久不用，上手可快速至熟练），快速上手vue3（看过文档）。

1. 熟悉会用状态管理redux、vuex、pinia；熟悉会用客户端路由react-router、vue-router。

1. 会对比理解vue和react，如：模板语法对比jsx、生命周期对比useEffect、类组件对比函数组件，更快速适应前端变化。
***

### 其他框架或工具
1. 熟练使用express框架，会用其构建服务端程序。

1. 使用uniapp做过安卓应用。了解混合开发和原生开发的概念。

1. 使用electron做过桌面程序，了解该框架的使用方法和用其构建桌面应用的过程。

1. 会用webpack构建开发环境和打包，同类型的工具还使用过vite及其依赖rollup。

1. 用过axios、babel、eslint、element ui、antd等。

1. 会用git版本管理。
***

### 数据库
1. 了解sql和nosql，了解关系型和文档型数据库。

1. 使用过uniapp的sqlite。学习过sql语言，可快速上手。

1. 使用过mongodb及其第三方框架mongoose。
***

### 其他技能
1. 使用过腾讯serverless云开发，接过云数据库云存储，写过云函数。

1. 熟练使用vscode，熟悉快捷键，会用插件。

1. 本人使用英文阅读文档，使用英文关键字在谷歌搜索问题，这样更接近原意，找第一手资料快。
***

### 关于我的专业和工作经历
我的专业“电子信息科学与技术”属于计算机相关专业，在学校里学过c语言、数据结构。工作上我是半路转行没有正规前端经历，希望到贵公司工作学习提升。我的优势是对新技术的热忱和学习能力。
`

export default function PersonalStatement() {
    return (
        <div className='myapp-comp-personalstatement'>
            <ReactMarkdown>{statement}</ReactMarkdown>
        </div>
    )
}