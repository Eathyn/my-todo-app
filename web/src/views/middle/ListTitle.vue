<template>
  <h3 id="listTitle">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-category"></use>
    </svg>
    {{ selectedList === null ? '' : selectedList.name }}
  </h3>
</template>

<script>
import listIcon from '@/assets/icons/list'
import { mapGetters } from 'vuex'

export default {
  name: 'ListTitle',
  computed: {
    ...mapGetters(['listItems', 'selected', 'selectedList']),
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
#listTitle {
  margin: 0;
  padding: 24px 0;
  font-size: 22px;
}
</style>
