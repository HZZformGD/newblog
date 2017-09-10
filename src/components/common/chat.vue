<template>
    <div v-if="!Object.is(islog._id, 0)" class="canChat">
        <div v-if="toggle" class="button">
            <mu-icon-button icon=":fa fa-android faa-shake animated big" size=30 tooltip="尝试和博主聊天？" tooltipPosition="bottom-left" @click="change"/>
        </div>
        <div v-if="!toggle" class="window">
            <div class="card">
                <mu-card>
                <mu-icon-button icon=":fa fa-close" class="close" @click="change()"/>
                <mu-card-header >
                  <mu-avatar  slot="avatar"/>
                </mu-card-header>
                <div class="content">
                    <mu-card-text class="author">
                    <span class="time">今天早上10:00:</span>
                    <span>你好啊啊啊啊</span>
                    </mu-card-text>
                    <mu-card-text class="reply">
                    <span class="time">今天早上10:00:</span>
                    <span>你好啊啊啊啊</span>
                    </mu-card-text>
                    <mu-card-text class="reply">
                    <span class="time">今天早上10:00:</span>
                    <span>你好啊啊啊啊</span>
                    </mu-card-text>
                    <mu-card-text class="reply">
                    <span class="time">今天早上10:00:</span>
                    <span>你好啊啊啊啊</span>
                    </mu-card-text>
                    <mu-card-text class="reply">
                    <span class="time">今天早上10:00:</span>
                    <span>你好啊啊啊啊</span>
                    </mu-card-text>
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
  data () {
    return {
      toggle: true,
      words: '',
      underlineShow: false,
      msgList: []
    }
  },
  computed : {
    islog () {
        if (window.sessionStorage.getItem('userSession')) {
            return JSON.parse(window.sessionStorage.getItem('userSession'))
        } else {
            let data = {
                '_id': 0
            }
            return data
        }
    }
  },
  mounted () {
    socket.on('chat message', function(msg){
      const self=this
      console.log(self.msgList)
      console.log(msg)
    })
  },
  methods: {
    reply () {
      let sessoin = JSON.parse(window.sessionStorage.getItem('userSession'))
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      let data = {
        'reply_words': this.words,
        'reply_id': sessoin._id,
        'time': time
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
