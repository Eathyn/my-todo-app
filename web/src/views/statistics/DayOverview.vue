<template>
  <div id="dayOverview">
    <h3>每日概览</h3>
    <div class="datePicker">
      <button @click="switchToDateOfYesterday">left</button>
      <span class="date">{{ date }}</span>
      <button @click="switchToDateOfTomorrow">right</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayOverview',
  data() {
    return {
      date: '',
    }
  },
  methods: {
    getFormattedDate(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toLocaleString().padStart(2, '0')
      const day = date.getDate().toLocaleString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    switchToDateOfYesterday() {
      const currentDate = new Date(this.date)
      currentDate.setDate(currentDate.getDate() - 1)
      this.date = this.getFormattedDate(currentDate)
    },
    switchToDateOfTomorrow() {
      const currentDate = new Date(this.date)
      currentDate.setDate(currentDate.getDate() + 1)
      this.date = this.getFormattedDate(currentDate)
    },
  },
  created() {
    const dateOfToday = new Date()
    this.date = this.getFormattedDate(dateOfToday)
  },
}
</script>

<style scoped>
#dayOverview {
  width: 500px;
  height: 300px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.08);
  padding: 20px;
}

h3 {
  margin: 0;
  padding-bottom: 20px;
}

.datePicker {
  display: flex;
  justify-content: center;
  font-size: 30px;
}
</style>
