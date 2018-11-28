<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <!-- 顶部区域（左侧分类列表、轮播图、热卖） -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 循环生成分类区域 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(subItem, subIndex) in item.subcates" :key="subItem.id">{{subItem.title}}&nbsp;</span>
                                            <!-- <span>摄影摄像&nbsp;</span> -->
                                            <!-- <span>存储设备&nbsp;</span> -->
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                    <a href="/goods/40.html">{{item.title}}</a>
                                                </dt>
                                            <dd>
                                                <a v-for="(subItem, sinIndex) in item.subcates" :key="subItem.id" href="/goods/43.html">{{subItem.title}}</a>
                                                <!-- <a href="/goods/43.html">摄影摄像</a> -->
                                                <!-- <a href="/goods/43.html">存储设备</a> -->
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片 轮播图 -->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <!-- element-ui的走马灯组件 -->
                                <el-carousel height="341px">
                                    <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                        <!-- <h3>{{ item }}</h3> -->
                                        <a href="#">
                                            <img style="display: block; height: 100%" :src="item.img_url" alt="">
                                        </a>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片 热卖 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- 请求回来的数据中日期格式需要vue过滤器处理一下（双花括号插值），再赋值给组件 -->
                                    <span>{{item.add_time | beautifyTime}}</span>
                                    <!-- 过滤器是 JavaScript 函数，因此可以接收参数 -->
                                    <!-- <span>{{item.add_time | beautifyTime('🐮', '🚀', '🛸')}}</span> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 循环生成底部区域（手机数码、电脑办公、影音娱乐、服装类） -->
        <div class="section" v-for="(item, index) in orderList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="(level2Item, level2Index) in item.level2catelist" :key="level2Item.subcateid" href="/goods/43.html">{{level2Item.subcatetitle}}</a>
                    <!-- <a href="/goods/43.html">摄影摄像</a> -->
                    <a href="/goods/40.html">更多<i>+</i></a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(datasItem, dataIndex) in item.datas" :key="datasItem.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                            <!-- 因为是动态路由匹配，需要v-bind:to -->
                            <router-link :to="'/detail/' + datasItem.artID">
                                <div class="img-box">
                                    <!-- <img :src="datasItem.img_url"> -->
                                    <!-- 使用懒加载的指令 -->
                                    <img v-lazy="datasItem.img_url" >
                                </div>
                                <div class="info">
                                    <h3>{{datasItem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{datasItem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{datasItem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{datasItem.market_price}}</s>
                                            </span>
                                    </p>
                                </div>
                            </router-link>
                            <!-- </a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 在哪用，就在哪儿导入axios
    // import axios from "axios";
    // 导入axios抽取到全局 迁移到main.js中，为了让全局使用

    // 发请求，获取数据
    // axios.get('http://111.230.232.110:8899/site/goods/gettopdata/goods').then(response => {
    //     console.log(response);
    //     // 设置给组件中的data中的数据
    //     console.log(this);  //undefined 说明写在这里的axios的回调函数里拿不到当前这个index组件
    // })

    // 导入moment.js
    // import moment from "moment"; //迁移到main.js中
    
    // 类似于module.exports
    export default {
        name: "index",
        data: function() {
            return {
                // message: 'haha'
                // 分类列表
                catelist: [],
                // 轮播图
                sliderlist: [],
                // 热卖列表
                toplist: [],

                // 底部分类列表
                orderList: []
            };
        },
        // 在一个组件的选项中定义本地的过滤器（局部）
        // filters: {
        //     beautifyTime: function(value, para2, para3, para4) {
        //         console.log(para2);
        //         console.log(para3);
        //         console.log(para4);
        //         // 处理之前，第一个参数value就是接收要过滤的值，即模板双花括号插值中 | 前面写要过滤的数据
        //         // if (!value) return ''
        //         // value = value.toString()
        //         console.log(value);
        //         // 返回处理之后的value
        //         // return value.charAt(0).toUpperCase() + value.slice(1)
        //         // return '🐖🐖🐖🐖';
        //         // 需要用moment.js来格式化日期，再返回
        //         // return moment(value).format("YYYY年MM月DD日");
        //         return moment(value).format(`YYYY${para2}MM${para3}DD${para4}`);
        //     }
        // },
        // methods: {
        //     // 需要手动调用
        // },
        // computed: {
        //     // 需要页面去{挖坑}
        // }
        // 上面两种方式都不好，生命周期钩子（生命周期钩子的 this 上下文指向调用它的 Vue 实例）
        beforeCreate() {
            // 创建Vue实例之前
            console.log("beforeCreate");
            // console.log(this.message);
        },
        created() {
            // 创建Vue实例完毕（Vue实例创建完毕才可以访问到vue组件中的内容）
            console.log("created");
            // console.log(this.message);

            // 发请求，获取顶部数据
            this.$axios
                .get("site/goods/gettopdata/goods")
                .then(response => {
                    // console.log(response);
                    // 设置给组件中的data中的数据
                    console.log(this); //VueComponent 说明写在这里的axios的回调函数里拿到了当前这个index组件
                    this.catelist = response.data.message.catelist;
                    this.sliderlist = response.data.message.sliderlist;
                    // 请求回来的数据中日期格式需要Vue过滤器filters处理一下（双花括号插值），在赋值给组件
                    this.toplist = response.data.message.toplist;
                });
            // 发请求，获取底部数据 
            this.$axios
                .get('site/goods/getgoodsgroup')
                .then(response => {
                    // console.log(response);
                    // 设置给组件中的data中的数据
                    this.orderList =  response.data.message;
                    
                });
        },
    };
</script>

<style>

</style>