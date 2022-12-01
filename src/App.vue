<template>
  <div 
    class="w-full min-h-screen flex flex-col max-w-5xl mx-auto" 
    data-theme="dark">
    <Header v-if="isAuth"></Header>
    <router-view class="flex-grow"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  export default {
    components: {
      Header,
      Footer
    },
    computed: {
      isAuth () {
        return this.$store.getters['auth/getAuthorization']
      }
    }
  }
</script>
