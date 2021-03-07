<template>
  <div class="popup-cover" v-if="this.seen">
    <div class="popup">
      <div class="popup-header">
        <h3>{{ listItem ? '编辑' : '新建' }}清单</h3>
        <div class="close" @click="closeListPopup">&times;</div>
      </div>
      <div class="popup-body">
        <label>
          <input v-if="listItem" type="text" name="name" v-model="model.name" class="list-content">
          <input v-else type="text" name="name" placeholder="名称" v-model="model.name" class="list-content">
        </label>
      </div>
      <div class="popup-footer">
        <button @click="closeListPopup">关闭</button>
        <button v-if="listItem" @click="modifyList">修改</button>
        <button v-else @click="addList">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListCreate',
  data() {
    return {
      model: {
        name: '',
      },
    }
  },
  computed: {
    ...mapGetters(['seen', 'listItem']),
  },
  methods: {
    ...mapActions(['addListItem', 'modifyListItem']),

    async addList() {
      await this.$store.dispatch('addListItem', this.model)
      this.model.name = ''
      this.closeListPopup()
    },
    async modifyList() {
      const listItem = {
        id: this.listItem.id,
        name: this.model.name,
      }
      await this.$store.dispatch('modifyListItem', listItem)
      this.model.name = ''
      this.closeListPopup()
    },
    closeListPopup() {
      this.$store.dispatch('updateSeen', false)
    },
  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.popup-cover {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup {
  background-color: #fefefe;
  box-shadow: 0 2px 11px 0 rgba(0,0,0,.16);
  margin: 15% auto;
  border-radius: 4px;
  width: 508px;
}

.popup-header {
  height: 58px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.popup-body {
  padding: 16px;
}
.list-content {
  width: 450px;
  height: 36px;
  padding-left: 12px;
  outline: 0;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.14);
}

.popup-footer {
  display: flex;
  padding: 16px 24px;
  justify-content: flex-end;
}
button {
  width: 120px;
  height: 32px;
  font-size: 15px;
  margin: 0 0 0 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  outline: none;
}
button:nth-of-type(1) {
  background-color: rgba(46,73,136,.08);
}
button:nth-of-type(2) {
  background-color: #b1bdeb;
  color: #fefefe;
}
button:nth-of-type(1):hover {
  background-color: rgba(46,73,136,.12);
}
button:nth-of-type(2):hover {
  background-color: #5670d3;
}
</style>
