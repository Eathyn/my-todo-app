<template>
  <div>
    <div id="tasks">
      <TaskItem v-for="taskItem in taskItems" :key="taskItem.id"
        :task-item="taskItem" :id="taskItem.id"/>
    </div>
    <TaskMenu/>
    <TaskEdit/>
  </div>
</template>

<script>
import TaskItem from './TaskItem'
import TaskMenu from './TaskMenu'
import TaskEdit from './TaskEdit'
import { mapGetters } from 'vuex'

export default {
  name: 'Task',
  computed: {
    ...mapGetters(['taskItems']),
  },
  components: {
    TaskItem,
    TaskMenu,
    TaskEdit,
  },
}
</script>

<style scoped>
#tasks {
  padding: 0;
  margin: 16px;
}
</style>
