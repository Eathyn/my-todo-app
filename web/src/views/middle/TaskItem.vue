<template>
  <div v-bind:class="{ task: taskItem, finishedTask: model.isCompleted }" @contextmenu.prevent="showTaskMenu" @click="showTaskDetails">
    <div class="isTaskCompleted">
      <label for="taskCompletionStatus"></label>
      <input type="checkbox" id="taskCompletionStatus" v-model="model.isCompleted" @click="updateCompletionStatus">
    </div>
    <div class="taskContent">
      {{ taskItem.name }}
    </div>
    <div class="icons">
      <span class="icon-start">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-play"></use>
        </svg>
      </span>
      <span class="icon-pause-end">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-suspended"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import taskPlay from '../../assets/icons/taskPlay'
import taskEnd from '../../assets/icons/taskEnd'
import taskSuspended from '../../assets/icons/taskSuspended'

export default {
  name: 'TaskItem',
  props: ['taskItem'],
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      model: {
        isCompleted: this.taskItem.isCompleted,
      }
    }
  },
  computed: {
    ...mapGetters(['clickedTaskId', 'clickedTask', 'intervalId', 'clickedList'])
  },
  methods: {
    ...mapActions(['updateTaskMenu', 'updateClickedTaskId', 'getClickedTask', 'updateTaskCountdown']),

    showTaskMenu(event) {
      const taskMenu = {
        left: event.pageX,
        top: event.pageY,
        display: 'block',
      }
      this.$store.dispatch('updateTaskMenu', taskMenu)
      this.$store.dispatch('updateClickedTaskId', this.taskItem.id)
    },

    showTaskDetails() {
      this.$store.dispatch('updateClickedTaskId', this.taskItem.id)
      this.$store.dispatch('getClickedTask', this.clickedTaskId)
    },

    async updateCompletionStatus() {
      // get clicked task
      await this.$store.dispatch('getClickedTask', this.taskItem.id)
      // modify task completion status
      const task = {
        id: this.clickedTask.id,
        isCompleted: this.model.isCompleted,
        name: this.clickedTask.name,
        options: this.clickedTask.options,
      }
      // set payload
      const payload = {
        listId: this.clickedList.id,
        task,
      }
      // update database
      await this.$store.dispatch('updateClickedTask', payload)
    },
  }
}
</script>

<style scoped>
.task {
  box-sizing: border-box;
  height: 50px;
  line-height: 3;
  padding: 0 12px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px solid rgba(73, 74, 77, 0.08);
}
.task:hover {
  background-color: rgba(66,83,136,0.06);
  border-radius: 4px;
}

.taskContent {
  padding-left: 5px;
  flex-grow: 10;
}

.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.4em;
  fill: currentColor;
  overflow: hidden;
}
.icon:hover {
  color: #5670d3;
}

.finishedTask {
  color: rgba(0, 0, 0, 0.36);
  text-decoration-line: line-through;
}
</style>
