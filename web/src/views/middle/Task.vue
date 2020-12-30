<template>
  <div>
    <ul>
      <TaskItem v-for="taskItem in taskItems" :key="taskItem.id"
        :task-item="taskItem" :id="taskItem.id"/>
    </ul>
  </div>
</template>

<script>
import TaskItem from '@/views/middle/TaskItem'
import { mapGetters } from 'vuex'

export default {
  name: 'Task',
  computed: {
    ...mapGetters(['taskItems']),
  },
  components: {
    TaskItem,
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 16px;
}
</style>
