# 用ArmMDK？

1. 打开MX，选择MDK-ARM生成代码
1. 因为MX里MDK-ARM的版本只能选到5，所以生成代码完后要用uvision打开，在配置里面选择ARM Compiler 6，不用编译直接关掉uvision
1. 用vscode转换uvision工程，即可。

工具定下来了，这个公司不用IAR，不用廣ision，不用cs+，用arm自己的丝丢丢，用vscode。开始搞起！

### 第二天：

首先 arm tool 被我搞坏了，我就在vscode配置了点东西它就坏了，还修复不了，更新链接直接403，用不用梯子都是，这怎么更新，而且cmsis toolkit， arm compiler，arm debugger, cmake等各种工具要选version，直接晕了。其次，mdk是有license的，这个license就是在廣ision里搞的，而且半年就过期了，所以不可能脱离廣ision独立使用vscode，据说它还发律师函，主要是它也不太好用，连挺而走线的动力都没有。

然后我试了stmcube转cmake，是用Embedded Tools这个第三方插件转的，这个搞出来是可以编译调试的，但是我发现printf不好用！关键是这个也太不靠谱了，生成不靠谱的stmcube代码再用不靠谱的第三方工具转成cmake这种不靠谱的gcc工具链。我不会用我只能说不靠谱……

### 所以不纠结了，用 *IAR* ！开始搞起！