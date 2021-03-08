<template>
  <div class="menu" :style="styleObject" v-show="this.listItemMenu.seen">
    <div class="menu-option" @click="showListPopup">编辑</div>
    <div class="menu-option" @click="deleteList">删除</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListItemMenu',
  computed: {
    ...mapGetters(['listItemMenu', 'listItem', 'taskItems']),
    styleObject: function () {
      return {
        left: `${this.listItemMenu.left}px`,
        top: `${this.listItemMenu.top}px`,
        display: 'block',
      }
    },
  },
  methods: {
    ...mapActions(['deleteListItem', 'deleteTaskItems']),
    closeMenu() {
      const menu = {
        left: 0,
        top: 0,
        display: 'none',
      }
      this.$store.dispatch('closeMenu', menu)
    },

    showListPopup() {
      this.$store.dispatch('updateSeen', true)
      this.closeMenu()
    },
    deleteList() {
      this.$store.dispatch('deleteListItem', this.listItem)
      this.$store.dispatch('deleteTaskItems')
      this.closeMenu()
    },
  },
  created() {
    window.addEventListener('click', this.closeMenu)
  },
}
</script>

<style scoped>
.menu {
  position: fixed;
  display: none;
  left: 0;
  top: 0;
  width: 110px;
  border: 1px solid #fefefe;
  background-color: #fefefe;
  border-radius: 3px;
  cursor: pointer;
}
.menu-option {
  font-size: 14px;
  height: 36px;
  text-align: left;
  line-height: 2.6;
  padding-left: 16px;
}
.menu-option:hover {
  background-color: #2E498814;
}
</style>
