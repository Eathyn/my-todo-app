<template>
  <div class="taskMenu" :style="{ left: this.taskMenu.left +  'px',
    top: this.taskMenu.top + 'px', display: this.taskMenu.display }">
    <div class="taskMenuOption" @click="openTaskEditPanel">编辑</div>
    <div class="taskMenuOption" @click="deleteTask">删除</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TaskMenu',
  computed: {
    ...mapGetters(['taskMenu', 'selected', 'rightClickTaskId', 'taskEditToggle']),
  },
  methods: {
    ...mapActions(['deleteTask', 'getEditedItem']),

    closeTaskMenu() {
      const menu = {
        left: 0,
        top: 0,
        display: 'none',
      }
      this.$store.dispatch('updateTaskMenu', menu)
    },
    openTaskEditPanel() {
      // close task menu
      this.closeTaskMenu()

      // get task name and options then update taskMenu state
      this.$store.dispatch('getEditedItem', this.rightClickTaskId)

      // open task edit panel
      this.$store.dispatch('updateTaskEditToggle', true)
    },
    deleteTask() {
      const payload = {
        listId: this.selected,
        taskId: this.rightClickTaskId,
      }
      this.$store.dispatch('deleteTask', payload)
    },
  },
  created() {
    window.addEventListener('click', this.closeTaskMenu)
  },
}
</script>

<style scoped>
.taskMenu {
  position: fixed;
  display: none;
  left: 0;
  top: 0;
  width: 110px;
  border: 1px solid rgba(0,0,0,0.08);
  background-color: #fefefe;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,.16), 0 3px 20px rgba(0,0,0,.16);
}
.taskMenuOption {
  font-size: 14px;
  height: 36px;
  text-align: left;
  line-height: 2.6;
  padding-left: 16px;
}
.taskMenuOption:hover {
  background-color: #2E498814;
}
</style>
