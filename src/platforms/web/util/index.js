/* @flow */

import { warn } from 'core/util/index'

export * from './attrs'
export * from './class'
export * from './element'

/**
 * Query an element selector if it's not an element already.
 * 如果是字符串就调用document.querySelector获取对应的Element
 */
export function query (el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      // 如果没找到就直接报错，有就返回
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      )
      // 并且自动创建一个，保证VUE不崩溃。。
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
