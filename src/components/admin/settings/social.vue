<template lang="html">
  <div>
    <form class="form-inline">
      <div class="form-group">
        <mu-text-field hintText="icon路径" icon=":fa fa-road" v-model="socialList.src"/>
      </div>
      <div class="form-group">
        <mu-text-field hintText="icon路径" icon=":fa fa-facebook" v-model="socialList.path"/>
      </div>
      <div class="form-group">
        <mu-flat-button class="addButton" icon=": fa fa-plus" backgroundColor="#7e57c2" label="添加" color="#FFF" @click="addSocial"/>
      </div>
    </form>
    <div class="table-responsive mrgT30">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th>icon路径</th>
            <th>社交链接</th>
            <th>添加</th>
          </tr>
        </thead>
        <tbody class="table-striped">
          <tr v-for="(item, index) in socialList">
            <td>{{ item.src }}</td>
            <td>{{ item.path }}</td>
            <td>
              <mu-flat-button hintText="删除" icon=": fa fa-drop" backgroundColor="#ff4081" label="删除" color="#FFF" @click="removeSocial(index)"/>
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
    return {}
  },
  computed: {
    socialList () {
      return this.$store.state.socialList
    }
  },
  created () {
    this.getSocialList()
  },
  methods: {
    getSocialList () {
      this.$store.dispatch('getSocialList')
    },
    removeSocial (index) {
      this.$confirm('真的要删除此社交方式吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let sta = await this.$store.dispatch('removeSocial', index)
        if (sta) {
          this.getSocialList()
          this.$message({
            type: 'success',
            message: '删除成功'
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
    },
    async addSocial () {
      let data = {
        src: this.socialList.src,
        path: this.socialList.path
      }
      let sta = await this.$store.dispatch('addSocial', data)
      if (sta) {
        this.getSocialList()
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      } else {
        this.$message.error('添加失败了，请重新')
      }
    }
  }
}
</script>

<style lang="css">
.mrgT30 {
  margin-top: 30px;
}
</style>

