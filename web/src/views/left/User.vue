<template>
  <div id="user">
    <img src="../../assets/imgs/avatar.png" alt="avatar">
    <span>{{ user.name }}</span>
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
#user {
  height: 44px;
  padding: 10px 18px 0 18px;
}

img {
  width: 28px;
  height: 28px;
  position: relative;
  top: 7px;
}

span {
  margin-left: 10px;
  color: #fefefe;
  opacity: 0.8;
}
</style>
