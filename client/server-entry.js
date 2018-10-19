import { createApp } from './create-app'
import { resolve } from 'path';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents= router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no Component matched'))
      }
      resolve(app)
    })
  })
}
