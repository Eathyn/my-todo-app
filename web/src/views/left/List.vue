<template>
  <div>
    <ul>
      <ListItem v-for="listItem in listItems" :key="listItem.id" :list-item="listItem"/>
    </ul>
    <ListItemMenu/>
    <div id="listAdd" @click="showListPopup">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add"></use>
      </svg>
      添加清单
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListItem from '@/views/left/ListItem'
import ListItemMenu from '@/views/left/ListItemMenu'
import listAddIcon from '@/assets/icons/listAdd'

export default {
  name: 'List',
  computed: {
    ...mapGetters(['listItems', 'listItem'])
  },
  methods: {
    ...mapActions(['getListItems', 'updateSeen', 'updateListItem']),
    showListPopup() {
      this.$store.dispatch('updateSeen', true)
      this.$store.dispatch('updateListItem', null)
    },
  },
  created() {
    this.$store.dispatch('getListItems')
  },
  components: {
    ListItem,
    ListItemMenu,
  },
}
</script>

<style scoped>
div:hover {
  cursor: pointer;
}

ul {
  padding: 12px;
  margin: 0;
}

#listAdd {
  height: 36px;
  padding: 0 12px;
  margin: 0 12px;
  color: #fefefe;
  line-height: 2.1;
  border-radius: 4px;
}
#listAdd:hover {
  background-color: #6275bf;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.35em;
  fill: currentColor;
  overflow: hidden;
}
</style>
