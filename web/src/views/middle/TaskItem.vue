<template>
  <li @contextmenu.prevent="showTaskMenu">
    {{ taskItem.name }}
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-play"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-suspended"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-stop"></use>
    </svg>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import taskPlay from '../../assets/icons/taskPlay'
import taskEnd from '../../assets/icons/taskEnd'
import taskSuspended from '../../assets/icons/taskSuspended'

export default {
  name: 'TaskItem',
  props: ['taskItem'],
  computed: {
    ...mapGetters(['rightClickTaskId', 'selectedTaskId'])
  },
  methods: {
    ...mapActions(['updateTaskMenu', 'updateRightClickTaskId']),

    showTaskMenu(event) {
      const taskMenu = {
        left: event.pageX,
        top: event.pageY,
        display: 'block',
      }
      this.$store.dispatch('updateTaskMenu', taskMenu)
      this.$store.dispatch('updateRightClickTaskId', this.taskItem.id)
    },
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
  width: 600px;
  height: 35px;
  line-height: 2;
  padding: 0 12px;
  margin: 0 0 5px 0;
}
li:hover {
  background-color: rgba(66,83,136,0.06);
  border-radius: 4px;
}
li:focus {
  background-color: #eef0fb;
  outline: none;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.4em;
  fill: currentColor;
  overflow: hidden;
}
</style>
