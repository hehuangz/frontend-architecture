<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <h1>{{counter}}</h1>
    <h1>{{fullName}}</h1>
    <router-link to="/app">App</router-link>
    <router-link to="/login">Login</router-link>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // console.log(11, this.$route)
    console.log(this.$store)
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 999
    //   })
    // }, 1000)

    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   num2: 999,
    //   time: 2000
    // })

    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 999
    //   })
    // }, 1000)

    // this.updateCountAsync({
    //   num: 5,
    //   num2: 999,
    //   time: 2000
    // })
  },
  computed: {
    // ...mapState(['count']),
    ...mapState({
      counter: 'count'
      // counter: (state) => state.count
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName () {
    //   console.log('fullName:', this.$store.getters)
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>
