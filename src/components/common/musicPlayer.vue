<!--<template lang="html">
  <div class="musicBox">
      <div class="boxLeft">
        <span id="play" :class="icon" @click="play"></span>
        <img id="cover" class="musicImg" :src="musicImg" alt="">
      </div>
      <audio id="audio" :src="musicSrc" ></audio>
      <div class="boxRight">
        <el-input icon="search" type="text" placeholder="搜索关键字" @change="search" @key.enter="search" v-model="key"/></el-input>
        <div class="song">
          <mu-list class="songList" >
            <mu-list-item :title="item.name" :key="item.name" @click="click(index)" v-for="(item, index) in songList" >
              <mu-avatar :src="item.img" slot="leftAvatar"/>
                <span slot="describe">
                  <span style="color: rgba(0, 0, 0, .87)">{{ item.author }}</span>
                </span>
            </mu-list-item>
          </mu-list>
        </div>
      </div>
  </div>
</template>-->

<template>
  <div>
    <audio id="audio" :src="musicSrc" ></audio>
    <mu-float-button mini="true" backgroundColor="#41b131" title="点击后可搜索歌曲哦~" id="cover" icon=":glyphicon glyphicon-music" @click="toggle();play()"/>
    <mu-drawer :open="open" width="300" :docked="docked" @close="toggle()">
      <mu-list class="scroll" @itemClick="docked ? '' : toggle()">
        <mu-sub-header>
        <mu-text-field  hintText="搜索歌名" @change="search" @key.enter="search" v-model="key"/>
        </mu-sub-header>
        <mu-list-item :title="item.name" :key="item.name" @click="click(index)" v-for="(item, index) in songList" >
          <mu-avatar :src="item.img" slot="leftAvatar"/>
            <span slot="describe">
              <span style="color: rgba(0, 0, 0, .87)">{{ item.author }}</span>
            </span>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icon: 'glyphicon glyphicon-play',
      musicSrc: null,
      musicImg: null,
      isPlay: false,
      key: null,
      open: false,
      docked: true
    }
  },
  computed: {
    songList () {
      return this.$store.state.songList
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    search () {
      let key = this.key
      setTimeout(() => {
        this.$store.dispatch('getSong', key)
      }, 2000)
    },
    play () {
      if (this.musicSrc) {
        this.isPlay = !this.isPlay
      }
      var cover = document.getElementById('cover')
      let audio = document.getElementById('audio')
      if (this.isPlay) {
        cover.style.animation = 'rotate 10s infinite linear'
        audio.play()
      } else {
        cover.style.animation = false
        audio.pause()
      }
    },
    click (index) {
      this.isPlay = !this.isPlay
      let audio = document.getElementById('audio')
      var cover = document.getElementById('cover')
      this.musicSrc = this.songList[index].src
      this.musicImg = this.songList[index].img
      audio.load()
      if (this.isPlay) {
        cover.style.animation = 'rotate 10s infinite linear'
        audio.load()
        setTimeout(() => {
          audio.play()
        }, 150)
      } else {
        cover.style.animation = false
        audio.pause()
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .musicBox {
    overflow:hidden;
    width:320px;
    height:80px;
  }
  .playSong {
    background:rgba(255,255,225,0);
    margin:45px 25px;
    border-radius:30px;
    border:1px solid #fff;
    height:30px;
    width:30px;
    display:inline-block;
  }
  .boxLeft {
    float:left;
    height:100%;
    width:80px;
    display:inline-block;
  }
  .boxRight {
    z-index: 80;
    position:relative;
    background:rgba(255,255,255,0.7);
    width:220px;
    height:100%;
    float:left;
  }
  .song {
    position:absolute;
    top:32px;
    height:60px;
    width:220px;
  }
  .songList{
    height:60px;
  }
  .songList li {
    border-bottom:1px solid #515151;
    text-indent:10px;
    line-height:24px;
    height:24px;
  }
  .songList li:hover {
    cursor:pointer;
    color:lightskyblue;
  }
  .musicImg{
    height:80px;
    width:80px;
    border-radius:80px;
  }
  .el-input{
    display:inline-block;
    position:absolute;
    top:-25px;
  }
  #play{
    z-index:200;
    color:rgba(255,255,255,0.7);
    background:rgba(255,255,255,0);
    position:absolute;
    border:none;
    top:27px;
    left:42px;
    font-size:25px;
    transform:rotateZ(0deg);
  }
  #play:hover{
    cursor:pointer;
  }
  @keyframes rotate{
    0% {transform:rotateZ(0deg)}
    50% {transform:rotateZ(180deg)}
    100% {transform:rotateZ(360deg)}
  }
  @-webkit-keyframes rotate{
    0% {transform:rotateZ(0deg)}
    50% {transform:rotateZ(180deg)}
    100% {transform:rotateZ(360deg)}
  }
  #cover{
    transform:rotateZ(0deg);
  }
  .scroll{
    overflow-y:hidden;
  }
</style>
