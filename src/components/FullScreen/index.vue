<template>
  <div style="margin: 0 8px">
    <svg-icon @click="onFull" className="fullscreen" iconClass='fullscreen'></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    name:'FullScreen',
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    onFull(){
        if(screenfull.isEnabled){
            screenfull.toggle()
        }
    }
  }
}
</script>

<style scoped>
.fullscreen{
    color: #fff;
}
</style>
