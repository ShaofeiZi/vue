/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'
import KeepAlive from "../components/keep-alive";

/**
 * 挂载全局API
 * 具体可以看
 * https://vuefe.cn/v2/api/#%E5%85%A8%E5%B1%80-API
 * @param Vue
 */
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 不建议使用 不稳定
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  /**
   * 定义全局的方法 先定义为空
   *   'component',
   *   'directive',
   *   'filter'
   */
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
  // builtInComponents是一个内置组件   目前就导出了  KeepAlive
  extend(Vue.options.components, builtInComponents)
  // 继续挂载全局方法
  initUse(Vue) // Vue.use
  initMixin(Vue) // Vue.mixin
  initExtend(Vue) //  Vue.extend
  /**
   * 定义全局的方法 后定义为具体方法
   *   'component',
   *   'directive',
   *   'filter'
   */
  initAssetRegisters(Vue)
}
