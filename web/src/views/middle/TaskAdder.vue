<template>
  <div id="taskAdder">
    <label for="addTask"></label>
    <input id="addTask" type="text" name="name" v-model="model.name" @keyup.enter="addTask" placeholder="添加任务，回车即可保存">
    <svg class="icon" aria-hidden="true" @click="toggleTaskOptions"><use xlink:href="#icon-calendar"></use></svg>
    <TaskOptions :display="display" @closeTaskOptionsPanel="toggleTaskOptions"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskOptions from './TaskOptions'
import taskOptions from '../../assets/icons/taskOptions'

export default {
  name: 'TaskAdder',
  components: {
    TaskOptions,
  },
  computed: {
    ...mapGetters(['taskOptions', 'clickedList', 'listOfTodayTasks'])
  },
  data() {
    return {
      model: {
        name: '',
      },
      display: 'none',
    }
  },
  methods: {
    ...mapActions(['addTaskItem', 'updateTaskOptions']),

    async addTask() {
      const [ clickedListId, listOfTodayId ] = [ this.clickedList.id, this.listOfTodayTasks.id ]
      const task = {
        selected: this.clickedList.id,
        model: this.model,
        taskOptions: this.taskOptions,
      }
      // automatically set date of task options to date of today if click today list
      if (clickedListId === listOfTodayId) {
        const [year, month, day] = new Date().toLocaleDateString().split('/')
        task.taskOptions.date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      }
      await this.$store.dispatch('addTaskItem', task)
      this.model.name = ''
      this.initTaskOptions()
    },
    toggleTaskOptions() {
      this.display = this.display === 'none' ? 'block' : 'none'
    },
    // set taskOptions to default
    initTaskOptions() {
      const initial = {
        date: '',
        period: {
          startingTime: '',
          endTime: '',
        },
        duration: '',
      }
      this.$store.dispatch('updateTaskOptions', initial)
    },
  },
}
</script>

<style scoped>
#taskAdder {
  box-sizing: border-box;
  padding-bottom: 20px;
}

input {
  box-sizing: border-box;
  width: 610px;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  background-color: rgba(44,66,118,0.06);
  border-radius: 4px;
  outline: none;
  border: 1px solid transparent;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  padding-left: 20px;
  vertical-align: -0.35em;
  fill: currentColor;
  overflow: hidden;
}
</style>
