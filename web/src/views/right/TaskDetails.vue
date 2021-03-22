<template>
  <div id="taskDetails">
    <div v-if="clickedTask === null"></div>
    <div v-else>
      <h3 class="taskName">{{ clickedTask.name }}</h3>
      <div class="taskOptions">
        <div class="date">
          <span>日期: {{ clickedTask.options.date }}</span>
        </div>
        <div class="period">
          <span>时间:
            {{ clickedTask.options.period.startingTime }} -
            {{ clickedTask.options.period.endTime }}
          </span>
        </div>
        <div class="completionStatus">
          <span>完成状况: {{ clickedTask.isCompleted ? '已完成' : '未完成' }}</span>
        </div>
        <div class="focusAmount">
          <span>已专注次数: {{ clickedTask.pomodoroAmount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TaskDetails',
  computed: {
    ...mapGetters(['clickedTask', 'pomodoro']),
  },
}
</script>

<style scoped>
.taskName {
  font-size: 25px;
  padding: 0 0 0 15px;
}
.taskOptions {
  box-sizing: border-box;
  padding: 0 30px;
}
.taskOptions > div {
  font-size: 18px;
  padding: 0 0 20px 0;
}
</style>
