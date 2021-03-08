<template>
  <div class="listMenu" :style="styleObject" v-show="listMenuSeen">
    <div class="listMenuOption" @click="showListPopup">编辑</div>
    <div class="listMenuOption" @click="deleteList">删除</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListMenu',
  computed: {
    ...mapGetters(['listMenuInfo', 'listItem', 'taskItems']),

    styleObject: function () {
      return {
        left: `${this.listMenuInfo.left}px`,
        top: `${this.listMenuInfo.top}px`,
      }
    },
    listMenuSeen: function () {
      return this.listMenuInfo.seen
    },
  },
  methods: {
    ...mapActions(['deleteListItem', 'deleteTaskItems']),

    showListPopup() {
      this.$store.dispatch('updateSeen', true)
      this.closeListMenu()
    },
    deleteList() {
      this.$store.dispatch('deleteListItem', this.listItem)
      this.$store.dispatch('deleteTaskItems')
      this.closeListMenu()
    },
    closeListMenu() {
      this.$store.dispatch('closeMenu', {
        left: 0,
        top: 0,
        seen: false,
      })
    },
  },
  created() {
    window.addEventListener('click', () => {
      if (this.listMenuSeen) {
        this.closeListMenu()
      }
    })
  },
}
</script>

<style scoped>
.listMenu {
  position: fixed;
  display: block;
  width: 110px;
  border: 1px solid #c6c5c5;
  background-color: #fefefe;
  border-radius: 3px;
  cursor: pointer;
}
.listMenuOption {
  font-size: 14px;
  height: 36px;
  text-align: left;
  line-height: 2.6;
  padding-left: 16px;
}
.listMenuOption:hover {
  background-color: #2E498814;
}
</style>
