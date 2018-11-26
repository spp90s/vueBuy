<template>
    <!-- <div id="app">
                            <img alt="Vue logo" src="./assets/logo.png">
                            <HelloWorld msg="Welcome to Your Vue.js App"/>
                          </div> -->
    <!-- App.vue是最顶级的组件 根组件（类似于布局中最顶级的那个div，最外面的那个容器），router-link、router-view放这里，其他组件都放components里 -->
    <div>
        <!-- 顶部 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>微买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span style="display: none;">
                            <a href="" class="">登录</a>
                            <strong>|</strong>
                            <a href="" class="">注册</a>
                            <strong>|</strong>
                        </span>
                        <span>
                            <a href="" class="">会员中心</a>
                            <strong>|</strong>
                            <a>退出</a>
                            <strong>|</strong>
                        </span>
                        <a href="" class="">
                            <i class="iconfont icon-cart"></i>购物车(
                                <span id="shoppingCartCount">
                                <span>4</span>
                            </span>)
                        </a>
                    </div>
                </div>
            </div>
            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <!-- <a href="#" class=""> -->
                                <router-link to="/index">
                                    <span class="out" style="top: 0px;">首页</span>
                                </router-link>
                                <!-- </a> -->
                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">微超市</span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </a>
                            </li>
                            <li class="goods">
                                <a href="" class="router-link-exact-active ">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 路由出口 -->
        <router-view></router-view>
        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 微买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 webuy Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    // 导入jquery
    import $ from 'jquery';
    // 暴露组件
    export default {
        // 这个name跟模板里的id无关（id删掉都可以），这个name将会是在chrome的dev-tools里看到的名字
        // name: 'app',
        name: "webuy",

        // components: {
        //   HelloWorld
        // }

        // 单文件组件开发中，代码一般都是写在跟组件相关的地方，这里还是老套路用了jQuery的入口函数，既然使用了Vue，就考虑生命周期函数

        // 生命周期函数那么多，用哪一个呢？放在created函数里没效果

        // 挂载之前（把template中的结构渲染出来之前）
        beforeMount() {
            // console.log('beforeMount');
            // console.log(document.body.innerHTML);
        },
        // 挂载完成（把template中的结构渲染出来之后）
        mounted() {
            // console.log('mounted');
            // console.log(document.body.innerHTML);
                //     $("#menu2 li a").wrapInner('<span class="out"></span>');
            $("#menu2 li a").each(function() {
                $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
            });
            $("#menu2 li a").hover(
                function() {
                    $(".out", this)
                        .stop()
                        .animate({
                            top: "48px"
                        }, 300); // move down - hide
                    $(".over", this)
                        .stop()
                        .animate({
                            top: "0px"
                        }, 300); // move down - show
                },
                function() {
                    $(".out", this)
                        .stop()
                        .animate({
                            top: "0px"
                        }, 300); // move up - show
                    $(".over", this)
                        .stop()
                        .animate({
                            top: "-48px"
                        }, 300); // move up - hide
                }
            );
        }
    };
    // 迁移的js代码（需要引入jQuery插件）
    // $(document).ready(function() {
    //     $("#menu2 li a").wrapInner('<span class="out"></span>');
    //     $("#menu2 li a").each(function() {
    //         $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    //     });
    //     $("#menu2 li a").hover(
    //         function() {
    //             $(".out", this)
    //                 .stop()
    //                 .animate({
    //                     top: "48px"
    //                 }, 300); // move down - hide
    //             $(".over", this)
    //                 .stop()
    //                 .animate({
    //                     top: "0px"
    //                 }, 300); // move down - show
    //         },
    //         function() {
    //             $(".out", this)
    //                 .stop()
    //                 .animate({
    //                     top: "0px"
    //                 }, 300); // move up - show
    //             $(".over", this)
    //                 .stop()
    //                 .animate({
    //                     top: "-48px"
    //                 }, 300); // move up - hide
    //         }
    //     );
    // });
</script>

<style>
    /* #app {
                          font-family: 'Avenir', Helvetica, Arial, sans-serif;
                          -webkit-font-smoothing: antialiased;
                          -moz-osx-font-smoothing: grayscale;
                          text-align: center;
                          color: #2c3e50;
                          margin-top: 60px;
                        } */
    /* 导入样式 */
    @import url("./assets/statics/site/css/style.css");
    /* 动画span的样式 */
    .menuhd ul li a span.over {
        background-color: orange;
    }
</style>
