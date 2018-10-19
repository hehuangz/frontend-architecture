import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 地址栏使用标准的路由，不用默认的hash模式
    // base: '/base/', // 路由加上这段
    linkActiveClass: 'active-link', // router-link的类名
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }, // 是否记录上次滚动的位置
    fallback: true // 自动处理不支持正常路由时使用hash路由
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
