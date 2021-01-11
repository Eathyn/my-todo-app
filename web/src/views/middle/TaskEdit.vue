<template>
  <div id="taskEdit" :style="{ display: taskEditToggle === false ? 'none' : 'block' }">
    <h3>编辑任务</h3>

    <!--  clickedTask is null  -->
    <div v-if="clickedTask === null">

    </div>

    <!--  clickedTask isn't null  -->
    <div v-else>
      <div id="name">
        <label for="nameInput">名称：</label>
        <input type="text" id="nameInput" name="name" v-model="name">
      </div>

      <div id="date">
        <label for="dateInput">日期：</label>
        <input type="date" id="dateInput" name="date" v-model="date">
      </div>

      <div id="period">
        <label>时间段：</label>
        <label for="startingTimeInput"></label>
        <input type="time" id="startingTimeInput" name="startingTime"
               v-model="startingTime">
        <span>&#32;-&#32;</span>
        <label for="endTimeInput"></label>
        <input type="time" id="endTimeInput" name="endTime"
               v-model="endTime">
      </div>

      <div id="duration">
        <label for="durationInput">持续时间：</label>
        <input type="number" id="durationInput" name="duration" step="5" min="5"
               v-model="duration">
      </div>

      <div id="footer">
        <button @click="closeTaskEditPanel">取消</button>
        <button @click="updateTask">确定</button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TaskEdit',
  computed: {
    ...mapGetters(['clickedTask', 'clickedTaskId', 'taskEditToggle', 'selected']),

    // options
    name: {
      get() {
        return this.clickedTask.name
      },
      set(name) {
        this.$store.commit('UPDATE_TASK_NAME', name)
      },
    },
    date: {
      get() {
        return this.clickedTask.options.date
      },
      set(date) {
        this.$store.commit('UPDATE_TASK_DATE', date)
      },
    },
    startingTime: {
      get() {
        return this.clickedTask.options.period.startingTime
      },
      set(startingTime) {
        this.$store.commit('UPDATE_TASK_STARTING_TIME', startingTime)
      },
    },
    endTime: {
      get() {
        return this.clickedTask.options.period.endTime
      },
      set(endTime) {
        this.$store.commit('UPDATE_TASK_END_TIME', endTime)
      },
    },
    duration: {
      get() {
        return this.clickedTask.options.duration
      },
      set(duration) {
        this.$store.commit('UPDATE_TASK_DURATION', duration)
      },
    },
  },
  methods: {
    ...mapActions(['updateClickedTask']),

    closeTaskEditPanel() {
      this.$store.dispatch('updateTaskEditToggle', false)
    },
    updateTask() {
      const payload = {
        listId: this.selected,
        task: {
          id: this.clickedTaskId,
          name: this.name,
          options: {
            date: this.date,
            period: {
              startingTime: this.startingTime,
              endTime: this.endTime,
            },
            duration: this.duration,
          },
        },
      }

      this.$store.dispatch('updateClickedTask', payload)
      this.closeTaskEditPanel()
    },
  },
}
</script>

<style scoped>
#taskEdit {
  width: 300px;
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,.16), 0 3px 20px rgba(0,0,0,.16);
  border-radius: 3px;
  position: fixed;
  left: 445px;
  top: 170px;
  z-index: 1;
}
#name, #date, #period, #duration {
  margin: 0 0 25px 0;
}

label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
}

input {
  padding-left: 10px;
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 4px;
  outline: none;
}
input[id='date'] {
  width: 200px;
}
#footer > button {
  position: relative;
  width: 70px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  outline: none;
}
#footer > :nth-child(1) {
  left: 140px;
  background-color: rgba(46,73,136,.08);
}
#footer > :nth-child(2) {
  left: 160px;
  background-color: #b1bdeb;
  color: #ffffff;
}
#footer > :nth-child(1):hover {
  background-color: rgba(46,73,136,.12);
}
#footer > :nth-child(2):hover {
  background-color: #5670d3;
}
</style>
