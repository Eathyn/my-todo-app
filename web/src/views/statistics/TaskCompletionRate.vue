<template>
  <div class="taskCompletionRate">
    <h3>完成率</h3>
    <div class="container">
      <v-chart :options="taskCompletionStatus"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Echarts from 'vue-echarts'

export default {
  name: 'TaskCompletionRate',
  computed: {
    ...mapGetters(['completedTasks', 'notCompletedTasks']),

    taskCompletionStatus() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['已完成', '未完成'],
        },
        series: [
          {
            name: '任务',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [
              { name: '已完成', value: `${this.completedTasks.length}` },
              { name: '未完成', value: `${this.notCompletedTasks.length}` },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
  },
  components: {
    'v-chart': Echarts,
  },
}
</script>

<style scoped>
.taskCompletionRate {
  width: 380px;
  min-height: 300px;
  margin-left: 69px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.08);
  padding: 20px;
}

h3 {
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.completionRate {
  flex-grow: 2;
}
.taskCount {
  flex-grow: 1;
}

.echarts {
  width: 100%;
  height: 250px;
}
</style>
