class EventEmitter {
  constructor() {
    this._events = {}
    this.onceWrapped = false
  }

  static
  new(...args) {
    return new this(...args)
  }

  on(eventName, listener, onceWrapped) {
    let once = false

    if (!eventName || !listener) {
      return
    }

    if (!this.isValidListener(listener)) {
      throw new TypeError('listener must be a function');
    }

    let events = this._events
    let listeners = events[eventName] = events[eventName] || []

    // false
    if (onceWrapped === 'once') {
     once = true
    } else {
      once = false
    }
    // let listenerIsWrapped = typeof listener === 'object'

    // 不重复添加事件
    if (indexOf(listeners, listener) === -1) {
      let d = {
        listener: listener,
        once: once,
      }
      listeners.push(d)
    }

    return this
  }

  /**
     * 添加事件，该事件只能被执行一次
     * @param  {String} eventName 事件名称
     * @param  {Function} listener 监听器函数
     * @return {Object} 可链式调用
     */
  once(eventName, listener) {
    return this.on(eventName, listener, 'once')
  }

  /**
   * 触发事件
   * @param  {String} eventName 事件名称
   * @param  {Array} args 传入监听器函数的参数，使用数组形式传入
   * @return {Object} 可链式调用
   */
  emit(eventName, args) {
    let listeners = this._events[eventName]
    // let (!listeners) {
    //   return false
    // }

    for (let i = 0; i < listeners.length; i++) {
      let l = listeners[i]
      if (l) {
        // l.listener.apply(this, args || [])
        l.listener(...args || [])
        if (l.once) {
          this.off(eventName, l.listener)
        }
      }
    }
    return this
  }

  /**
     * 删除事件
     * @param  {String} eventName 事件名称
     * @param  {Function} listener 监听器函数
     * @return {Object} 可链式调用
     */
  off(eventName, listener) {
    let listeners = this._events[eventName]

    for (let i = listeners.length - 1; i >= 0; i--) {
      let l = listeners[i]
      if (l.listener === listener) {
        listeners.splice(i, 1, null)
      }
    }
    return this
  }

  /**
   * 删除某一个类型的所有事件或者所有事件
   * @param  {String[]} eventName 事件名称
   */
   allOff(eventName) {
     if (eventName && this._events[eventName]) {
       this._events[eventName] = []
     } else {
       this._events = {}
     }
   }

  isValidListener(listener) {
    return true
  }

}
