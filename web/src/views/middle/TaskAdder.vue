<template>
  <div id="taskAdder">
    <input type="text" name="name" v-model="model.name"
           @keyup.enter="addTask" placeholder="添加任务，回车即可保存">
    <svg class="icon" aria-hidden="true" @click="toggleTaskOptions">
      <use xlink:href="#icon-calendar-fill"></use>
    </svg>
    <TaskOptions :display="display" @closeTaskOptionsPanel="toggleTaskOptions"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import taskOptions from '../../assets/icons/taskOptions'
import TaskOptions from './TaskOptions'

export default {
  name: 'TaskAdder',
  components: {
    TaskOptions,
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
    ...mapActions(['addTaskItem']),

    addTask() {
      this.$store.dispatch('addTaskItem', {
        selected: this.selected,
        model: this.model,
        taskOptions: this.taskOptions,
      })

      // set to default values
      this.model.name = ''
      this.$store.dispatch('updateTaskOptions', null)
    },
    toggleTaskOptions() {
      this.display = this.display === 'none' ? 'block' : 'none'
    },
  },
  computed: {
    ...mapGetters(['selected', 'taskOptions'])
  },
}
</script>

<style scoped>
input {
  width: 630px;
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
