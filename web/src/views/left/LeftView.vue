<template>
  <div id="left-view">
    <User/>
    <List/>
  </div>
</template>

<script>
import User from '@/views/left/User'
import List from '@/views/left/List'

export default {
  name: 'LeftView',
  components: {
    User,
    List,
  }
}
</script>

<style scoped>
#left-view {
  flex: 0 0 260px;
  height: 100vh;
  background-color: #7086da;
}
</style>
