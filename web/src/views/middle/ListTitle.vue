<template>
    <h3 v-if="!clickedList"></h3>

    <h3 v-else class="listTitle">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-category"></use>
      </svg>
      <span class="content">{{ clickedList.name }}</span>
    </h3>
</template>

<script>
import listIcon from '../../assets/icons/list'
import { mapGetters } from 'vuex'

export default {
  name: 'ListTitle',
  computed: {
    ...mapGetters(['clickedList']),
  },
}
</script>

<style scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.35em;
  fill: currentColor;
  overflow: hidden;
}

.listTitle {
  margin: 0;
  padding: 24px 0;
  font-size: 22px;
}

.content {
  padding-left: 15px;
}
</style>
