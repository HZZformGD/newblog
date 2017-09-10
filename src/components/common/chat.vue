<template>
    <div v-if="!Object.is(nowId, 0)" class="canChat">
        <div v-show="toggle" class="button">
            <mu-icon-button icon=":fa fa-android faa-shake animated big" size=30 tooltip="尝试和博主聊天？" tooltipPosition="bottom-left" @click="change"/>
        </div>
        <div v-show="!toggle" class="window">
            <div class="card">
                <mu-card>
                <mu-icon-button icon=":fa fa-close" class="close" @click="change()"/>
                <mu-card-header >
                  <mu-avatar :src="tourist ? tourist : message[0].avatar"  slot="avatar"/>
                </mu-card-header>
                <div class="content">
                  <div class="item" v-for="(item, index) in message">
                    <mu-card-text   :class="item.reply_id === nowId ? 'reply' : 'author'">
                    <span class="time">{{ item.time }}</span>
                    {{ item.reply_words }}
                    </mu-card-text>
                  </div>
                </div>
                <mu-text-field hintText="写点东西吧···" v-model="words" label="点击这里~" ref="content" class="replyInput" :underlineShow="underlineShow" multiLine :rows="3" fullWidth labelFloat/>
                <mu-card-actions>
                  <mu-flat-button icon=":fa fa-reply" label="回复" @click="reply()"/>
                </mu-card-actions>
                <mu-card-actions>
                </mu-card-actions>
                </mu-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['tourist', 'nowId', 'isAdmin'],
  data () {
    return {
      toggle: true,
      words: '',
      underlineShow: false,
      message: JSON.parse(window.sessionStorage.getItem('message')) || []
    }
  },
  computed: {
  },
  watch: {
    message (val) {
        window.sessionStorage.setItem('message', JSON.stringify(val))
    }
  },
  mounted () {
    var vm = this
    socket.on('chat message', function(msg){
      vm.message.push(msg)
    })
  },
  methods: {
    reply () {
      let data
      let time = this.moment().format('HH:mm:ss')
      if (this.isAdmin) {
        data = {
          'reply_words': this.words,
          'reply_id': this.nowId,
          'time': time,
          'avatar': this.isAdmin
        }
      } else {
        let sessoin = JSON.parse(window.sessionStorage.getItem('userSession'))
        data = {
          'reply_words': this.words,
          'reply_id': sessoin._id,
          'time': time,
          'avatar': sessoin.avatar
        }
      }
      socket.emit('chat message', data)
      this.words = ''
    },
    change () {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style scoped>
  .time {
    font-size: 12px;
    color:coral;
  }
  .reply {
      color:#e3dd33;
      text-align: right;
  }
  .close {
    position: absolute;
    right: 0;
    z-index: 100;
  }
  .window {
   background-color: #ffffff;
  }
  .button {
      float: right;
      color: #84c57c;
  }
  .big{
      font-size: 50px;
  }
  .content{
      height: 400px;
      overflow-y: auto;
  }
</style>
