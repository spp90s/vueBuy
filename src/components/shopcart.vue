<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 没买东西显示的内容 -->
                                <tr v-if="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 买了东西显示的内容 -->
                                <tr v-if="goodsList.lenght != 0" v-for="(item, index) in goodsList" :key="item.id">
                                    <td>
                                        <div role="switch" aria-checked="true" class="el-switch is-checked"><input type="checkbox" name="" true-value="true" class="el-switch__input">
                                            <!----><span class="el-switch__core" style="width: 40px; border-color: rgb(19, 206, 102); background-color: rgb(19, 206, 102);"></span>
                                            <!---->
                                        </div>
                                    </td>
                                    <td><img :src="item.img_url" alt=""><span>{{item.title}}</span></td>
                                    <!-- 单价 -->
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <!-- 
                                            v-on监听原生DOM事件，方法以事件event为唯一形参

                                            如果使用了内联语句，方法就可以访问$event属性
                                                第1个形参：自己传入的自定义参数
                                                第2个形参：获取原本的参数
                                            -->
                                        <el-input-number v-model="item.buycount" @change="countChange(item.id, $event)" :min="1" label="描述文字"></el-input-number>
                                    </td>
                                    <!-- 总价 -->
                                    <td>{{item.sell_price * item.buycount}}</td>
                                    <td><button type="button" class="el-button el-button--danger is-circle"><!----><i class="el-icon-delete"></i><!----></button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">0</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">0</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 类似于module.exports
    export default {
        name: "shopcart",
        data: function() {
            return {
                // 商品的详细数据（测试接口发现返回的数据是一个数组，数组里面存着一个一个的对象），需要通过接口获取
                goodsList: []
            }
        },
        // 因为一进来购物车页面就要调接口获取数据，就要写在生命周期函数中
        created() {
            // 1. 先通过Vuex获取id数据，进行拼接，注意去掉字符串末尾的逗号
            let ids = '';
            for (const key in this.$store.state.shopCartData) {
                ids += key;
                ids += ',';
            }
            console.log(ids);
            // 下面两个方法都是从0开始截取至倒数第2位
            // ids = ids.substring(0, ids.length-1);
            ids = ids.slice(0, -1);
            console.log(ids);
            // 2. 再使用axios调用接口
            this.$axios
                .get(`site/comment/getshopcargoods/${ids}`)
                .then(response => {
                    // console.log(response);
                    // 接口文档中规定了buyCount要我们自己去修改为真实值
                    response.data.message.forEach(v => {
                        // 当前这个商品的购买数量数量 == Vuex中的购买数量
                        v.buycount = this.$store.state.shopCartData[v.id];
                    });
                    // 修改完了之后赋值给Data中的goodsList数组
                    this.goodsList = response.data.message;
                    console.log(response);
                });
        },
        methods: {
            countChange(id, newCount) {
                // 个数改变
                console.log(id, newCount);
                // 修改Vuex中的数据（但目前状态变更里还没有修改数据的方法，去main.js中新加一个方法updateCart）
                this.$store.commit('updateCart', {
                    // 传入参数{id: '', newCount:  }
                    id,
                    newCount
                });
            }
        }
    }
</script>

<style>
    td img {
        width: 100px;
    }
    /* 子代选择器 */
    td>span {
        margin-left: 10px;
    }
    td:nth-child(2) {
        display: flex;
        align-items: center;
    }
</style>