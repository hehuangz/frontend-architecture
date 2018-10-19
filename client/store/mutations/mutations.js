export default {
  updateCount (state, { num, num2 }) {
    console.log('mjutations:', num2)
    state.count = num
  }
}
