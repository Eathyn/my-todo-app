<template>
  <div id="statistics">
    <div id="container">
      <h2>统计</h2>
      <DatePicker/>
      <div class="taskContainer">
        <TaskCompletionStatus/>
        <TaskCompletionRate/>
        <TaskFocusDuration/>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from './DatePicker'
import TaskCompletionStatus from './TaskCompletionStatus'
import TaskCompletionRate from './TaskCompletionRate'
import TaskFocusDuration from './TaskFocusDuration'

export default {
  name: 'Statistics',
  components: {
    DatePicker,
    TaskCompletionStatus,
    TaskCompletionRate,
    TaskFocusDuration,
  }
}
</script>

<style scoped>
#statistics {
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
}

#container {
  width: 55%;
  margin: auto;
}

.taskContainer {
  display: flex;
  flex-wrap: wrap;
}

h2 {
  margin: 20px 0;
}
</style>
