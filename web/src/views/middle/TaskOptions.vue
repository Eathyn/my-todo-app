<template>
  <div id="taskOptions" :style="{ display: this.display }">
    <div id="date">
      <label for="dateInput">日期：</label>
      <input type="date" id="dateInput" name="date" min="2021-01-01" max="2030-12-31">
    </div>

    <div id="period">
      <label>时间段：</label>
      <label for="startingTimeInput"></label>
      <input type="time" id="startingTimeInput" name="startingTime">
      <span>&#32;-&#32;</span>
      <label for="endTimeInput"></label>
      <input type="time" id="endTimeInput" name="endTime">
    </div>

    <div id="duration">
      <label for="durationInput">持续时间：</label>
      <input type="number" id="durationInput" name="duration" step="5" min="5" max="60">
    </div>

    <div id="footer">
      <button @click="cleanOptions">清除</button>
      <button @click="setOptions">确定</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TaskOptions',
  props: ['display'],
  methods: {
    ...mapActions(['updateTaskOptions']),

    setOptions() {
      const dateInput = document.querySelector('input[id="dateInput"]')
      const startingTimeInput = document.querySelector('input[id="startingTimeInput"]')
      const endTimeInput = document.querySelector('input[id="endTimeInput"]')
      const durationInput = document.querySelector('input[id="durationInput"]')

      const taskOptions = {
        date: dateInput.value,
        period: {
          startingTime: startingTimeInput.value,
          endTime: endTimeInput.value,
        },
        duration: durationInput.value,
      }
      this.$store.dispatch('updateTaskOptions', taskOptions)

      // set inputs to default values
      dateInput.value = ''
      startingTimeInput.value = ''
      endTimeInput.value = ''
      durationInput.value = ''

      // close taskOptions panel
      this.$emit('closeTaskOptionsPanel')
    },

    cleanOptions() {
      const dateInput = document.querySelector('input[id="dateInput"]')
      const startingTimeInput = document.querySelector('input[id="startingTimeInput"]')
      const endTimeInput = document.querySelector('input[id="endTimeInput"]')
      const durationInput = document.querySelector('input[id="durationInput"]')

      // set inputs to default values
      dateInput.value = ''
      startingTimeInput.value = ''
      endTimeInput.value = ''
      durationInput.value = ''

      // close taskOptions panel
      this.$emit('closeTaskOptionsPanel')
    },
  }
}
</script>

<style scoped>
#taskOptions {
  width: 300px;
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,.16), 0 3px 20px rgba(0,0,0,.16);
  border-radius: 3px;
  position: fixed;
  left: 610px;
  top: 130px;
  z-index: 1;
}
#date, #period, #duration {
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
