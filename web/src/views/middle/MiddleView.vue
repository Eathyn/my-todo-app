<template>
  <div id="middle-view">
    <TaskAdder/>
    <Task/>
  </div>
</template>

<script>
import Task from '@/views/middle/Task'
import TaskAdder from '@/views/middle/TaskAdder'

export default {
  name: 'MiddleView',
  components: {
    Task,
    TaskAdder,
  }
}
</script>

<style scoped>
#middle-view {
  flex: 0 0 730px;
  height: 100vh;
  background-color: #3670af;
}
</style>
