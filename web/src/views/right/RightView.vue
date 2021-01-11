<template>
  <div id="right-view">
    <Pomodoro/>
    <TaskDetails/>
  </div>
</template>

<script>
import Pomodoro from './Pomodoro'
import TaskDetails from './TaskDetails'

export default {
  name: 'RightView',
  components: {
    Pomodoro,
    TaskDetails,
  },
}
</script>

<style scoped>
#right-view {
  box-sizing: border-box;
  width: 542px;
  height: 100vh;
  padding: 0 20px;
  background-color: #ffffff;
}
</style>
