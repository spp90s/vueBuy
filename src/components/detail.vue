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
              <!-- 商品图片 -->
              <div class="pic-box">
                <!-- 放大镜组件 -->
                <ProductZoomer v-if="images.normal_size.length != 0" :base-images="images" :base-zoomer-options="zoomerOptions" />
              </div>
              <!-- 商品信息 -->
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
                    <!-- 
                      1. 这里逻辑简单，直接把js代码写在标签里，点击后切换selectedIndex的值
                      2. 是否有selected这个类名取决于selectedIndex的值
                      -->
                    <a @click="selectedIndex=0" href="javascript:;" :class="{selected: selectedIndex == 0}">商品介绍</a>
                  </li>
                  <li>
                    <a @click="selectedIndex=1" href="javascript:;" :class="{selected: selectedIndex == 1}">商品评论</a>
                  </li>
                </ul>
              </div>
              <!-- 商品介绍的内容 -->
              <div class="tab-content entry" v-show="selectedIndex == 0" v-html="goodsinfo.content">内容
                <!-- {{goodsinfo.content}} -->
                <!-- goodsinfo.content中的数据使用v-html可以直接解析为html标签 -->
              </div>
              <!-- 商品评论的内容 -->
              <div class="tab-content" v-show="selectedIndex == 1">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <!-- 把输入的评论信息进行双向数据绑定 -->
                        <textarea id="txtContent" v-model.trim="message" name="txtContent" sucmsg=" " data-type="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="submitComment">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in comments" :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <!-- <span>{{item.add_time | beautifyTime}}</span> -->
                          <span>{{item.add_time | accurateTime("YYYY年MM月DD日 H:mm:ss")}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <!-- <div id="pagination" class="digg">
                              <span class="disabled">« 上一页</span>
                              <span class="current">1</span>
                              <span class="disabled">下一页 »</span>
                      </div>-->
                    <!-- 
                          使用iView的分页组件
                            current 当前页码，支持.sync修饰符（默认为1）
                            total 数据总数（默认为0）
                            page-size 每页条数（默认为10）
                            page-size-opts 每页条数切换的配置（默认为数组 [10, 20, 30, 40]）
                            placement 条数切换弹窗的展开方向（默认为bottom）
                            show-total 显示总数（默认为false）
                            show-elevator 显示电梯，可以快速切换到某一页（默认为false）
                            show-sizer 显示分页，用来改变page-size（默认为false）
                            on-change 页码改变的回调，返回改变后的页码
                            on-page-size-change 切换每页条数时的回调，返回切换后的每页条数（page-size）
                      -->
                    <!-- <Page :total="400" page-size-opts="[6, 12, 18, 24]" placement="top" show-elevator show-sizer /> -->
                    <!-- 上面直接这样写会把数组解析为字符串，需要v-bind: 动态数据绑定才会解析为数组 -->
                    <Page @on-page-size-change="sizeChange" @on-change="pageChange" :current="pageIndex" :total="totalCount" :page-size="pageSize" :page-size-opts="[6, 16, 26, 36]" placement="top" show-elevator show-sizer />
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
                      <router-link :to="'/detail/' + item.id">{{item.title}}</router-link>
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
        buyNum: 1,
        // 标记tab栏显示哪个（默认是0）
        selectedIndex: 0,
        // 页码
        pageIndex: 1,
        // 页容量
        pageSize: 6,
        // 总页码
        totalCount: 0,
        // 评论内容
        comments: [],
        // 发表的评论信息
        message: "",
        // 放大镜图片数据
        images: {
          normal_size: [  // required 要求我们自己往normal_size这个数组里push对象，对象包含了当前商品的id与url
            {
              id: 1,
              url: "http://pic1.win4000.com/wallpaper/2018-01-09/5a54724e365b9.jpg"
            },
            {
              id: 2,
              url: "http://imgsrc.baidu.com/imgad/pic/item/b21c8701a18b87d62cb99eca0d0828381e30fd6f.jpg"
            }
          ]
        },
        // zoomer的选项
        zoomerOptions: {

          // 方法倍数

          zoomFactor: 6,
          // 放大样式
          pane: 'container-round',
          // 多久放出来
          hoverDelay: 300,
          // 类前缀
          namespace: 'inline-zoomer',
          // 点击移动
          move_by_click: true,
          // 滚动的图片张数
          scroll_items: 5,
          // 选中的缩略图的边框颜色
          choosed_thumb_border_color: "#f40"
        }
      };
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
      this.getComments();
    },
    // 事件
    methods: {
      // 购买数量buyNum改变时触发
      numChange() {
        console.log("num改变了");
      },
      // 根据id获取，商品数据的方法
      getGoodsInfo() {

        // 每次请求商品信息之前，把原始占位图片数组清空
        this.images.normal_size = [];

        // axios调用接口获取数据
        this.$axios
          .get(`site/goods/getgoodsinfo/${this.goodsId}`)
          .then(response => {
            console.log(response);
            // 商品信息
            this.goodsinfo = response.data.message.goodsinfo;
            // 图片列表
            this.hotgoodslist = response.data.message.hotgoodslist;
            // 图片列表
            this.imglist = response.data.message.imglist;

            // 处理数据，以便把imglist的值赋值给images（必须按images的格式）
            // let tem_normal_size = [];
 
            this.imglist.forEach(v => {
              this.images.normal_size.push({
                // push进去的对象必须按照normal_size里的格式（有id、有url）
                id: v.id,
                url: v.thumb_path
              });
            });
            // 数据处理完毕，重新赋值给normal_size
            // this.images.normal_size = tem_normal_size;

            // 但是这个放大镜插件不能自动刷新渲染图片，怎么办？
            // 1. 刷新网页不可取
            // window.location.reload();
            // 2. 强制让放大镜重新生成一次 v-if

          });
      },
      // 获取评论信息
      getComments() {
        this.$axios
          .get(
            `site/comment/getbypage/goods/${this.goodsId}?pageIndex=${
              this.pageIndex
            }&pageSize=${this.pageSize}`
          )
          .then(response => {
            console.log(response);
            // 总页码
            this.totalCount = response.data.totalcount;
            // 页码
            this.pageIndex = response.data.pageIndex;
            // 页容量
            this.pageSize = response.data.pageSize;
            // 评论内容
            this.comments = response.data.message;
          });
      },
      // 点击分页
      pageChange(newPageIndex) {
        // 返回改变后的页码
        console.log(newPageIndex);
        // 修改页码
        this.pageIndex = newPageIndex;
        // 重新发请求
        this.getComments();
      },
      // 每页条数改变
      sizeChange(newPageSize) {
        //返回切换后的页容量
        console.log(newPageSize);
        // 修改页容量
        this.pageSize = newPageSize;
        // 重新发请求
        this.pageIndex = 1; //跳回第一页
        this.getComments();
      },
      // 提交评论
      submitComment() {
        // 非空判断
        if (this.message == "") {
          // this.$Message.info('这是一条普通的提醒');
          this.$Message.warning("不能提交空评论");
          return;
        }
        // 不是非空，就要提交评论，就是要发到服务器去，就要调接口
        this.$axios
          .post("site/validate/comment/post/goods/" + this.goodsId, {
            commenttxt: this.message
          })
          .then(response => {
            console.log(response);
            // 提交完评论后重置页码（pageIndex仅用作获取商品评论用，控制不了分页组件）
            this.pageIndex = 1;
            // 重置一定要写在发请求获取评论请求以前
            // 重新获取评论信息
            this.getComments();
            // 清空文本域的内容
            this.message = "";
            // 提示用户
            this.$Message.success("评论发表成功");
          });
      }
    },
    // 观察路由数据改变 watch侦听对应的数据改变时触发
    watch: {
      // 侦听了$route，一旦发送改变，会把新数据设置给to，老数据设置给from
      $route(to, from) {
        // 对路由变化作出响应...
        console.log(to); //新id
        console.log(from); //旧id
        // 获取新id，并以此id发请求获取数据，渲染页面
        this.goodsId = to.params.xxoo;
        // 调用一下getGoodsInfo以重新获取数据
        this.getGoodsInfo();
        // 路由参数改变时把购买数量重置为1
        this.buyNum = 1;
        // 路由传参改变了，也要重新获取评论
        this.getComments();
      }
    }
  };
</script>
<style>
  /* 取消img底部的小间隙 */
  .tab-content>p>img {
    display: block;
  }
  /* 约束放大镜父盒子的尺寸 */
  .pic-box {
    /* width: 395px; */
    width: 200px;
    /* height: 313px; */
  }

  .preview-box {
    margin-left: 70px;
  }

  .control-box {
    margin-left: 132.5px;
  }

  .inline-zoomer-zoomer-box .preview-box>img {
    width: 250px;
  }

  .inline-zoomer-zoomer-box .control-box .thumb-list>img {
    width: 50.5px;
  }

</style>

 