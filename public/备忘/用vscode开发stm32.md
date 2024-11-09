# 用vscode开发stm32

1. 用vscode新建一个空工程，可以编译，空工程是指不经过MX初始化

1. 用MX新建一个CMake工程，用vscode导入这个CMake工程，编译报错

1. IAR可用！！！
    > 用MX新建一个EW工程，后面就是我熟悉的IAR环节了

1. stmcube转vscode的微软方法：
    > 用Embedded Tools插件的create project from st project指令。
    这个插件是微软的，微软果然强大，在stmcube的工具在那纠结整不出来的时候，微软一个优雅的指令，世界平静了

1. 用MX新建一个stmcube工程，再用stmcube打开，*也编译报错*
    > 所以IAR EW都可以，他自己的stmcube却出不来，这……

### 总结
  这波IDE的配置，终于让我进入了stm的世界，IDE一如既往的不行，stmcube启动慢，界面堪比keil，还好有一个MX配置工具很牛逼，自动生成其他编译链的代码的功能真的太强大了。VSCode统一了所有编辑器，嵌入式也不例外。可以喊出那句话了吗：不用VSCode的程序员都是垃圾？！

### 补充
  瑞萨的编辑器cs+全称是CubeSuite。之前射海张工给我一个重合闸的源代码，打开编译报一个很诡异的错：CC78K0R error E0325: No terminated comment，注释也会报错？结果真是。我把//注释换成了/* */，就通过编译了。我太震惊了，真是活久见啊！！