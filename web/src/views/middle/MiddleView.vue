<template>
  <div id="middle-view">
    <ListTitle/>
    <TaskAdder/>
    <Task/>
  </div>
</template>

<script>
import Task from '@/views/middle/Task'
import TaskAdder from '@/views/middle/TaskAdder'
import ListTitle from '@/views/middle/ListTitle'

export default {
  name: 'MiddleView',
  components: {
    Task,
    TaskAdder,
    ListTitle,
  }
}
</script>

<style scoped>
#middle-view {
  flex: 0 0 730px;
  height: 100vh;
  padding: 0 24px;
  background-color: #fff;
}
</style>
