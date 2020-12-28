<template>
  <div>
    <ul>
      <ListItem v-for="listItem in listItems" :key="listItem.id" :list-item="listItem"/>
    </ul>
    <ListItemMenu/>
    <div @click="seen = true">添加清单</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListItem from '@/views/left/ListItem'
import ListItemMenu from '@/views/left/ListItemMenu'

export default {
  name: 'List',
  data() {
    return {
      seen: false,
    }
  },
  computed: {
    ...mapGetters(['listItems'])
  },
  methods: {
    ...mapActions(['getListItems']),
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
</style>
