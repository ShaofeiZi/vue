# VUE源码 （带注释）
```
src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```
package.json 中 build 指向 scripts/build.js
然后去看 看在build中引入的config
既然是看源码 那就直接Runtime Compiler 版本吧
```JavaScript
entry: resolve('web/entry-runtime-with-compiler.js')
```
入口找到，开始看源码


