<template>
    <div v-if="!Object.is(nowId._id, 0)" class="canChat">
        <div v-show="toggle" class="button">
            <mu-icon-button icon=":fa fa-android faa-shake animated big" size=30 tooltip="尝试和博主聊天？" tooltipPosition="bottom-left" @click="change"/>
        </div>
        <div v-show="!toggle" class="window">
            <div class="card">
                <mu-card>
                <mu-icon-button icon=":fa fa-close" class="close" @click="change()"/>
                <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
                  <div id="content">
                    <div class="item" v-for="(item, index) in message" :key="item.reply_id">
                      <mu-card-text  :class="item.reply_id === nowId._id ? 'reply' : 'author'">
                      <span class="name">{{ item.name }}</span>
                      <mu-avatar  :src="item.avatar"/>
                      <span class="time">{{ item.time }}</span>
                      {{ item.reply_words }}
                      </mu-card-text>
                    </div>
                  </div>
                </vue-scrollbar>
                <div v-if="isIE" class="replyInput">
                  <el-input type="textarea" :rows="2" @keyup.native.enter="reply" ref="content" placeholder="写点东西吧···" v-model="words">
                  </el-input>
                </div>
                <div v-else-if="!isIE">
                  <mu-text-field hintText="写点东西吧···" @keyup.native.enter="reply" autofocus v-model="words" label="点击这里~" ref="content" :underlineShow="underlineShow" multiLine :rows="3" fullWidth labelFloat/>
                  </div>
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
import VueScrollbar from 'vue2-scrollbar';
import scrollbar from 'vue2-scrollbar/dist/style/vue2-scrollbar.css'

export default {
  props: ['tourist', 'nowId', 'isAdmin'],
  data () {
    return {
      toggle: true,
      words: '',
      underlineShow: false,
      message: JSON.parse(window.sessionStorage.getItem('message')) || [],
      isIE: false
    }
  },
  computed: {
    admin () {
      var mess = this.message
      let data
      for (var item of mess) {
        if (!Object.is(item.reply_id, '59321aa8a2f622dfa0121015')) {
          data = item
        }
      }
      return data
    }
  },
  created () {
    let Browser = navigator.userAgent
    if (Object.is(Browser.includes('MSIE'), true)) {
      this.isIE = true
    }
  },
  watch: {
    message (val) {
      window.sessionStorage.setItem('message', JSON.stringify(val))
    }
  },
  mounted () {
    var vm = this

    socket.on('chat message', (msg) => {
      vm.message.push(msg)
      setTimeout(() => {
        let _height = document.querySelectorAll('.item').length * 130
        this.$refs.Scrollbar.scrollToY(_height)
      },400)
    })
  },
  methods: {
    reply () {
      let data
      let time = this.moment().format('HH:mm:ss')
      if (this.isAdmin) {
        data = {
          'reply_words': this.words,
          'reply_id': this.nowId._id,
          'time': time,
          'avatar': this.isAdmin,
          'name': this.nowId.name
        }
      } else {
        let sessoin = JSON.parse(window.sessionStorage.getItem('userSession'))
        data = {
          'reply_words': this.words,
          'reply_id': sessoin._id,
          'time': time,
          'avatar': sessoin.avatar,
          'name': sessoin.nickname
        }
      }
      socket.emit('chat message', data)
      this.words = ''
    },
    change () {
      this.toggle = !this.toggle
    }
  },
  components: {
    VueScrollbar
  }
  
}
</script>

<style scoped>
  .name {
    display: block;
    color:purple;
    font-size: 12px;
  }
  .time {
    font-size: 12px;
    color: coral;
    display: block;
  }
  .reply {
      color:black;
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
  .big {
      font-size: 50px;
  }
  .my-scrollbar {
      max-height: 250px;
  }
  #content {
    min-height:250px;
  }
  .replyInput{
    padding:10px 20px;
  }
</style>
