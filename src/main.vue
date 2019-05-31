<template>
  <div class="infinity_scroll_container" ref="infinityScrollContainer">
    <div class="infinity_scroll_wrap" ref="infinityScrollInnerContainer">
      <slot></slot>
      <div>
        <span v-if="noData">暂时没有数据</span>
        <span v-if="end">已经到底了</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infinityScroll',
  props: {
    end: {  // 数据全部请求完 必传
      type: Boolean,
      default: false
    },
    noData: { // 没有数据 必传
      type: Boolean,
      default: false
    },
    stop: { // 接口截流 必传
      type: Boolean,
      default: true
    },
    distance: { // 距离底部距离
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      scrollEl: '',
      innerEl: '',
      containerHeight: 0
    }
  },
  mounted() {
    this.init()
    this.scrollEl.addEventListener('scroll', this.throlteFunc(this.scrollFunc))
  },
  methods: {
    init() {
      this.scrollEl = this.$refs.infinityScrollContainer
      this.innerEl = this.$refs.infinityScrollInnerContainer
      this.containerHeight = this.scrollEl.clientHeight
    },
    scrollFunc() {
      const scrollTop = this.scrollEl.scrollTop
      const allHeight = this.innerEl.clientHeight
      if (allHeight - scrollTop - this.containerHeight <= this.distance) {
        if (this.noData || this.end) return
        this.$emit('onInfinity')
      }
    },
    throlteFunc(fn, time = 50) {
      let nowTime = null
      let lastTime = null
      return function(...args) {
        nowTime = +new Date()
        if (!lastTime || nowTime - lastTime >= time) {
          fn.call(this, ...args)
          lastTime = nowTime
        }
      }
    }
  }
}
</script>

<style>
  .infinity_scroll_container{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .infinity_scroll_wrap{
    width: 100%;
  }
</style>
