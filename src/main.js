// main.js是项目入口，所有全局的东西都写到main.js里

import Vue from 'vue'
import App from './App.vue'

// 导入样式（在App.vue里也可以导入）
// import './assets/statics/site/css/style.css';

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
