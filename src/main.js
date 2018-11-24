// main.js是项目入口，所有全局的东西都写到main.js里

import Vue from 'vue'
import App from './App.vue'

// 导入样式（在App.vue里也可以导入）
// import './assets/statics/site/css/style.css';

// 路由相关
import VueRouter from 'vue-router';
// 导入index组件
import index from './components/index.vue';

// use一下
Vue.use(VueRouter);

// 写路由规则
const routes = [
  {
    // 根目录也对应到index组件即可（还可以重定向）
    path: '/',
    component: index
  },
  {
    path: '/index',
    component: index
  }
]

// 实例化路由对象
const router = new VueRouter({
    routes
});

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router
}).$mount('#app')
