# 纵向无限滚动插件

## 引入插件
```js
import infinityScroll from './src/index'
Vue.use(infinityScroll)
```

## 组件中使用
```html
<infinityScroll @onInfinity="infinityData" :end="end" :noData="noData" :stop="stop" v-if="list && list.length">
  <!-- 内容自己按业务显示 -->
  <div class="product_item" v-for="(item, index) in list" :key="index">
    <span>{{item.ShopId}}</span>
    <span> : </span>
    <span>{{item.Address}}</span>
  </div>
</infinityScroll>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 0,
      url: 'https://www.xxx.com',
      params: {},
      end: false,
      noData: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 第一次获取数据
    async getData() {
      const res = await this.fetch(this.url, {}, {query: this.params})
      if (res.Code === 1) {
        if (!res.Data || res.Data.length < 1) {
          this.noData = true
          return
        }
        if (res.TotalPage < 2) {
          this.end = true
        }
        this.list = res.Data
      }
    },
    // 滚动时获取数据
    async infinityData() {
      this.pageIndex++
      this.params.pageIndex = this.pageIndex
      const res = await this.fetch(this.url, {}, {query: this.params})
      if (res.Code === 1) {
        if (!res.Data || res.Data.length < 1) {
          this.noData = true
          return
        }
        if (res.TotalPage <= this.pageIndex) {
          this.end = true
        }
        this.list = this.list.concat(res.Data)
      }
    }
  }
}
</script>
```

