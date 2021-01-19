<template>
  <div id="middle-view">
    <ListTitle/>
    <TaskAdder/>
    <Task/>
  </div>
</template>

<script>
import Task from './Task'
import TaskAdder from './TaskAdder'
import ListTitle from './ListTitle'

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
  box-sizing: border-box;
  width: 730px;
  height: 100vh;
  padding: 0 24px;
  background-color: #fff;
  border-right: 1px solid rgba(73, 74, 77, 0.22);
}
</style>
