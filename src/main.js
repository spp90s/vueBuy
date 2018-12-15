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
// 引入iView
import iView from "iView";
import 'iview/dist/styles/iview.css';
// 导入vue-product-zoomer
import ProductZoomer from "vue-product-zoomer";


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
// 导入shopcart组件
import shopcart from './components/shopcart.vue';


// 模块化开发要use一下
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(ProductZoomer);
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
        // 根目录是/ 但也要对应到index组件
        path: '/',

        // component: index
        // 或重定向到首页
        redirect: "/index"
    },
    
    // 首页
    {
        path: '/index',
        component: index
    },

    // 详情页
    {
        // 动态路径参数，以冒号开头
        // 当匹配到一个路由时，参数值会被设置到 this.$route.params 这个对象里，可以在每个组件内使用
        path: '/detail/:xxoo',
        component: detail
    },

    // 购物车
    {
        path: '/shopcart',
        component: shopcart
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
// 再定义一个全局过滤器让商品评论的时间精确到时分秒（需要传入自定义的格式化字符串）
Vue.filter('accurateTime', function (value, formatStr) {
    return moment(value).format(formatStr);
})

// 导入Vuex（数据共享）
import Vuex from 'vuex';
Vue.use(Vuex);

// 实例化数据仓库
const store = new Vuex.Store({
    // 状态对象
    state: {
        // 数据设置到state的属性中
        // count: 0
        // 仓库中购物车数据的存储格式为 {id: 购买数量}
        shopCartData: JSON.parse(localStorage.getItem('cartData')) || {}
    },
    // 状态变更
    mutations: {
        // increment (state) {
        //   state.count++
        // }
        // 方法名根据需求自定义，形参是仓库的状态对象state，找到其属性修改数据
        // 加入购物车的数据（除了state外，还要额外的接收id与购买数量）
        // addCart (state, id, buyCount) {
        // 但是参数的格式只支持1个，如果要传递多个数据，传入1个对象（含2个属性，即id与buyCount）
        addCart(state, opt) {
            console.log(state);
            console.log(opt.id);
            console.log(opt.buyCount);

            // 添加数据到shopCartData中有两种情况
            // 1. 购物车已经加过该id的商品 --> 原有id上累加
            // 2. 该id的商品未加入过购物车 --> 重新增加一个键值对（js对象允许动态添加属性）
            // 这就判断shopCartData中是否有这个id
            if (state.shopCartData[opt.id] == undefined) {
                // 没有就动态增加一个键值对，按已经约定好的存储格式{id: buyCount}，与传递对象时不同{id: xx, buyCount: yy}
                // state.shopCartData[opt.id] = opt.buyCount;
                // 上面这样动态添加属性，Vue是观察不到数据的改变的，需要Vue.set告诉Vue该字段是后来新增的，帮我们增加get、set
                Vue.set(state.shopCartData, opt.id, opt.buyCount);

            } else {
                // 有，就累加
                state.shopCartData[opt.id] += opt.buyCount;
            }
        },

        // 根据参数修改购物车商品数据
        updateCart(state, opt) {
            // 传入的参数格式{id:'', newCount:''}
            state.shopCartData[opt.id] = opt.newCount;  //新数据直接覆盖旧数据
        },

        // 根据id删除数据
        delById(state, id) {
            
            // 删除js对象中的一个属性
            // delete state.shopCartData[id];
            // 上面这样动态删除属性，Vue是观察不到数据的改变的，需要Vue.delete告诉Vue该字段被删除了，这样才能同步刷新
            Vue.delete(state.shopCartData, id);
        }
    },

    // Vuex的getters 类似于 store 的computed
    getters: {
        goodsTotalCount(state) {
            //进入详情页后才触发了一次，后面数据的更改并没有触发该方法的重复调用
            console.log('getters触发了');
            /*
            why?
            我们知道Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新
            这也意味着 Vuex 中的 mutation 需遵守 Vue 的响应规则
            1. 最好提前在你的 store 中初始化好所有所需属性
            2. 当需要在对象上添加新属性时，为了让Vue可以观察到这个数据的改变，你应该使用 Vue.set(state中的对象, '属新性名', 属性值)
            3. 当需要以新对象替换老对象时，你应该使用 state.obj = { ...state.obj, newProp: 123 }
            */

            // 通过state就可以访问到仓库的数据
            // 先遍历再累加
            let totalCount = 0;
            for (const id in state.shopCartData) {

                totalCount += state.shopCartData[id];
            }
            return totalCount;
        }
    }
})

new Vue({
    // 用代码的方式告诉vue要渲染什么东西（把App.vue渲染出来）
    render: h => h(App),
    // 把路由对象挂载到Vue实例上
    router,
    // 把store挂载到Vue实例上，方便所有子组件访问                 
    store
}).$mount('#app')

// 浏览器关闭事件
window.onbeforeunload = function () {
    //保存
    window.localStorage.setItem('cartData', JSON.stringify(store.state.shopCartData));
}