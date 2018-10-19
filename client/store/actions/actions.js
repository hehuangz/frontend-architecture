export default {
  updateCountAsync (store, data) {
    console.log(data.num2)
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
