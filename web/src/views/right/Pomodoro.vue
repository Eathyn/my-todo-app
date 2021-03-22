<template>
  <div id="pomodoro">
    <div v-if="taskCountdown">正在进行 : {{ taskCountdown.name }}</div>
    <div v-else>开始专注
      <span>
        <svg class="icon" aria-hidden="true" @click="showTaskDurationPopup">
          <use xlink:href="#icon-set"></use>
        </svg>
      </span>
    </div>
    <div class="time">
      {{ pomodoro.minute.toString().padStart(2, '0') }} :
      {{ pomodoro.second.toString().padStart(2, '0') }}
    </div>
    <div>{{ customClickedTask }}</div>

    <div class="countdownPopup">
      <div class="header">
        <h3>修改专注时长</h3>
        <div>&times;</div>
      </div>
      <div class="body">
        <label for="duration"></label><input type="number" id="duration" v-model="model.modifiedDuration" min="0" step="5">
      </div>
      <div class="footer">

      </div>
    </div>
  </div>
</template>

<script>
import http from '../../http'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pomodoro',
  data() {
    return {
      model: {
        modifiedDuration: ''
      }
    }
  },
  computed: {
    ...mapGetters(['taskCountdown', 'pomodoro', 'customClickedTask'])
  },
  methods: {
    ...mapActions(['updatePomodoro']),

    showTaskDurationPopup() {

    },
    async modifyTaskDuration() {
      const res = await http
    },
  },
  created() {
    this.$store.dispatch('updatePomodoro')
  },
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#pomodoro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  text-align: center;
  border-bottom: 1px solid rgba(73, 74, 77, 0.22);
}

#pomodoro > :nth-child(1) {
  font-size: 20px;
  padding-bottom: 5px;
  color: #5d5c5cd9;

}
#pomodoro > :nth-child(2) {
  font-size: 16px;
  color: #5d5c5cd9;
}

.time {
  font-size: 20px;
}
</style>
