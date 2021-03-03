<template>
  <div class="taskFocusDuration">
    <h3>专注时长(分钟)</h3>
    <div class="container">
      <v-chart :options="taskFocusDurationChart"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Echarts from 'vue-echarts'

export default {
  name: 'TaskFocusDuration',
  computed: {
    ...mapGetters(['taskStatistics']),

    taskName() {
      const taskNameArr = []
      for (const task of this.taskStatistics) {
        taskNameArr.push(task.name)
      }
      return taskNameArr
    },
    taskFocusTime() {
      const taskFocusTimeArr = []
      for (const task of this.taskStatistics) {
        taskFocusTimeArr.push(task.focusTime)
      }
      return taskFocusTimeArr
    },

    taskFocusDurationChart() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: this.taskName,
        },
        series: [{
          data: this.taskFocusTime,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
        }]
      }
    },
  },
  components: {
    'v-chart': Echarts,
  },
}
</script>

<style scoped>
.taskFocusDuration {
  width: 380px;
  min-height: 300px;
  margin-left: 40px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.08);
  padding: 20px;
}

h3 {
  margin: 0;
}

.echarts {
  width: 100%;
  height: 200px;
}
</style>
