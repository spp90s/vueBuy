// main.js是项目入口文件，所有全局的东西都写到main.js里

import Vue from 'vue'

// 根组件
import App from './App.vue'

// 插件相关
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入懒加载插件lazyload
import VueLazyload from 'vue-lazyload';
// 导入axios以全局使用
import axios from "axios";  
// 把axios放到原型中，这样所有的Vue实例（Vue组件也是Vue实例）都可以使用
Vue.prototype.$axios = axios;
// 导入moemnt.js
import moment from "moment";

// 1. 在原型中设置基础地址（一般来说，一个项目不会访问多个服务器的接口，可以抽取基础地址）
// Vue.prototype.$baseUrl = "http://111.230.232.110:8899/";
// 2. 直接使用axios来设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";

// 导入样式（在App.vue里也可以导入）
// import './assets/statics/site/css/style.css';

// 路由相关
import VueRouter from 'vue-router';
// 导入index组件
import index from './components/index.vue';
// 导入detail组件
import detail from './components/detail.vue';

// 模块化开发要use一下
Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(VueLazyload);
Vue.use(VueLazyload, {

  // 预加载高度比
  // preLoad: 1.3,

  // 加载图片失败
  // error: 'dist/error.png',

  // 加载图片成功
  // loading: './assets/statics/img/lazyloadPic.png',
  // 上面这样写是不会加载成功的，Vue模块化开发中，图片也是资源，需要引入
  error: require('./assets/statics/img/error.png'),
  loading: require('./assets/statics/img/lazyloadPic.png')
  // 尝试次数
  // attempt: 1
})

// 写路由规则
const routes = [
  {
    // 根目录是一个/
    path: '/',
    // 也对应到index组件即可
    // component: index
    // 或重定向到首页
    redirect: "/index"
  },
  {
    path: '/index',
    component: index
  },
  {
    // 动态路径参数，以冒号开头
    // 当匹配到一个路由时，参数值会被设置到 this.$route.params 这个对象里，可以在每个组件内使用
    path: '/detail/:xxoo',
    component: detail
  }
]

// 实例化路由对象
const router = new VueRouter({
    routes
}); 

// Vue.config.productionTip = false

// 在创建 Vue 实例之前全局定义过滤器（在所有组件中都可以访问到）
Vue.filter('beautifyTime', function (value) {
  
  return moment(value).format("YYYY年MM月DD日");
})


new Vue({
  // 用代码的方式告诉vue要渲染什么东西（把App.vue渲染出来）
  render: h => h(App),
  // 把路由对象挂载到Vue实例上
  router
}).$mount('#app')
