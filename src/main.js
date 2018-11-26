// main.js是项目入口文件，所有全局的东西都写到main.js里

import Vue from 'vue'

// 根组件
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入懒加载插件lazyload
import VueLazyload from 'vue-lazyload';

// 导入样式（在App.vue里也可以导入）
// import './assets/statics/site/css/style.css';

// 路由相关
import VueRouter from 'vue-router';
// 导入index组件
import index from './components/index.vue';

// 模块化开发要use一下
Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(VueLazyload);
Vue.use(VueLazyload, {
  // 预加载高度比
  // preLoad: 1.3,
  // 加载图片失败
  error: 'dist/error.png',
  // 加载图片成功
  loading: './assets/statics/img/lazyloadPic.png',
  // 尝试次数
  // attempt: 1
})

// 写路由规则
const routes = [
  {
    // 根目录也对应到index组件即可
    path: '/',
    // component: index

    // 或重定向到首页
    redirect: "/index"
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
  // 用代码的方式告诉vue要渲染什么东西（把App.vue渲染出来）
  render: h => h(App),
  // 挂载到Vue实例上
  router
}).$mount('#app')
