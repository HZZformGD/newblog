<template lang="html">
  <div>
    <form class="form-inline">
      <div class="form-group">
        <mu-text-field hintText="名称" icon=":fa fa-book" v-model="navList.text"/>
      </div>
      <div class="form-group">
        <mu-text-field hintText="路径" icon=":fa fa-road" v-model="navList.path"/>
      </div>
      <div class="form-group">
        <mu-flat-button class="addButton" icon=": fa fa-plus" backgroundColor="#7e57c2" label="添加" color="#FFF" @click="addNav"/>
      </div>
    </form>
    <div class="table-responsive mrgT30">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th>名称</th>
            <th>路径</th>
            <th>编辑</th>
          </tr>
        </thead>
        <tbody class="table-striped">
          <tr v-for="(item, index) in navList">
            <td>{{ item.text }}</td>
            <td>{{ item.path }}</td>
            <td>
              <mu-flat-button  backgroundColor="#ff4081" label="删除" color="#FFF" @click="removeNav(index)"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      navList () {
        return this.$store.state.navList
      }
    },
    created () {
      if (!this.navList.length) {
        this.getNavList()
      }
    },
    methods: {
      getNavList () {
        this.$store.dispatch('getNavList')
      },
      async addNav () {
        let data = {
          path: this.navList.path,
          text: this.navList.text
        }
        let sta = await this.$store.dispatch('addNav', data)
        if (sta) {
          this.getNavList()
          this.$message({
            type: 'success',
            message: '添加导航成功'
          })
        } else {
          this.$message.error('添加失败')
        }
      },
      removeNav (index) {
        this.$confirm('是否确认要删除此导航', 'warning', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let sta = await this.$store.dispatch('removeNav', index)
          if (sta) {
            this.getNavList()
            this.$message({
              type: 'success',
              message: '删除导航成功'
            })
          } else {
            this.$message.error('删除失败')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  }
</script>

<style lang="css">
.mrgT30 {
  margin-top: 30px;
}
.addButton{
  top:-8px;
}
</style>
