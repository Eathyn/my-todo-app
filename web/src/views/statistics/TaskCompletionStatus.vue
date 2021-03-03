<template>
  <div class="taskCompletionStatus">
    <h3>任务完成情况</h3>
    <div class="taskContainer">
      <div class="completed">
        <h4>已完成</h4>
        <div class="tasksCompleted">
          <div v-for="task in completedTasks" :key="task.id" class="task">{{ task.name }}</div>
        </div>
      </div>
      <div class="notCompleted">
        <h4>未完成</h4>
        <div class="tasksNotCompleted">
          <div v-for="task in notCompletedTasks" :key="task.id" class="task">{{ task.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TaskCompletionStatus',
  computed: {
    ...mapGetters(['completedTasks', 'notCompletedTasks'])
  }
}
</script>

<style scoped>
.taskCompletionStatus {
  width: 800px;
  min-height: 300px;
  margin: 0 auto 20px auto;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.08);
  padding: 20px;
}

h3, h4 {
  margin: 0;
}

.taskContainer {
  display: flex;
}

.completed, .notCompleted {
  box-sizing: border-box;
  padding: 15px;
  width: 50%;
  min-height: 230px;
}
.completed {
  border-right: 1px solid hsla(0,0%,59.2%,.24);
}

.tasksCompleted, .tasksNotCompleted {
  box-sizing: content-box;
  padding: 10px 0 0 10px;
}

.task {
  box-sizing: content-box;
  padding: 2px 0;
}
</style>
