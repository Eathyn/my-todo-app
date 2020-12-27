<template>
  <div class="menu"
     :style="{ left: this.listItemMenu.left + 'px', top: this.listItemMenu.top + 'px',
      display: this.listItemMenu.display }">
    <div class="menu-option">编辑</div>
    <div class="menu-option" >删除</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListItemMenu',
  computed: {
    ...mapGetters(['listItemMenu']),
  },
  methods: {

  }
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
