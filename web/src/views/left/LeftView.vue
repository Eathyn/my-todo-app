<template>
  <div id="left-view">
    <User/>
    <List/>
    <ListPopup/>
  </div>
</template>

<script>
import User from './User'
import List from './List'
import ListPopup from './ListPopup'

export default {
  name: 'LeftView',
  components: {
    User,
    List,
    ListPopup,
  }
}
</script>

<style scoped>
#left-view {
  width: 260px;
  height: 100vh;
  background-color: #7086da;
  border-right: 3px solid rgba(44,66,118,0.06);
}
</style>
