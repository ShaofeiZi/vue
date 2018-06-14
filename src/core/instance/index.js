import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// ES5 实现class一个简单方式
// 便于拆分文件
// 查找原型是否是通过VUE方法实例化的
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 每个都是往VUE原型上挂载方法 具体方法可以进去看
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
