<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- element-ui的计数器组件 -->
                                                <el-input-number size="small" v-model="buyNum" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" class="selected">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" style="display: block;">
                                内容
                            </div>
                            <div class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/' + item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/' + item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | beautifyTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    // 导入axios
    // import axios from 'axios';   //迁移到main.js中

    // 导入moment.js
    // import moment from "moment"; //迁移到main.js中

    export default {
        // 这个name跟模板里的id无关，这个name将会是在chrome的dev-tools里看到的名字
        name: "detail",

        data: function() {
            return {
                // 传过来的商品id
                goodsId: "",
                // 商品信息
                goodsinfo: {},
                // 图片列表
                hotgoodslist: [],
                // 图片列表
                imglist: [],
                // 选择数量
                buyNum: 1
            }   
        },

        // 在一个组件的选项中定义本地的过滤器（局部）
        // filters: {
        //     beautifyTime: function(value) {
            
        //         // 处理之前，第一个参数value就是接收要过滤的值，即模板双花括号插值中 | 前面写要过滤的数据
        //         // if (!value) return ''
        //         // value = value.toString()
        //         console.log(value);
        //         // 返回处理之后的value
        //         // return value.charAt(0).toUpperCase() + value.slice(1)
        //         // return '🐖🐖🐖🐖';
        //         // 需要用moment.js来格式化日期，再返回
        //         return moment(value).format("YYYY年MM月DD日");
        //     }
        // },

        // 创建Vue实例后
        created() {
            // 当匹配到一个路由时，参数值会被设置到 this.$route.params 这个对象里，可以在每个组件内使用
            console.log(this.$route.params);
            console.log(this.$route.params.xxoo);

            this.goodsId = this.$route.params.xxoo;

            // axios调用接口获取数据（抽取出来）
            // this.$axios.get(`site/goods/getgoodsinfo/${this.goodsId}`).then(response => {
            //     console.log(response);
            //     // 商品信息
            //     this.goodsinfo = response.data.message.goodsinfo;
            //     // 图片列表
            //     this.hotgoodslist = response.data.message.hotgoodslist;
            //     // 图片列表
            //     this.imglist = response.data.message.imglist;
                
            // })
            this.getGoodsInfo();
        },

        // 事件
        methods: {
            // 购买数量buyNum改变时触发
            numChange() {
                console.log('num改变了');
                
            },

            // 根据id获取，商品数据的方法
            getGoodsInfo() {
                // axios调用接口获取数据
                this.$axios.get(`site/goods/getgoodsinfo/${this.goodsId}`).then(response => {
                    console.log(response);
                    // 商品信息
                    this.goodsinfo = response.data.message.goodsinfo;
                    // 图片列表
                    this.hotgoodslist = response.data.message.hotgoodslist;
                    // 图片列表
                    this.imglist = response.data.message.imglist;
                    
                })
            }
        },

        // 观察路由数据改变 watch侦听对应的数据改变时触发
        watch: {
            // 侦听了$route，一旦发送改变，会把新数据设置给to，老数据设置给from
            '$route' (to, from) {
                // 对路由变化作出响应...
                console.log(to);    //新id
                console.log(from);  //旧id
                // 获取新id，并以此id发请求获取数据，渲染页面
                this.goodsId = to.params.xxoo;
                // 调用一下getGoodsInfo以重新获取数据
                this.getGoodsInfo();
                // 路由参数改变时把购买数量重置为1
                this.buyNum = 1;
            }
        }
    }
</script>
<style>

</style>

 