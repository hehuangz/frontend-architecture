import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history' // 地址栏使用标准的路由，不用默认的hash模式
    // base: '/base/', // 路由加上这段
  })
}
