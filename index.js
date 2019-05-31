import InfinityScroll from './src/main'

InfinityScroll.install = function(Vue) {
  Vue.component(InfinityScroll.name, InfinityScroll)
}

export default InfinityScroll