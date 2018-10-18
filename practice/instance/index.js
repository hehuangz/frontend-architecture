import Vue from 'vue'

const app = new Vue({
  el: '#root',
  // template: '<div ref="test">{{text}}&& {{obj.aa}}</div>',
  data () {
    return {
      text: 0,
      obj: {}
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('creaded')
  },
  beforeMount () {
    console.log(this.$el, 'beforeMounted')
  },
  mounted () {
    console.log(this.$el, 'mouned')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  activated () {
    console.log('actived')
  },
  deactivated () {
    console.log('deactived')
  },
  beforeDestroy () {
    console.log('befoeDestory')
  },
  destroyed () {
    console.log('destory')
  },
  render (h) {
    // throw new TypeError('render')
    console.log('render')
    return h('div', {}, 'cfvghbj')
  }
  // renderError (h, err) {
  //   return h('div', {}, err.stack)
  // },
  // errorCaptured (h, err) {
  //   return h('div', {}, 'sdc')
  // }
})
// app.$mount('#root')

// setInterval(() => {
//   app.$data.text += 1
//   // app.obj.aa = i
//   // app.$set(app.obj, 'aa', i)
// }, 1000)
app.$watch('text', (newVal, oldVal) => {
  return console.log(newVal, oldVal)
})

// console.log(app)
// console.log(app.$data)
// console.log(app.$options)
// console.log(app.$props)
// app.$options.render = (h) => {
//   return h('div', {}, 'dsa')
// }
// console.log(app.$el)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopeSlots)
// console.log(app.$refs.test)
// console.log(app.$isServer)

// 生命周期
