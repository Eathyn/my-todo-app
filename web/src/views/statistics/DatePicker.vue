<template>
  <div id="datePicker">
    <div class="datePicker">
      <svg class="icon" aria-hidden="true" @click="switchToDateOfYesterday">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
      <div class="date">{{ date }}</div>
      <svg class="icon" aria-hidden="true" @click="switchToDateOfTomorrow">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import yesterdayIcon from '../../assets/icons/yesterday'
import tomorrowIcon from '../../assets/icons/tomorrow'

export default {
  name: 'DatePicker',
  data() {
    return {
      date: '',
    }
  },
  methods: {
    ...mapActions(['getTaskStatistics']),

    getFormattedDate(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toLocaleString().padStart(2, '0')
      const day = date.getDate().toLocaleString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    getTasksOfSelectedDate(date) {
      this.$store.dispatch('getTaskStatistics', date)

    },
    switchToDateOfYesterday() {
      // set date
      const currentDate = new Date(this.date)
      currentDate.setDate(currentDate.getDate() - 1)
      this.date = this.getFormattedDate(currentDate)

      // get tasks
      this.getTasksOfSelectedDate(this.date)
    },
    switchToDateOfTomorrow() {
      // set date
      const currentDate = new Date(this.date)
      currentDate.setDate(currentDate.getDate() + 1)
      this.date = this.getFormattedDate(currentDate)

      // get tasks
      this.getTasksOfSelectedDate(this.date)
    },
  },
  created() {
    // set today's date
    const dateOfToday = new Date()
    this.date = this.getFormattedDate(dateOfToday)

    // get tasks of today's date
    this.getTasksOfSelectedDate(this.date)
  },
}
</script>

<style scoped>
#datePicker {
  width: 50%;
  padding: 0 0 20px 0;
  margin: 0 auto;
  text-align: center;
}

.datePicker {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin: 0 10px;
  padding: 10px;
  border-radius: 50%;
  transition: background-color, color 0.3s linear;
}
.icon:hover {
  background-color: #acabab;
  color: #ffffff;
}
</style>
