import InfinityScroll from './main.vue'

InfinityScroll.install = function(Vue) {
  Vue.component(InfinityScroll.name, InfinityScroll)
}

export default InfinityScroll