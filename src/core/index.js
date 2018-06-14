// 从 Vue 的出生文件导入 Vue
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'
// 这里的VUE已经在instance挂载过原型上的方法了  并且实例化过了
// 挂载全局API
initGlobalAPI(Vue)
// 定义完之后才能使用这些全局方法
// 在 Vue.prototype 上添加 $isServer 属性，该属性代理了来自 core/util/env.js 文件的isServerRendering 方法
//  不在浏览器 不在weex 并且没有global  就当做服务端。。
// 因为webpack的全局是个大闭包 并没有global...所以可以排除在webpack中的情况
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
// 在 Vue.prototype 上添加 $ssrContext 属性
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
// scripts/config.js  genConfig方法会写入版本号
// Vue.version 存储了当前 Vue 的版本号
Vue.version = '__VERSION__'
// 写完就是当前版本号了
export default Vue
