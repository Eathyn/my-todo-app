<template>
  <div id="user">
    <div>{{ user.name }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'User',
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getUser']),
  },
  created() {
    this.$store.dispatch('getUser')
  },
}
</script>

<style scoped>

</style>
