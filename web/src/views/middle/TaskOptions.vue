<template>
  <div id="taskOptions">
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
      <button>清除</button>
      <button>确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskOptions',
  data() {
    return {
      date: this.dateOfToday()
    }
  },
  methods: {
    dateOfToday() {
      const date = new Date()
      return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
    },
  }
}
</script>

<style scoped>
#taskOptions {
  width: 300px;
  padding: 20px 30px;
  box-shadow: 0 2px 6px rgba(0,0,0,.16), 0 3px 20px rgba(0,0,0,.16);
  border-radius: 3px;
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
