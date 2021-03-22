<template>
  <div>
    <div class="selector">
      <label for="listSelector">选择清单</label>
      <select id="listSelector" @click="getLists" @change="getTasks(selector.listId)" v-model="selector.listId">
        <option value="" disabled>选择一个清单</option>
        <option v-for="list in selector.lists" :id="list.id" :key="list.id" :value="list.id">{{ list.name }}</option>
      </select>
      <label for="taskSelector">选择任务</label>
      <select id="taskSelector" v-model="selector.taskId">
        <option value="" disabled>选择一个任务</option>
        <option v-for="task in selector.tasks" :id="task.id" :key="task.id" :value="task.id">{{ task.name }}</option>
      </select>
    </div>
    <div>
      <div class="buttons">
        <button v-show="!timer.isRun" @click="startCountdown">start</button>
        <button v-show="timer.isRun" @click="stopCountdown">stop</button>
        <button @click="resetCountdown">reset</button>
        <button @click="editCountdown">edit</button>
      </div>
      <div class="durationMenu" v-show="selector.duration.seen">
        <label for="hour"></label><input type="number" id="hour" min="0" placeholder="hour" v-model.number="selector.duration.hour">
        <label for="minute"></label><input type="number" id="minute" min="0" max="60" placeholder="minute" v-model.number="selector.duration.minute">
        <label for="second"></label><input type="number" id="second" min="0" max="60" placeholder="second" v-model.number="selector.duration.second">
        <button @click="save">save</button>
        <button @click="cancel">cancel</button>
      </div>
      <div class="timer">
        <p>{{ formattedTimer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../http'

export default {
  name: 'Countdown',
  data() {
    return {
      selector: {
        lists: [],
        tasks: [],
        listId: null,
        taskId: null,
        duration: {
          seen: false,
          hour: 0,
          minute: 30,
          second: 0,
        },
      },
      timer: {
        id: null,
        isRun: false,
        hour: null,
        minute: null,
        second: null,
      },
    }
  },
  computed: {
    formattedTimer() {
      return `${this.timer.hour.toString().padStart(2, '0')}-${this.timer.minute.toString().padStart(2, '0')}-${this.timer.second.toString().padStart(2, '0')}`
    },
  },
  methods: {
    async getLists() {
      const res = await http.get('/countdown/list/all')
      this.selector.lists = res.data
    },
    async getTasks(listId) {
      const res = await http.get(`/countdown/${listId}/task/all`)
      this.selector.tasks = res.data
    },
    async setTimer() {
      // skip: need get timer from server
      // virtual data
      const resData = {
        hour: 0,
        minute: 0,
        second: 5,
      }
      this.timer.hour = resData.hour
      this.timer.minute = resData.minute
      this.timer.second = resData.second
    },
    // quit if user hasn't select a list and task yet
    isListTaskSelected() {
      return this.selector.listId && this.selector.taskId
    },
    getCountdownHourMinuteSecond() {
      // get hour, minute and second from DB
      // set
      // this.selector.duration.hour = ...
      // this.selector.duration.minute = ...
      // this.selector.duration.second = ...
    },
    isHourMinuteSecondEntered() {
      return !(this.selector.duration.hour === '' || this.selector.duration.minute === '' || this.selector.duration.second === '')
    },
    isHourMinuteSecondInRange() {
      return this.selector.duration.hour >= 0 &&
          this.selector.duration.minute >= 0 && this.selector.duration.minute <= 60 &&
          this.selector.duration.second >= 0 && this.selector.duration.second <= 60
    },
    startCountdown() {
      if (!this.isListTaskSelected()) {
        alert('must select a list and task')
        return
      }
      // start countdown
      this.timer.isRun = true
      if (this.timer.id) {
        clearInterval(this.timer.id)
      }
      this.timer.id = setInterval(() => {
        if (this.timer.second > 0) {
          this.timer.second--
        } else if (this.timer.second === 0 && this.timer.minute > 0) {
          this.timer.second = 59
          this.timer.minute--
        } else if (this.timer.second === 0 && this.timer.minute === 0 && this.timer.hour > 0) {
          this.timer.second = 59
          this.timer.minute = 59
          this.timer.hour--
        } else {
          clearInterval(this.timer.id)
          alert('countdown ending')
          this.setTimer()
          this.timer.isRun = false
          // toggle event...
        }
      }, 1000)
    },
    stopCountdown() {
      clearInterval(this.timer.id)
      this.timer.isRun = false
    },
    resetCountdown() {
      if (!this.isListTaskSelected()) {
        alert('must select a list and task')
        return
      }
      clearInterval(this.timer.id)
      this.setTimer()
      this.timer.isRun = false
    },
    editCountdown() {
      if (this.timer.isRun) {
        alert('can\'t edit countdown while running')
      }
      this.getCountdownHourMinuteSecond()
      this.selector.duration.seen = true
    },
    save() {
      if (!this.isHourMinuteSecondEntered()) {
        alert('must enter hour, minute and second')
        return
      }
      if (!this.isHourMinuteSecondInRange()) {
        alert('hour, minute and second must in range')
        return
      }
      // post to DB
      alert(`${this.selector.duration.hour}-${this.selector.duration.minute}-${this.selector.duration.second}`)
      // this.getCountdownHourMinuteSecond()
    },
    cancel() {
      this.selector.duration.seen = false
    },
  },
  created() {
    this.getLists()
    this.setTimer()
  },
}
</script>

<style scoped>

</style>
